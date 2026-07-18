# nobuddy.org

[![Deploy Pages](https://github.com/nobuddyorg/nobuddyorg.github.io/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/nobuddyorg/nobuddyorg.github.io/actions/workflows/pages-deploy.yml)
[![CI](https://github.com/nobuddyorg/nobuddyorg.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/nobuddyorg/nobuddyorg.github.io/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![nobuddy logo](web-buddy/public/nobuddy_logo.webp)

**Creative tools for nerds.** This repo is the portal site for
[nobuddy.org](https://nobuddy.org) — the front door to a growing collection
of small, self-contained "Buddy" apps, each living in its own repo under the
[nobuddyorg](https://github.com/nobuddyorg) org. No corporate roadmap, no
investors: just tools built out of curiosity, shipped when they're fun, and
fully open source.

The site itself is a Next.js app in [`web-buddy/`](web-buddy/), statically
exported and deployed to GitHub Pages.

## The Buddies

| Tool | What it does | Stack |
| --- | --- | --- |
| [Procrastination Buddy](https://github.com/nobuddyorg/ProcrastinationBuddy) | Delightfully useless tasks to help you avoid productivity | Streamlit, Ollama AI, Docker |
| [Thrash Buddy](https://github.com/nobuddyorg/ThrashBuddy) | Load-test APIs at scale | k6, Grafana, Prometheus, AWS EKS |
| [Game Gallery Buddy](https://github.com/nobuddyorg/GameGalleryBuddy) | Generates a wallpaper from a BoardGameGeek collection | Groovy, Spring Boot |
| [Collection Buddy](https://github.com/nobuddyorg/CollectionBuddy) | Catalog and track stamps, coins, or any collectibles | Next.js, Supabase, Tailwind |
| [Ride Merge Buddy](https://github.com/nobuddyorg/RideMergeBuddy) | Merges GPX tracks from multiple cycling sessions | Angular |
| Fair Buddy *(coming soon)* | Split costs fairly within a group | Java, DynamoDB |
| Power Trail Buddy *(coming soon)* | Find and visualize geocaching power trails | Next.js |
| Karma Buddy *(coming soon)* | Track karma points, compete with friends | Java, Hugging Face |
| Peek Buddy *(coming soon)* | Watches folders and logs filesystem changes | Electron |
| Bike Buddy *(coming soon)* | GPX heatmaps and ride memories | Azure Functions, Cosmos DB |

Full descriptions and live links: [nobuddy.org/tools](https://nobuddy.org/tools).

![Tools & Libraries Overview](logo_tools_libs_small.png)

## Development

Prerequisites: Node 22 (see `web-buddy/.nvmrc`).

```bash
cd web-buddy
npm ci
npm run dev       # dev server at http://localhost:3000
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

## Contributing

Every Buddy is a normal open-source repo: fork it, run it locally, send a
PR. This portal repo follows the same rules — see the workflows in
[`.github/workflows/`](.github/workflows/) for what CI checks on every push.
