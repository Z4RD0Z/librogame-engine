#!/usr/bin/env python3
"""
md2storyconvert.py — Markdown to story.json converter for librogame-engine.

Converts a Markdown file with a custom syntax into the JSON format
consumed by the librogame-engine. Currently supports Italian (it) only.

Usage:
    python3 md2storyconvert.py story.md                # output to stdout
    python3 md2storyconvert.py story.md -o story.json  # output to file

Markdown syntax reference:
    See story.md for a complete example.

Sections (H1 headings):
    # Perks    — character perks
    # Items    — item catalog
    # Nodes    — story graph

Frontmatter (YAML-like, between --- delimiters):
    title, lang, credits (developer, engine, year, thanks)

Perks:    ## perk_id | Perk Name
          Description paragraph

Items:    ## item_id | Item Name | 🔦
          > Description blockquote
          - image: url
          - usable: true/false
          - effects: health +2
          - useMessage: "text"

Nodes:    ## node_id
          <!-- music: path [loop] -->
          <!-- image: path -->
          Narrative text (can be multi-line, joined with spaces)

          - Choice text -> target_node {annotations}

Choice annotations (multiple allowed, each in {}):
    {flags: flag1, flag2}       — set flags
    {health: -1}                — modify health
    {sanity: -1}                — modify sanity
    {items: id/Name/type, ...}  — give items
    {consume: item_id}          — consume item (type=consume)
    {test: stat difficulty}     — stat test (expects node_id_fail node)
    {requires: item_id}         — require item
    {requires: !flag_name}      — require flag NOT set
    {oneshot}                   — choice can only be picked once
"""

import argparse
import json
import re
import sys

# ── Default Italian UI strings ──────────────────────────────────────────────

DEFAULT_UI_IT = {
    "stats": "Statistiche",
    "inventory": "Inventario",
    "controls": "Controlli",
    "language": "Lingua",
    "theme": "Tema",
    "save": "Salvataggio",
    "strength": "Forza",
    "dexterity": "Destrezza",
    "intelligence": "Intelligenza",
    "health": "Vita",
    "sanity": "Salute Mentale",
    "inventoryEmpty": "Inventario vuoto",
    "capacity": "Capacità",
    "saveGame": "Salva Partita",
    "loadGame": "Carica Partita",
    "newGame": "Nuova Partita",
    "lightTheme": "Tema Chiaro",
    "darkTheme": "Tema Scuro",
    "charCreation": "Creazione Personaggio",
    "charDescription": "Distribuisci 3 punti tra Forza, Destrezza e Intelligenza",
    "pointsRemaining": "Punti rimanenti",
    "startAdventure": "Inizia Avventura",
    "requires": "Richiede",
    "test": "Test",
    "useItem": "Usa",
    "dropItem": "Elimina",
    "confirmDrop": "Sei sicuro di voler eliminare questo oggetto?",
    "audio": "Audio",
    "musicOn": "Attiva Audio",
    "musicOff": "Disattiva Audio",
    "volume": "Volume",
    "menuNewGame": "Nuova Partita",
    "menuLoadGame": "Carica Partita",
    "menuCredits": "Crediti",
    "credits": "Crediti",
    "back": "Indietro",
    "developer": "Sviluppato da",
    "engine": "Engine",
    "storyLabel": "Storia",
    "year": "Anno",
    "noSaveFound": "Nessun salvataggio trovato!",
    "confirmRestart": "Sei sicuro di voler tornare al menu principale?",
    "testSuccess": "Successo",
    "testFailed": "Fallimento",
    "needed": "Serviva",
    "perkPoints": "Punti vantaggi",
    "characterName": "Nome Personaggio",
    "perksTitle": "Vantaggi",
    "perksDescription": "Scegli 2 vantaggi",
    "mobileNavStats": "Stats",
    "mobileNavStory": "Storia",
    "mobileNavControls": "Menu",
}


# ── Frontmatter parser ──────────────────────────────────────────────────────

def parse_frontmatter(text):
    """Parse YAML-like frontmatter between --- delimiters. Returns (metadata_dict, remaining_text)."""
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n', text, re.DOTALL)
    if not m:
        return {}, text

    fm_text = m.group(1)
    remaining = text[m.end():]
    meta = {}
    credits = {}
    current_block = None

    for line in fm_text.split('\n'):
        line_stripped = line.strip()
        if not line_stripped or line_stripped.startswith('#'):
            continue

        # Detect indented sub-key (belongs to current_block)
        if line.startswith('  ') and current_block is not None and ':' in line_stripped:
            key, val = line_stripped.split(':', 1)
            credits[key.strip()] = _unquote(val.strip())
            continue

        if ':' in line_stripped:
            key, val = line_stripped.split(':', 1)
            key = key.strip()
            val = val.strip()
            if key == 'credits':
                current_block = 'credits'
                continue
            else:
                current_block = None
                meta[key] = _unquote(val)

    if credits:
        meta['credits'] = credits
    return meta, remaining


def _unquote(s):
    """Remove surrounding quotes from a string value."""
    if len(s) >= 2 and s[0] == s[-1] and s[0] in ('"', "'"):
        return s[1:-1]
    return s


# ── Section splitter ────────────────────────────────────────────────────────

def split_sections(text):
    """Split text by H1 headings. Returns dict: section_name -> content."""
    sections = {}
    parts = re.split(r'^#\s+(.+)$', text, flags=re.MULTILINE)
    # parts = [before_first_h1, heading1, content1, heading2, content2, ...]
    for i in range(1, len(parts), 2):
        name = parts[i].strip()
        content = parts[i + 1] if i + 1 < len(parts) else ''
        sections[name] = content.strip()
    return sections


# ── Perks parser ────────────────────────────────────────────────────────────

def parse_perks(text):
    """Parse perks section. Returns list of {id, name, description}."""
    if not text:
        return []
    perks = []
    entries = re.split(r'^##\s+', text, flags=re.MULTILINE)
    for entry in entries:
        entry = entry.strip()
        if not entry:
            continue
        lines = entry.split('\n')
        header = lines[0].strip()
        # header: "perk_id | Perk Name"
        parts = [p.strip() for p in header.split('|')]
        if len(parts) < 2:
            _warn(f"Perk header malformed (expected 'id | name'): {header}")
            continue
        perk_id = parts[0]
        perk_name = parts[1]
        description = ' '.join(l.strip() for l in lines[1:] if l.strip()).strip()
        perks.append({"id": perk_id, "name": perk_name, "description": description})
    return perks


# ── Items parser ────────────────────────────────────────────────────────────

def parse_items(text):
    """Parse items section. Returns dict: item_id -> item_data."""
    if not text:
        return {}
    items = {}
    entries = re.split(r'^##\s+', text, flags=re.MULTILINE)
    for entry in entries:
        entry = entry.strip()
        if not entry:
            continue
        lines = entry.split('\n')
        header = lines[0].strip()
        parts = [p.strip() for p in header.split('|')]
        if len(parts) < 2:
            _warn(f"Item header malformed (expected 'id | name | icon'): {header}")
            continue
        item_id = parts[0]
        # name is stored in nodes/effects, not in items catalog
        icon = parts[2] if len(parts) >= 3 else ""

        item_data = {"icon": icon}

        for line in lines[1:]:
            stripped = line.strip()
            # Blockquote = description
            if stripped.startswith('>'):
                desc_text = stripped.lstrip('>').strip()
                item_data["description"] = desc_text
            # Property line
            elif stripped.startswith('- '):
                prop_line = stripped[2:].strip()
                if ':' in prop_line:
                    key, val = prop_line.split(':', 1)
                    key = key.strip()
                    val = val.strip()
                    if key == 'usable':
                        item_data['usable'] = val.lower() == 'true'
                    elif key == 'image':
                        item_data['image'] = val
                    elif key == 'useMessage':
                        item_data['useMessage'] = _unquote(val)
                    elif key == 'effects':
                        item_data['effects'] = _parse_item_effects(val)

        # Default usable to false if not set
        if 'usable' not in item_data:
            item_data['usable'] = False

        items[item_id] = item_data
    return items


def _parse_item_effects(val):
    """Parse item effects string like 'health +2' into dict."""
    effects = {}
    for part in val.split(','):
        part = part.strip()
        m = re.match(r'(\w+)\s+([+-]?\d+)', part)
        if m:
            effects[m.group(1)] = int(m.group(2))
    return effects


# ── Nodes parser ────────────────────────────────────────────────────────────

def parse_nodes(text):
    """Parse nodes section. Returns dict: node_id -> node_data."""
    if not text:
        return {}
    nodes = {}
    entries = re.split(r'^##\s+', text, flags=re.MULTILINE)
    for entry in entries:
        entry = entry.strip()
        if not entry:
            continue
        lines = entry.split('\n')
        node_id = lines[0].strip()

        node_data = {}
        text_lines = []
        choices = []

        for line in lines[1:]:
            stripped = line.strip()

            # HTML comment metadata
            m_music = re.match(r'<!--\s*music:\s*(\S+)\s*(loop)?\s*-->', stripped)
            m_image = re.match(r'<!--\s*image:\s*(\S+)\s*-->', stripped)

            if m_music:
                node_data['music'] = m_music.group(1)
                if m_music.group(2):
                    node_data['musicLoop'] = True
                else:
                    node_data['musicLoop'] = False
                continue
            elif m_image:
                node_data['image'] = m_image.group(1)
                continue

            # Choice line
            if stripped.startswith('- ') and '->' in stripped:
                choice = _parse_choice(stripped)
                if choice:
                    choices.append(choice)
                continue

            # Text line (skip blank lines, collect non-empty ones)
            if stripped:
                text_lines.append(stripped)

        node_data['text'] = ' '.join(text_lines) if text_lines else ''
        node_data['choices'] = choices
        nodes[node_id] = node_data

    return nodes


def _parse_choice(line):
    """Parse a choice line like '- Text -> node_id {annotations} {more}'."""
    # Remove leading '- '
    line = line[2:].strip()

    # Extract all {annotation} blocks
    annotations_raw = re.findall(r'\{([^}]+)\}', line)
    # Remove annotations from line to get text -> next
    clean = re.sub(r'\s*\{[^}]+\}', '', line).strip()

    # Split on ->
    if '->' not in clean:
        _warn(f"Choice missing '->': {line}")
        return None
    parts = clean.split('->', 1)
    choice_text = parts[0].strip()
    next_node = parts[1].strip()

    choice = {"text": choice_text, "next": next_node}
    effects = {}
    flags = []
    items_list = []

    for ann in annotations_raw:
        ann = ann.strip()

        # {oneshot}
        if ann.lower() == 'oneshot':
            choice['oneshot'] = True
            continue

        # {test: stat difficulty}
        m = re.match(r'test:\s*(\w+)\s+(\d+)', ann)
        if m:
            choice['test'] = {"stat": m.group(1), "difficulty": int(m.group(2))}
            continue

        # {requires: item_or_flag}
        m = re.match(r'requires:\s*(.+)', ann)
        if m:
            req_val = m.group(1).strip()
            if req_val.startswith('!'):
                # notFlags requirement
                flag_name = req_val[1:].strip()
                if 'requirements' not in choice:
                    choice['requirements'] = {}
                if 'notFlags' not in choice['requirements']:
                    choice['requirements']['notFlags'] = []
                choice['requirements']['notFlags'].append(flag_name)
            else:
                # item requirement
                if 'requirements' not in choice:
                    choice['requirements'] = {}
                if 'items' not in choice['requirements']:
                    choice['requirements']['items'] = []
                choice['requirements']['items'].append(req_val)
            continue

        # {flags: flag1, flag2}
        m = re.match(r'flags:\s*(.+)', ann)
        if m:
            for f in m.group(1).split(','):
                f = f.strip()
                if f:
                    flags.append(f)
            continue

        # {health: N} or {sanity: N}
        m = re.match(r'(health|sanity):\s*([+-]?\d+)', ann)
        if m:
            effects[m.group(1)] = int(m.group(2))
            continue

        # {items: id/Name/type, ...}
        m = re.match(r'items:\s*(.+)', ann)
        if m:
            for item_spec in m.group(1).split(','):
                item_spec = item_spec.strip()
                parts = item_spec.split('/')
                if len(parts) >= 3:
                    items_list.append({
                        "id": parts[0].strip(),
                        "name": parts[1].strip(),
                        "type": parts[2].strip(),
                    })
                elif len(parts) == 2:
                    items_list.append({
                        "id": parts[0].strip(),
                        "name": parts[1].strip(),
                        "type": "permanent",
                    })
                else:
                    _warn(f"Item spec malformed: {item_spec}")
            continue

        # {consume: item_id/Name}  — shorthand for consuming an item
        m = re.match(r'consume:\s*(.+)', ann)
        if m:
            for item_spec in m.group(1).split(','):
                item_spec = item_spec.strip()
                parts = item_spec.split('/')
                if len(parts) >= 2:
                    items_list.append({
                        "id": parts[0].strip(),
                        "name": parts[1].strip(),
                        "type": "consume",
                    })
                else:
                    items_list.append({
                        "id": parts[0].strip(),
                        "name": parts[0].strip(),
                        "type": "consume",
                    })
            continue

        _warn(f"Unknown annotation: {{{ann}}}")

    # Build effects dict
    if flags:
        effects['flags'] = flags
    if items_list:
        effects['items'] = items_list
    if effects:
        choice['effects'] = effects

    return choice


# ── JSON assembly ───────────────────────────────────────────────────────────

def assemble_json(meta, perks, items, nodes):
    """Assemble all parsed data into the final JSON structure."""
    lang = meta.get('lang', 'it')
    title = meta.get('title', 'Untitled')

    # Credits
    credits = meta.get('credits', {})
    if 'story' not in credits:
        credits['story'] = title

    # UI — use defaults, allow overrides
    ui = dict(DEFAULT_UI_IT)
    if 'ui' in meta and isinstance(meta['ui'], dict):
        ui.update(meta['ui'])

    lang_data = {
        "title": title,
        "perks": perks,
        "nodes": nodes,
        "items": items,
        "ui": ui,
        "credits": credits,
    }

    return {lang: lang_data}


# ── Validation ──────────────────────────────────────────────────────────────

def validate(data):
    """Validate the assembled data and print warnings."""
    warnings = []
    for lang, lang_data in data.items():
        nodes = lang_data.get('nodes', {})
        items_catalog = lang_data.get('items', {})
        all_node_ids = set(nodes.keys())

        for node_id, node in nodes.items():
            for i, choice in enumerate(node.get('choices', [])):
                next_id = choice.get('next', '')
                # Check broken links
                if next_id and next_id not in all_node_ids:
                    warnings.append(f"[{lang}] Node '{node_id}', choice {i+1}: "
                                    f"target '{next_id}' does not exist")

                # Check _fail nodes for tests
                if 'test' in choice:
                    fail_id = f"{next_id}_fail"
                    if fail_id not in all_node_ids:
                        warnings.append(f"[{lang}] Node '{node_id}', choice {i+1}: "
                                        f"test targets '{next_id}' but '{fail_id}' node is missing")

                # Check item references in requirements
                if 'requirements' in choice:
                    for item_id in choice['requirements'].get('items', []):
                        if item_id not in items_catalog:
                            warnings.append(f"[{lang}] Node '{node_id}', choice {i+1}: "
                                            f"requires item '{item_id}' not in items catalog")

                # Check item references in effects
                if 'effects' in choice:
                    for item in choice['effects'].get('items', []):
                        iid = item.get('id', '')
                        if iid and iid not in items_catalog:
                            warnings.append(f"[{lang}] Node '{node_id}', choice {i+1}: "
                                            f"gives item '{iid}' not in items catalog")

    for w in warnings:
        print(f"WARNING: {w}", file=sys.stderr)
    return len(warnings)


# ── Helpers ─────────────────────────────────────────────────────────────────

def _warn(msg):
    print(f"WARNING: {msg}", file=sys.stderr)


# ── Main ────────────────────────────────────────────────────────────────────

def convert(md_text):
    """Convert markdown text to story JSON dict."""
    meta, body = parse_frontmatter(md_text)
    sections = split_sections(body)

    perks = parse_perks(sections.get('Perks', ''))
    items = parse_items(sections.get('Items', ''))
    nodes = parse_nodes(sections.get('Nodes', ''))

    data = assemble_json(meta, perks, items, nodes)
    validate(data)
    return data


def main():
    parser = argparse.ArgumentParser(
        description='Convert Markdown story to librogame-engine JSON')
    parser.add_argument('input', help='Input Markdown file')
    parser.add_argument('-o', '--output', help='Output JSON file (default: stdout)')
    args = parser.parse_args()

    with open(args.input, 'r', encoding='utf-8') as f:
        md_text = f.read()

    data = convert(md_text)
    json_str = json.dumps(data, ensure_ascii=False, indent=2)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(json_str + '\n')
        print(f"Written to {args.output}", file=sys.stderr)
    else:
        print(json_str)


if __name__ == '__main__':
    main()
