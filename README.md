# Alpro Create — Bowl Configurator

A simple, single-page marketing site built for an Alpro university marketing project.
Visitors design their ideal Alpro bowl by choosing a base, protein level, topping, and flavor,
then see a custom product mockup and three Barcelona stores where they could (hypothetically) find it.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Supabase** for storing every bowl configuration (lightweight analytics)
- **Deployed on Vercel** via GitHub

## Design

- Palette: cream, sand, matcha, sage, sky-blue, navy. Beige + green + soft blue.
- Typography: Fraunces (display serif) + DM Sans (body) + JetBrains Mono (micro labels).
- All product mockups are rendered as dynamic SVG — no images to manage, all 120 possible
  combinations (4 bases × 2 protein levels × 3 toppings × 5 flavors) work out of the box.
- The signature edible Alpro wooden spoon is always included next to the pot.

## Local development

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase URL and anon key in .env.local
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repo to GitHub.
2. On Vercel, **Add New → Project → Import** your repo.
3. Add the two environment variables in **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. That's it — Vercel detects Next.js automatically.

## Set up Supabase

1. In your Supabase project, go to **SQL Editor → New query**.
2. Paste the contents of `supabase.sql` and run.
3. Grab your URL and anon key from **Settings → API** and paste them into Vercel's env vars.

The app will still run if Supabase isn't configured — saves will be silently skipped
(check the browser console for a warning).

## Project structure

```
app/
  layout.tsx       — root layout, fonts, metadata
  page.tsx         — the whole configurator (single-page state machine)
  globals.css      — palette vars, fonts, grain overlay, animations
components/
  ProductMockup.tsx       — the dynamic Alpro pot SVG (the centerpiece)
  AlproLogo.tsx           — reusable logo
  OptionIllustrations.tsx — per-option SVG illustrations for the choice cards
lib/
  catalog.ts       — bases, proteins, toppings, flavors, Barcelona shops
  supabase.ts      — client + saveConfiguration helper
supabase.sql       — schema to run in Supabase SQL editor
```

## Pitching it to your professors

A few angles that work well with this build:

- **Customer insight → product**: the bowl configurator directly addresses the market-research
  finding (customers want a ready-made acai-bowl-style product with flavor variety and an
  optional protein boost).
- **Design system over asset library**: rather than shooting 120 product photos, the entire
  range is rendered live in SVG. This is how real DTC brands prototype packaging.
- **Live analytics**: every bowl created is logged to Supabase. You can show the professors
  the most-picked flavor combinations from your demo right inside the Supabase dashboard
  (use the `popular_flavors` view).
- **Local relevance**: Barcelona retail partners reinforce that this is a real, on-shelf
  product, not just a digital concept.
