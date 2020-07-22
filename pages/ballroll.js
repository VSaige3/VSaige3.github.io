var c;
var ctx;
var loadedimgs = { ball: [], table: null, scratches: null, scratch_anim: [] };

var onTitle = true;

var drawables = [];

var btn_start;
var btn_quit;
var btn_credit;

var btn_pause;

var btn_resume;
var btn_back;

function ballPath(startx, starty) {
  this.actionsQueue = [];
  this.addAction = function(action, ...params) {
    this.actionsQueue.push({
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

	};
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
	ctx.fillStyle = "grey";
	ctx.fillRect(x, y, width, height);
	ctx.font = ((height + width) / 6).toString() + "px Arial";
	ctx.textAlign = "Center";
	ctx.fillText(text, (x + width) / 2, (y + height) / 2);
}



function button(x, y, width, height, draw, text, action, ...params) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.action = action;
	this.draw = draw || function(x, y, w, h) {drawButton(x, y, w, h, this.text)};
	this.params = params;
	this.active = false;
	this.visible = false;
	this.listener = evt => {
		var rect = c.getBoundingClientRect();
		var mx, my;
		mx = evt.clientX - rect.x;
		my = evt.clientY - rect.y;
		if ( (this.x < mx && this.x+this.width > mx) && (this.y < my && this.y+this.height > my) ) this.action.call(this.params);
	};
	this.setVisible = function(visible){ this.visible = visible; };
	this.show = function(){ this.setVisible(true); };
	this.hide = function(){ this.setVisible(false); };
	
	this.setActive = function(active){
		if(active && !this.active) c.addEventListener('mousedown', this.listener, false);
		else if(!active && this.active) c.removeEventListener('mousedown', this.listener, false);
		this.active = active;
	};
	this.activate = function(){ this.setActive(true); this.show(); };
	this.deactivate = function(){ this.hide(); this.setActive(false); };
	
	drawables.push(this);
}

function loadImages() {
	
	for (var i=0;i<stages;i++){
  	var tempimg = new Image();
  	tempimg.onload = function(){
  		loadedimgs.ball.push(tempimg);
    };
    tempimg.src = "/resources/ball_rolling_" + i + ".png";
  }
  
}

function start() {
  c = document.getElementById("game");
  ctx = c.getContext('2d');
  loadImages();
  setTimeout(function(){frameInterval = setInterval(frameUpdate, 300);}, 500); //so that the images are loaded
	createTitle();
  
}

function clear() {
	ctx.clearRect(0, 0, c.width, c.height);
}

function createTitle() {
	//create buttons
	btn_start = new button(c.width*(1/4), c.height*(1/5), c.width/2, c.height/5, null, "Start Game", (evt) => {eraseTitle();});
	
	//activate and show
	btn_start.activate();
}

function eraseTitle() {
	btn_start.deactivate();
}

function frameUpdate() {
	clear();
	draw(drawables);
}

function draw(queue) {
	queue = queue || drawables;
	queue.forEach( e => { if(e.visible) e.draw(e.x, e.y, e.width, e.height); } );
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
