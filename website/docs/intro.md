---
slug: /
title: Introduction
description: A lightweight engine for interactive gamebooks and text adventures.
sidebar_position: 1
---

![Librogame Engine logo](./assets/logo.jpeg)

# Introduction

**Librogame Engine** is a lightweight, feature-rich engine for creating interactive text adventures and gamebooks (choose-your-own-adventure games) with vanilla HTML, CSS, and JavaScript.

There is no framework, no build step, and no backend. You write your story in JSON, add images and audio if you want, and deploy the static files to any web host.

## What you can build

- Classic gamebooks with branching choices
- Stat-based tests and skill checks
- Inventory-driven puzzles
- Perk and flag based story paths
- Multi-language stories with runtime language switching
- Illustrated adventures with background music and sound effects

## Highlights

- Character creation with name, stats, and perks
- 2d6 dice tests with animation and sound
- Conditional choices based on items, flags, perks, and stats
- One-shot choices that disappear after being selected
- Colored text and dialogue boxes
- Dynamic inventory with item images, descriptions, and usage
- Save and load through `localStorage`
- Light and dark themes
- Responsive three-column layout with collapsible sidebars
- Background music per story node
- A bundled Markdown to JSON story converter

## Documentation map

- [Quick Start](./getting-started/quick-start) — get the example adventure running
- [Project Structure](./getting-started/project-structure) — what every file and folder does
- [Story Structure](./authoring/story-structure) — the JSON format
- [Text Formatting](./authoring/text-formatting) — colors and dialogue boxes
- [Requirements and Items](./authoring/requirements-and-items) — conditions and inventory items
- [Tests](./authoring/tests) — stat-based checks
- [Media](./authoring/media) — images and music
- [Character Creation](./gameplay/character-creation) — the player onboarding flow
- [Stats and Perks](./gameplay/stats-and-perks) — character mechanics
- [Inventory](./gameplay/inventory) — item capacity and usage
- [Dice Tests](./gameplay/dice) — how rolls work
- [Themes](./customization/themes) — CSS variables and color schemes
- [Languages](./customization/languages) — adding translations
- [Interface](./customization/interface) — layout and sidebar behavior
- [Credits](./customization/credits) — the in-game credits screen
- [Story Converter](./tools/story-converter) — write stories in Markdown
- [Markdown Syntax](./tools/markdown-syntax) — the supported converter syntax
- [Technical Details](./reference/technical-details) — compatibility and dependencies
- [Security](./reference/security) — HTML sanitization
- [Contributing](./contributing) — how to help the project

## Example story included

The repository ships with a complete example adventure, **"L'Antica Cripta" / "The Ancient Crypt"**, which demonstrates:

- Character creation with name and perks
- Stat-based tests
- Inventory and item usage
- Conditional branches based on items, flags, and perks
- Background music
- One-shot choices
- Multiple paths and endings
- Story node images
- Colored text and dialogue

## Requirements

- A modern browser (Chrome, Firefox, Safari, or Edge)
- A static file server for local development
- Python 3 only if you want to use the bundled [Story Converter](./tools/story-converter)

## License

This project is released under the MIT License. See the [LICENSE](https://github.com/Z4RD0Z/librogame-engine/blob/master/LICENSE) file for details.
