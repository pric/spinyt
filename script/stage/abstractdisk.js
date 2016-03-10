var Disk = function(posX, posY) {
    if (this.constructor === Disk) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	console.log(arguments);
	
	this.isSpinning = false;
	this.angle = 0;
	this.centerX = posX;
	this.centerY = posY;
};

Disk.prototype.getRadianAngle = function ()
{
	return this.angle * Math.PI / 180;
}

Disk.prototype.getDegreeAngle = function ()
{
	return this.angle;
}

Disk.prototype.start = function ()
{
	this.isSpinning = true;
}

Disk.prototype.stop = function ()
{
	this.isSpinning = false;
}

Disk.prototype.spin = function (speed)
{
	if (this.isSpinning)
	{
		this.angle += speed;
	}
}

Disk.prototype.draw = function() 
{
    throw new Error("Abstract method!");
}