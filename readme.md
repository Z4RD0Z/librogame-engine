# 🎮 Librogame Engine

![logo](assets/paper_&_dice_black.jpeg)

*“librogame (Italian term for gamebooks / interactive fiction)”*

A powerful, feature-rich engine for creating interactive text-based adventures and gamebooks (choose-your-own-adventure games) using vanilla HTML, CSS, and JavaScript.

![Version](https://img.shields.io/badge/version-2.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow.svg)

## ✨ Features

- **Character creation** with name, stats, and perks
- **2d6 dice tests** with animation, sound, and automatic failure nodes
- **Conditional branching** based on items, flags, perks, and stats
- **Inventory system** with descriptions, images, usage, and capacity
- **Colored text and dialogue boxes**
- **Multi-language stories** with runtime language switching
- **Light and dark themes**, responsive layout, and collapsible sidebars
- **Background music**, sound effects, and persistent audio settings
- **Save and load** through `localStorage`
- **Markdown story converter** included in `tools/`

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Z4RD0Z/librogame-engine.git
   cd librogame-engine
   ```

2. **Add your audio files**

   Place `dice.mp4` in `src/music/` and add any background tracks you want.

3. **Customize your story**

   Edit `story.json`, or write in Markdown and convert it with the bundled [Story Converter](https://z4rd0z.github.io/librogame-engine/tools/story-converter):

   ```bash
   python3 tools/story-converter/md2storyconvert.py \
     tools/story-converter/story.md -o story.json
   ```

4. **Launch the game**

   ```bash
   python -m http.server
   ```

   Then open `http://localhost:8000`. No build process is required.

## 📚 Documentation

Full documentation is available at **[z4rd0z.github.io/librogame-engine](https://z4rd0z.github.io/librogame-engine/)**:

- [Getting Started](https://z4rd0z.github.io/librogame-engine/getting-started/quick-start)
- [Story Authoring](https://z4rd0z.github.io/librogame-engine/authoring/story-structure)
- [Gameplay](https://z4rd0z.github.io/librogame-engine/gameplay/character-creation)
- [Customization](https://z4rd0z.github.io/librogame-engine/customization/themes)
- [Story Converter](https://z4rd0z.github.io/librogame-engine/tools/story-converter)
- [Technical Reference](https://z4rd0z.github.io/librogame-engine/reference/technical-details)

## 📁 Project Structure

```text
librogame-engine/
├── index.html          # Main HTML file
├── styles.css          # Engine styling
├── story.json          # Story content, items, perks, and translations
├── js/
│   ├── main.js         # Game engine logic
│   └── purify.min.js   # DOMPurify – HTML sanitization library
├── src/
│   ├── images/         # Story and item images
│   └── music/          # Background music and sound effects
├── tools/
│   └── story-converter/    # Optional Markdown authoring tool
└── website/            # Docusaurus documentation site
```

The engine release archive contains only `index.html`, `js/`, `styles.css`, `story.json`, and `LICENSE`. The documentation site and the story converter are not included.

## 📝 Example Story Included

The repository ships with a complete example adventure, **"L'Antica Cripta" / "The Ancient Crypt"**, demonstrating character creation, stat tests, inventory, conditional branches, music, one-shot choices, multiple endings, images, and colored text.

## 🤝 Contributing

Contributions are welcome: bug reports, feature suggestions, pull requests, story templates, and translations.

See the [Contributing guide](https://z4rd0z.github.io/librogame-engine/contributing) for details.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact

- GitHub Issues: [Create an issue](https://github.com/Z4RD0Z/librogame-engine/issues)
- Email: [elaphe@outlook.it](mailto:elaphe@outlook.it)

---

**Built with ❤️ for storytellers and game creators**

🎮 Happy adventuring! 🎲
