---
title: "L'Antica Cripta"
lang: it
credits:
  developer: "Il Tuo Nome"
  engine: "Librogame Engine v1.0"
  story: "L'Antica Cripta"
  year: "2025"
  thanks: "Grazie per aver giocato!"
---

# Perks

## strong_back | Schiena Forte
Puoi trasportare 3 oggetti in più

## night_vision | Visione Notturna
Vedi meglio al buio, bonus in luoghi oscuri

## medic | Medico
Le pozioni curano il doppio

## lockpicker | Scassinatore
Puoi aprire serrature senza chiavi

# Items

## torch | Torcia | 🔦
> Una vecchia torcia di legno che emette una luce fioca ma sufficiente per illuminare i luoghi bui della cripta.
- image: https://via.placeholder.com/300x200/FFA500/FFFFFF?text=Torcia
- usable: false

## silver_key | Chiave d'Argento | 🔑
> Una piccola chiave d'argento finemente lavorata. Sembra appartenere a una serratura importante.
- image: https://via.placeholder.com/300x200/C0C0C0/000000?text=Chiave+Argento
- usable: false

## potion | Pozione Curativa | 🧪
> Una pozione di colore rosso rubino che emana un leggero calore. Può ripristinare 2 punti vita.
- image: https://via.placeholder.com/300x200/DC143C/FFFFFF?text=Pozione
- usable: true
- effects: health +2
- useMessage: "Bevi la pozione e senti le tue ferite guarire. +2 Vita!"

## scroll | Pergamena Antica | 📜
> Un'antica pergamena con rune misteriose. Contiene conoscenze dimenticate da tempo.
- image: https://via.placeholder.com/300x200/F5DEB3/8B4513?text=Pergamena
- usable: false

# Nodes

## start
Ti trovi [red:davanti all'ingresso di un'antica cripta].Senti tuonare nel vuoto:{red:Alt! Chi va là?} .Le porte di pietra sono socchiuse e un vento freddo ne esce. Cosa fai?

- Entra con cautela -> entrance {flags: entered_crypt}
- Cerca di forzare le porte completamente (Test Forza) -> force_door {test: strength 7}
- Esamina l'ingresso prima di entrare (Test Intelligenza) -> examine {test: intelligence 7}

## force_door
Con uno sforzo possente, spingi le porte che si aprono completamente rivelando l'interno. Tuttavia, lo sforzo ti ha stancato.

- Continua nell'esplorazione -> entrance {health: -1} {flags: doors_opened}

## force_door_fail
Spingi con tutte le tue forze ma le porte non cedono. Ti fai male alla spalla nel tentativo.

- Entra dalla fessura -> entrance {health: -1}

## examine
Esaminando attentamente l'ingresso noti strani simboli incisi sulla pietra. Riconosci rune di protezione. Trovi anche una vecchia torcia ancora utilizzabile!

- Prendi la torcia ed entra -> entrance {items: torch/Torcia/permanent} {flags: has_knowledge}

## examine_fail
Osservi l'ingresso ma non noti nulla di particolare. L'atmosfera inquietante ti mette a disagio.

- Entra comunque -> entrance {sanity: -1}

## entrance
<!-- music: src/music/crypt_ambient.mp3 loop -->
Sei nell'atrio della cripta. L'oscurità è quasi totale. A sinistra vedi un corridoio, a destra un'altra porta chiusa.

- Vai a sinistra nel corridoio -> corridor {flags: went_left}
- Prova ad aprire la porta a destra -> locked_door {oneshot}
- Illumina l'ambiente con la torcia -> entrance_lit {requires: torch} {oneshot}
- Ascolta i sussurri nell'atrio (solo prima di andare a sinistra) -> entrance {requires: !went_left}

## entrance_lit
La luce della torcia rivela dettagli nascosti: sul pavimento noti una piccola chiave d'argento!

- Raccogli la chiave -> entrance {items: silver_key/Chiave d'Argento/permanent} {oneshot}
- Lascia la chiave e prosegui -> entrance

## locked_door
La porta è chiusa a chiave. Sembra richiedere una chiave d'argento.

- Usa la chiave d'argento -> treasure_room {requires: silver_key} {consume: silver_key/Chiave d'Argento}
- Torna indietro -> entrance

## treasure_room
<!-- music: src/music/treasure.mp3 -->
La porta si apre rivelando una piccola stanza del tesoro! Trovi una pozione curativa e un'antica pergamena.

- Prendi tutto -> victory {items: potion/Pozione Curativa/consumable, scroll/Pergamena Antica/permanent}

## corridor
Il corridoio è stretto e buio. Senti rumori inquietanti provenire dalla profondità.

- Prosegui con coraggio -> deep_crypt {test: dexterity 9}
- Torna all'atrio -> entrance

## deep_crypt
Avanzi silenziosamente evitando trappole nascoste. Raggiungi una camera sepolcrale con un antico sarcofago.

- Apri il sarcofago -> victory

## deep_crypt_fail
Fai cadere una pietra che attiva una trappola! Frecce ti colpiscono.

- Continua ferito -> deep_crypt {health: -2}

## victory
Congratulazioni! Hai completato l'esplorazione della cripta e sei sopravvissuto. Hai scoperto antichi segreti!
