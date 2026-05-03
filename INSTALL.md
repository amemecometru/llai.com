# LogicLemon — React/Vite Landing Upgrade

This drops cleanly into your existing `~/logiclemonai/landing/` Vite project. It replaces the previous `App.tsx` with a routed, motion-rich, art-directed landing page that satisfies the Stripe ToS brief AND ships a `/docs` section.

## What this gives you

- **`/`** — full-bleed hero, editorial workflow library (no card grid), pricing rows, FAQ, final CTA
- **`/docs`** — Anthropic-style docs hub with TOC sidebar, getting started, workflow reference, custom workflow compiler example, security, changelog
- **`/terms`, `/privacy`, `/refund`, `/contact`, `/security`** — all Stripe-ToS-required pages
- **Theme toggle** — sun/moon, system preference detection, persisted in localStorage
- **Fonts** — Poppins (display) + Lora (body), per Anthropic brand-guidelines, via Google Fonts
- **Motion** — Framer Motion for the three intentional motions: hero entrance / parallax depth / row hover reveals

## How to install (5 minutes)

### 1. Add the new dependencies

From `~/logiclemonai/landing/`:

```bash
# npm
npm install react-router-dom framer-motion
# or bun
bun add react-router-dom framer-motion
```

You can keep `react-hook-form` if it was already installed — we don't use it but it's harmless.

### 2. Drop in the new src/

Replace your existing `src/` directory with the one in this bundle. From inside the extracted bundle:

```bash
# back up your current src in case you want pieces later
mv ~/logiclemonai/landing/src ~/logiclemonai/landing/src.backup
cp -r src ~/logiclemonai/landing/
```

### 3. Replace these config files

```bash
cp index.html ~/logiclemonai/landing/index.html
cp tailwind.config.cjs ~/logiclemonai/landing/tailwind.config.cjs
```

### 4. Run it locally

```bash
cd ~/logiclemonai/landing
npm run dev   # or bun dev
```

Visit `http://localhost:5173` — you should see the new landing page. Click around to verify `/docs`, `/terms`, etc. all work.

### 5. Build and verify

```bash
npm run build
npm run preview   # serves the production build locally
```

If the preview looks right, push to GitHub and Cloudflare Pages will auto-build (set build command to `npm run build` and output dir to `dist`).

## Cloudflare Pages settings (when you set up the project)

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variable (if needed):** none for v1

For SPA routing to work on Cloudflare Pages, add a `_redirects` file in `public/`:

```
/*  /index.html  200
```

(This is included as `public/_redirects` in the bundle.)

## Files in this bundle

```
logiclemonai-react-upgrade/
├── INSTALL.md                       (this file)
├── index.html                       (replaces yours — adds Poppins + Lora + FOUC script)
├── tailwind.config.cjs              (replaces yours — brand tokens)
├── public/_redirects                (SPA fallback for Cloudflare Pages)
└── src/
    ├── App.tsx                      (router root)
    ├── main.tsx                     (entry — wraps in BrowserRouter)
    ├── index.css                    (Tailwind base + custom utilities)
    ├── data/content.ts              (single source of truth: workflows, tiers, FAQs)
    ├── components/
    │   ├── Layout.tsx               (Nav + Footer + Outlet)
    │   ├── LegalLayout.tsx          (shared layout for legal pages)
    │   └── ThemeToggle.tsx
    └── routes/
        ├── Landing.tsx              (the centerpiece — hero, workflows, pricing, FAQ, CTA)
        ├── Docs.tsx                 (docs hub with TOC)
        ├── Terms.tsx
        ├── Privacy.tsx
        ├── Refund.tsx
        ├── Contact.tsx
        └── Security.tsx
```

## Things you'll want to swap before going live

1. **`src/data/content.ts` → `HERO_IMAGE`** — currently uses an Unsplash workspace photo. Replace with your own asset (drop in `src/assets/` and import) or your existing `albert-lemon.webp`.
2. **`src/routes/Contact.tsx`** — replace `[Add your business mailing address before going live]` with your real address.
3. **`src/data/content.ts` → all `mailto:` CTAs** — currently route to `hello@logiclemonai.com`. Once Stripe is live you can swap to a Stripe Checkout URL per tier.

## Frontend skill compliance — checklist

- [x] No cards in hero
- [x] No card grid for workflows (editorial list with rule lines instead)
- [x] No card grid for pricing (tabular rows)
- [x] Brand louder than headline
- [x] Full-bleed hero, edge-to-edge image
- [x] Two typefaces (Poppins display + Lora body)
- [x] One accent color (lemon `#F5C518`)
- [x] 3 intentional motions (hero entrance / scroll-linked depth / hover reveal)
- [x] Real photographic anchor in hero
- [x] Headline scannable in one glance
- [x] Litmus: brand still readable if nav hidden? Yes
- [x] Litmus: would design feel premium without shadows? Yes — there are barely any shadows

## Issues / questions

If anything looks off, tell me what page + what you see and I'll patch it.
