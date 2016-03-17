function Stage(canvas_id) 
{
	this.canvas = document.getElementsByTagName(canvas_id)[0];
	
	this.slider1 = new PrimitiveSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 2, 50, 600);
	this.disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2);
	this.disk.spin(this.slider1.value);
	
	var current = this;
	this.slider1.listenToEvent("slide", function() { current.disk.spin(current.slider1.value / 2); });
}

Stage.prototype.start = function()
{
	this.disk.start();
	
	var current = this;
	setInterval(function(){ current.actualize(current); }, 50);
	setInterval(function(){ current.slider1.slide(Math.round(Math.random()* 99) + 1); }, 5000);
}

Stage.prototype.draw = function()
{
	this.disk.draw(this.canvas);
	this.slider1.draw(this.canvas);
}

Stage.prototype.actualize = function(current)
{
	current.disk.spin();
	current.draw();
}