# nobuddyorg.github.io

![nobuddy logo large](web-buddy/public/nobuddy_logo.webp)

This repository contains the static pages of nobuddyorg, served at
[nobuddy.org](https://nobuddy.org). The site is a Next.js app in
[`web-buddy/`](web-buddy/), statically exported and deployed to GitHub Pages.

## Development

Prerequisites: Node 22 (see `web-buddy/.nvmrc`).

```bash
cd web-buddy
npm ci
npm run dev       # starts the dev server at http://localhost:3000
```

Other useful commands (run from `web-buddy/`):

```bash
npm run lint       # ESLint
npm run build      # static export to web-buddy/out
npm run test:e2e   # Playwright e2e tests (requires a prior build; see below)
```

The Playwright suite runs against the static export, so build first:

```bash
npm run build
npx playwright test
```

From the repo root, `./build.sh` does a full local sanity check: a clean
`npm ci` + `npm run build` of `web-buddy/`, producing `web-buddy/out/`.

## Deployment

Pushes to `main` automatically build and deploy the site to
[nobuddy.org](https://nobuddy.org) via `.github/workflows/pages-deploy.yml`.

## Tools & Libraries Overview

To give a quick overview of the tools and libraries used in this repository, a montage with the corresponding logos was created.

![Tools & Libraries Overview](logo_tools_libs_small.png)
