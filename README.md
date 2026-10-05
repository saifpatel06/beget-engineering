# Beget Engineering: Frontend

Next.js (Pages Router) + React + Bootstrap grid + CSS Modules. No TypeScript, no Tailwind, no UI library.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
pages/                  index, about, projects, contact, request-quote, services/[slug]
src/components/         all reusable components (each with its .module.css)
src/lib/api.js          the ONLY place that reads data or submits forms
data/                   services.js, projects.js, site.js (static content for now)
styles/global.css       the one global stylesheet (design tokens, buttons, layout helpers)
public/images, videos   media
```

Extra components beyond the required list (all inside `src/components/`):
`Layout`, `Seo`, `SectionHeading`, `PageHero`, `TrustStats`, `ProjectCard`, `ProjectsFilter`,
`InfoPanels`, `ServiceOverview`, `EnquiryForm`, `Lightbox`, `Icons`.

## Adding your photos and videos

The site's code and layout are complete; the actual photo/video **files** have
been removed so you can drop your own in. Every path the site expects is
already wired up in `data/images.js` (with the right alt text for each one) —
you just need to add files with matching names.

**Every folder under `public/images/services/` and `public/videos/services/`
has its own `README.txt` listing exactly which filenames that folder expects**
(e.g. `public/images/services/industrial-sheds/README.txt` lists `1.jpg`
through `14.jpg`, each with a one-line description of what that photo should
show). Open the folder for a service, read its `README.txt`, and drop your
images in with those exact names — nothing else to configure. Delete each
`README.txt` once its folder is filled in (purely optional housekeeping).

- **Photos:** `public/images/services/<slug>/1.jpg`, `2.jpg`, … as listed in
  that folder's `README.txt`. The first file (`1.jpg`) becomes that service's
  main/hero photo, shown on its card and at the top of its service page.
- **Videos:** `public/videos/services/<slug>/1.mp4` … `5.mp4` (up to 5 per
  service). Add as many as you have — any missing ones simply show a clear
  "not available yet" message instead of breaking.
- **Home hero video** (optional, no photo equivalent needed): add
  `public/videos/hero.mp4` and pass `videoSrc="/videos/hero.mp4"` to
  `<HeroSection />` in `pages/index.js`.

**Automation has no dedicated photo folder of its own yet** — it currently
reuses the Control Panels photos as a stand-in (see
`public/images/services/automation/README.txt` for exactly how to give it its
own photos instead).

**Page banners** (the large image behind "Home", "About", "Projects",
"Contact" and "Request a Quote") aren't separate files — they automatically
reuse specific service photos, so they'll fill in on their own once you add
service photos. See the `banners` export at the bottom of `data/images.js` if
you'd like any banner to use a different photo instead.

**Image tips:** JPG, landscape orientation, roughly 1200–1800px wide works
best. Large files are fine — Next.js compresses and resizes them automatically
for each screen size.

## Logo

The logo is `public/images/logo.png` (the mark you supplied, background made
transparent). It's used in the header, footer and as the favicon/apple-touch-icon.
To update it, replace that file (and `public/images/logo-256.png` / `public/favicon.png`,
regenerated at the same aspect ratio) — no component code needs to change.

## Contact details

Company address, phone, email and the Google Maps embed all live in `data/site.js`
(`contact` object) and are used everywhere: header/footer, the contact page, and the
JSON-LD structured data (see SEO below). Update them there once and they update
site-wide.

## SEO

- `pages/_document.js` sets `<html lang="en">`.
- `src/components/Seo.js` renders a unique `<title>`/description per page, canonical
  URL (once `NEXT_PUBLIC_SITE_URL` is set), Open Graph + Twitter card tags, and
  JSON-LD `GeneralContractor` structured data built from `data/site.js` (name,
  address, phone) — this is what lets Google show your business details directly in
  search results.
- `public/robots.txt` and `pages/sitemap.xml.js` (a dynamic sitemap listing every
  page and every service URL). Both reference `NEXT_PUBLIC_SITE_URL` — set it in
  your production `.env` (see `.env.example`) before launch, and update the
  hard-coded fallback domain in `public/robots.txt` / `sitemap.xml.js` if different.
- Every service page already has a unique, keyworded title/description, a single
  `<h1>`, and an SEO-friendly URL (`/services/<slug>`).

## Connecting the CodeIgniter API + MySQL CMS later

1. Open `src/lib/api.js`. Each function has the `fetch()` call commented in place
   (`getServices`, `getServiceBySlug`, `getProjects`, `submitEnquiry`).
2. Have the API return the same shape as `data/services.js`
   (`id, name, slug, shortDescription, description, capabilities[], heroImage, images[], videos[{title,src,poster}], enabled, order`).
3. Set `API_BASE_URL` (see `.env.example`) and add the CMS/media host to `images.remotePatterns` in `next.config.js`.

Components and pages do not change. They only receive props. Pages use ISR
(`revalidate: 60`, `fallback: "blocking"`), so a service added or edited in the CMS appears within a minute
without a rebuild. This needs `next start` (Node hosting), not `next export`.

## Things to add/replace before launch

- All service photos and videos (see "Adding your photos and videos" above —
  every folder is empty with a `README.txt` guide)
- Automation project photos specifically (currently borrowed from Control Panels)
- Social media links: `data/site.js` (`social` array, currently `#`)
- Vision / mission, quality & safety wording, and "industries we serve": `data/site.js`
  (drafted from the company brief. Please confirm with the client)
- Service copy and capabilities in `data/services.js` (professional drafts, edit freely)
- Project titles/descriptions in `data/projects.js` (placeholders)
- Company email in `data/site.js` (currently `info@begetengineering.com`, a guess)
- Set `NEXT_PUBLIC_SITE_URL` for canonical/OG URLs, and update `public/robots.txt` and
  the fallback domain in `pages/sitemap.xml.js` to match

