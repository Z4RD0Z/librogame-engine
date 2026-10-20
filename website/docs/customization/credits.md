---
title: Credits
description: Configure the in-game credits screen.
sidebar_position: 4
---

# Credits

Edit the `credits` section of each language in `story.json`:

```json
{
  "credits": {
    "developer": "Your Name",
    "engine": "Librogame Engine",
    "story": "Story Title",
    "year": "2025",
    "thanks": "Thank you for playing!"
  }
}
```

| Field | Description |
| --- | --- |
| `developer` | Author of the story or game. |
| `engine` | Engine name shown in the credits. |
| `story` | Story title. |
| `year` | Release year. |
| `thanks` | Closing message. |

## Notes

- Each language can have its own credits block.
- If a field is missing, the engine falls back to a default value.
- The credits screen is available from the main menu.
