---
title: Deployment
description: Publish the engine on a static host.
sidebar_position: 3
---

# Deployment

The engine is made of static files, so any static hosting service works.

## Supported hosts

- itch.io
- GitHub Pages
- Nginx or Apache
- Netlify, Cloudflare Pages, and similar static hosts
- A local Python server for testing

## Local development

From the project root:

```bash
python -m http.server
```

Then open `http://localhost:8000`.

:::warning
Do not open `index.html` directly through the `file://` protocol. The engine loads `story.json` with `fetch()`, and browsers block that request for local files due to CORS restrictions.
:::

## GitHub Pages

To publish the engine itself on GitHub Pages:

1. Push the engine files to a repository.
2. Enable GitHub Pages in the repository settings.
3. Select the branch and folder that contain `index.html`, or use a GitHub Actions workflow.
4. Make sure `index.html`, `story.json`, `js/`, `styles.css`, and `src/` are all available at the deployed root.

The documentation site in `website/` is deployed separately through the [`deploy-docs.yml`](https://github.com/Z4RD0Z/librogame-engine/blob/master/.github/workflows/deploy-docs.yml) workflow.

## Other static hosts

Upload the engine files to the host's public directory. No server-side runtime or database is required.

## Cache and updates

When you change `story.json`, images, or audio, remember to refresh the browser cache or invalidate the CDN cache if your host uses one.
