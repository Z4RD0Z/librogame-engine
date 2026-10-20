---
title: Character Creation
description: Name, stats, and perk selection before the adventure starts.
sidebar_position: 1
---

# Character Creation

Before the story begins, the player creates a character in three steps.

## 1. Name

The player enters a name for the character. The name is stored in the game state and preserved by the save system.

## 2. Stats

The player distributes **3 points** among:

- Strength
- Dexterity
- Intelligence

## 3. Perks

The player chooses a configurable number of perks from the available list. The example project uses **1 perk** by default.

Perks can unlock unique story paths through choice requirements.

## Starting the game

All three steps must be completed before the adventure can start. The engine validates the name, the stat distribution, and the perk selection.

## Configuration

The number of perk points is controlled by `perkPointsToSpend` in `js/main.js`. See [Stats and Perks](./stats-and-perks) for the perk definition format.
