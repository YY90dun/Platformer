// Get canvas and context
const cnv = document.getElementById("gameCanvas");
const ctx = cnv.getContext("2d");

// Fit the canvas to the window size
cnv.width = window.innerWidth - 40;
cnv.height = window.innerHeight - 40;

let theX = cnv.width / 2;
let theY = 0 - cnv.height / 2;
let previousUp;
let jumps = 0;

// number boxes for frames
let frames = 0;
let tein;
let tweneh;
let thirteh;
let fourtie;
let fitti;
let sixtie;
let seventie;
let eightie;
let ninetie;
let hun;

let leftarrow_prst = false;
let rightarrow_prst = false;
let uparrow_prst = false;
let downarrow_prst = false;
let A_prst = false;
let D_prst = false;
let W_prst = false;
let S_prst = false;

let checkpoint = 0;

// plats n stuff
let plats = [];
plats.push(newPlat(0, 0, cnv.width, 20));
plats.push(newPlat(0, cnv.height - 20, cnv.width, 20));
plats.push(newPlat(cnv.width - 20, 0, 20, cnv.height));
plats.push(newPlat(cnv.width * 0.69, 130, 50, cnv.height - 430));
plats.push(newPlat(0, 0, 20, cnv.height));
plats.push(newPlat(600, 500, 150, 20));
plats.push(newPlat(600, 700, 150, 20));
plats.push(newPlat(1040, 720, 100, 35));
plats.push(newPlat(0, 170, 950, 20));
plats.push(newPlat(755, 350, 73, 300));
plats.push(newPlat(cnv.width - 70, 650, 50, 30));
plats.push(newPlat(cnv.width - 120, 450, 100, 30));
plats.push(newPlat(cnv.width - 350, 450, 180, 30));
plats.push(newPlat(cnv.width - 350, 350, 120, 60));

let hzrdz = [];
hzrdz.push(newPlat(570, 275, 30, 225));
hzrdz.push(newPlat(20, cnv.height - 30, cnv.width - 40, 10));
hzrdz.push(newPlat(cnv.width - 185, cnv.height - 270, 50, 83));
hzrdz.push(newPlat(200, 163, 300, 9));

let deco = [];
deco.push(newPlat(0, 0, 50, 120));

function newPlat(x, y, w, h) {
  return {
    x: x,
    y: y,
    w: w,
    h: h,
  };
}

function reset() {
  player = {
    x: 40 + theX,
    y: 15 - theY,
    w: 30,
    h: 30,
    g: 0,
    speed: 5,
    color: "#ffffff",
  };
}

let player = {
  x: 40 + theX,
  y: 15 - theY,
  w: 30,
  h: 30,
  g: 0,
  speed: 5,
  color: "#ffffff",
};

function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Draw walls/circles
  drawPlaya();
  drawPlats();
  drawHazards();
  changeFrameNumba();

  requestAnimationFrame(gameLoop);
}

function drawPlaya() {
  // Playa vertical
  if (uparrow_prst || W_prst) {
    if ((previousUp == "no") & (jumps > 0)) {
      player.g = 11;
      jumps -= 1;
    }
    previousUp = "yes";
  } else {
    previousUp = "no";
  }
  if (player.g < -20) {
    player.g = -20;
  }
  player.g = player.g - 0.5;
  player.y = player.y - player.g;
  if (player.g > 0) {
    checkCol("up");
    checkDie();
  } else {
    checkCol("down");
    checkDie();
  }

  // Playa horizontal
  if (rightarrow_prst || D_prst) {
    player.x += player.speed;
    checkCol("right");
    checkDie();
  }
  if (leftarrow_prst || A_prst) {
    player.x -= player.speed;
    checkCol("left");
    checkDie();
  }

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

window.addEventListener("load", gameLoop);

document.addEventListener("keydown", pressmehandle);

function pressmehandle(e) {
  if (e.code == "ArrowLeft") {
    leftarrow_prst = true;
  }
  if (e.code == "ArrowRight") {
    rightarrow_prst = true;
  }
  if (e.code == "ArrowUp") {
    uparrow_prst = true;
  }
  if (e.code == "ArrowDown") {
    downarrow_prst = true;
  }
  if (e.code == "KeyA") {
    A_prst = true;
  }
  if (e.code == "KeyD") {
    D_prst = true;
  }
  if (e.code == "KeyW") {
    W_prst = true;
  }
  if (e.code == "KeyS") {
    S_prst = true;
  }
}

document.addEventListener("keyup", leggomehandle);

function leggomehandle(e) {
  if (e.code == "ArrowLeft") {
    leftarrow_prst = false;
  }
  if (e.code == "ArrowRight") {
    rightarrow_prst = false;
  }
  if (e.code == "ArrowUp") {
    uparrow_prst = false;
  }
  if (e.code == "ArrowDown") {
    downarrow_prst = false;
  }
  if (e.code == "KeyA") {
    A_prst = false;
  }
  if (e.code == "KeyD") {
    D_prst = false;
  }
  if (e.code == "KeyW") {
    W_prst = false;
  }
  if (e.code == "KeyS") {
    S_prst = false;
  }
}
