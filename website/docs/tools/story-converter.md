---
title: Story Converter
description: Write stories in Markdown and convert them to story.json.
sidebar_position: 1
---

# Story Converter

The repository includes a small Python utility that converts a custom Markdown story format into the JSON structure used by the engine.

The converter is a **development tool**. It is not required to run the engine and is not included in the engine release package.

## Requirements

- Python 3
- No external dependencies

## Usage

From the repository root:

```bash
python3 tools/story-converter/md2storyconvert.py \
  tools/story-converter/story.md -o story.json
```

From the converter directory:

```bash
cd tools/story-converter
python3 md2storyconvert.py story.md -o story.json
```

To print the result to stdout instead of writing a file, omit `-o`:

```bash
python3 tools/story-converter/md2storyconvert.py \
  tools/story-converter/story.md
```

:::warning
The conversion output replaces the destination file. If you run the command from the repository root with `-o story.json`, the example story of the engine will be replaced. Back it up or choose a different output path while experimenting.
:::

## What it supports

- Frontmatter metadata
- Perks
- Items
- Story nodes and choices
- Choice annotations for flags, stats, items, requirements, tests, and one-shot choices

The converter currently generates Italian (`it`) story data. See [Markdown Syntax](./markdown-syntax) for the full format.

## Project files

| File | Purpose |
| --- | --- |
| `md2storyconvert.py` | Conversion script |
| `story.md` | Example story in the supported Markdown syntax |
| `README.md` | Short usage guide |
| `LICENSE` | Tool license |

## Validation

The converter prints warnings to `stderr` for:

- Choices pointing to nodes that do not exist
- Tests whose `<target>_fail` node is missing
- Requirements or rewards that reference items missing from the item catalog

Warnings do not stop the conversion, but they usually indicate a broken story.

## Source

The tool lives in [`tools/story-converter/`](https://github.com/Z4RD0Z/librogame-engine/tree/master/tools/story-converter). The example source is [`story.md`](https://github.com/Z4RD0Z/librogame-engine/blob/master/tools/story-converter/story.md).
