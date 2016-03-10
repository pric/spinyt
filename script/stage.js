function Stage() 
{
	var canvas = document.getElementsByTagName('canvas')[0];
	this.disk = new PictureDisk(canvas.width / 2, canvas.height / 2);
}

Stage.prototype.test = function()
{
	this.disk.say("What!!");
}

Stage.prototype.start = function()
{
	this.disk.start();
	
	var current = this;
	setInterval(function(){ actualize(current); }, 10);
	
	//setInterval(function(){ current.disk.start() }, 1000);
	//setTimeout(function(){ setInterval(function(){ current.disk.stop() }, 1000); }, 500);
}

Stage.prototype.draw = function()
{
	this.disk.draw();
}

actualize = function(current)
{
	current.disk.spin(1);
	current.draw();
}