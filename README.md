# YesNo-AliceSkill
Multifunctional multilanguage Yes or No minigame for Alice audiostation.

## Description
A compact interactive minigame for Alice smart speaker or local console testing.
Players make decisions using only "yes" or "no" responses to progress through the story.
Supports multiple endings and tracks discovered endings locally.
*Warning: requires "express" and "yandex-dialogs-sdk" to work!*

## Features
- Console mode for local testing;
- JSON-based scenario structure for (`quest.js`);
- Persistent progress tracking (`progress.json`);
- Multi-ending branching story with optional replay.

## Files
- `index.js` - main entry point for Alice skill.
- `consolegame.js` - local console version for testing.
- `quest.js` - scenario and branching data.
- `progress.json` - saved progress of discovered endings.
- `README.md` - this file.

## How to Start?
1. Install [Node.js](https://nodejs.org) (v14+ recommended) AND following dependencies:
-  [express](https://www.npmjs.com/package/express)
-  [yandex-dialogs-sdk](https://www.npmjs.com/package/yandex-dialogs-sdk)
2. Clone and download this repository from here;
3. Open terminal, inside project folder;
4. Install dependencies manually:
   ```bash
   npm install express yandex-dialogs-sdk
5. Run the project for **console testing**:
   ```bash
   node index.js
   *Console works as additional setup for Alice device*
6. For Alice skill deployment, configure `index.js` on your server and set up the Yandex Dialogs webhook.

## Notes:
- This repository **does not include** `node_modules` **and** `package.json`, to avoid GitHub restrictions.
- User **must manually install dependencies**, it's normal for Node.js projects.
- The console mode works independently and does NOT require Alice or any audio station.

**Current version:** 1.0;
