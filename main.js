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
    case 85: //w
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
    case 85: //w
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

function mainLoop() {
  //Update acceleration
  if(keys.w) {
    spaceship.aclM = accelerationRate;
    spaceship.acl = [
      spaceship.aclM * Math.sin(angle);
      -1 * spaceship.aclM * Math.cos(angle);
    ];
  }
  else {
    spaceship.aclM = 0;
    spaceship.acl = [0, 0];
  }
}
