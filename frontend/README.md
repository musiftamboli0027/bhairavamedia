# Bhairava Media

A premium creative agency website built with React, TypeScript, GSAP, and Tailwind CSS.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool & dev server
- **GSAP** — Scroll-driven animations
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icon library

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── components/ui/  — Reusable UI components
├── sections/       — Page sections (Hero, Navigation, Footer, etc.)
├── App.tsx         — Root component
├── main.tsx        — Entry point
└── index.css       — Global styles & design tokens
```

## Deployment

The `dist/` folder contains the production build. Deploy to any static hosting:

- **Vercel** — `vercel --prod`
- **Netlify** — drag & drop `dist/` folder
- **Nginx** — serve `dist/` as static files
- **Docker** — use a multi-stage build with nginx

### Static File Server (Nginx example)

```nginx
server {
    listen 80;
    server_name bhairavamedia.com;
    root /var/www/bhairava/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```
