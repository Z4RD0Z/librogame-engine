---
title: Tests
description: Stat-based dice checks and failure nodes.
sidebar_position: 4
---

# Tests

A choice can require a stat test:

```json
{
  "text": "Force the door open",
  "next": "force_door",
  "test": {
    "stat": "strength",
    "difficulty": 9
  }
}
```

## Formula

```text
2d6 + stat_value >= difficulty
```

The engine rolls two six-sided dice, adds the selected stat, and compares the result with the difficulty.

## Suggested difficulties

| Difficulty | Meaning |
| --- | --- |
| `7` | Easy |
| `9` | Medium |
| `12` | Hard or nearly impossible |

You can use any integer difficulty your story needs.

## Failure nodes

On failure, the engine automatically looks for a node named after the target with a `_fail` suffix:

```text
target node:  force_door
failure node: force_door_fail
```

Always create the failure node:

```json
{
  "force_door_fail": {
    "text": "You push with all your strength, but the door does not move. You hurt your shoulder.",
    "choices": [
      {
        "text": "Enter through the gap",
        "next": "entrance",
        "effects": {
          "health": -1
        }
      }
    ]
  }
}
```

If the `_fail` node is missing, the engine has nowhere to go after a failed test.

## Valid stats

Use the stat IDs defined by the engine:

- `strength`
- `dexterity`
- `intelligence`

See [Stats and Perks](../gameplay/stats-and-perks) for their meaning.
