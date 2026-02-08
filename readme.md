# 🎮 Librogame Engine

*“librogame (Italian term for gamebooks / interactive fiction)”*

A powerful, feature-rich engine for creating interactive text-based adventures and gamebooks (choose-your-own-adventure games) using vanilla HTML, CSS, and JavaScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)

## ✨ Features

### 🎲 Core Gameplay
- **Character Creation System** with customizable stats (Strength, Dexterity, Intelligence, Health, Mental Health)
- **Character Naming** - Players can name their character
- **Perk System** - Choose special abilities/traits during character creation that unlock unique story paths
- **2d6 Dice Rolling System** with visual animations (Unicode dice symbols) and sound effects
- **Dynamic Inventory Management** with item descriptions, images, and usage
- **Conditional Branching** based on items, flags, perks, and character stats
- **One-shot Choices** that disappear after being selected
- **Multiple Endings** and story paths

### 🎨 Rich Text Formatting
- **Colored Text System** - Highlight important text, character names, or dialogue
- **Dialogue Boxes** - Formatted speech bubbles for character conversations
- **9 Built-in Colors** (red, blue, green, yellow, purple, orange, gray, cyan, pink)
- **Simple Syntax** - Use `[color:text]` for inline colors and `{color:text}` for dialogue boxes

### 🌍 Internationalization
- **Full Multi-language Support** (Italian/English included)
- **JSON-based Story Format** for easy translation
- **Runtime Language Switching** without page reload

### 🎨 User Interface
- **Three-Column Layout**: Stats/Inventory | Story | Controls
- **Collapsible Sidebars** with smooth slide animations and auto-expanding center column
- **Light/Dark Theme Toggle** with persistent preferences
- **Responsive Design** that works on desktop and mobile
- **Main Menu System** with New Game, Load Game, and Credits
- **Modal System** for items and dice rolls
- **Story Images** - Add images to any story node

### 🎵 Audio System
- **Background Music** per story node
- **Sound Effects** (dice rolling)
- **Volume Control** with persistent settings
- **Mute Toggle** for all audio

### 💾 Save System
- **LocalStorage Integration** for game saves
- **Save/Load Functionality** with full state preservation (stats, inventory, perks, flags, choices)
- **Auto-save Theme** and audio preferences
- **Persistent Panel States** (remember which sidebars are open/closed)

## 📁 Project Structure

```
librogame-engine/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── story.json          # Story content, items, perks, and translations
├── js/
│   └── main.js         # Game engine logic
└── src/
    ├── images/
    │   ├── menu-background.jpg   # Menu background (optional)
    │   └── ...                    # Story node images
    └── music/
        ├── dice.mp4               # Dice sound effect (required)
        └── ...                    # Background music tracks
```

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Z4RD0Z/librogame-engine.git
cd librogame-engine
```

2. **Add your audio files**
   - Place `dice.mp4` in `src/music/`
   - Add any background music tracks you want

3. **Customize your story**
   - Edit `story.json` to create your adventure
   - Add your own nodes, choices, items, and perks

4. **Launch the game**
   - Open `index.html` in a web browser
   - No build process required!

## 📖 Creating Your Story

### Story Node Structure

```json
{
  "it": {
    "title": "Your Adventure Title",
    "perks": [
      {
        "id": "perk_id",
        "name": "Perk Name",
        "description": "What this perk does"
      }
    ],
    "nodes": {
      "node_id": {
        "text": "Story text with [red:colored] words and {blue:dialogue boxes}",
        "image": "src/images/scene.jpg",
        "music": "src/music/ambient.mp3",
        "choices": [
          {
            "text": "Choice text",
            "next": "next_node_id",
            "oneshot": true,
            "requirements": {
              "items": ["key_id"],
              "flags": ["flag_name"],
              "perks": ["perk_id"]
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
                  "id": "item_id",
                  "name": "Item Name",
                  "type": "permanent"
                }
              ],
              "flags": ["new_flag"]
            }
          }
        ]
      }
    },
    "items": {
      "item_id": {
        "description": "Item description",
        "image": "src/images/item.jpg",
        "usable": true,
        "effects": { "health": 2 },
        "useMessage": "You feel better!"
      }
    }
  }
}
```

### Colored Text System

**Inline Colors:**
```json
"text": "The [red:guard] stops you. A [blue:merchant] waves."
```
Result: "guard" appears in red, "merchant" in blue.

**Dialogue Boxes:**
```json
"text": "{red:Stop right there!} the guard shouts. {blue:Please, let them pass} says the priest."
```
Result: Two formatted dialogue boxes with different colors.

**Available Colors:**
- `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `gray`, `cyan`, `pink`

### Requirements System

The engine supports three types of requirements that can be combined:

**Items:**
```json
"requirements": { "items": ["silver_key", "torch"] }
```

**Flags:**
```json
"requirements": { "flags": ["door_opened", "talked_to_guard"] }
```

**Perks:**
```json
"requirements": { "perks": ["lockpicker", "night_vision"] }
```

**Combined:**
```json
"requirements": {
  "items": ["lockpick"],
  "perks": ["lockpicker"],
  "flags": ["found_door"]
}
```

### Item Types

- **`permanent`**: Stays in inventory forever
- **`consumable`**: Can be used multiple times, removed when used
- **`consume`**: Removed automatically when used as a requirement

### Test Difficulties

- **7**: Easy test (2d6 + stat ≥ 7)
- **9**: Medium test (2d6 + stat ≥ 9)
- **12**: Hard/Impossible test (2d6 + stat ≥ 12)

Formula: `2d6 + stat_value >= difficulty`

On failure, the engine automatically tries to navigate to `node_id_fail`

## 🎲 Game Mechanics

### Character Creation
1. **Name** - Players enter their character's name
2. **Stats** - Distribute 3 points among Strength, Dexterity, and Intelligence
3. **Perks** - Choose 2 perks (configurable) from available options

All three must be completed to start the game.

### Stats
- **Strength**: Physical power and combat
- **Dexterity**: Agility and reflexes
- **Intelligence**: Mental acuity and knowledge
- **Health**: 5 points (can be modified by story)
- **Mental Health**: 5 points (sanity system)

### Perks System
- Defined in JSON with `id`, `name`, and `description`
- Can be used as requirements for story choices
- Players choose a configurable number during character creation
- Example perks: Strong Back (+3 inventory), Night Vision, Medic, Lockpicker

### Inventory System
- Max capacity: `Strength + 5` items
- Click items to view details, use them, or drop them
- Items can have effects (healing, stat bonuses, etc.)
- Visual icons and images for each item

### Dice Tests
- Visual dice rolling animation with Unicode symbols (⚀ ⚁ ⚂ ⚃ ⚄ ⚅)
- Sound effects on roll
- Clear display: `4 + 5 + 2 = 11`
- Success/failure with colored feedback (green/red)
- Automatic node branching (success → `node_id`, failure → `node_id_fail`)

## 🎨 Customization

### Themes
Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #f5f5f5;
    --accent: #3498db;
    /* ... more variables */
}

[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --accent: #5dade2;
    /* ... dark theme overrides */
}
```

### Adding Languages
1. Add a new language key in `story.json`
2. Translate all `nodes`, `items`, `perks`, and `ui` sections
3. Add language button in HTML menu

### Customizing Perks
Edit the `perks` array in each language section:

```json
"perks": [
  {
    "id": "unique_id",
    "name": "Perk Name",
    "description": "What it does and when it's useful"
  }
]
```

Change `perkPointsToSpend` in `main.js` to adjust how many perks players can choose.

### Credits
Edit the `credits` section in `story.json`:

```json
"credits": {
  "developer": "Your Name",
  "engine": "Custom Engine Name",
  "story": "Story Title",
  "year": "2025",
  "thanks": "Thank you message"
}
```

## 🛠️ Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript
- CSS Grid and Flexbox
- HTML5 Audio API
- LocalStorage API

### No Dependencies
- **Pure Vanilla JavaScript** - No frameworks required
- **No build tools** - Just open and play
- **No server needed** - Runs entirely client-side

### File Size
- Lightweight engine (~50KB total uncompressed)
- Story data scales with your content
- Images and audio are optional

## 📝 Example Story Included

The engine comes with a complete example adventure: **"L'Antica Cripta" / "The Ancient Crypt"**

Features demonstrated:
- Character creation with name and perks
- Stat-based tests (Strength, Intelligence, Dexterity)
- Inventory and item usage
- Conditional story branches based on items, flags, and perks
- Background music
- One-shot choices
- Multiple paths and endings
- Story node images
- Colored text and dialogue

## 🎯 Advanced Features

### Collapsible Sidebars
- Click the arrow buttons to hide left/right panels
- Center column expands automatically when sidebars are hidden
- States are saved and restored on page reload

### Story Images
Add visual atmosphere to any node:
```json
"node_id": {
  "text": "You enter a dark room...",
  "image": "src/images/dark_room.jpg"
}
```

### Background Music
Set ambient music per node:
```json
"node_id": {
  "music": "src/music/ambient.mp3"
}
```
Music loops automatically and transitions between nodes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Create new story templates
- Translate the UI to new languages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by classic gamebooks and interactive fiction
- Unicode dice symbols for visual feedback
- Community feedback and testing

## 📧 Contact

For questions, suggestions, or collaboration:
- GitHub Issues: [Create an issue](https://github.com/Z4RD0Z/librogame-engine/issues)
- Email: elaphe@outlook.it

---

**Built with ❤️ for storytellers and game creators**

🎮 Happy adventuring! 🎲
