console.log("Controls loaded");

document.addEventListener("keydown", function(event) {
    if (event.code === "Enter") startGame();
    if (event.code === "Space") doJump();
    if (event.code === "KeyG") toggleGlitch();
});

document.addEventListener("touchstart", function(event) {
    if (event.target !== glitchBtn) {
        if (!isGameRunning) startGame();
        else doJump();
    }
});

glitchBtn.addEventListener("touchstart", function(e) { e.stopPropagation(); toggleGlitch(); });
glitchBtn.addEventListener("mousedown", function(e) { e.stopPropagation(); toggleGlitch(); });