var sprite = document.getElementById("rocket");
var spaceship = {
  pos: [600, 300],
  vel: [0, 0],
  acl: [0, 0],
  velM: 0,
  aclM: 0,
  angle: 0
};
var keys = {
  w: false,
  a: false,
  d: false
};

document.addEventListener("keydown", function(event) {
  switch(event.which) {
    case 87: //w
      keys.w = true;
      break;
    case 65: //a
      keys.a = true;
      break;
    case 68: //d
      keys.d = true;
      break;
    case 78: //n
      newGame();
      break;
  }
});
document.addEventListener("keyup", function(event) {
  switch(event.which) {
    case 87: //w
      keys.w = false;
      break;
    case 65: //a
      keys.a = false;
      break;
    case 68: //d
      keys.d = false;
      break;
  }
});

var firstGame = true;
document.getElementById("new").addEventListener("click", newGame);

function newGame() {
  if(firstGame) {
    firstGame = false;
  }
  else {
    window.clearInterval(loop);
  }
  sprite.style.left = "568px";
  sprite.style.top = "268px";
  spaceship.pos = [600, 300];
  spaceship.vel = [0, 0];
  spaceship.acl = [0, 0];
  spaceship.velM = 0;
  spaceship.aclM = 0;
  spaceship.angle = 0;
  loop = window.setInterval(mainLoop, 33);
}

var accelerationRate = 0.4;
var rotationRate = 5;
var gravity = 0.1;
var gravityDir = 0;

function updateData() {
  document.getElementById("pos").innerHTML = "pos:" + spaceship.pos;
  document.getElementById("vel").innerHTML = "vel:" + spaceship.vel;
  document.getElementById("acl").innerHTML = "acl:" + spaceship.acl;
  document.getElementById("velM").innerHTML = "velM:" + spaceship.velM;
  document.getElementById("aclM").innerHTML = "aclM:" + spaceship.aclM;
  document.getElementById("angle").innerHTML = "angle:" + spaceship.angle;
}

var field = document.getElementById("gameScreen");

function mainLoop() {
  //Update acceleration
  if(keys.w) {
    spaceship.aclM = accelerationRate;
    spaceship.acl = [
      spaceship.aclM * Math.sin(spaceship.angle * Math.PI / 180),
      -1 * spaceship.aclM * Math.cos(spaceship.angle * Math.PI / 180)
    ];
  }
  else {
    spaceship.aclM = 0;
    spaceship.acl = [0, 0];
  }

  //Gravity
  if(Math.random() * 100 < 1) {
    gravityDir = Math.floor(Math.random() * 4);
  }
  field.style.border = "1px dotted black";
  switch(gravityDir) {
    case 0: //down
      spaceship.acl[1] += gravity;
      field.style.borderBottom = "1px dashed red";
      break;
    case 1: //right
      spaceship.acl[0] += gravity;
      field.style.borderRight = "1px dashed red";
      break;
    case 2: //up
      spaceship.acl[1] -= gravity;
      field.style.borderTop = "1px dashed red";
      break;
    case 3: //left
      spaceship.acl[0] -= gravity;
      field.style.borderLeft = "1px dashed red";
      break;
  }

  //Update velocity
  for(i=0; i<2; i++) {
    spaceship.vel[i] += spaceship.acl[i];
  }
  spaceship.velM = Math.sqrt(Math.pow(spaceship.vel[0], 2) + Math.pow(spaceship.vel[1], 2));

  //Update position
  for(i=0; i<2; i++) {
    spaceship.pos[i] += spaceship.vel[i];
  }

  //Update rotation
  if(keys.a && !keys.d) {
    spaceship.angle -= rotationRate;
  }
  else if(keys.d && !keys.a) {
    spaceship.angle += rotationRate;
  }

  //Position
  sprite.style.left = spaceship.pos[0] - 32 + "px";
  sprite.style.top = spaceship.pos[1] - 32 + "px";

  //Rotation
  sprite.style.transform = "rotate(" + spaceship.angle + "deg)";

  //Collision detection
  sqrt2 = Math.sqrt(2);
  if(
    spaceship.pos[0] > 1200 - 32 ||
    spaceship.pos[0] < 0    + 32 ||
    spaceship.pos[1] > 600  - 32 ||
    spaceship.pos[1] < 0    + 32
  ) {
    for(i=0; i<2; i++) {
      spaceship.pos[i] = 0;
      spaceship.vel[i] = 0;
      spaceship.acl[i] = 0;
    }
    spaceship.aclM = 0;
    spaceship.velM = 0;
    alert("You crashed!\nGame over!");
    window.clearInterval(loop);
  }

  updateData();
  accelerationRate += 0.001;
  rotationRate += 0.001;
  gravity += 0.001;
}
