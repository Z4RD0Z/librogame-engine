---
title: Stats and Perks
description: Character attributes and the perk system.
sidebar_position: 2
---

# Stats and Perks

## Stats

| Stat | Meaning |
| --- | --- |
| **Strength** | Physical power, combat, and inventory capacity |
| **Dexterity** | Agility and reflexes |
| **Intelligence** | Mental acuity and knowledge |
| **Health** | Physical health. Starts at 5 and can be changed by the story. |
| **Mental Health** | Sanity. Starts at 5 and can be changed by the story. |

Strength, Dexterity, and Intelligence are the three stats used for tests. Health and Mental Health are resources modified by choices and items.

## Perks

Perks are special abilities chosen during character creation. They are defined in the story JSON:

```json
{
  "perks": [
    {
      "id": "strong_back",
      "name": "Strong Back",
      "description": "You can carry 3 extra items."
    },
    {
      "id": "night_vision",
      "name": "Night Vision",
      "description": "You see better in the dark."
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `id` | Unique identifier used by choice requirements. |
| `name` | Display name. |
| `description` | Explanation shown during character creation. |

## Using perks in the story

A choice can require one or more perks:

```json
{
  "text": "Pick the lock",
  "next": "locked_room",
  "requirements": {
    "perks": ["lockpicker"]
  }
}
```

## Example perks

The example adventure includes:

- **Strong Back** — carry more items
- **Night Vision** — see better in dark places
- **Medic** — potions heal more
- **Lockpicker** — open locks without keys

## Number of perks

The number of perks a player can choose is controlled by `perkPointsToSpend` in `js/main.js`. The example project uses 1 by default.

Perks are also part of the character save state, so they are restored when loading a game.
