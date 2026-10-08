# Harsh Vardhan Singh — Premium Portfolio

A production-ready React + Vite portfolio with Tailwind CSS, Three.js / React Three Fiber, Framer Motion, Lenis smooth scrolling, responsive UI, analytics proof gallery, lazy-loaded testimonial videos, accessible interactions, and a configurable contact form.

## 1. Requirements

- Node.js 18+ (Node 20+ recommended)
- npm 9+

## 2. Install & run

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## 3. Production build

```bash
npm run build
npm run preview
```

## 4. Customize everything in one place

Edit:

`src/data/siteData.js`

Update name, role, bio, phone, WhatsApp, email, Instagram/LinkedIn URLs, Formspree endpoint, stats, services, skills, projects and testimonials.

## 5. Contact form

The site works immediately with a `mailto:` fallback using the configured email. For server-side submissions, create a Formspree form and set:

```js
formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID'
```

No API key is needed in the frontend.

## 6. Assets

Optimized assets are already placed under:

- `public/assets/images/` — WebP proof screenshots, profile image and video posters
- `public/assets/videos/` — compressed MP4 testimonial videos

Original uploaded MOV files are intentionally not included in the project to keep the deployment package smaller.

## 7. SEO / deployment

`index.html` contains title, description, Open Graph tags and theme metadata. Add a custom OG image and domain when the site is deployed.

### Vercel

Import the repo/project and use:
- Build command: `npm run build`
- Output directory: `dist`

### Netlify

Use:
- Build command: `npm run build`
- Publish directory: `dist`

For a custom domain, update canonical metadata / sitemap when the final domain is known.

## 8. Accessibility & performance

- Semantic sections and labelled controls
- Keyboard-friendly navigation and lightbox controls
- Reduced-motion CSS support
- Lazy-loaded images and video posters
- Video files compressed to web-friendly MP4
- 3D scene is code-split/lazy-loaded and uses a low-poly object
- Mobile cursor effects are disabled

## 9. Replace placeholder copy

The work cards and text testimonials are intentionally conservative placeholders where client/project names were not supplied. Replace them with approved case-study details in `src/data/siteData.js`.
