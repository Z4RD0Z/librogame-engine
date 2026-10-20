---
title: Project Structure
description: Files and folders in the Librogame Engine repository.
sidebar_position: 2
---

# Project Structure

```text
librogame-engine/
├── index.html          # Main HTML file
├── styles.css          # All engine styling
├── story.json          # Story content, items, perks, and translations
├── js/
│   ├── main.js         # Game engine logic
│   └── purify.min.js   # DOMPurify – HTML sanitization library
├── src/
│   ├── images/         # Story and item images
│   └── music/          # Background music and sound effects
├── tools/
│   └── story-converter/    # Optional Markdown authoring tool
│       ├── md2storyconvert.py
│       ├── story.md
│       ├── README.md
│       └── LICENSE
└── website/            # This Docusaurus documentation site
```

## Engine files

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell, menus, panels, and script imports |
| `styles.css` | Layout, themes, components, and responsive rules |
| `story.json` | The complete story data, including translations, nodes, items, and perks |
| `js/main.js` | Game state, rendering, navigation, saves, audio, and tests |
| `js/purify.min.js` | Bundled DOMPurify build used to sanitize rendered HTML |

## Assets

- `src/images/` contains story and inventory images. You can organize it into subfolders.
- `src/music/` contains background tracks and the required `dice.mp4` sound effect.

The repository's `.gitignore` excludes `src/*`, so media files are not committed by default. Add the assets you need to your own deployment.

## Documentation and tools

- `tools/story-converter/` is a standalone Python utility for writing stories in Markdown. It is not part of the engine release package.
- `website/` contains the Docusaurus documentation site. It is built and deployed separately from the engine.

## Release package

The engine release archive contains only the files needed to run the game:

```text
index.html
js/
styles.css
story.json
LICENSE
```

The documentation site and the story converter are intentionally excluded from releases.
