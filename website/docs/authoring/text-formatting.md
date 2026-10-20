---
title: Text Formatting
description: Colored text and dialogue boxes.
sidebar_position: 2
---

# Text Formatting

Story text supports inline colors and dialogue boxes.

## Inline colors

Use square brackets:

```text
The [red:guard] stops you. A [blue:merchant] waves.
```

The word `guard` appears in red and `merchant` appears in blue.

## Dialogue boxes

Use curly braces:

```text
{red:Stop right there!} the guard shouts.
{blue:Please, let them pass} says the priest.
```

Each block becomes a formatted dialogue box.

## Available colors

| Color | Usage |
| --- | --- |
| `red` | `[red:text]` or `{red:text}` |
| `blue` | `[blue:text]` or `{blue:text}` |
| `green` | `[green:text]` or `{green:text}` |
| `yellow` | `[yellow:text]` or `{yellow:text}` |
| `purple` | `[purple:text]` or `{purple:text}` |
| `orange` | `[orange:text]` or `{orange:text}` |
| `gray` | `[gray:text]` or `{gray:text}` |
| `cyan` | `[cyan:text]` or `{cyan:text}` |
| `pink` | `[pink:text]` or `{pink:text}` |

## JSON example

```json
{
  "start": {
    "text": "A [red:guard] blocks the road. {blue:You shall not pass!} he says.",
    "choices": []
  }
}
```

:::tip
Colored text and dialogue boxes are sanitized before being rendered. See [Security](../reference/security) for the allowed HTML elements.
:::
