---
title: Inventory
description: Item capacity, inspection, usage, and dropping.
sidebar_position: 3
---

# Inventory

## Capacity

The inventory holds up to:

```text
Strength + 5 items
```

A character with 3 Strength can carry 8 items.

## Item actions

Click an item to open its detail modal. From there the player can:

- Read the item description
- View the item image or icon
- Use the item, if it is usable
- Drop the item

## Usable items

An item is usable when its catalog entry has `"usable": true`:

```json
{
  "potion": {
    "description": "Restores 2 health.",
    "image": "src/images/inventories/potion.png",
    "usable": true,
    "effects": {
      "health": 2
    },
    "useMessage": "You feel better!"
  }
}
```

When used, the item effects are applied and `useMessage` is shown.

## Item types

- **`permanent`** — stays in the inventory forever
- **`consumable`** — removed from the inventory after being used
- **`consume`** — removes the item from the inventory when applied as an effect, usually together with a requirement

See [Requirements and Items](../authoring/requirements-and-items) for the full item definition format.

## Visual feedback

Items can have images and icons. The inventory shows the current item count and capacity so the player knows when the inventory is full.

## Saving

Inventory contents, item types, and item images are preserved by the save system.
