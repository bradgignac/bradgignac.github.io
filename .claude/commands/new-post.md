---
description: Scaffold a new blog post in a fresh worktree
---

Walk Brad through starting a new blog post. Steps:

1. **Ask** for the post title and tags (optional, comma-separated). Use AskUserQuestion if more than one input is needed.
2. **Slug** the title: lowercase, alphanumerics and hyphens only, no leading filler words ("the", "a", "an"). Show the slug and ask to confirm or override.
3. **Abort** if `src/content/posts/<slug>.md` already exists on disk (check the main checkout — `/Users/brad.gignac/work/bradgignac/bradgignac.github.io/src/content/posts/<slug>.md`).
4. **Create the worktree** per the global git conventions:
   - `git -C /Users/brad.gignac/work/bradgignac/bradgignac.github.io worktree add /Users/brad.gignac/work/bradgignac/<slug> -b bradgignac/<slug> main`
   - Symlink `.claude/settings.local.json` from the main checkout into the new worktree.
5. **Write the post file** at `<worktree>/src/content/posts/<slug>.md`:
   ```yaml
   ---
   date: <today YYYY-MM-DD>
   title: <title>
   tags:
     - <tag>
     - <tag>
   ---
   ```
   Omit the `tags:` key entirely if Brad gave no tags. Leave the body empty (no placeholder text).
6. **Install deps and start the dev server** in the new worktree so Brad can see HMR previews while he writes:
   - `npm install --prefix <worktree>` (run in background, wait for it to finish)
   - `npm run dev --prefix <worktree> -- --host 127.0.0.1 --port 4321` (run in background)
   - Wait until the server responds at <http://localhost:4321/>, then share the URL.
7. **Report** the absolute file path and the dev URL. Tell Brad to write the post body and ask you to commit / push / PR when he's ready.

### Before committing
When Brad asks you to commit / push / PR, run `npx cspell --no-progress` first. If it fails:
- If the flagged word is a real typo, fix it in the post.
- If it's a legitimate proper noun, add it to `.cspell.json`.
Only commit once cspell is clean.
