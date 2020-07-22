var c;
var ctx;
var loadedimgs = { ball: [], table: null, scratches: null, scratch_anim: [] };

function ballPath(startx, starty) {
  this.actionsQueue = [];
  this.addAction = function(action, ...params) {
    this.actionsQueue.append({
      action: action,
      params: params
    });
    return this;
  };
  this.performActions = function() {
    for (var i = 0; i < this.actionsQueue.length; i++)
      this.actionsQueue[i].action.apply(this.actionsQueue[i].params);
  };
  this.popAction = function() {
    return this.actionsQueue.pop();
  };
  //actions it can do (or should)
  this.moveTo = function(x, y, rolls, smooth) {
    smooth = smooth || true;

  }
}

function point(x, y) {
  this.x = x;
  this.y = y;
  this.distance = function(other) {
    if (!(other instanceof point)) return -1;
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2)
  };
}

function loadImages() {
	
	for (var i=0;i<stages;i++){
  	var tempimg = new Image();
  	tempimg.onload = function(){
  		loadedimgs.ball.append(tempimg);
    };
    tempimg.src = "/resources/ball_rolling_" + i + ".png";
  }
  
}

function start() {
  c = document.getElementById("game");
  ctx = c.getContext('2d');
  loadImages();
  setTimeout(function(){setInterval(frameUpdate, 300);}, 1000); //so that the images are loaded
  
}

function frameUpdate() {

}

var stages = 10;

function animateBall(stage, rotation, position) {
  if (loadedimgs) {
    ctx.translate(position.x, position.y);
    ctx.rotate(rotation);
    ctx.drawImage(loadedimgs.ball[state]);
    ctx.rotate(-rotation);
    ctx.translate(-position.x, -position.y)
  }
}
