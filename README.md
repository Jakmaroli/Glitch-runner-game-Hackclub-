# 🏃‍♂️ GLITCH RUNNER

**A Cyberpunk Infinite Runner built with Modular Vanilla JavaScript.**

> "Run fast, jump high, and glitch the system."

## 🎮 Play the Game
https://jakmaroli.github.io/Glitch-runner-game-Hackclub-/

## 🕹️ Controls
| Platform | Action | Control |
| :--- | :--- | :--- |
| **PC** | **Jump** | `[SPACEBAR]` |
| **PC** | **Glitch Mode** | `[G]` Key |
| **Mobile** | **Jump** | Tap Anywhere |
| **Mobile** | **Glitch Mode** | Tap `GLITCH` Button |

## 🌟 Features
* **Physics Engine:** Custom gravity and collision detection built from scratch.
* **Glitch Mechanic:** Toggle "Moon Gravity" on the fly to survive impossible jumps.
* **Procedural Obstacles:** Random generation of Walls, Rocks, and Flying Drones.
* **Synthesized Audio:** Real-time sound generation using the Web Audio API (No MP3 files).
* **Responsive Design:** Fully playable on Desktop and Mobile devices.
* **High Score System:** Saves your best run using LocalStorage.

## 📂 Modular Code Structure
This project demonstrates **Separation of Concerns** by splitting logic into specialized files:

* `index.html` - The Game Container and Asset Loader.
* `style.css` - Cyberpunk visual styling and animations (`will-change` optimization).
* `state.js` - Global variables, settings, and state management.
* `engine.js` - The Core: Physics calculations, Audio synthesis, and the Main Game Loop.
* `controls.js` - Input handling for Keyboard and Touch events.

## 🚀 How to Run Locally
1.  **Download** or Clone this repository.
2.  **Open** the `GlitchRunner` folder.
3.  **Double-click** `index.html` to launch it in your default browser.
    * *Note: No server installation required.*

## 🛠️ Tech Stack
* **HTML5**
* **CSS3** (Flexbox, Animations)
* **JavaScript (ES6+)**
* **Web Audio API**

---
*Created by [Your Name]*