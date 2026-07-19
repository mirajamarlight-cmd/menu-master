# Musk Menu — Live UI/UX Parity Plan

**Goal:** Match the customer-facing UI/UX of [https://menu.muskplc.com/](https://menu.muskplc.com/) in `menu-master`, while keeping the Phase 1 multi-tenant auth foundation.

**Reference:** Live Vue + Laravel digital menu (`digitalmenu.muskplc.com/api/v1`)  
**Local target:** `src/routes/index.tsx` (+ shared components / i18n as needed)

**Out of scope for this plan:** Cafe admin CRUD, analytics dashboards, staff order workflows (live has these; we only need public menu parity unless later phases require them).

---

## Status legend

| Status | Meaning |
|--------|---------|
| Done | Present and roughly matches live |
| Partial | UI exists but incomplete / non-functional / wrong copy |
| Missing | Not implemented |

---

## 0. Already roughly present (baseline)

Do not rebuild these — polish only if needed for visual match.

| Feature | Local location | Notes |
|---------|----------------|-------|
| VAT & service charge strip | `index.tsx` | Copy OK; needs i18n later |
| Brand logos | `menu-data.ts` / header | Same CDN assets as live |
| Sticky header + nav anchors | `index.tsx` | Payment / Review / Contact |
| Search | `index.tsx` | Missing clear-search + richer empty state |
| Category chips | `index.tsx` | OK |
| Grid / list toggle | `index.tsx` | OK |
| Dark mode toggle | `index.tsx` | Missing `localStorage` persistence |
| Popular Order carousel | `HeroCarousel` | Should be driven by `is_featured` later |
| Item cards + detail modal | `ItemCard` / `ItemModal` | Missing sizes / availability / localized copy |
| Payment account cards + copy | `BankCard` | Missing QR + account types + dynamic data |
| Review form shell | `ReviewSection` | Not persisted; missing email + thank-you polish |
| Complaint / EN buttons | Header | Present as dead controls |

---

## 1. First load & shell

**Priority: P0**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| S1 | Branded loading screen | Missing | “Preparing Your Menu”, “Fresh ingredients loading…”, bounce dots, quote | Shown until menu data ready |
| S2 | Connection / load error | Missing | Error message + **Retry Connection** | Failed fetch shows retry UI |
| S3 | Empty search state | Partial | Clearer title/desc + **Clear search** | Clear button resets query |
| S4 | Favicon | Missing | `/icon.svg` | Correct Musk icon in tab |
| S5 | Ethiopic font | Missing | `Noto Sans Ethiopic` loaded | Amharic renders correctly |
| S6 | Theme persistence | Partial | `localStorage.theme`, light default (no system preference) | Reload keeps light/dark choice |

---

## 2. Language & i18n

**Priority: P0**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| L1 | Language switcher | Partial | EN / አማ / ع with flags | Switching updates all chrome copy |
| L2 | Locales: `en`, `am`, `ar` | Missing | Full translation dictionaries | Navbar, menu chrome, payment, review, complaint, footer |
| L3 | Multilingual menu fields | Missing | `name_*`, `description_*` per locale | Items/categories show locale-aware names |
| L4 | Arabic RTL | Missing | Dialogs/`dir` flip for `ar` | Complaint + key panels RTL when Arabic |
| L5 | Persist locale | Missing | Remember last language | Reload restores locale |

**Copy keys to mirror (minimum):**  
`common.*`, `navbar.*`, `menu.*`, `menu_page.*`, `footer.*`, `featured.*`, `payment.*`, `review.*`, `complaint.*`

---

## 3. Menu browsing & item detail

**Priority: P1** (P0 if replacing static data soon)

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| M1 | API / DB-backed menu | Missing | Live API; local is hard-coded `menu-data.ts` | Menu updates without code deploy |
| M2 | Availability / out of stock | Missing | “Not available” state | Unavailable items marked / blocked |
| M3 | Size options | Missing | Size picker + “from” pricing | Modal shows sizes when present |
| M4 | Featured items | Partial | `is_featured` feeds carousel | Carousel uses featured flag, not hand list |
| M5 | Localized descriptions | Missing | Description per locale | Modal shows correct description |
| M6 | Sticky category nav polish | Partial | Live sticky category bar | Match scroll/sticky feel on mobile |
| M7 | Brand title | Partial | “Musk Cafe and Restaurant” | Page title + header alt text match |

---

## 4. Complaint flow

**Priority: P0**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| C1 | Complaint dialog | Missing | Modal form | Opens from header button |
| C2 | Form fields | Missing | Full name*, subject*, message* (max 500); email/phone optional | Validation + char count |
| C3 | Submit to backend | Missing | `POST /submit-complaint` | Success / error / 422 field errors |
| C4 | Success state | Missing | “Complaint Submitted!” + close | User sees confirmation |

---

## 5. Reviews

**Priority: P0**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| R1 | Persist reviews | Missing | Saved + admin-managed | Submit writes to backend |
| R2 | Email field | Missing | Optional email | Present in form |
| R3 | Rating labels | Missing | Poor → Excellent | Accessible labels on stars |
| R4 | Submitting state | Missing | “Submitting…” | Button disabled while posting |
| R5 | Thank-you polish | Partial | “Thank you so much!” + message + **Submit another** | Matches live copy |
| R6 | Urgency options | Partial | Just sharing / Needs attention / Urgent | Same three levels (already local) |

---

## 6. Payments

**Priority: P1**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| P1 | Dynamic bank accounts | Partial | From backend | Not hard-coded only |
| P2 | Account types | Missing | Savings / Current / Mobile wallet | Type label under each account |
| P3 | Show QR Code | Missing | Expandable QR image per account | Toggle reveals QR |
| P4 | Copy feedback | Partial | “Copied!” | Match live copy via i18n |
| P5 | Section anchor | Partial | `#bank-accounts-section` | Nav “Payment Options” scrolls correctly |

---

## 7. Footer & contact

**Priority: P0**

| ID | Feature | Status | Live behavior | Acceptance |
|----|---------|--------|---------------|------------|
| F1 | Tagline | Missing | “Crafting moments of joy…” | Shown in footer |
| F2 | Full address | Missing | Sarbet, next to Canadian Embassy, Addis Ababa | Exact address + maps link if available |
| F3 | Opening hours | Missing | Mon–Fri / Sat / Sun `7:00 AM – 12:00 AM` | Hours list rendered |
| F4 | Email | Missing | `muskaddis@gmail.com` | Mailto link |
| F5 | Phone | Partial | Live uses real phone | Confirm + match live number |
| F6 | Social links | Missing | Instagram + TikTok (`@muskplc`) | External links with icons |
| F7 | Staff login link | Missing | Footer → staff auth | Link to `/auth` or staff route |
| F8 | Dev credit | Partial | “Contact Developer” + “Want this for your business?” | Point to correct developer URL for this rebuild |
| F9 | Agency credit | Missing | (Project rule, not live) | Subtle `BuiltByRaafat` in public footer |

---

## 8. Branding & chrome mismatches

**Priority: P1**

| ID | Feature | Status | Action |
|----|---------|--------|--------|
| B1 | Page title | Partial | Use “Musk Cafe and Restaurant” |
| B2 | Developer CTA URL | Partial | Decide: Moti (live) vs RAAFAT-DIGITAL (this rebuild) |
| B3 | Section IDs | Partial | Align anchors: `#review-section`, `#bank-accounts-section`, `#footer` |
| B4 | Motion | Partial | Loading fade/bounce; keep intentional, not noisy |

---

## Implementation phases

### Phase A — Shell & chrome (P0)
1. Loading screen (S1)  
2. Theme persistence (S6)  
3. Favicon + Ethiopic font (S4, S5)  
4. Footer completeness (F1–F9)  
5. Brand title / anchors (B1, B3)  
6. Clear search + empty state (S3)

### Phase B — Interactions (P0)
1. i18n EN/AM/AR + switcher + RTL (L1–L5)  
2. Working Complaint dialog + API (C1–C4)  
3. Working Review submit + polish (R1–R6)  
4. Load/error/retry for menu fetch (S2)

### Phase C — Menu data parity (P1)
1. Replace static menu with API/DB (M1)  
2. Availability, sizes, featured, descriptions (M2–M5)  
3. Payment QR + types + dynamic accounts (P1–P5)

### Phase D — Visual polish (P1)
1. Sticky category behavior (M6)  
2. Motion / loading animations (B4)  
3. Final side-by-side pass vs live on mobile + desktop

---

## Suggested file / component map

| Concern | Suggested home |
|---------|----------------|
| Public menu page | `src/routes/index.tsx` (thin) |
| Loading shell | `src/components/menu/menu-loading.tsx` |
| Complaint dialog | `src/components/menu/complaint-dialog.tsx` |
| Review section | `src/components/menu/review-section.tsx` |
| Payment section | `src/components/menu/payment-accounts.tsx` |
| Footer | `src/components/menu/menu-footer.tsx` |
| i18n messages | `src/i18n/{en,am,ar}.ts` + provider |
| Menu data client | `src/lib/menu-api.ts` (later) |
| Agency credit | `src/components/brand/built-by-raafat.tsx` |

Keep Phase 1 auth routes (`/auth`, `/dashboard`, `/admin`) untouched by this plan except linking **Staff Login** from the footer.

---

## Backend / data notes

Live public endpoints (reference only):

- Menu API base: `https://digitalmenu.muskplc.com/api/v1`
- Complaint: `POST /submit-complaint`
- Reviews: persisted server-side (admin: manage-reviews)

For this project, prefer **Supabase tables + RLS** (aligned with Phase 1 tenancy) over calling the live Laravel API long-term.

Minimum tables for parity (later phase, not Phase 1):

- `menu_categories`, `menu_items` (+ sizes / availability / featured / locale fields)
- `bank_accounts` (+ type, QR URL)
- `reviews`
- `complaints`

Until those exist: can ship Phase A/B with static menu + real complaint/review writes once tables exist, or temporary server functions.

---

## Explicit non-goals (this plan)

- Cafe-admin pages (`manage-menu`, `manage-category`, `manage-reviews`, analytics)
- Cart / order placement (i18n keys exist on live template; confirm Musk public menu actually uses them before building)
- Replacing Phase 1 auth / tenancy work
- Pixel-perfect Vue port — match **structure, flows, and copy**, not framework

---

## Definition of done

Public `/` feels like the live Musk menu to a diner:

1. Loads with branded splash, then menu  
2. EN / Amharic / Arabic work  
3. Search, categories, grid/list, dark mode work  
4. Complaint submits successfully  
5. Review submits successfully  
6. Payment accounts copy + show QR  
7. Footer has address, hours, socials, staff login, credits  
8. Unavailable / sized / featured items behave correctly once data-backed  

---

## Tracking checklist

### Phase A
- [x] S1 Loading screen  
- [x] S3 Clear search / empty state  
- [x] S4 Favicon  
- [x] S5 Ethiopic font  
- [x] S6 Theme persistence  
- [x] F1–F9 Footer + credits  
- [x] B1 / B3 Brand title + anchors  

### Phase B
- [x] L1–L5 i18n + RTL  
- [x] C1–C4 Complaint  
- [x] R1–R6 Reviews  
- [x] S2 Load error + retry  

### Phase C
- [x] M1–M5 Menu data parity  
- [x] P1–P5 Payments parity  

### Phase D
- [x] M6 Sticky nav polish  
- [x] B4 Motion pass  
- [x] Side-by-side QA vs live (mobile + desktop)
