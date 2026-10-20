# Story Converter

A small Python utility that converts a custom Markdown story format into JSON for the Librogame Engine.

The converter is a development tool: it is not required to run the engine and is not included in the engine release package.

## Requirements

- Python 3
- No external dependencies

## Usage

From the repository root:

```bash
python3 tools/story-converter/md2storyconvert.py \
  tools/story-converter/story.md -o story.json
```

Or from this directory (`tools/story-converter/`):

```bash
python3 md2storyconvert.py story.md -o story.json
```

To print the result to stdout instead of writing a file, omit `-o`:

```bash
python3 tools/story-converter/md2storyconvert.py \
  tools/story-converter/story.md
```

## What it supports

- Frontmatter metadata
- Perks
- Items
- Story nodes and choices
- Choice annotations for flags, stats, items, requirements, tests, and one-shot choices

The converter currently generates Italian (`it`) story data.

## Documentation

- [Story Converter](https://z4rd0z.github.io/librogame-engine/tools/story-converter)
- [Markdown Syntax](https://z4rd0z.github.io/librogame-engine/tools/markdown-syntax)
- [Main README](../../readme.md)

## Project files

- `md2storyconvert.py` — conversion script
- `story.md` — example story source in the supported Markdown syntax
- `README.md` — this document
- `LICENSE` — project license

## Notes

The converter is designed for the `librogame-engine` story format and uses the sample content in `story.md` as a reference for the expected syntax.

Validation warnings are printed to `stderr` for broken node links, missing `_fail` nodes, and item references missing from the item catalog.
