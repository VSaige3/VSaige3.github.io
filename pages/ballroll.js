var c;
var ctx;
var loadedimgs = { ball: [], table: null, scratches: null, scratch_anim: [] };

var onTitle = true;

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

function drawButton(x, y, width, height, text) {

}

function button(x, y, width, height, action, draw, text, ...params) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.action = action;
	this.draw = draw || drawButton;
	this.params = params;
	this.active = false;
	this.visible = false;
	this.listener = function(evt){
		var rect = c.getBoundingClientRect();
		var mx, my;
		mx = evt.clientX - rect.x;
		my = evt.clientY - rect.y;
		if ( (this.x < mx && this.x+this.width > mx) && (this.y < my && this.y+this.height > my) ) this.action.call(this.params);
	};
	this.setVisible = function(visible){ this.visible = visible; };
	this.setActive = function(active){
		if(active && !this.active) c.addEventListener('mousedown', this.listener, false);
		else if(!active && this.active) c.removeEventListener('mousedown', this.listener, false);
		this.active = active;
	}
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
  setTimeout(function(){frameInterval = setInterval(frameUpdate, 300);}, 500); //so that the images are loaded
	
  
}
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function frameUpdate() {
	clear();
	if(onTitle) drawTitle();
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