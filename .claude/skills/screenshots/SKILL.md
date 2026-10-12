---
name: screenshots
description: Show Georgia how pages look (desktop and phone) before anything is pushed. Use after making a change, or when she asks "can I see it?" without wanting to deploy yet.
---

# Screenshots

1. Build the site: `npm run build`.
2. Screenshot the pages that changed (add `/` for the home page): `NODE_PATH=$(npm root -g) node scripts/screenshot.mjs /about /articles/<slug>`. It saves `<page>-desktop.png` (1280px wide) and `<page>-phone.png` (390px wide) in `/tmp/site-screenshots/` and prints the paths.
3. Look at them yourself first (Read the PNG files): is anything cut off, overlapping, too wide, or the wrong colour? Fix before showing.
4. Show her the images with SendUserFile (display "render"), a short caption per image: "About page, on a computer" / "on a phone". Long pages: that's fine, send them whole.
5. Ask whether she'd like changes or would like to go to preview (`/preview`).

Screenshots are never added to the repository.
