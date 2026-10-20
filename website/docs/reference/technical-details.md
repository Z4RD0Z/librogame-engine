---
title: Technical Details
description: Browser support, dependencies, and deployment constraints.
sidebar_position: 1
---

# Technical Details

## Browser compatibility

The engine targets modern browsers:

- Chrome
- Firefox
- Safari
- Edge

It uses:

- ES6+ JavaScript
- CSS Grid and Flexbox
- HTML5 Audio API
- `localStorage`
- `fetch()`

## Dependencies

- **[DOMPurify](https://github.com/cure53/DOMPurify)** — bundled locally at `js/purify.min.js`. It sanitizes all HTML rendered through `innerHTML`, including story content, credits, colored text, and dice results.
- **No build tools** — no compilation, bundling, or package installation is required for the engine.
- **No backend** — the game is entirely static.

## Local server requirement

The engine loads `story.json` with `fetch()`. Browsers block that request when the page is opened with `file://`, so use a local HTTP server:

```bash
python -m http.server
```

Then open `http://localhost:8000`.

## Content Security Policy

`index.html` includes a Content Security Policy meta tag that restricts scripts, styles, images, connections, fonts, objects, frames, and forms. If you add external resources, update the policy accordingly.

## File size

- The engine itself is lightweight.
- Story data grows with your content.
- Images and audio are optional and usually dominate the total size.

## Release package

The engine release archive contains only:

```text
index.html
js/
styles.css
story.json
LICENSE
```

The documentation site and the Markdown converter are not part of the engine release.
