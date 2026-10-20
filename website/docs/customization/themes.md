---
title: Themes
description: Light and dark theme customization through CSS variables.
sidebar_position: 1
---

# Themes

The engine uses CSS variables, so colors and surfaces can be changed without touching component styles.

## Light theme

Edit the `:root` block in `styles.css`:

```css
:root {
  --bg-primary: #f5f5f5;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --accent: #3498db;
  /* ... more variables ... */
}
```

## Dark theme

Override the same variables in the dark theme block:

```css
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #e0e0e0;
  --accent: #5dade2;
  /* ... more variables ... */
}
```

## Theme toggle

The player can switch between light and dark mode from the interface. The choice is stored in `localStorage` and restored on the next visit.

## Tips

- Keep enough contrast between text and background colors.
- Test both themes on desktop and mobile.
- Use the same variables for buttons, borders, and panels so the interface stays consistent.
