var Disk = function() {
    if (this.constructor === Disk) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	StageObject.apply(this, arguments);
	
	this.isSpinning = false;
	this.spinningSpeed = 0;
	this.angle = 0;
	
	this.popboxes = [];
};

Disk.prototype = Object.create(StageObject.prototype);
Disk.prototype.constructor = Disk;

Disk.prototype.getRadius = function ()
{
	return Math.min(this.width / 2, this.height / 2);
}

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

Disk.prototype.adjustSpin = function (speed)
{
	if (speed)
	{
		this.spinningSpeed = speed;
	}
}

Disk.prototype.spin = function ()
{
	if (this.isSpinning)
	{
		this.angle += this.spinningSpeed;
		
		for(var index = 0; index < this.popboxes.length; index++)
		{
			var newAngle = this.getDegreeAngle() + this.popboxes[index].angle;
			if (newAngle > -90 && !this.popboxes[index].played)
			{
				this.popboxes[index].played = true;
				console.log("PlaySound! (" + index + ")");
			}
			else if (newAngle < -90)
			{
				this.popboxes[index].played = false;
			}
		}
	}
	
	if (this.getDegreeAngle() > 360)
	{
		this.angle = this.angle - 360;
		console.log("Reset");
	}
}

Disk.prototype.addPopbox = function (posX, posY, popboxType)
{
	var radiusX = Math.pow(posX - this.centerX, 2);
	var radiusY = Math.pow(posY - this.centerY, 2);
	var radius = Math.sqrt(radiusX + radiusY);
	
	if (radius < this.getRadius())
	{
		var x = this.centerX - posX;
		var y = this.centerY - posY;
		var angle = Math.atan(y/x);
		angle = angle / Math.PI * 180;
		
		if (x > 0)
		{
			angle -= 180;
		}
		
		var newAngle = angle - this.getDegreeAngle();
		
		this.addPopboxToDisk(newAngle, radius, popboxType);
	}
}

Disk.prototype.addPopboxToDisk = function (angle, radius, popboxType)
{
	this.popboxes.push({angle : angle, radius : radius, type : popboxType, played : false});
}

Disk.prototype.isTouched = function(x, y) 
{
	var radius = this.imageObj.width / 2;
	
	var distance = Math.sqrt(Math.pow(y - this.centerY, 2) + Math.pow(x - this.centerX, 2));
	
	return radius >= distance;
}