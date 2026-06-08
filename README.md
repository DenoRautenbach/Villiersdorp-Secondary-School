# Villiersdorp Secondary School — Website

Production-ready school website built with **Next.js 16**, **Sanity CMS v3**, **Framer Motion**, **GSAP**, and **Lenis smooth scroll**.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local` and fill in your Sanity project details:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
SANITY_API_READ_TOKEN="your_read_token"
SANITY_REVALIDATE_SECRET="your_webhook_secret"
NEXT_PUBLIC_SITE_URL="https://your-domain.co.za"
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
villiersdorp-high/
├── app/
│   ├── (site)/          # Public-facing routes
│   ├── (studio)/        # Sanity Studio at /admin
│   └── api/             # Revalidation + data endpoints
├── components/
│   ├── global/          # Navbar, Footer, Cursor, SmoothScroll
│   ├── home/            # Hero, Stats, About, Marquee, News
│   └── shared/          # AnimatedText, ParallaxImage
├── lib/
│   ├── sanity/          # Client, queries, image builder
│   └── utils.ts
└── sanity/
    └── schemas/         # CMS content models
```

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| CMS | Sanity v3 (embedded Studio at `/admin`) |
| Animations | Framer Motion + GSAP |
| Smooth Scroll | Lenis |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Fonts | `next/font/google` — Playfair Display + Inter |
| Icons | Lucide React |
| Language | TypeScript |

## 🖥️ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage: Preloader, Hero, Stats, About, Marquee, News |
| `/about` | School history, vision, values, timeline |
| `/academics` | Subject catalogue by department |
| `/academics/[slug]` | Dynamic subject page |
| `/news` | News & announcements listing |
| `/news/[slug]` | Full article page |
| `/contact` | Contact form + map |
| `/admin` | Sanity Studio (CMS) |

## 📡 Sanity CMS

Access the embedded Studio at `/admin` once your project ID is configured.

**Content types:**
- `subject` — Academic subjects
- `news` — News & announcements  
- `staff` — Staff members
- `blockContent` — Rich text (Portable Text)
- `page` — General pages

### ISR Webhook Setup

In [Sanity Studio → API → Webhooks](https://sanity.io/manage):

- URL: `https://your-domain.co.za/api/revalidate?secret=YOUR_SECRET`
- Trigger on: create, update, delete

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add all environment variables
4. Deploy
5. Add your Vercel URL to Sanity CORS Origins

## 🎨 Brand Colors

| Name | Hex |
|------|-----|
| Primary (Navy) | `#172b66` |
| Primary Light | `#223f99` |
| Secondary (Red) | `#fd1b3d` |
| Accent (Blush) | `#F8DFE7` |
