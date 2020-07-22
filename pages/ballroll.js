var c;
var ctx;
var loadedimgs = { ball: [], table: null, scratches: null, scratch_anim: [] };

var onTitle = true;

var drawables = [];
//todo: create visible and iterate for optimization

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
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(x, y, width, height);
	ctx.font = ((height + width) / 6).toString() + "px Arial";
	ctx.textAlign = "Center";
	ctx.fillStyle = "black";
	ctx.fillText(text, x + (width / 2), y + (height / 2));
}

function drawSGAButton(x, y, width, height, text) {
	text = text.toLowerCase();
	ctx.fillStyle = "lightgrey";
	ctx.fillRect(x, y, width, height);
	ctx.font = ((height + width) / 6).toString() + "px Galactic Alphabet";
	ctx.textAlign = "Center";
	ctx.fillStyle = "black";
	ctx.fillText(text, x + (width / 2), y + (height / 2));
}

function button(x, y, width, height, draw, text, hover, action, ...params) {
	//allow to be removed or added to visible (drawing queue
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.action = action;
	this.draw = draw || function(x, y, w, h) { if(hovering){drawButton(x, y, w, h, this.text);} else {drawSGAButton(x, y w, h, this.text);} };
	this.hover = hover || function(hov){ this.hovering = hov; };
	this.params = params;
	this.active = false;
	this.visible = false;
	this.hovering = true;
	this.listener = evt => {
		var rect = c.getBoundingClientRect();
		var mx, my;
		mx = evt.clientX - rect.x;
		my = evt.clientY - rect.y;
		if ( (this.x < mx && this.x+this.width > mx) && (this.y < my && this.y+this.height > my) ) this.action.call(this.params);
	};
	this.hoverListener = evt => {
		var rect = c.getBoundingClientRect();
		var mx, my;
		mx = evt.clientX - rect.x;
		my = evt.clientY - rect.y;
		this.hover( (this.x < mx && this.x+this.width > mx) && (this.y < my && this.y+this.height > my) );
	}
	this.setVisible = function(visible){ this.visible = visible; };
	this.show = function(){ this.setVisible(true); };
	this.hide = function(){ this.setVisible(false); };
	
	this.setActive = function(active){
		if(active && !this.active) c.addEventListener('mouseup', this.listener, false);
		else if(!active && this.active) c.removeEventListener('mouseup', this.listener, false);
		if(active && !this.active) c.addEventListener('mousemove', this.hoverListener, false);
		else if(!active && this.active) c.removeEventListener('mousemove', this.hoverListener, false);
		this.active = active;
	};
	this.activate = function(){ this.setActive(true); this.show(); };
	this.deactivate = function(){ this.hide(); this.setActive(false); };
	
	drawables.push(this);
}

function loadImages() {
	//load fonts
	var gal_alph_font = new FontFace('Galactic Alphabet', 'url(../resources/standard_galactic_aphabet.woff)');
	gal_alph_font.load().then(function(loaded) {document.fonts.add(loaded);}).catch(function(error) {/*could not load font*/});
	
	for (var i=0;i<stages;i++){
  	var tempimg = new Image();
  	tempimg.onload = function(){
  		loadedimgs.ball.push(tempimg);
    };
    tempimg.src = "../resources/ball_rolling_" + i + ".png";
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
