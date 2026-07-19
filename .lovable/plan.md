# Phase 1 — Foundation: Database, Auth, Roles, Tenant Isolation

Goal: stand up the multi-tenant backbone that every later phase depends on. No dashboard UI, no menu management, no billing yet — only the data model, auth, role system, tenant guards, and the minimal routes needed to prove they work end-to-end. The existing public Musk menu at `/` stays untouched and fully functional.

---

## 1. Proposed data model (Phase 1 slice)

Only the tables required for auth, tenancy and role enforcement are created now. Menu, orders, tables, plans, subscriptions, reviews, audit log etc. are scaffolded as **empty migrations in later phases** — not built here — so we don't paint ourselves into a corner but also don't ship dead tables.

Tables created in Phase 1 (all in `public`, all with GRANTs + RLS):

- **`profiles`** — 1:1 with `auth.users`
  - `id uuid PK REFERENCES auth.users(id) ON DELETE CASCADE`
  - `full_name text`, `avatar_url text`, `created_at`, `updated_at`
  - Auto-created via `on_auth_user_created` trigger.

- **`cafes`** — the tenant root
  - `id uuid PK`, `slug text UNIQUE` (public URL key), `name text`
  - `owner_id uuid REFERENCES auth.users(id)` (denormalized convenience; authoritative role lives in `cafe_memberships`)
  - `status text CHECK IN ('active','suspended','maintenance')` default `active`
  - `created_at`, `updated_at`
  - **Reserved slug**: `musk` is pre-inserted and mapped to the current static menu so `/menu/musk` keeps working immediately.

- **`cafe_memberships`** — the tenant/role join table (authoritative)
  - `id uuid PK`, `cafe_id uuid → cafes`, `user_id uuid → auth.users`
  - `role cafe_role NOT NULL` (enum: `owner | manager | staff`)
  - `status text` (`active | disabled`), `created_at`
  - `UNIQUE (cafe_id, user_id)`

- **`app_role`** enum + **`user_roles`** table (platform-level roles only)
  - `app_role`: `platform_admin` (that's the only value needed at platform scope for now)
  - Standard separate `user_roles` table pattern with `has_role(uuid, app_role)` SECURITY DEFINER function. **Never** stored on `profiles`.

- **`audit_logs`** — minimal skeleton, written to from Phase 8, but created now so it exists for impersonation/suspension events
  - `id`, `actor_user_id`, `cafe_id nullable`, `action text`, `metadata jsonb`, `created_at`

Everything else in your model list (BusinessHours, MenuCategory, MenuItem, MenuItemOption, Table, QRCode, Order, OrderItem, StaffInvitation, CafeSettings, Plan, Subscription, Review) is **deferred** to its owning phase.

---

## 2. Authorization model

Two independent axes:

- **Platform scope** — checked via `public.has_role(auth.uid(), 'platform_admin')`. Grants access to `/admin/*` super-admin routes only.
- **Tenant scope** — checked via `public.has_cafe_role(auth.uid(), cafe_id, roles[])`, a SECURITY DEFINER function reading `cafe_memberships`. Grants access to `/dashboard/*` for that specific cafe.

Rules baked into RLS from day one:

- `profiles`: user can read/update only their own row; platform_admin can read all.
- `cafes`: any member can `SELECT` their cafe. Only `owner` role can `UPDATE`. Platform admin can do everything.
- `cafe_memberships`: members can see rows for cafes they belong to. Only `owner` can INSERT/UPDATE/DELETE memberships for their cafe (except cannot demote themselves if last owner — enforced by trigger).
- `user_roles`: only platform_admin can read/write. Never client-writable for elevation.
- `audit_logs`: platform_admin reads all; cafe owners read rows scoped to their cafe. Inserts happen server-side only (service_role via server functions).

**Tenant isolation invariant**: every future table that stores cafe data will carry `cafe_id` and RLS policies keyed on `has_cafe_role(auth.uid(), cafe_id, ...)`. The browser never picks a `cafe_id` we trust — server functions re-derive it from the authenticated user or from the URL slug + membership check.

All privileged writes (impersonation, suspension, invitations, plan changes) go through `createServerFn` handlers with `requireSupabaseAuth` + explicit role check; `supabaseAdmin` is only imported inside those handlers after authorization passes.

---

## 3. Routes / screens in Phase 1

Public (unchanged):

- `/` — existing Musk menu, untouched.

New in Phase 1:

- `/auth` — sign-in + sign-up (email/password + Google). Public. Redirects logged-in users to `/dashboard` or `/admin`.
- `/auth/callback` — public OAuth landing that establishes session, then routes to intended destination.
- `/_authenticated/dashboard` — signed-in landing. If the user belongs to one cafe → redirect to that cafe's dashboard shell. If multiple → picker. If none → "Create your cafe" CTA (real cafe creation ships in Phase 2; in Phase 1 this is a placeholder card).
- `/_authenticated/admin` — platform admin shell. Gated by `has_role(..., 'platform_admin')`. Empty stub with "Platform admin — Phase 8" placeholder plus a working "Users" count read to prove the gate + RLS work.
- `/menu/$slug` — public cafe menu route that reads a `cafes` row by slug and, for `musk`, renders the existing static menu component. This proves the tenant lookup path without needing menu tables yet.

Not built in Phase 1: cafe profile editing, menu CRUD, orders, tables, billing, super-admin management screens. Those are their own phases.

---

## 4. Acceptance criteria

- Lovable Cloud is connected; migrations create all Phase 1 tables with explicit `GRANT`s and RLS enabled.
- A brand-new user can sign up, land on `/auth/callback`, and reach `/dashboard` with the "no cafe yet" state.
- Manually inserting a `cafe` + `cafe_membership` for that user makes `/dashboard` show the cafe's shell.
- A second user with no membership to that cafe **cannot** read the cafe row, its memberships, or anything scoped to it — verified via a direct client query in the browser console.
- Setting a user as `platform_admin` in `user_roles` grants `/admin` access; removing it revokes access on next navigation.
- `/menu/musk` renders the existing Musk menu. `/menu/does-not-exist` renders a proper not-found.
- No `has_role` / RLS policy references the table it protects (no infinite recursion).
- No role is stored on `profiles`. No client code trusts a `cafe_id` from the URL without a membership check server-side.
- The existing Musk `/` route is visually and functionally unchanged.

---

## 5. Assumptions & risks

Assumptions:

- Lovable Cloud will be enabled before implementation starts (blocking).
- Email/password + Google sign-in are acceptable for auth (standard Lovable Cloud defaults). Google requires `supabase--configure_social_auth`.
- The "Musk" menu becomes cafe `slug = 'musk'` — its data is migrated into real tables in **Phase 3**, not Phase 1. During Phase 1 it remains the static component, just reached via `/menu/musk`.
- Real payments are out of scope until Phase 7; a manual subscription workflow is acceptable there.

Risks / things I want to flag now:

- **First platform admin bootstrap**: there's no UI to mint the first `platform_admin`. I'll document a one-line SQL insert you run once after signup. Do not want a "promote self" endpoint — that's a privilege-escalation footgun.
- **Impersonation** (Phase 8) is genuinely dangerous. When we get there I'll implement it as a short-lived, audit-logged, server-issued scoped session — never by swapping JWTs client-side. Flagging early so we agree on the shape before Phase 8.
- **Slug collisions & reserved words**: `musk`, `admin`, `dashboard`, `auth`, `api` must be reserved. Enforced by a CHECK + a seeded reserved list.
- **`cafes.owner_id` denormalization**: kept for convenience but `cafe_memberships` is authoritative. A trigger will keep `owner_id` in sync with the single row where `role = 'owner'` and `status = 'active'`; policies never rely on `owner_id` alone.
- **Deferring menu/orders tables**: means Phase 3 will do a data migration to move the static Musk menu into the DB. Cheaper than shipping empty tables now that we'd have to rework.

---

Reply **approve Phase 1** (after enabling Lovable Cloud) and I'll implement exactly this scope and stop for your Phase 2 review.
