# Documentation Site

This folder contains the [Docusaurus](https://docusaurus.io/) site for Librogame Engine.

## Local development

```bash
npm ci
npm run start
```

Use `npm install` only when you need to add or update dependencies.

## Build

```bash
npm run build
```

The static output is written to `build/`.

## Deployment

The site is deployed to GitHub Pages by the workflow in `.github/workflows/deploy-docs.yml` on every push to `master` that changes `website/**`.

The published site is available at:

```text
https://z4rd0z.github.io/librogame-engine/
```

The GitHub Pages source must be set to **GitHub Actions** in the repository settings.
