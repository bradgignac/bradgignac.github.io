# Repo-specific Claude instructions

Personal blog (bradgignac.com), Astro 6 → GitHub Pages via `.github/workflows/ci-cd.yml`. Branch protection on `main` requires the `build` check.

## Content collections

Schemas in `src/content.config.ts`. Three collections: `posts`, `books`, `hikes`.

**Hike specifics:**
- `duration` is a string validated against `^\d+h \d+m \d+s$` — required format because the `/hikes/` rollup parses and sums durations for the current year.
- `gear` is an optional string array; rendered inside the `.bg-hike-info` panel.
- `gpx` is in the schema but reserved for future GPX-based rendering — not yet used.

AllTrails embed URLs follow the pattern `https://www.alltrails.com/widget/recording/<slug>?u=i&sh=...`. Keep the query string intact.

## Class naming — important

All classes are prefixed `bg-`. **The post page and the post list use deliberately different class names** because they previously collided and caused changes to one to leak into the other:

- `.bg-post-*` — single post page (`.bg-post-header`, `.bg-post-title`, `.bg-post-date`, `.bg-post-tags`, `.bg-post-nav`).
- `.bg-post-list-*` — home + archive post list rows (`.bg-post-list-item`, `.bg-post-list-title`, `.bg-post-list-date`, `.bg-post-list-tags`).

Don't merge these back.

Hike-specific styles live in `src/styles/_hikes.scss`, not `_post.scss`.

## Style conventions

- Rust accent: `$link-color: #ca3a00`. Use plain rust — Brad has rejected washed-out (`color-mix(... white N%)`) variants on the stats top stripe and blockquote border.
- Body font: Helvetica Neue (`$sans-family`). Deliberate — don't switch to a system-font stack.
- Heading font: Newsreader Variable (`$serif-family`) via `@fontsource-variable/newsreader`.
- Margins: `em` on heading margins (proportional to font-size); `rem` everywhere else. Conversions are literal unit swaps — don't recompute "equivalent" pixel values.
- Sticky footer is implemented via `display: flex` on `body` plus `flex: 1 0 auto` on `.bg-content`.
- `.bg-layout-outer` and `.bg-layout-inner` use `display: flow-root` to contain margin collapse (replaces the old Bourbon clearfix).

## Build + deploy

- Node 22 pinned in `ci-cd.yml` (Astro 6 requires `>=22.12`). Don't drop the version pin.
- `PUBLIC_GA4_ID` is a GitHub Actions repo *variable* (not secret) and a local `.env` file (gitignored).
- Auto-merge: Dependabot minor/patch bumps auto-merge via `.github/workflows/dependabot-auto-merge.yml`; majors require manual review.

## Gotchas

- The `github-pages` deployment environment has its own deployment-branch policy that does **not** auto-update when the repo's default branch is renamed. If `main` is ever renamed, also update the policy via:
  ```
  gh api -X POST /repos/OWNER/REPO/environments/github-pages/deployment-branch-policies --input -
  ```
- Old Jekyll permalinks (`/YYYY/MM/DD/slug.html`) are redirected via hand-written meta-refresh stubs in `public/2014/` and `public/2015/`. Astro's built-in redirects don't work here because they emit `<path>/index.html` instead of a literal `.html` file.

## Saved-for-later

Open enhancements tracked in auto-memory:
- Book covers in the reading list ([[project-visual-refresh-ideas]] #7).
