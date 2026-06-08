---
description: Scaffold a new reading list entry in a fresh worktree
---

Walk Brad through adding a new book to the reading list. Steps:

1. **Gather metadata** (AskUserQuestion or sequential prompts):
   - Title (required)
   - Author (required)
   - Start date in YYYY-MM-DD (default today)
   - End date in YYYY-MM-DD, OR "currently reading" to leave it null
   - Goodreads URL (required) — the book layout links specifically to Goodreads
   - Notes (optional one-liner) — rendered as the post body
2. **Slug** the title: lowercase with **underscores instead of spaces/hyphens** — this matches the existing snake_case convention in `src/content/books/` (e.g., `the_color_of_magic.md`, `the_horse_and_his_boy.md`). Drop punctuation entirely.
3. **Abort** if `src/content/books/<slug>.md` already exists in the main checkout.
4. **Create the worktree** per the global git conventions:
   - `git -C /Users/brad.gignac/work/bradgignac/bradgignac.github.io worktree add /Users/brad.gignac/work/bradgignac/<slug> -b bradgignac/<slug> main`
   - Symlink `.claude/settings.local.json` from the main checkout.
5. **Write the book file** at `<worktree>/src/content/books/<slug>.md`:
   ```yaml
   ---
   title: <title>
   author: <author>
   start_date: <YYYY-MM-DD>
   end_date: <YYYY-MM-DD or ~ for currently reading>
   goodreads_url: <url>
   ---

   <notes line>   # omit entirely if not provided
   ```
6. **Install deps and start the dev server** in the new worktree so Brad can preview the reading list with HMR:
   - `npm install --prefix <worktree>` (run in background, wait for it to finish)
   - `npm run dev --prefix <worktree> -- --host 127.0.0.1 --port 4321` (run in background)
   - Wait until the server responds at <http://localhost:4321/reading-list/>, then share the URL.
7. **Report** the absolute path and the dev URL. Ask Brad to commit / push / PR when satisfied.

### Before committing
When Brad asks you to commit / push / PR, run `npx cspell --no-progress` first. If it fails:
- If the flagged word is a real typo, fix it.
- If it's a legitimate proper noun (book title, author, etc.), add it to `.cspell.json`.
Only commit once cspell is clean.
