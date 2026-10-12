---
name: publish
description: Publish the site live by merging `preview` into `main`, which Cloudflare Pages deploys as the production site. Use only when Georgia explicitly says "publish", "go live" or "make it live" (never on your own initiative; the confirmation step below always applies).
---

# Publish

Takes what is on `preview` live. This changes the public website, so the confirmation in step 5 always happens.

Context: until a custom domain is attached in Cloudflare, `main` is only a baseline on its `pages.dev` address. Once a custom domain is connected, merging to `main` automatically overwrites and deploys the real site, so the confirmation is a genuine go-live check.

1. `git status`. Commit everything outstanding, then push `preview` (retry up to 4 times with 2s/4s/8s/16s backoff on network errors).
2. `npm run check`. ERRORS must be fixed before going on.
3. `git fetch origin main`, then work out what will go live: `git log --oneline origin/main..preview` and `git diff --stat origin/main..preview`.
4. Show her a short plain-English summary: which pages or articles are new or changed, and the **UNFINISHED CONTENT** list from the check (placeholder text, `href="#"` links, placeholder articles/resources, forms that don't send). Group it so it is readable, not a wall of text.
5. **Stop and ask her to confirm.** Only continue on a clear yes in this conversation ("yes, publish").
6. Merge: `git checkout main`, `git pull origin main`, `git merge preview`. If there are conflicts, stop and explain rather than choosing a side.
7. `git push origin main`, then `git checkout preview`.
8. Tell her it is pushed, that Cloudflare deploys `main` to the live site (usually a minute or two), and name what went live.

Never force-push. Never publish without the confirmation in step 5.
