---
description: Scaffold a new reading list entry in a fresh worktree
---

Walk Brad through adding a new book to the reading list. Steps:

1. **Gather metadata** (AskUserQuestion or sequential prompts):
   - Title (required)
   - Author (required)
   - Start date in YYYY-MM-DD (default today)
   - End date in YYYY-MM-DD, OR "currently reading" to leave it null
   - Link — Amazon, publisher, library URL, etc. (required)
   - Notes (optional one-liner)
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
   link: <url>
   notes: <notes line>   # omit entirely if not provided
   ---
   ```
   Body empty.
6. **Report** the absolute path. Ask Brad to commit / push / PR when satisfied.
