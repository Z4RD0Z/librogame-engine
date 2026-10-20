---
title: Requirements and Items
description: Conditional choices and the item catalog.
sidebar_position: 3
---

# Requirements and Items

## Requirements

Requirements control whether a choice is visible. All requirement types can be combined.

### Items

```json
"requirements": {
  "items": ["silver_key", "torch"]
}
```

The player must carry every listed item.

### Flags

```json
"requirements": {
  "flags": ["door_opened", "talked_to_guard"]
}
```

Every listed flag must be set.

### Inverse flags

```json
"requirements": {
  "notFlags": ["alarm_triggered", "boss_defeated"]
}
```

None of the listed flags may be set.

### Perks

```json
"requirements": {
  "perks": ["lockpicker", "night_vision"]
}
```

The player must have every listed perk.

### Combined requirements

```json
"requirements": {
  "items": ["lockpick"],
  "perks": ["lockpicker"],
  "flags": ["found_door"],
  "notFlags": ["alarm_triggered"]
}
```

All conditions are evaluated together.

## Item catalog

Items are defined once in the `items` object of each language:

```json
{
  "items": {
    "potion": {
      "description": "A ruby-red potion that restores health.",
      "image": "src/images/inventories/potion.png",
      "icon": "🧪",
      "usable": true,
      "effects": {
        "health": 2
      },
      "useMessage": "You drink the potion and your wounds heal. +2 Health!"
    }
  }
}
```

| Field | Description |
| --- | --- |
| `description` | Text shown when the player inspects the item. |
| `image` | Optional image path. |
| `icon` | Optional emoji or short icon. |
| `usable` | Whether the player can use the item from the inventory. |
| `effects` | Stat changes applied when the item is used. |
| `useMessage` | Message shown after using the item. |

## Item types

When a choice gives an item, it declares a type:

```json
{
  "id": "potion",
  "name": "Healing Potion",
  "type": "consumable"
}
```

| Type | Behavior |
| --- | --- |
| `permanent` | Stays in the inventory forever. |
| `consumable` | Removed from the inventory after being used. |
| `consume` | Removed from the inventory when applied as an effect, typically combined with a requirement. |

## Inventory capacity

The inventory holds up to `Strength + 5` items. See [Inventory](../gameplay/inventory) for the player-facing behavior.

## Example

```json
{
  "text": "Use the silver key",
  "next": "treasure_room",
  "requirements": {
    "items": ["silver_key"]
  },
  "effects": {
    "items": [
      {
        "id": "silver_key",
        "name": "Silver Key",
        "type": "consume"
      }
    ],
    "flags": ["treasure_room_opened"]
  }
}
```
