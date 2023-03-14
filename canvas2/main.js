const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height / 2;
const ballRadius = 10;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let dx = 0;
let dy = 0;
//bullet
var bulletXpos = 0;
var bulletYpos = 0;
const bulletWidth = 4;
const bulletHeight = 6;
var bulletYspeed = 10;
spacePressed = 32;
shooting = false;
shot = false;

//create instructions for drawing player
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function bulletShoot() {
  if (shooting && shot == false) {
    bulletXpos = x;
    bulletYpos = y;
  }
}
function createBullet() {
  ctx.beginPath();
  ctx.Rect(bulletXpos, bulletYpos, bulletWidth, bulletHeight);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

//draw player
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  if ((shooting = true)) {
    createBullet();
  }
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
}

draw();
