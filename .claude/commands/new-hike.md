---
description: Scaffold a new hike entry in a fresh worktree
---

Walk Brad through starting a new hike entry. Steps:

1. **Gather metadata** (AskUserQuestion or sequential prompts):
   - Hike title (required)
   - Date in YYYY-MM-DD (default today)
   - AllTrails widget URL — should match `https://www.alltrails.com/widget/recording/...` (required)
   - Distance in miles (number, optional)
   - Elevation gain in feet (integer, optional)
   - Duration in **strict `Xh Xm Xs` format** like `1h 53m 24s` (optional — validate format if provided; the schema regex will reject anything else)
   - Tags (comma-separated, optional)
   - Gear (comma-separated, optional)
2. **Slug** the title: lowercase, alphanumerics and hyphens only.
3. **Abort** if `src/content/hikes/<slug>.md` already exists in the main checkout.
4. **Create the worktree** per the global git conventions:
   - `git -C /Users/brad.gignac/work/bradgignac/bradgignac.github.io worktree add /Users/brad.gignac/work/bradgignac/<slug> -b bradgignac/<slug> main`
   - Symlink `.claude/settings.local.json` from the main checkout.
5. **Write the hike file** at `<worktree>/src/content/hikes/<slug>.md`. Include only the frontmatter keys Brad actually provided, plus the always-required ones (`date`, `title`, `alltrails_url`). Body: `*Writeup coming soon — gear, conditions, and notes from the trail.*`
6. **Install deps and start the dev server** in the new worktree so Brad can see HMR previews while he writes:
   - `npm install --prefix <worktree>` (run in background, wait for it to finish)
   - `npm run dev --prefix <worktree> -- --host 127.0.0.1 --port 4321` (run in background)
   - Wait until the server responds at <http://localhost:4321/>, then share the URL.
7. **Report** the absolute path and the dev URL. Tell Brad to write the writeup body when ready and to ask you to commit / push / PR.

### Before committing
When Brad asks you to commit / push / PR, run `npx cspell --no-progress` first. If it fails:
- If the flagged word is a real typo, fix it in the writeup.
- If it's a legitimate proper noun (gear brand, trail name, place name), add it to `.cspell.json`.
Only commit once cspell is clean.
