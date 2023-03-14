const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;
const ballRadius = 10;
const bulletRadius = 2
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let dx = 0;
let dy = 0;
spacePressed = 32;
bullets = [];
shooting = false;

for (i = 0;i < 20; i++)
{
  bullets[i] = [];
  for (j = 0; j < 5; j++)
  {
    bullets[i][j] = {onfield: false, shot: false, x: 0, y:0}
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

function createBullet() {
  for (i = 0; i < 20; i++)
  {
    for (j = 0; j < 5; j++)
    {
      if (bullets[i][j].shot = true && (bullets[i][j].shooting = false))
      {
        bullets[i][j].shooting = true;
        bullets[i][j].x = x;
        bullets[i][j].y = y;
      }
      else if (bullets[i][j].shot = true && (bullets[i][j].shooting = true))
      {
        bullets[i][j].y -= 3;
      }
      if (bullets[i][j].shot = true)
      {
        ctx.beginPath();
        ctx.arc(bullets[i][j].x, bullets[i][j].y, bulletRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
  }

//draw player
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  createBullet();
  x += dx;
  y += dy;
  dx = 0;
  dy = 0;
  if (rightPressed == true) {
    dx = 2;
  }
  if (leftPressed == true) {
    dx = -2;
  }
  if (upPressed == true) {
    dy = -2;
  }
  if (downPressed == true) {
    dy = 2;
  }
  if ((onfield = true)) {
    for (i = 0; i < 20; i++)
    {
      for (j = 0; j < 5; j++)
      {
        if (bullets[i][j].shot = false)
        {
          bullets[i][j].shot = true;
          console.log("registered");
        }
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
  }
  if (e.keyCode == spacePressed) {
    shooting = true;
    console.log("fired");
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
  }
  if (e.keyCode == spacePressed) {
    shooting = false;
  }
}

draw();
