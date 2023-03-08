const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//INITIALIZE VARIABLES
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
const brickRow = 3;
const brickColumn = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const bricks = [];

//POPULATE ARRAYS TO GENERATE BRICKS
for (let i = 0; i < brickColumn; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRow; j++) {
    bricks[i][j] = { x: 0, y: 0 };
  }
}
//CREATE INSTRUCTIONS FOR DRAWING BRICKS
function drawBricks() {
  for (let i = 0; i < brickColumn; i++) {
    for (let j = 0; j < brickRow; j++) {
      const brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
      const brickY = j * (brickHeight + brickPadding) + brickOffsetTop;
      bricks[i][j].x = brickX;
      bricks[i][j].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
  }
}
//CREATE INSTRUCTIONS FOR DRAWING BALL
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//CREATE INSTRUCTIONS FOR DRAWING PADDLE
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// DRAW BALL, RECTANGLE , etc.
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;
  // BOUNCE BALL IF COLLISION WITH WALL IS DETECTED
  if (y + dy < 0) {
    dy = -dy;
  }
  //END GAME WHEN BALL REACHES BOTTOM
  else if (y + dy > canvas.height - ballRadius) {
    if (x >= paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert("Game Over");
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (x + dx > canvas.width - ballRadius || x + dx < 0) {
    dx = -dx;
  }
  //KEEP PADDLE WITHIN BOUNDARIES
  if (rightPressed) {
    paddleX = Math.min(paddleX + 3, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 3, 0);
  }
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
  }
}

function keyUp(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  //CHECK FOR COLLISION WITH BRICKS
  function detectCollision() {
    for (let i = 0; i < brickColumn; i++) {
      for (let j = 0; j < brickRow; j++) {
        const b = bricks[i][j];
      }
    }
  }
}
const interval = setInterval(draw, 1.67);
