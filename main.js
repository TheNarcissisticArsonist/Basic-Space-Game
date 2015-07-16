var sprite = document.getElementById("rocket");

var spaceship = {
  posX: 600,
  posY: 300,
  velX: 0,
  velY: 0,
  velM: 0,
  aclX: 0,
  aclY: 0,
  aclM: 0
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
