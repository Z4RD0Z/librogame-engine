---
title: Story Structure
description: The JSON format used by the engine.
sidebar_position: 1
---

# Story Structure

`story.json` contains one top-level key per language. Each language object holds the story title, perks, nodes, items, UI strings, and credits.

```json
{
  "en": {
    "title": "Your Adventure Title",
    "perks": [],
    "nodes": {},
    "items": {},
    "ui": {},
    "credits": {}
  }
}
```

The example project uses `it` and `en`. See [Languages](../customization/languages) for translation details.

## Nodes

Each node is identified by a unique key:

```json
{
  "start": {
    "text": "You stand before the entrance of an ancient crypt.",
    "image": "src/images/scene.jpg",
    "music": "src/music/ambient.mp3",
    "musicLoop": true,
    "choices": [
      {
        "text": "Enter carefully",
        "next": "entrance"
      }
    ]
  }
}
```

| Field | Required | Description |
| --- | --- | --- |
| `text` | Yes | Story text. Supports [colors and dialogue boxes](./text-formatting). |
| `image` | No | Path to a story image. |
| `music` | No | Path to a background track. |
| `musicLoop` | No | Whether the track loops. |
| `choices` | Yes | Array of choices. Can be empty for terminal nodes. |

## Choices

```json
{
  "text": "Force the door open (Strength test)",
  "next": "force_door",
  "oneshot": true,
  "requirements": {
    "items": ["crowbar"],
    "flags": ["found_door"],
    "notFlags": ["alarm_triggered"],
    "perks": ["strong_back"]
  },
  "test": {
    "stat": "strength",
    "difficulty": 9
  },
  "effects": {
    "health": -1,
    "sanity": 1,
    "items": [
      {
        "id": "torch",
        "name": "Torch",
        "type": "permanent"
      }
    ],
    "flags": ["door_opened"]
  }
}
```

| Field | Description |
| --- | --- |
| `text` | Label shown on the choice button. |
| `next` | ID of the target node. |
| `oneshot` | If `true`, the choice disappears after being selected. |
| `requirements` | Conditions that must be met for the choice to appear. |
| `test` | Stat test. On failure the engine looks for `<next>_fail`. |
| `effects` | Changes applied when the choice is selected. |

When a choice has a `test`, the engine navigates to the target node on success and tries to navigate to `<target>_fail` on failure. Always create the failure node:

```json
{
  "force_door_fail": {
    "text": "The door does not budge. You hurt your shoulder.",
    "choices": []
  }
}
```

## Effects

| Key | Description |
| --- | --- |
| `health` | Adds or subtracts health points. |
| `sanity` | Adds or subtracts mental health points. |
| `items` | Gives items to the player. |
| `flags` | Sets story flags. |

See [Requirements and Items](./requirements-and-items) for the complete conditions and item format.
