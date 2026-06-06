# bradgignac.com

Personal blog at <https://bradgignac.com>. Built with [Astro](https://astro.build), deployed to GitHub Pages via GitHub Actions.

## Running locally

```sh
npm install
npm run dev
```

Open <http://localhost:4321>.

For Google Analytics to render in local builds, create a `.env` file at the project root:

```
PUBLIC_GA4_ID=G-XXXXXXXXXX
```

The same value is set as a repo variable in GitHub Actions for the production build. If unset, the GA snippet is skipped.

## Content

Three Astro content collections live under `src/content/`. Schemas are defined in `src/content.config.ts`.

### Posts (`src/content/posts/<slug>.md`)

```yaml
---
date: 2026-06-06
title: Some Title
tags:
  - Topic
---

Body in markdown.
```

URL: `/posts/<slug>/`. The home page lists the five most recent posts; `/posts/` is the full archive.

### Hikes (`src/content/hikes/<slug>.md`)

```yaml
---
date: 2026-06-06
title: Some Hike
alltrails_url: https://www.alltrails.com/widget/recording/...?u=i&sh=...
distance_miles: 4.22
elevation_gain_feet: 614
duration: 1h 53m 24s
tags:
  - Park Name
gear:
  - Daypack
  - Water bottle
---

Writeup body in markdown.
```

`duration` must be in `Xh Xm Xs` format (validated at build time so the year-to-date rollup on `/hikes/` can parse and sum it).

URL: `/hikes/<slug>/`.

### Books (`src/content/books/<slug>.md`)

```yaml
---
title: Book Title
author: Author Name
start_date: 2026-01-01
end_date: 2026-01-15
link: https://example.com/book
notes: Optional one-liner.
---
```

Set `end_date: ~` for a book currently being read. Rendered grouped by year on `/reading-list/`.

## Project structure

```
src/
  content/         markdown for posts, books, hikes
  content.config.ts   collection schemas
  layouts/         BaseLayout, PostLayout, HikeLayout
  components/      PostList, SectionNav, AllTrailsEmbed, SiteFooter
  pages/           routes (index, posts/, hikes/, reading-list/, rss.xml)
  styles/          SCSS partials (variables, base, layout, post, hikes, reading, print)
public/            static assets (favicon, CNAME, redirect stubs for old Jekyll URLs)
.github/workflows/ ci-cd.yml (PR build + main deploy), dependabot-auto-merge.yml
```

## Deployment

`ci-cd.yml` runs `npm ci && npm run build` on every PR against `main` (required by branch protection) and additionally deploys on push to `main`. Dependabot opens weekly update PRs for npm and GitHub Actions; minor and patch bumps auto-merge once CI passes.
