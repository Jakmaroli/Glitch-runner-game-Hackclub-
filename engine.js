console.log("Engine loaded");
// 1. Define the variable, but don't create the Audio Context yet!
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        // Only create it when the user interacts
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(type) {
    // Safety check: If audio isn't ready, don't crash
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } 
    else if (type === 'glitch') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start(); osc.stop(audioCtx.currentTime + 0.15);
    }
    else if (type === 'crash') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    }
}

function doJump() {
    if (y_position >= floorY - 55) {
        y_velocity = -20; 
        playSound('jump');
    }
}

function toggleGlitch() {
    document.body.classList.toggle("glitch-mode");
    playSound('glitch');
    if (gravity === 0.8) gravity = 0.1; 
    else gravity = 0.8; 
}

function startGame() {
    if (!isGameRunning) {
        // 2. Initialize Audio HERE (When user clicks)
        initAudio();
        
        isGameRunning = true;
        startScreen.style.display = "none";
        
        // Reset Variables
        floorY = floor.getBoundingClientRect().top;
        y_position = floorY - 50;
        obstacle.style.top = (floorY - 60) + "px"; 
        obstacle_x = window.innerWidth;
        score = 0;
        game_speed = 6;
        scoreDisplay.innerText = "SCORE: 0";
        
        gameLoop();
    }
}

function gameLoop() {
    if (isGameRunning === false) return; 

    y_velocity += gravity;
    y_position += y_velocity;

    if (y_position > floorY - 50) { y_position = floorY - 50; y_velocity = 0; }
    if (y_position < 0) { y_position = 0; y_velocity = 0; }

    obstacle_x -= game_speed; 

    // Spawn & Logic
    if (obstacle_x < -50) {
        obstacle_x = window.innerWidth; 
        game_speed += 0.5; 
        score++;
        scoreDisplay.innerText = "SCORE: " + score;

        let rand = Math.random();
        obstacle.style.width = "30px"; 

        if (rand < 0.33) { // Wall
            obstacle.style.height = "100px"; 
            obstacle.style.top = (floorY - 100) + "px"; 
            obstacle.style.backgroundColor = "#bc13fe"; 
            obstacle.style.boxShadow = "none"; 
        } 
        else if (rand < 0.66) { // Rock
            obstacle.style.height = "60px";
            obstacle.style.top = (floorY - 60) + "px"; 
            obstacle.style.backgroundColor = "#00f3ff"; 
            obstacle.style.boxShadow = "none";
        } 
        else { // Drone
            obstacle.style.height = "40px"; 
            obstacle.style.width = "40px"; 
            obstacle.style.top = (floorY - 140) + "px"; 
            obstacle.style.backgroundColor = "#ff5500"; 
            obstacle.style.boxShadow = "none";
        }
    }

    player.style.top = y_position + "px";
    obstacle.style.left = obstacle_x + "px";

    // Collision
    let playerRect = player.getBoundingClientRect();
    let obstRect = obstacle.getBoundingClientRect();

    if (
        playerRect.right > obstRect.left + 20 && 
        playerRect.left < obstRect.right - 20 && 
        playerRect.bottom > obstRect.top + 15 &&
        playerRect.top < obstRect.bottom - 15
    ) {
        isGameRunning = false;
        playSound('crash');

        if (score > highScore) {
            highScore = score;
            localStorage.setItem('glitchRunnerHighScore', highScore);
            alert("NEW RECORD! Score: " + score);
        } else {
            alert("GAME OVER. Score: " + score);
        }
        location.reload(); 
    }

    requestAnimationFrame(gameLoop);
}