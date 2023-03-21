const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//INITIALIZE VARIABLES
let x = canvas.width / 2;
let y = canvas.height / 2;
const ballRadius = 10;
const bulletWidth = 5;
const bulletHeight = 20;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let dx = 0;
let dy = 0;
let spacePressed = 32;
let bullets = [];
let shooting = false;
let delay = 200;
let lastShot = 0;
let enemies = [];
let rectangleEnemyLength = 50;
let rectangleEnemyWidth = 50;
let rectangleEnemyCooldown = 0;
let rectangledelay = 1000;

//POPULATE ARRAYS
for (i = 0; i < 20; i++) {
  bullets[i] = [];
  for (j = 0; j < 5; j++) {
    bullets[i][j] = { shooting: false, shot: false, x: 0, y: 0 };
  }
}

for (i = 0; i < 20; i++) {
  enemies[i] = [];
  for (j = 0; j < 5; j++) {
    enemies[i][j] = { x: 0, y: 0, status: false, moving: false, hits: 0 };
  }
}

//create instructions for drawing player;
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//Create and draw bullets
function createBullet() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 5; j++) {
      if (bullets[i][j].shot == true && bullets[i][j].shooting == false) {
        bullets[i][j].shooting = true;
        bullets[i][j].x = x;
        bullets[i][j].y = y;
        shooting = false;
      } else if (bullets[i][j].shot == true && bullets[i][j].shooting == true) {
        bullets[i][j].y -= 3;
      }
      if (bullets[i][j].y < 0 && bullets[i][j].shooting == true) {
        bullets[i][j].shot = false;
        bullets[i][j].shooting = false;
      }
      if (bullets[i][j].shot == true) {
        ctx.beginPath();
        ctx.rect(bullets[i][j].x, bullets[i][j].y, bulletWidth, bulletHeight);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

//Set an enemy to active status everytime cooldown is over
function setEnemies() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 5; j++) {
      if (enemies[i][j].status == false) {
        if (rectangleEnemyCooldown >= Date.now() - rectangledelay) {
          return;
        } else {
          enemies[i][j].status = true;
          enemies[i][j].hits = 0;
          rectangleEnemyCooldown = Date.now();
        }
      }
    }
  }
}

//create and draw enemies
function createEnemies() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 5; j++) {
      if (enemies[i][j].status == true && enemies[i][j].moving == false) {
        enemies[i][j].x = Math.floor(
          Math.random() * (canvas.width - rectangleEnemyWidth) + 1
        );
        enemies[i][j].y = 0;
        enemies[i][j].moving = true;
      } else if (enemies[i][j].status == true && enemies[i][j].moving == true) {
        enemies[i][j].y += 1;
      }
      if (enemies[i][j].y == canvas.height) {
        enemies[i][j].status = false;
        enemies[i][j].moving = false;
      }
      if (enemies[i][j].status == true) {
        ctx.beginPath();
        ctx.rect(
          enemies[i][j].x,
          enemies[i][j].y,
          rectangleEnemyWidth,
          rectangleEnemyLength
        );
        if (enemies[i][j].hits == 0) {
          ctx.fillStyle = "#228B22";
        } else if (enemies[i][j].hits == 1) {
          ctx.fillStyle = "#FFFF00";
        } else if (enemies[i][j].hits == 2) {
          ctx.fillStyle = "#8b0000";
        }
      }
      ctx.fill();
      ctx.closePath();
    }
  }
}

function detectCollisions() {
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 5; j++) {
      for (q = 0; q < 20; q++) {
        for (p = 0; p < 5; p++) {
          if (
            bullets[q][p].x > enemies[i][j].x &&
            bullets[q][p].x < enemies[i][j].x + rectangleEnemyWidth &&
            bullets[q][p].y > enemies[i][j].y &&
            bullets[q][p].y < enemies[i][j].y + rectangleEnemyLength &&
            bullets[q][p].shot == true &&
            enemies[i][j].status == true
          ) {
            enemies[i][j].hits++;
            bullets[q][p].shot = false;
            bullets[q][p].shooting = false;
            if (enemies[i][j].hits == 3) {
              enemies[i][j].status = false;
              enemies[i][j].moving = false;
            }
          }
        }
      }
    }
  }
}

//draw player
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  createBullet();
  setEnemies();
  createEnemies();
  detectCollisions();
  x += dx;
  y += dy;
  dx = 0;
  dy = 0;
  if (rightPressed == true) {
    dx = 3;
  }
  if (leftPressed == true) {
    dx = -3;
  }
  if (upPressed == true) {
    dy = -3;
  }
  if (downPressed == true) {
    dy = 3;
  }
  if (shooting == true) {
    let found = false;
    for (i = 0; i < 20; i++) {
      for (j = 0; j < 5; j++) {
        if (bullets[i][j].shot == false) {
          bullets[i][j].shot = true;
          found = true;
        }
        if (found == true) {
          break;
        }
      }
      if (found == true) {
        break;
      }
    }
  }
  requestAnimationFrame(draw);
}
//LISTEN FOR KEY PRESSES
document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);

// HANDLE MOVEMENT
function keyDown(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  } else if (e.key == " " || e.keycode == spacePressed) {
    if (lastShot >= Date.now() - delay) {
      shooting = false;
    } else {
      lastShot = Date.now();
      shooting = true;
    }
  }
}

function keyUp(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  } else if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  } else if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  } else if (e.key == " " || e.keyCode == spacePressed) {
    shooting = false;
  }
}

draw();
