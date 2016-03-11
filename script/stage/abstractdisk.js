var Disk = function() {
    if (this.constructor === Disk) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	StageObject.apply(this, arguments);
	
	this.isSpinning = false;
	this.spinningSpeed = 0;
	this.angle = 0;
};

Disk.prototype = Object.create(StageObject.prototype);
Disk.prototype.constructor = Disk;

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
	if (speed)
	{
		this.spinningSpeed = speed;
	}
	
	if (this.isSpinning)
	{
		this.angle += this.spinningSpeed;
	}
}