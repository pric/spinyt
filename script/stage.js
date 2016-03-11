function Stage() 
{
	var canvas = document.getElementsByTagName('canvas')[0];
	
	this.slider1 = new PrimitiveSlider(canvas.width - (canvas.width/ 10), canvas.height / 2, 50, 600);
	this.disk = new PictureDisk(canvas.width / 2, canvas.height / 2);
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
	this.disk.draw();
	this.slider1.draw();
}

Stage.prototype.actualize = function(current)
{
	current.disk.spin();
	current.draw();
}