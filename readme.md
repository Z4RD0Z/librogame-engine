# 🎮 Librogame Engine

A powerful, feature-rich engine for creating interactive text-based adventures and gamebooks (choose-your-own-adventure games) using vanilla HTML, CSS, and JavaScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)

## ✨ Features

### 🎲 Core Gameplay
- **RPG-style Character System** with customizable stats (Strength, Dexterity, Intelligence, Health, Mental Health)
- **2d6 Dice Rolling System** with visual animations and sound effects
- **Dynamic Inventory Management** with item descriptions, images, and usage
- **Conditional Branching** based on items, flags, and character stats
- **One-shot Choices** that disappear after being selected
- **Multiple Endings** and story paths

### 🌍 Internationalization
- **Full Multi-language Support** (Italian/English included)
- **JSON-based Story Format** for easy translation
- **Runtime Language Switching** without page reload

### 🎨 User Interface
- **Three-Column Layout**: Stats/Inventory | Story | Controls
- **Collapsible Sidebars** with smooth slide animations
- **Light/Dark Theme Toggle** with persistent preferences
- **Responsive Design** that works on desktop and mobile
- **Main Menu System** with New Game, Load Game, and Credits
- **Modal System** for items and dice rolls

### 🎵 Audio System
- **Background Music** per story node
- **Sound Effects** (dice rolling)
- **Volume Control** with persistent settings
- **Mute Toggle** for all audio

### 💾 Save System
- **LocalStorage Integration** for game saves
- **Save/Load Functionality** with full state preservation
- **Auto-save Theme** and audio preferences

## 📁 Project Structure

```
librogame-engine/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── story.json          # Story content and translations
├── js/
│   └── main.js         # Game engine logic
└── src/
    └── music/
        ├── dice.mp4              # Dice sound effect
        └── crypt_ambient.mp3     # Example background music
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
   - Add your own nodes, choices, and items

4. **Launch the game**
   - Open `index.html` in a web browser
   - No build process required!

## 📖 Creating Your Story

### Story Node Structure

```json
{
  "it": {
    "title": "Your Adventure Title",
    "nodes": {
      "node_id": {
        "text": "Story text goes here...",
        "music": "src/music/ambient.mp3",
        "choices": [
          {
            "text": "Choice text",
            "next": "next_node_id",
            "oneshot": true,
            "requirements": {
              "items": ["key_id"],
              "flags": ["flag_name"]
            },
            "test": {
              "stat": "strength",
              "difficulty": 9
            },
            "effects": {
              "health": -1,
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
    }
  }
}
```

### Item Types

- **`permanent`**: Stays in inventory forever
- **`consumable`**: Can be used multiple times
- **`consume`**: Removed after use (for requirements)

### Test Difficulties

- **7**: Easy test
- **9**: Medium test
- **12**: Hard/Impossible test

Formula: `2d6 + stat_value >= difficulty`

## 🎲 Game Mechanics

### Character Creation
Players distribute 3 points among Strength, Dexterity, and Intelligence at game start.

### Stats
- **Strength**: Physical power and combat
- **Dexterity**: Agility and reflexes
- **Intelligence**: Mental acuity and knowledge
- **Health**: 5 points (can be modified by story)
- **Mental Health**: 5 points (sanity system)

### Inventory System
- Max capacity: `Strength + 5`
- Click items to view details and use them
- Items can have effects (healing, stat bonuses, etc.)

### Dice Tests
- Visual dice rolling animation with Unicode symbols (⚀ ⚁ ⚂ ⚃ ⚄ ⚅)
- Sound effects on roll
- Success/failure with clear feedback
- Automatic node branching (success → node_id, failure → node_id_fail)

## 🎨 Customization

### Themes
Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #f5f5f5;
    --accent: #3498db;
    /* ... more variables */
}
```

### Adding Languages
1. Add a new language key in `story.json`
2. Translate all `nodes`, `items`, and `ui` sections
3. Add language button in HTML

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

## 📝 Example Story Included

The engine comes with a complete example adventure: **"The Ancient Crypt"**

Features demonstrated:
- Character creation
- Stat-based tests
- Inventory and item usage
- Conditional story branches
- Background music
- Multiple endings

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Create new story templates

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
