---
title: Dice Tests
description: How 2d6 stat tests work.
sidebar_position: 4
---

# Dice Tests

## How a test works

1. The player selects a choice that has a `test`.
2. The engine rolls two six-sided dice.
3. The selected stat is added to the roll.
4. The result is compared with the difficulty.

```text
2d6 + stat_value >= difficulty
```

## Visual feedback

The engine shows an animated dice roll using Unicode dice symbols:

```text
⚀ ⚁ ⚂ ⚃ ⚄ ⚅
```

The result is displayed clearly:

```text
4 + 5 + 2 = 11
```

A sound effect plays when the dice are rolled, if audio is available.

## Success and failure

- **Success**: the player moves to the target node.
- **Failure**: the engine moves to the target node with the `_fail` suffix.

For example, a choice targeting `force_door` goes to `force_door` on success and `force_door_fail` on failure.

## Defining a test

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

Always provide the failure node:

```json
{
  "force_door_fail": {
    "text": "The door does not move. You hurt your shoulder.",
    "choices": []
  }
}
```

See [Tests](../authoring/tests) for suggested difficulties and more examples.
