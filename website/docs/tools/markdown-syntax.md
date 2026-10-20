---
title: Markdown Syntax
description: The custom Markdown format supported by the story converter.
sidebar_position: 2
---

# Markdown Syntax

The converter reads a Markdown file with a custom structure. See the [example story](https://github.com/Z4RD0Z/librogame-engine/blob/master/tools/story-converter/story.md) for a complete working file.

## Frontmatter

The file starts with a YAML-like frontmatter block:

```markdown
---
title: "L'Antica Cripta"
lang: it
credits:
  developer: "Your Name"
  engine: "Librogame Engine"
  story: "L'Antica Cripta"
  year: "2025"
  thanks: "Thank you for playing!"
---
```

| Field | Description |
| --- | --- |
| `title` | Story title. |
| `lang` | Output language key. Defaults to `it`. |
| `credits` | Nested credits block. |

## Sections

The body is split by H1 headings. The converter recognizes:

- `# Perks`
- `# Items`
- `# Nodes`

## Perks

```markdown
# Perks

## strong_back | Strong Back
You can carry 3 extra items.

## night_vision | Night Vision
You see better in the dark.
```

The header format is:

```text
## perk_id | Perk Name
```

The paragraph after the header becomes the perk description.

## Items

```markdown
# Items

## potion | Healing Potion | 🧪
> A ruby-red potion that restores health.
- image: src/images/inventories/potion.png
- usable: true
- effects: health +2
- useMessage: "You feel better!"
```

The item header format is:

```text
## item_id | Item Name | Icon
```

Supported item properties:

| Property | Example | Description |
| --- | --- | --- |
| `image` | `- image: path.png` | Item image path. |
| `usable` | `- usable: true` | Whether the player can use the item. |
| `effects` | `- effects: health +2` | Stat changes. Separate multiple effects with commas. |
| `useMessage` | `- useMessage: "..."` | Message shown after use. |

A `>` blockquote becomes the item description.

## Nodes

```markdown
# Nodes

## start
You stand before the entrance of an ancient crypt.

- Enter carefully -> entrance {flags: entered_crypt}
- Force the doors open -> force_door {test: strength 7}
- Examine the entrance -> examine {test: intelligence 7}
```

A node starts with:

```text
## node_id
```

### Node metadata

Use HTML comments directly after the node heading:

```markdown
## entrance
<!-- music: src/music/crypt_ambient.mp3 loop -->
<!-- image: src/images/entrance.jpg -->
The entrance is dark and cold.

- Go left -> corridor
```

| Comment | Description |
| --- | --- |
| `<!-- music: path -->` | Background music. |
| `<!-- music: path loop -->` | Background music with looping enabled. |
| `<!-- image: path -->` | Story image. |

### Node text

Non-empty lines become the node text. Multiple lines are joined with spaces.

### Choices

A choice line uses this format:

```text
- Choice text -> target_node {annotations}
```

## Choice annotations

Annotations can be combined on the same choice.

| Annotation | Example | Description |
| --- | --- | --- |
| Flags | `{flags: flag1, flag2}` | Sets story flags. |
| Health | `{health: -1}` | Changes health. |
| Sanity | `{sanity: -1}` | Changes mental health. |
| Items | `{items: id/Name/type, ...}` | Gives items. Type defaults to `permanent` when omitted. |
| Consume | `{consume: id/Name}` | Removes an item when the choice is selected. |
| Test | `{test: strength 9}` | Stat test. The converter expects a `<target>_fail` node. |
| Require item | `{requires: item_id}` | The player must carry the item. |
| Require flag absence | `{requires: !flag_name}` | The flag must not be set. |
| One-shot | `{oneshot}` | The choice disappears after being selected. |

### Items annotation

```markdown
- Take everything -> victory {items: potion/Healing Potion/consumable, scroll/Ancient Scroll/permanent}
```

The format is `id/Name/type`. If the type is omitted, `permanent` is used.

### Test annotation

```markdown
- Cross the bridge -> bridge {test: dexterity 9}
```

The choice targets `bridge` on success and `bridge_fail` on failure. Create the failure node explicitly:

```markdown
## bridge_fail
The bridge collapses. You fall into the river.
```

## Validation warnings

The converter reports:

- Choices whose target node does not exist
- Tests whose failure node is missing
- Required or rewarded items missing from the item catalog

Warnings are written to `stderr` and do not prevent the JSON from being generated.

## Output

The generated JSON contains one language key:

```json
{
  "it": {
    "title": "...",
    "perks": [],
    "nodes": {},
    "items": {},
    "ui": {},
    "credits": {}
  }
}
```

The converter fills in the default Italian UI strings and uses the frontmatter title for the story and credits.
