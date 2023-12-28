// Game variables
let canvas, ctx;
let player, enemies;
let startTime, elapsedTime;
let playerSpeed = 8; // Adjust the player speed
let enemySpeed = 1;  // Adjust the enemy speed
let isGameOver = false;

// Initialize the game
function init() {

    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // Set canvas size to the entire window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create player
    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 20,
        color: "blue",
        speed: playerSpeed,
    };

    // Create enemies
    enemies = [];
    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 15,
            color: "red",
            speed: enemySpeed,
        });
    }

    // Set up event listeners
    document.addEventListener("keydown", handleKeyDown);

    // Record start time
    startTime = Date.now();

    // Start the game loop
    gameLoop();
}

// Handle key presses
function handleKeyDown(event) {
    // Move player with arrow keys
    if (!isGameOver) {
        switch (event.key) {
            case "ArrowUp":
                player.y -= player.speed;
                break;
            case "ArrowDown":
                player.y += player.speed;
                break;
            case "ArrowLeft":
                player.x -= player.speed;
                break;
            case "ArrowRight":
                player.x += player.speed;
                break;
        }
    }
}

// Update game objects
function update() {
    if (!isGameOver) {
        // Update elapsed time
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);

        // Check for collisions with enemies
        for (let enemy of enemies) {
            if (
                player.x < enemy.x + enemy.size &&
                player.x + player.size > enemy.x &&
                player.y < enemy.y + enemy.size &&
                player.y + player.size > enemy.y
            ) {
                // Collision detected, stop the game
                isGameOver = true;
            }

            // Move enemies
            if (player.x < enemy.x) enemy.x -= enemy.speed;
            if (player.x > enemy.x) enemy.x += enemy.speed;
            if (player.y < enemy.y) enemy.y -= enemy.speed;
            if (player.y > enemy.y) enemy.y += enemy.speed;
        }
    }
}



// Update game objects
function update() {
    if (!isGameOver) {
        // Update elapsed time
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);

        // Check for collisions with enemies
        for (let i = 0; i < enemies.length; i++) {
            for (let j = 0; j < enemies.length; j++) {
                if (i !== j) {
                    while (isOverlap(enemies[i], enemies[j])) {
                        // If enemies overlap, reposition one of them
                        enemies[i].x = Math.random() * canvas.width;
                        enemies[i].y = Math.random() * canvas.height;
                    }
                }
            }

            // Move enemies
            if (player.x < enemies[i].x) enemies[i].x -= enemies[i].speed;
            if (player.x > enemies[i].x) enemies[i].x += enemies[i].speed;
            if (player.y < enemies[i].y) enemies[i].y -= enemies[i].speed;
            if (player.y > enemies[i].y) enemies[i].y += enemies[i].speed;
        }

        // Check for collisions with enemies
        for (let enemy of enemies) {
            if (
                player.x < enemy.x + enemy.size &&
                player.x + player.size > enemy.x &&
                player.y < enemy.y + enemy.size &&
                player.y + player.size > enemy.y
            ) {
                // Collision detected, stop the game
                isGameOver = true;
            }
        }
    }
}

// Function to check if two objects overlap
function isOverlap(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.size &&
        obj1.x + obj1.size > obj2.x &&
        obj1.y < obj2.y + obj2.size &&
        obj1.y + obj1.size > obj2.y
    );
}


// Draw game objects
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isGameOver) {
        // Draw player
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);

        // Draw enemies
        for (let enemy of enemies) {
            ctx.fillStyle = enemy.color;
            ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        }

        // Draw timer
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Time: " + elapsedTime + "s", 10, 30);
    } else {
        // Draw game over message
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over! Time: " + elapsedTime + "s", canvas.width / 2 - 150, canvas.height / 2);
    }
}

// The game loop
function gameLoop() {
    update();
    draw();
    if (!isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}





// Start the game when the window loads
window.onload = init;
