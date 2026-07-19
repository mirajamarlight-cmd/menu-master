
-- Phase 1: Foundation — auth, tenancy, roles

-- Enums
CREATE TYPE public.cafe_role AS ENUM ('owner','manager','staff');
CREATE TYPE public.app_role AS ENUM ('platform_admin');
CREATE TYPE public.cafe_status AS ENUM ('active','suspended','maintenance');
CREATE TYPE public.membership_status AS ENUM ('active','disabled');

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- profiles (1:1 with auth.users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- user_roles: platform-level roles ONLY. Never stored on profiles.
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security-definer platform role check (no recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- cafes (tenant root)
CREATE TABLE public.cafes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status public.cafe_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cafes_slug_format CHECK (slug ~ '^[a-z0-9](?:[a-z0-9-]{1,48}[a-z0-9])?$'),
  CONSTRAINT cafes_slug_reserved CHECK (
    slug NOT IN ('admin','dashboard','auth','api','menu','www','app','platform','settings','billing','staff','orders','tables')
  )
);
GRANT SELECT ON public.cafes TO anon;
GRANT SELECT, INSERT, UPDATE ON public.cafes TO authenticated;
GRANT ALL ON public.cafes TO service_role;
ALTER TABLE public.cafes ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER cafes_set_updated_at BEFORE UPDATE ON public.cafes
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- cafe_memberships (authoritative tenant/role join)
CREATE TABLE public.cafe_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.cafe_role NOT NULL,
  status public.membership_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cafe_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cafe_memberships TO authenticated;
GRANT ALL ON public.cafe_memberships TO service_role;
ALTER TABLE public.cafe_memberships ENABLE ROW LEVEL SECURITY;

-- Tenant role check (no recursion — queries membership, not the policy target table)
CREATE OR REPLACE FUNCTION public.has_cafe_role(_user_id uuid, _cafe_id uuid, _roles public.cafe_role[])
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cafe_memberships
    WHERE user_id = _user_id AND cafe_id = _cafe_id
      AND status = 'active' AND role = ANY(_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_cafe_member(_user_id uuid, _cafe_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cafe_memberships
    WHERE user_id = _user_id AND cafe_id = _cafe_id AND status = 'active'
  );
$$;

-- audit_logs
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  cafe_id uuid REFERENCES public.cafes(id) ON DELETE SET NULL,
  action text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============ RLS Policies ============

-- profiles
CREATE POLICY "profiles: self read"  ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(), 'platform_admin'));
CREATE POLICY "profiles: self insert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());
CREATE POLICY "profiles: self update" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- user_roles: platform admins only
CREATE POLICY "user_roles: admin read" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'platform_admin'));
-- (No INSERT/UPDATE/DELETE policies for authenticated — service_role only.)

-- cafes
CREATE POLICY "cafes: public read active" ON public.cafes FOR SELECT TO anon
  USING (status = 'active');
CREATE POLICY "cafes: member or admin read" ON public.cafes FOR SELECT TO authenticated
  USING (
    status = 'active'
    OR public.is_cafe_member(auth.uid(), id)
    OR public.has_role(auth.uid(), 'platform_admin')
  );
CREATE POLICY "cafes: owner update" ON public.cafes FOR UPDATE TO authenticated
  USING (public.has_cafe_role(auth.uid(), id, ARRAY['owner']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin'))
  WITH CHECK (public.has_cafe_role(auth.uid(), id, ARRAY['owner']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin'));
-- Cafe creation (INSERT) is deferred to Phase 2 server function via service_role.

-- cafe_memberships
CREATE POLICY "memberships: member read" ON public.cafe_memberships FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR public.is_cafe_member(auth.uid(), cafe_id)
    OR public.has_role(auth.uid(), 'platform_admin')
  );
CREATE POLICY "memberships: owner manage" ON public.cafe_memberships FOR ALL TO authenticated
  USING (public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin'))
  WITH CHECK (public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin'));

-- audit_logs
CREATE POLICY "audit_logs: admin or cafe owner read" ON public.audit_logs FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'platform_admin')
    OR (cafe_id IS NOT NULL AND public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner']::public.cafe_role[]))
  );
-- Inserts happen server-side only via service_role.

-- ============ Triggers ============

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Keep cafes.owner_id in sync with the authoritative owner membership
CREATE OR REPLACE FUNCTION public.sync_cafe_owner_id() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE new_owner uuid;
BEGIN
  SELECT user_id INTO new_owner
  FROM public.cafe_memberships
  WHERE cafe_id = COALESCE(NEW.cafe_id, OLD.cafe_id)
    AND role = 'owner' AND status = 'active'
  ORDER BY created_at ASC LIMIT 1;
  UPDATE public.cafes SET owner_id = new_owner
  WHERE id = COALESCE(NEW.cafe_id, OLD.cafe_id) AND owner_id IS DISTINCT FROM new_owner;
  RETURN NULL;
END; $$;
CREATE TRIGGER sync_cafe_owner_after_membership
  AFTER INSERT OR UPDATE OR DELETE ON public.cafe_memberships
  FOR EACH ROW EXECUTE FUNCTION public.sync_cafe_owner_id();

-- Guard: never leave a cafe without an active owner
CREATE OR REPLACE FUNCTION public.guard_last_cafe_owner() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE remaining int; target_cafe uuid;
BEGIN
  IF (TG_OP = 'DELETE') AND OLD.role = 'owner' AND OLD.status = 'active' THEN
    target_cafe := OLD.cafe_id;
  ELSIF (TG_OP = 'UPDATE') AND OLD.role = 'owner' AND OLD.status = 'active'
        AND (NEW.role <> 'owner' OR NEW.status <> 'active') THEN
    target_cafe := OLD.cafe_id;
  ELSE
    RETURN NEW;
  END IF;

  SELECT count(*) INTO remaining
  FROM public.cafe_memberships
  WHERE cafe_id = target_cafe AND role = 'owner' AND status = 'active'
    AND id <> OLD.id;
  IF remaining = 0 THEN
    RAISE EXCEPTION 'Cannot remove the last active owner of cafe %', target_cafe;
  END IF;
  RETURN COALESCE(NEW, OLD);
END; $$;
CREATE TRIGGER guard_last_cafe_owner_trg
  BEFORE UPDATE OR DELETE ON public.cafe_memberships
  FOR EACH ROW EXECUTE FUNCTION public.guard_last_cafe_owner();

-- Seed the Musk cafe so /menu/musk resolves immediately
INSERT INTO public.cafes (slug, name, status)
VALUES ('musk', 'Musk Restaurant', 'active')
ON CONFLICT (slug) DO NOTHING;
