-- Menu categories/items + bank accounts for public menu parity

CREATE TABLE public.menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name_en text NOT NULL,
  name_am text,
  name_ar text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cafe_id, slug)
);

CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  name_en text NOT NULL,
  name_am text,
  name_ar text,
  description_en text,
  description_am text,
  description_ar text,
  price text NOT NULL DEFAULT '0',
  image_url text,
  is_available boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  starting_from boolean NOT NULL DEFAULT false,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.bank_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cafe_id uuid NOT NULL REFERENCES public.cafes(id) ON DELETE CASCADE,
  bank_name text NOT NULL,
  account_holder text NOT NULL,
  account_number text NOT NULL,
  account_type text NOT NULL DEFAULT 'savings'
    CHECK (account_type IN ('savings','current','mobile_wallet')),
  qr_code_image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER menu_categories_set_updated_at BEFORE UPDATE ON public.menu_categories
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE TRIGGER menu_items_set_updated_at BEFORE UPDATE ON public.menu_items
FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

GRANT SELECT ON public.menu_categories TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_categories TO authenticated;
GRANT ALL ON public.menu_categories TO service_role;

GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;

GRANT SELECT ON public.bank_accounts TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_accounts TO authenticated;
GRANT ALL ON public.bank_accounts TO service_role;

ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "menu_categories: public read active cafe"
  ON public.menu_categories FOR SELECT TO anon, authenticated
  USING (
    is_active AND EXISTS (
      SELECT 1 FROM public.cafes c WHERE c.id = cafe_id AND c.status = 'active'
    )
  );

CREATE POLICY "menu_categories: members write"
  ON public.menu_categories FOR ALL TO authenticated
  USING (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  )
  WITH CHECK (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  );

CREATE POLICY "menu_items: public read active cafe"
  ON public.menu_items FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.cafes c WHERE c.id = cafe_id AND c.status = 'active'
    )
  );

CREATE POLICY "menu_items: members write"
  ON public.menu_items FOR ALL TO authenticated
  USING (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  )
  WITH CHECK (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  );

CREATE POLICY "bank_accounts: public read visible"
  ON public.bank_accounts FOR SELECT TO anon, authenticated
  USING (
    is_visible AND EXISTS (
      SELECT 1 FROM public.cafes c WHERE c.id = cafe_id AND c.status = 'active'
    )
  );

CREATE POLICY "bank_accounts: members write"
  ON public.bank_accounts FOR ALL TO authenticated
  USING (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  )
  WITH CHECK (
    public.has_cafe_role(auth.uid(), cafe_id, ARRAY['owner','manager']::public.cafe_role[])
    OR public.has_role(auth.uid(), 'platform_admin')
  );

CREATE INDEX menu_categories_cafe_sort_idx ON public.menu_categories (cafe_id, sort_order);
CREATE INDEX menu_items_cafe_cat_sort_idx ON public.menu_items (cafe_id, category_id, sort_order);
CREATE INDEX bank_accounts_cafe_sort_idx ON public.bank_accounts (cafe_id, sort_order);

-- Seed bank accounts for Musk (idempotent)
INSERT INTO public.bank_accounts (cafe_id, bank_name, account_holder, account_number, account_type, sort_order)
SELECT c.id, v.bank_name, v.account_holder, v.account_number, v.account_type, v.sort_order
FROM public.cafes c
CROSS JOIN (
  VALUES
    ('Commercial Bank of Ethiopia (CBE)', 'Musk Restaurant PLC', '1000727868686', 'savings', 0),
    ('Dashen Bank', 'Musk Restaurant PLC', '7912292094211', 'savings', 1),
    ('Telebirr', 'Musk', '0967777778', 'mobile_wallet', 2)
) AS v(bank_name, account_holder, account_number, account_type, sort_order)
WHERE c.slug = 'musk'
  AND NOT EXISTS (SELECT 1 FROM public.bank_accounts b WHERE b.cafe_id = c.id);
