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
document.getElementById("new").addEventListener("click", function() {
  if(firstGame) {
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
  loop = window.setInterval(mainLoop, 33);
});

var accelerationRate = 0.4;
var rotationRate = 3;

function updateData() {
  document.getElementById("pos").innerHTML = "pos:" + spaceship.pos;
  document.getElementById("vel").innerHTML = "vel:" + spaceship.vel;
  document.getElementById("acl").innerHTML = "acl:" + spaceship.acl;
  document.getElementById("velM").innerHTML = "velM:" + spaceship.velM;
  document.getElementById("aclM").innerHTML = "aclM:" + spaceship.aclM;
  document.getElementById("angle").innerHTML = "angle:" + spaceship.angle;
}

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

  updateData();
}
