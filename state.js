console.log("State loaded");

// HTML Elements
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highscore"); 
const startScreen = document.getElementById("start-screen");
const glitchBtn = document.getElementById("glitch-btn");
const floor = document.getElementById("floor");

// Game Settings
let floorY = window.innerHeight * 0.7;
let game_speed = 6;    
let gravity = 0.8;    

// Variables
let y_position = floorY - 50; 
let y_velocity = 0;   
let obstacle_x = window.innerWidth; 
let score = 0;
let isGameRunning = false; 

// Init
obstacle.style.top = (floorY - 60) + "px"; 
let highScore = localStorage.getItem('glitchRunnerHighScore') || 0;
highScoreDisplay.innerText = "BEST: " + highScore;

// Resize Handler
window.addEventListener('resize', () => {
    floorY = window.innerHeight * 0.7; 
    if(y_position > floorY - 50) y_position = floorY - 50;
});