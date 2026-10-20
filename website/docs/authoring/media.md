---
title: Media
description: Story images and background music.
sidebar_position: 5
---

# Media

## Story images

Add an `image` field to any node:

```json
{
  "dark_room": {
    "text": "You enter a dark room...",
    "image": "src/images/dark_room.jpg",
    "choices": []
  }
}
```

Images are displayed with the node text. Keep paths relative to the engine root.

## Background music

Set ambient music per node:

```json
{
  "entrance": {
    "music": "src/music/ambient.mp3",
    "choices": []
  }
}
```

The simple form loops the track automatically.

To control looping explicitly:

```json
{
  "entrance": {
    "music": "src/music/ambient.mp3",
    "musicLoop": true,
    "choices": []
  }
}
```

## Track changes

When the player enters a node with a different `music` value, the engine fades out the current track before starting the new one. The `musicLoop` value controls whether the new track loops.

## Audio controls

The engine provides volume control, a mute toggle, and persistent audio preferences. See [Interface](../customization/interface) for the player-facing controls.

## File placement

- Story images: `src/images/`
- Background music and sound effects: `src/music/`
- Dice sound effect: `src/music/dice.mp4` (required)

The `src/` folder is ignored by Git in this repository, so add your media files to your own deployment.
