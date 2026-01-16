const game = {
    currentLang: 'it',
    currentNode: 'start',
    theme: 'light',
    storyData: null,
    
    audio: {
        music: null,
        dice: null,
        musicEnabled: true,
        volume: 0.5
    },
    
    panels: {
        left: true,
        right: true
    },
    
    state: {
        stats: {
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            health: 5,
            maxHealth: 5,
            sanity: 5,
            maxSanity: 5,
            
        },
        perks:[],
        inventory: [],
        flags: [],
        usedChoices: [],
        pointsToSpend: 3,
        perkPointsToSpend: 1
    },

    async init() {
        this.loadTheme();
        this.initAudio();
        this.loadPanelStates();
        await this.loadStoryData();
        this.updateMainMenu();
    },

    updateMainMenu() {
        const data = this.storyData[this.currentLang];
        document.getElementById('game-title').textContent = data.title;
        document.getElementById('menu-new-text').textContent = data.ui.menuNewGame || 'Nuova Partita';
        document.getElementById('menu-load-text').textContent = data.ui.menuLoadGame || 'Carica Partita';
        document.getElementById('menu-credits-text').textContent = data.ui.menuCredits || 'Crediti';
        
        // Evidenzia lingua attiva
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`lang-${this.currentLang}`).classList.add('active');
    },

    changeLanguageMenu(lang) {
        this.currentLang = lang;
        this.updateMainMenu();
        this.updateCreditsScreen();
    },

    newGame() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        this.showCharCreation();
    },

    loadGameFromMenu() {
        const saved = localStorage.getItem('gameSave');
        if (saved) {
            const data = JSON.parse(saved);
            this.state = data.state;
            this.currentNode = data.currentNode;
            this.currentLang = data.currentLang;
            document.getElementById('language-select').value = this.currentLang;
            
            document.getElementById('main-menu').classList.add('hidden');
            document.getElementById('game-container').classList.remove('hidden');
            document.getElementById('char-creation').classList.add('hidden');
            
            this.updateUI();
            this.displayNode(this.currentNode);
        } else {
            alert(this.storyData[this.currentLang].ui.noSaveFound || 'Nessun salvataggio trovato / No save found');
        }
    },

    showCredits() {
        document.getElementById('credits-screen').classList.remove('hidden');
        this.updateCreditsScreen();
    },

    hideCredits() {
        document.getElementById('credits-screen').classList.add('hidden');
    },

    updateCreditsScreen() {
        const ui = this.storyData[this.currentLang].ui;
        document.getElementById('credits-title').textContent = ui.credits || 'Crediti';
        document.getElementById('credits-back').textContent = ui.back || 'Indietro';
        
        const content = this.storyData[this.currentLang].credits || {
            developer: 'Your Name',
            engine: 'Librogame Engine v1.0',
            story: this.storyData[this.currentLang].title,
            year: '2025',
            thanks: 'Grazie per aver giocato!'
        };
        
        document.getElementById('credits-content').innerHTML = `
            <p><strong>${ui.developer || 'Developed by'}:</strong> ${content.developer}</p>
            <p><strong>${ui.engine || 'Engine'}:</strong> ${content.engine}</p>
            <p><strong>${ui.storyLabel || 'Story'}:</strong> ${content.story}</p>
            <p><strong>${ui.year || 'Year'}:</strong> ${content.year}</p>
            <br>
            <p>${content.thanks}</p>
        `;
    },

    loadPanelStates() {
        const leftState = localStorage.getItem('leftPanel');
        const rightState = localStorage.getItem('rightPanel');
        
        if (leftState !== null) {
            this.panels.left = leftState === 'true';
            if (!this.panels.left) {
                document.getElementById('left-panel').classList.add('hidden');
                document.getElementById('left-toggle-icon').textContent = '>';
            }
        }
        
        if (rightState !== null) {
            this.panels.right = rightState === 'true';
            if (!this.panels.right) {
                document.getElementById('right-panel').classList.add('hidden');
                document.getElementById('right-toggle-icon').textContent = '<';
            }
        }
        
        setTimeout(() => this.updateContainerLayout(), 100);
    },

    togglePanel(side) {
        const panel = document.getElementById(`${side}-panel`);
        const icon = document.getElementById(`${side}-toggle-icon`);
        
        this.panels[side] = !this.panels[side];
        localStorage.setItem(`${side}Panel`, this.panels[side]);
        
        if (this.panels[side]) {
            panel.classList.remove('hidden');
            icon.textContent = side === 'left' ? '<' : '>';
        } else {
            panel.classList.add('hidden');
            icon.textContent = side === 'left' ? '>' : '<';
        }
        
        this.updateContainerLayout();
    },

    updateContainerLayout() {
        const container = document.getElementById('game-container');
        container.classList.remove('left-collapsed', 'right-collapsed', 'both-collapsed');
        
        if (!this.panels.left && !this.panels.right) {
            container.classList.add('both-collapsed');
        } else if (!this.panels.left) {
            container.classList.add('left-collapsed');
        } else if (!this.panels.right) {
            container.classList.add('right-collapsed');
        }
    },

    initAudio() {
        // Inizializza l'audio per i dadi
        this.audio.dice = new Audio('src/music/dice.mp4');
        this.audio.dice.volume = this.audio.volume;
        
        // Carica le impostazioni audio salvate
        const savedMusicEnabled = localStorage.getItem('musicEnabled');
        const savedVolume = localStorage.getItem('audioVolume');
        
        if (savedMusicEnabled !== null) {
            this.audio.musicEnabled = savedMusicEnabled === 'true';
        }
        if (savedVolume !== null) {
            this.audio.volume = parseFloat(savedVolume);
        }
    },

    playDiceSound() {
        if (this.audio.musicEnabled && this.audio.dice) {
            this.audio.dice.currentTime = 0;
            this.audio.dice.volume = this.audio.volume;
            this.audio.dice.play().catch(e => console.log('Errore riproduzione suono dadi:', e));
        }
    },

    playMusic(musicPath) {
        if (!this.audio.musicEnabled) return;
        
        // Ferma la musica precedente se presente
        if (this.audio.music) {
            this.audio.music.pause();
            this.audio.music = null;
        }
        
        if (musicPath) {
            this.audio.music = new Audio(musicPath);
            this.audio.music.volume = this.audio.volume;
            this.audio.music.loop = true;
            this.audio.music.play().catch(e => console.log('Errore riproduzione musica:', e));
        }
    },

    toggleMusic() {
        this.audio.musicEnabled = !this.audio.musicEnabled;
        localStorage.setItem('musicEnabled', this.audio.musicEnabled);
        
        if (!this.audio.musicEnabled && this.audio.music) {
            this.audio.music.pause();
        } else if (this.audio.musicEnabled && this.audio.music) {
            this.audio.music.play().catch(e => console.log('Errore riproduzione musica:', e));
        }
        
        this.updateUI();
    },

    setVolume(value) {
        this.audio.volume = value;
        localStorage.setItem('audioVolume', value);
        
        if (this.audio.music) {
            this.audio.music.volume = value;
        }
        if (this.audio.dice) {
            this.audio.dice.volume = value;
        }
    },

    async loadStoryData() {
        try {
            const response = await fetch('story.json');
            this.storyData = await response.json();
        } catch (error) {
            console.error('Errore caricamento dati:', error);
            alert('Errore nel caricamento della storia. Verifica che story.json sia presente.');
        }
    },

    showCharCreation() {
        document.getElementById('char-creation').classList.remove('hidden');
        this.loadPerks();
        this.updateCharCreation();
    },

    loadPerks() {
        const perksData = this.storyData[this.currentLang].perks || [];
        const perksList = document.getElementById('perks-list');
        
        perksList.innerHTML = perksData.map(perk => `
            <div class="perk-item" data-perk-id="${perk.id}">
                <input type="checkbox" id="perk-${perk.id}" onchange="game.togglePerk('${perk.id}')">
                <label for="perk-${perk.id}">
                    <strong>${perk.name}</strong>
                    <p style="font-size: 0.85em; color: var(--text-secondary); margin: 2px 0 0 0;">${perk.description}</p>
                </label>
            </div>
        `).join('');
    },

    togglePerk(perkId) {
        const checkbox = document.getElementById(`perk-${perkId}`);
        
        if (checkbox.checked) {
            if (this.state.perkPointsToSpend > 0) {
                this.state.perks.push(perkId);
                this.state.perkPointsToSpend--;
            } else {
                checkbox.checked = false;
            }
        } else {
            const index = this.state.perks.indexOf(perkId);
            if (index > -1) {
                this.state.perks.splice(index, 1);
                this.state.perkPointsToSpend++;
            }
        }
        
        this.updateCharCreation();
    },

    adjustStat(stat, delta) {
        const current = this.state.stats[stat];
        const newValue = current + delta;
        
        if (delta > 0 && this.state.pointsToSpend <= 0) return;
        if (newValue < 0) return;
        
        this.state.stats[stat] = newValue;
        this.state.pointsToSpend -= delta;
        
        this.updateCharCreation();
    },

    updateCharCreation() {
        const ui = this.storyData[this.currentLang].ui;
        document.getElementById('points-display').textContent = 
            `${ui.pointsRemaining}: ${this.state.pointsToSpend}`;
        document.getElementById('perk-points-display').textContent = 
            `${ui.perkPoints || 'Punti vantaggi'}: ${this.state.perkPointsToSpend}`;
        document.getElementById('str-value').textContent = this.state.stats.strength;
        document.getElementById('dex-value').textContent = this.state.stats.dexterity;
        document.getElementById('int-value').textContent = this.state.stats.intelligence;
        
        const startBtn = document.getElementById('start-btn');
        const nameInput = document.getElementById('char-name-input');
        startBtn.disabled = this.state.pointsToSpend !== 0 || this.state.perkPointsToSpend !== 0 || !nameInput.value.trim();
    },

    startGame() {
        this.state.characterName = document.getElementById('char-name-input').value.trim();
        document.getElementById('char-creation').classList.add('hidden');
        this.updateUI();
        this.displayNode(this.currentNode);
    },

    displayNode(nodeId) {
        this.currentNode = nodeId;
        const node = this.storyData[this.currentLang].nodes[nodeId];
        
        // Riproduce la musica se specificata nel nodo
        if (node.music) {
            this.playMusic(node.music);
        }
        
        // Costruisce il contenuto con eventuale immagine
        let content = '';
        
        if (node.image) {
            content += `<img src="${node.image}" alt="Story scene" class="story-image">`;
        }
        
        content += `<p>${node.text}</p>`;
        
        document.getElementById('story-content').innerHTML = content;
        
        const choicesContainer = document.getElementById('choices-container');
        choicesContainer.innerHTML = '';
        
        node.choices.forEach((choice, index) => {
            if (choice.oneshot && this.state.usedChoices.includes(`${nodeId}_${index}`)) {
                return;
            }
            
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            
            const canUse = this.checkRequirements(choice);
            btn.disabled = !canUse.allowed;
            
            if (!canUse.allowed && canUse.reason) {
                const req = document.createElement('div');
                req.className = 'choice-requirements';
                req.textContent = canUse.reason;
                btn.appendChild(req);
            }
            
            btn.onclick = () => this.makeChoice(choice, nodeId, index);
            choicesContainer.appendChild(btn);
        });
    },

    checkRequirements(choice) {
        const ui = this.storyData[this.currentLang].ui;
        
        if (choice.requirements) {
            if (choice.requirements.items) {
                for (let itemId of choice.requirements.items) {
                    if (!this.state.inventory.find(i => i.id === itemId)) {
                        const itemName = choice.requirements.items.join(', ');
                        return { allowed: false, reason: `${ui.requires}: ${itemName}` };
                    }
                }
            }
            
            if (choice.requirements.flags) {
                for (let flag of choice.requirements.flags) {
                    if (!this.state.flags.includes(flag)) {
                        return { allowed: false, reason: `${ui.requires}: ${flag}` };
                    }
                }
            }
            
            if (choice.requirements.perks) {
                for (let perkId of choice.requirements.perks) {
                    if (!this.state.perks.includes(perkId)) {
                        const perkData = this.storyData[this.currentLang].perks.find(p => p.id === perkId);
                        const perkName = perkData ? perkData.name : perkId;
                        return { allowed: false, reason: `${ui.requires}: ${perkName}` };
                    }
                }
            }
        }
        
        return { allowed: true };
    },

    async makeChoice(choice, nodeId, index) {
        if (choice.oneshot) {
            this.state.usedChoices.push(`${nodeId}_${index}`);
        }
        
        let nextNode = choice.next;
        
        if (choice.test) {
            const result = await this.performTest(choice.test);
            if (!result.success) {
                nextNode = choice.next + '_fail';
            }
        }
        
        if (choice.effects) {
            this.applyEffects(choice.effects);
        }
        
        this.updateUI();
        this.displayNode(nextNode);
    },

    async performTest(test) {
        const ui = this.storyData[this.currentLang].ui;
        const statNames = {
            strength: ui.strength,
            dexterity: ui.dexterity,
            intelligence: ui.intelligence
        };
        
        return new Promise((resolve) => {
            const diceEl = document.getElementById('dice-roll');
            const displayEl = document.getElementById('dice-display');
            const resultEl = document.getElementById('dice-result');
            const testNameEl = document.getElementById('dice-test-name');
            
            testNameEl.textContent = `${ui.test} ${statNames[test.stat]}`;
            resultEl.textContent = '';
            diceEl.classList.remove('hidden');
            
            // Suono dei dadi
            this.playDiceSound();
            
            let count = 0;
            const interval = setInterval(() => {
                // Animazione dadi che rotolano
                const symbols = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
                const random1 = symbols[Math.floor(Math.random() * 6)];
                const random2 = symbols[Math.floor(Math.random() * 6)];
                displayEl.textContent = `${random1} ${random2}`;
                count++;
                
                if (count > 15) {
                    clearInterval(interval);
                    
                    const dice1 = Math.floor(Math.random() * 6) + 1;
                    const dice2 = Math.floor(Math.random() * 6) + 1;
                    const bonus = this.state.stats[test.stat];
                    const total = dice1 + dice2 + bonus;
                    const success = total >= test.difficulty;
                    
                    // Mostra simboli dei dadi finali
                    const finalSymbols = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
                    displayEl.innerHTML = `
                        <div style="font-size: 2em; margin-bottom: 10px;">
                            ${finalSymbols[dice1 - 1]} ${finalSymbols[dice2 - 1]}
                        </div>
                        <div style="font-size: 1.2em; color: var(--text-secondary);">
                            ${dice1} + ${dice2} ${bonus > 0 ? `+ ${bonus}` : ''} = ${total}
                        </div>
                    `;
                    
                    resultEl.innerHTML = success ? 
                        `<strong style="color: var(--success); font-size: 1.3em;">✅ ${ui.testSuccess || 'Successo'}!</strong>` : 
                        `<strong style="color: var(--danger); font-size: 1.3em;">❌ ${ui.testFailed || 'Fallimento'}</strong><br>
                         <span style="font-size: 0.9em;">(${ui.needed || 'Serviva'} ${test.difficulty})</span>`;
                    
                    setTimeout(() => {
                        diceEl.classList.add('hidden');
                        resolve({ success, total });
                    }, 2500);
                }
            }, 100);
        });
    },

    applyEffects(effects) {
        if (effects.health) {
            this.state.stats.health = Math.max(0, 
                Math.min(this.state.stats.maxHealth, 
                    this.state.stats.health + effects.health));
        }
        
        if (effects.sanity) {
            this.state.stats.sanity = Math.max(0, 
                Math.min(this.state.stats.maxSanity, 
                    this.state.stats.sanity + effects.sanity));
        }
        
        if (effects.items) {
            effects.items.forEach(item => {
                if (item.type === 'consume') {
                    const index = this.state.inventory.findIndex(i => i.id === item.id);
                    if (index !== -1) {
                        this.state.inventory.splice(index, 1);
                    }
                } else {
                    this.state.inventory.push(item);
                }
            });
        }
        
        if (effects.flags) {
            effects.flags.forEach(flag => {
                if (!this.state.flags.includes(flag)) {
                    this.state.flags.push(flag);
                }
            });
        }
    },

    updateUI() {
        const ui = this.storyData[this.currentLang].ui;
        
        document.getElementById('stats-title').textContent = ui.stats;
        document.getElementById('inventory-title').textContent = ui.inventory;
        document.getElementById('controls-title').textContent = ui.controls;
        document.getElementById('lang-title').textContent = ui.language;
        document.getElementById('theme-title').textContent = ui.theme;
        document.getElementById('save-title').textContent = ui.save;
        document.getElementById('audio-title').textContent = ui.audio || 'Audio';
        
        document.getElementById('stat-str').textContent = ui.strength;
        document.getElementById('stat-dex').textContent = ui.dexterity;
        document.getElementById('stat-int').textContent = ui.intelligence;
        document.getElementById('stat-health').textContent = ui.health;
        document.getElementById('stat-sanity').textContent = ui.sanity;
        
        document.getElementById('stat-str-val').textContent = this.state.stats.strength;
        document.getElementById('stat-dex-val').textContent = this.state.stats.dexterity;
        document.getElementById('stat-int-val').textContent = this.state.stats.intelligence;
        
        document.getElementById('stat-health-val').textContent = 
            `${this.state.stats.health}/${this.state.stats.maxHealth}`;
        document.getElementById('stat-sanity-val').textContent = 
            `${this.state.stats.sanity}/${this.state.stats.maxSanity}`;
        
        const healthPercent = (this.state.stats.health / this.state.stats.maxHealth) * 100;
        const healthBar = document.getElementById('health-bar');
        healthBar.style.width = healthPercent + '%';
        healthBar.className = 'stat-bar-fill';
        if (healthPercent <= 30) healthBar.classList.add('danger');
        else if (healthPercent <= 60) healthBar.classList.add('warning');
        
        const sanityPercent = (this.state.stats.sanity / this.state.stats.maxSanity) * 100;
        const sanityBar = document.getElementById('sanity-bar');
        sanityBar.style.width = sanityPercent + '%';
        sanityBar.className = 'stat-bar-fill';
        if (sanityPercent <= 30) sanityBar.classList.add('danger');
        else if (sanityPercent <= 60) sanityBar.classList.add('warning');
        
        const inventoryList = document.getElementById('inventory-list');
        if (this.state.inventory.length === 0) {
            inventoryList.innerHTML = `<div class="inventory-empty">${ui.inventoryEmpty}</div>`;
        } else {
            inventoryList.innerHTML = this.state.inventory.map((item, index) => {
                const itemData = this.storyData[this.currentLang].items[item.id];
                return `<div class="inventory-item" onclick="game.showItemModal('${item.id}', ${index})">
                    <span class="inventory-item-icon">${itemData.icon || '📦'}</span>
                    <span>${item.name}</span>
                </div>`;
            }).join('');
        }
        
        const maxCapacity = this.state.stats.strength + 5;
        document.getElementById('inventory-capacity').textContent = 
            `${ui.capacity}: ${this.state.inventory.length}/${maxCapacity}`;
        
        document.getElementById('save-btn').textContent = ui.saveGame;
        document.getElementById('load-btn').textContent = ui.loadGame;
        document.getElementById('reset-btn').textContent = ui.newGame;
        document.getElementById('theme-btn').textContent = 
            this.theme === 'light' ? ui.darkTheme : ui.lightTheme;
        
        // Aggiorna controlli audio
        const musicBtn = document.getElementById('music-toggle');
        if (musicBtn) {
            musicBtn.textContent = this.audio.musicEnabled ? 
                (ui.musicOff || 'Disattiva Audio') : 
                (ui.musicOn || 'Attiva Audio');
        }
        
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.value = this.audio.volume * 100;
        }
        
        const volumeLabel = document.getElementById('volume-label');
        if (volumeLabel) {
            volumeLabel.textContent = `${ui.volume || 'Volume'}: ${Math.round(this.audio.volume * 100)}%`;
        }
        
        document.getElementById('char-title').textContent = ui.charCreation;
        document.getElementById('char-description').textContent = ui.charDescription;
        document.getElementById('str-label').textContent = ui.strength;
        document.getElementById('dex-label').textContent = ui.dexterity;
        document.getElementById('int-label').textContent = ui.intelligence;
        document.getElementById('start-btn').textContent = ui.startAdventure;
    },

    showItemModal(itemId, inventoryIndex) {
        const itemData = this.storyData[this.currentLang].items[itemId];
        const item = this.state.inventory[inventoryIndex];
        
        document.getElementById('item-name').textContent = item.name;
        document.getElementById('item-description').textContent = itemData.description;
        document.getElementById('item-image').src = itemData.image || 'https://via.placeholder.com/300x200?text=No+Image';
        
        const actionsDiv = document.getElementById('item-actions');
        actionsDiv.innerHTML = '';
        
        if (itemData.usable) {
            const useBtn = document.createElement('button');
            useBtn.className = 'btn btn-primary';
            useBtn.textContent = this.storyData[this.currentLang].ui.useItem || 'Usa';
            useBtn.onclick = () => this.useItem(itemId, inventoryIndex);
            actionsDiv.appendChild(useBtn);
        }
        
        if (item.type === 'consumable' || item.type === 'permanent') {
            const dropBtn = document.createElement('button');
            dropBtn.className = 'btn btn-danger';
            dropBtn.textContent = this.storyData[this.currentLang].ui.dropItem || 'Elimina';
            dropBtn.onclick = () => this.dropItem(inventoryIndex);
            actionsDiv.appendChild(dropBtn);
        }
        
        document.getElementById('item-modal').classList.remove('hidden');
    },

    closeItemModal() {
        document.getElementById('item-modal').classList.add('hidden');
    },

    useItem(itemId, inventoryIndex) {
        const itemData = this.storyData[this.currentLang].items[itemId];
        
        if (itemData.effects) {
            this.applyEffects(itemData.effects);
        }
        
        const item = this.state.inventory[inventoryIndex];
        if (item.type === 'consumable') {
            this.state.inventory.splice(inventoryIndex, 1);
        }
        
        this.closeItemModal();
        this.updateUI();
        
        alert(itemData.useMessage || 'Oggetto usato!');
    },

    dropItem(inventoryIndex) {
        if (confirm(this.storyData[this.currentLang].ui.confirmDrop || 'Sei sicuro di voler eliminare questo oggetto?')) {
            this.state.inventory.splice(inventoryIndex, 1);
            this.closeItemModal();
            this.updateUI();
        }
    },

    changeLanguage(lang) {
        this.currentLang = lang;
        this.updateUI();
        this.displayNode(this.currentNode);
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateUI();
    },

    loadTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) {
            this.theme = saved;
            document.documentElement.setAttribute('data-theme', this.theme);
        }
    },

    saveGame() {
        const saveData = {
            state: this.state,
            currentNode: this.currentNode,
            currentLang: this.currentLang
        };
        localStorage.setItem('gameSave', JSON.stringify(saveData));
        alert(this.storyData[this.currentLang].ui.saveGame + ' ✓');
    },

    loadGame() {
        const saved = localStorage.getItem('gameSave');
        if (saved) {
            const data = JSON.parse(saved);
            this.state = data.state;
            this.currentNode = data.currentNode;
            this.currentLang = data.currentLang;
            document.getElementById('language-select').value = this.currentLang;
            document.getElementById('char-creation').classList.add('hidden');
            this.updateUI();
            this.displayNode(this.currentNode);
        } else {
            alert('Nessun salvataggio trovato / No save found');
        }
    },

    resetGame() {
        if (confirm(this.storyData[this.currentLang].ui.confirmRestart || 'Sei sicuro di voler ricominciare? / Are you sure you want to restart?')) {
            this.state = {
                stats: {
                    strength: 0,
                    dexterity: 0,
                    intelligence: 0,
                    health: 5,
                    maxHealth: 5,
                    sanity: 5,
                    maxSanity: 5
                },
                inventory: [],
                flags: [],
                usedChoices: [],
                pointsToSpend: 3,
                perksPointsToSpend:2 
            };
            this.currentNode = 'start';
            
            // Torna al menu principale
            document.getElementById('game-container').classList.add('hidden');
            document.getElementById('main-menu').classList.remove('hidden');
            this.updateMainMenu();
        }
    }
};

window.onload = () => game.init();