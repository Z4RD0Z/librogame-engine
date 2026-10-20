---
title: Languages
description: Add a new language to the engine.
sidebar_position: 2
---

# Languages

The engine loads every language from the top-level keys of `story.json` and can switch between them at runtime without reloading the page.

## 1. Add a language key

```json
{
  "it": {
    "title": "L'Antica Cripta",
    "ui": {},
    "nodes": {},
    "items": {},
    "perks": [],
    "credits": {}
  },
  "en": {
    "title": "The Ancient Crypt",
    "ui": {},
    "nodes": {},
    "items": {},
    "perks": [],
    "credits": {}
  }
}
```

## 2. Translate all sections

For each language, provide:

- `title`
- `ui` — all interface labels
- `nodes` — node text and choice labels
- `items` — item descriptions and usage messages
- `perks` — perk names and descriptions
- `credits`

Keep the same IDs across languages so story logic and saves remain compatible.

## 3. Add menu buttons

The main menu has a language button group:

```html
<div class="menu-language">
  <button class="lang-btn" id="lang-it">IT</button>
  <button class="lang-btn" id="lang-en">EN</button>
</div>
```

Add a button for the new language:

```html
<button class="lang-btn" id="lang-fr">FR</button>
```

## 4. Add the in-game selector option

The game controls panel contains a language selector:

```html
<select id="language-select">
  <option value="it">Italiano</option>
  <option value="en">English</option>
</select>
```

Add an option for the new language:

```html
<option value="fr">Français</option>
```

## 5. Register the event listeners

In `js/main.js`, the menu buttons are wired to `changeLanguageMenu`:

```js
document.getElementById("lang-it").addEventListener("click", () => this.changeLanguageMenu("it"));
document.getElementById("lang-en").addEventListener("click", () => this.changeLanguageMenu("en"));
```

Add the corresponding listener for the new language.

## Notes

- Language selection is saved with the game state.
- UI labels come from the `ui` object, so missing translations fall back to hardcoded Italian defaults in the engine.
- Keep language keys short and consistent, such as `it`, `en`, or `fr`.
