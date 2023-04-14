const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
//INITIALIZE VARIABLES
let x = canvas.width / 2;
let y = canvas.height / 2;
let health = 1000;
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
let rectangledelay = 700;
let circularEnemyRadius = 30;
let difficultygap = 10000;
let lastDifficultyScale = 0;
let enemydifficultyScale = 0;

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
    let setrectangularWeakness = Math.floor(Math.random() * 3);
    if (enemydifficultyScale > 2){
    for (c = 0; c < enemydifficultyScale; c++)
    {
    setrectangularWeakness = Math.floor(Math.random() * 3);
      if (setrectangularWeakness == 0)
      {
        if (Math.floor(Math.random() * enemydifficultyScale) == 0)
        break;
        else {
          continue;
        }
      }
      else{
        break;
      }
    }
  }
    let enemyType = 0;
    for (a = 0; a < enemydifficultyScale; a++){
    enemyType = Math.floor(Math.random() * 5);
    if (enemyType == 0)
    {
      break;
    }
    }
    let type = "rectangular";
    if (enemyType == 0) {
      type = "circular";
    }
    enemies[i][j] = {
      x: 0,
      y: 0,
      status: false,
      moving: false,
      hits: setrectangularWeakness,
      type: type,
      armour: 0
    };
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

function drawHealth() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Health: ${health}`, canvas.width - 120, 20);
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
          let enemyType = 0;
          for(b = 0; b < enemydifficultyScale; b++)
          {
          enemyType = Math.floor(Math.random() * 5);
          if (enemyType == 0)
          {
            break;
          }
          }
          enemies[i][j].type = "rectangular";
          if (enemyType == 0) {
            enemies[i][j].type = "circular";
          }
          let rectangularWeakness = Math.floor(Math.random() * 3);
          if (enemydifficultyScale > 2){
            for (c = 0; c < enemydifficultyScale; c++)
            {
            rectangularWeakness = Math.floor(Math.random() * 3);
              if (rectangularWeakness == 0)
              {
                if (Math.floor(Math.random() * enemydifficultyScale) == 0)
                break;
                else {
                  continue;
                }
              }
              else{
                break;
              }
            }
          }
          enemies[i][j].hits = rectangularWeakness;
          if (enemydifficultyScale >= 4)
          {
            let armourChance = Math.floor(Math.random() * 5)
            if (armourChance == 0)
            {
              enemies[i][j].armour = Math.floor(Math.random() * 2 + 1);
            }
            else{
              enemies[i][j].armour = 0;
            }
          }
          else{
            enemies[i][j].armour = 0;
          }
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
        if (enemies[i][j].type == "rectangular") {
          enemies[i][j].y += 1;
        } else if (enemies[i][j].type == "circular") {
          enemies[i][j].y += 2;
        }
      }
      if (enemies[i][j].y >= canvas.height && enemies[i][j].status == true) {
        enemies[i][j].status = false;
        enemies[i][j].moving = false;
        health -= 50;
      }
      if (enemies[i][j].status == true && enemies[i][j].type == "rectangular") {
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
        if (enemies[i][j].armour == 1)
        {
          ctx.fillStyle = "#000000";
        }
        else if (enemies[i][j].armour == 2)
        {
          ctx.fillStyle = "#9D00FF";
        }
        ctx.fill();
        ctx.closePath();
      } else if (
        enemies[i][j].status == true &&
        enemies[i][j].type == "circular"
      ) {
        ctx.beginPath();
        ctx.arc(
          enemies[i][j].x,
          enemies[i][j].y,
          circularEnemyRadius,
          0,
          Math.PI * 2
        );
        if (enemies[i][j].hits == 0) {
          ctx.fillStyle = "#228B22";
        } else if (enemies[i][j].hits == 1) {
          ctx.fillStyle = "#FFFF00";
        } else if (enemies[i][j].hits == 2) {
          ctx.fillStyle = "#8b0000";
        }
        if (enemies[i][j].armour == 1)
        {
          ctx.fillStyle = "#000000";
        }
        else if (enemies[i][j].armour == 2)
        {
          ctx.fillStyle = "#9D00FF";
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

///DeTECT BULLET, ENEMY COLLISION
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
            enemies[i][j].status == true &&
            enemies[i][j].type == "rectangular"
          ) {
            if (enemies[i][j].armour > 0)
            {
              enemies[i][j].armour--;
            }
            else{
            enemies[i][j].hits++;
            }
            bullets[q][p].shot = false;
            bullets[q][p].shooting = false;
            if (enemies[i][j].hits >= 3) {
              enemies[i][j].status = false;
              enemies[i][j].moving = false;
            }
          } else if (
            (bullets[q][p].x > enemies[i][j].x &&
              bullets[q][p].x < enemies[i][j].x + circularEnemyRadius &&
              bullets[q][p].y > enemies[i][j].y &&
              bullets[q][p].y < enemies[i][j].y + circularEnemyRadius &&
              bullets[q][p].shot == true &&
              enemies[i][j].status == true &&
              enemies[i][j].type == "circular") ||
            (bullets[q][p].x < enemies[i][j].x &&
              bullets[q][p].x > enemies[i][j].x - circularEnemyRadius &&
              bullets[q][p].y < enemies[i][j].y &&
              bullets[q][p].y > enemies[i][j].y - circularEnemyRadius &&
              bullets[q][p].shot == true &&
              enemies[i][j].status == true &&
              enemies[i][j].type == "circular")
          ) {
            if (enemies[i][j].armour > 0)
            {
              enemies[i][j].armour--;
            }
            else{
            enemies[i][j].hits++;
            }
            bullets[q][p].shot = false;
            bullets[q][p].shooting = false;
            if (enemies[i][j].hits >= 3) {
              enemies[i][j].status = false;
              enemies[i][j].moving = false;
            }
          }
        }
      }
    }
  }
  //DETECT PLAYER COLLISION
  for (i = 0; i < 20; i++) {
    for (j = 0; j < 5; j++) {
      let e = enemies[i][j];
      if (
        x > e.x &&
        x < e.x + rectangleEnemyWidth &&
        y > e.y &&
        y < e.y + rectangleEnemyLength &&
        e.status == true &&
        e.type == "rectangular"
      ) {
        if (e.hits == 0){
          health -= 100;
          }
          else if (e.hits == 1){
            health -= 50;
          }
          else {
            health -= 25;
          }
        e.status = false;
        e.moving = false;
      } else if (e.type == "circular" && e.status == true) {
        let base = Math.abs(e.x - x);
        let height = Math.abs(e.y - y);
        let dist = Math.sqrt(base ** 2 + height ** 2);
        if (dist < ballRadius + circularEnemyRadius) {
          if (e.hits == 0){
          health -= 100;
          }
          else if (e.hits == 1){
            health -= 50;
          }
          else {
            health -= 25;
          }
          e.status = false;
          e.moving = false;
        }
      }
    }
  }
}

//draw canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  createBullet();
  setEnemies();
  createEnemies();
  detectCollisions();
  drawHealth();
  if (health <= 0) {
    location.reload(true);
  }
  if (lastDifficultyScale >= Date.now() - difficultygap)
  {
    rectangledelay = rectangledelay;
  }
  else{
    if (rectangledelay <= 600)
    {
      rectangledelay = rectangledelay;
    }
    else{
    rectangledelay -= 10;
    if (enemydifficultyScale < 5){
    enemydifficultyScale++;
    }
    else{
      enemydifficultyScale = 5;
    }
    lastDifficultyScale = Date.now();
    console.log("faster");
    }
  }
  x += dx;
  y += dy;
  dx = 0;
  dy = 0;
  if (rightPressed == true) {
    if (x + ballRadius > canvas.width) {
      dy = 0;
    } else {
      dx = 3;
    }
  }
  if (leftPressed == true) {
    if (x - ballRadius < 0) {
      dy = 0;
    } else {
      dx = -3;
    }
  }
  if (upPressed == true) {
    if (y - ballRadius < 0) {
      dy = 0;
    } else {
      dy = -3;
    }
  }
  if (downPressed == true) {
    if (y + ballRadius > canvas.height) {
      dy = 0;
    } else {
      dy = 3;
    }
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
document.addEventListener("keydown", keyDown, true);
document.addEventListener("keyup", keyUp, true);
document.addEventListener("click", Shoot);

// HANDLE MOVEMENT
function keyDown(e) {
  if (e.keyCode == 68) {
    rightPressed = true;
  } else if (e.keyCode == 65) {
    leftPressed = true;
  } else if (e.keyCode == 87) {
    upPressed = true;
  } else if (e.keyCode == 83) {
    downPressed = true;
  }
}

function keyUp(e) {
  if (e.keyCode == 68) {
    rightPressed = false;
  } else if (e.keyCode == 65) {
    leftPressed = false;
  } else if (e.keyCode == 87) {
    upPressed = false;
  } else if (e.keyCode == 83) {
    downPressed = false;
  }
}

//SHOOT ON MOUSE CLICK
function Shoot() {
  if (lastShot >= Date.now() - delay) {
    shooting = false;
  } else {
    lastShot = Date.now();
    shooting = true;
  }
}

draw();
