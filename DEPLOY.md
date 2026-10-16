# Deploy menu-master on Coolify (`cafe.raafat.site`)

Runtime: Nitro **node-server** (see `vite.config.ts`). Image: `Dockerfile` in this directory.

## Coolify UI checklist

1. **New Application** → Dockerfile  
   - Base directory / build context: `menu-master` (if the git root is the monorepo parent)  
   - Dockerfile path: `Dockerfile` (relative to that context)
2. **Domain**: `cafe.raafat.site` → enable SSL (Let’s Encrypt)
3. **Postgres**: add a Coolify Postgres resource → link to the app → inject `DATABASE_URL`
4. **Env** (app):
   - `DATABASE_URL` (from Coolify Postgres, or paste your own URL)
   - `NODE_ENV=production`
5. **Port / health**: container listens on `3000` (`HOST=0.0.0.0`). Health check HTTP `/` or `/auth`
6. **DNS**: `cafe.raafat.site` A/CNAME → Coolify host
7. Deploy, then run **DB bootstrap** once (below) before expecting login/admin/billing to work

## DB bootstrap (empty Coolify Postgres)

Do this **once** from a machine that can reach the prod DB (laptop with VPN/tunnel, or Coolify one-off exec with the repo mounted). Prefer **drizzle-kit push** for v1 — no migrate-on-boot in the container yet.

### 1. Push schema

From `menu-master` with prod URL:

```bash
export DATABASE_URL='postgresql://…'   # same value as Coolify env
npx drizzle-kit push
```

Schema source: `src/db/schema.ts`. Config: `drizzle.config.ts`.

Alternative (only if you accept possible drift vs live schema): apply `src/db/migrate-init.sql`, then verify enums/tables match `schema.ts`.

### 2. Seed admin + plans

Minimal rows so `/admin` and billing work. Generate a bcrypt hash (cost 10, same as app):

```bash
node -e "import('bcryptjs').then(async b => console.log(await b.hash('CHANGE_ME', 10)))"
```

Then in `psql "$DATABASE_URL"`:

```sql
INSERT INTO admin_users (email, password_hash, updated_at)
VALUES ('admin@example.com', '<bcrypt-hash-from-above>', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO plans (name, slug, price, price_yearly, features, entitlements, is_active, updated_at)
VALUES
  (
    'Basic',
    'basic',
    '0',
    NULL,
    '[]'::jsonb,
    '{"maxCafes": 1}'::jsonb,
    true,
    now()
  ),
  (
    'Pro',
    'pro',
    '0',
    NULL,
    '[]'::jsonb,
    '{"maxCafes": 3}'::jsonb,
    true,
    now()
  )
ON CONFLICT (slug) DO NOTHING;
```

Change the admin email/password before going live. Cafe owners self-register via `/auth`; no owner seed required for v1.

## Smoke after first deploy

- [ ] `https://cafe.raafat.site/` loads
- [ ] Owner login + `/dashboard`
- [ ] Public menu `/menu/<slug>`
- [ ] Guest place order (menu has items)
- [ ] Staff `/staff/auth`
- [ ] Cookies over HTTPS (`Secure` + `SameSite=Lax` when `NODE_ENV=production`)

## Out of scope (v1)

- CI beyond Coolify git deploy  
- Automated migrate-on-boot  
- CDN / object storage for images  
