---
name: preview
description: Push the current work to the `preview` branch so Cloudflare Pages builds a preview deployment. Use when the user says "preview the site" or "let me see it".
---

# Preview

Gets the current work onto Cloudflare's preview deployment. This is safe: it never touches `main` or the live site.

1. Run `git status`. Commit any uncommitted changes with a clear message (no empty commits).
2. Make sure `preview` contains the work:
   - If you are on `preview`, continue.
   - If you are on another branch, merge it into `preview` (`git checkout preview`, `git merge <branch>`), resolve any conflicts, then continue.
3. Push: `git push -u origin preview`. If it fails on a network error, retry up to 4 times (2s, 4s, 8s, 16s apart).
4. Tell the user the preview branch is pushed and name the commit that is deploying. Then give them the link, in these words or close to them:

   > Cloudflare Pages is building this now (usually a minute or two). Go to https://preview.website-4ph.pages.dev/ and you'll see the changes live. If it still shows the old version, give it a moment and refresh.

   You can't see the Cloudflare build from here, so don't claim it has finished. If the change was to a specific page, add that page's link too, for example https://preview.website-4ph.pages.dev/about.html.

Do not create a pull request and do not push to `main`.
