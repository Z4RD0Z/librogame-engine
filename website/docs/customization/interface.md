---
title: Interface
description: Layout, collapsible sidebars, menus, and modals.
sidebar_position: 3
---

# Interface

## Three-column layout

The game screen uses three columns:

1. **Stats and inventory** on the left
2. **Story content** in the center
3. **Controls** on the right

The center column expands automatically when a sidebar is hidden.

## Collapsible sidebars

- Use the arrow buttons to hide or show the left and right panels.
- Sidebar states are saved and restored on page reload.
- The layout adapts to smaller screens with a mobile navigation mode.

## Main menu

The main menu provides:

- New Game
- Load Game
- Credits
- Language selection
- Theme and audio controls

## Modals

The engine uses modals for:

- Item details and item usage
- Dice roll results
- Confirmations, such as dropping an item or restarting

## Audio controls

The controls panel includes:

- Music on/off
- Volume slider
- Mute toggle

Audio preferences are persisted between sessions.

## Accessibility

- Buttons have visible labels and focus states.
- Content is rendered as semantic HTML where possible.
- Colored text should not be the only way to convey important information.
