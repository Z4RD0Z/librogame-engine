---
title: Quick Start
description: Clone the engine, add your media, and run the example adventure.
sidebar_position: 1
---

# Quick Start

## 1. Clone the repository

You can clone the repository directly, or click **Use this template** on GitHub to create your own repository based on the engine.

```bash
git clone https://github.com/Z4RD0Z/librogame-engine.git
cd librogame-engine
```

## 2. Add your audio files

- Place `dice.mp4` in `src/music/`.
- Add any background music tracks you want to use.

The engine expects the dice sound effect at `src/music/dice.mp4`. Background music is optional and is configured per story node.

## 3. Customize your story

- Edit `story.json` to create your adventure.
- Add your own nodes, choices, items, and perks.

If you prefer to write your story in Markdown, use the bundled [Story Converter](../tools/story-converter):

```bash
python3 tools/story-converter/md2storyconvert.py \
  tools/story-converter/story.md -o story.json
```

See [Markdown Syntax](../tools/markdown-syntax) for the supported format.

## 4. Launch the game

Deploy the folder to a static host such as itch.io, GitHub Pages, or Nginx. To run it locally:

```bash
python -m http.server
```

Then open `http://localhost:8000`.

:::warning
Opening `index.html` directly with `file://` will not work because the engine loads `story.json` with `fetch()`, and browsers block that request for local files.
:::

No build process is required for the engine.
