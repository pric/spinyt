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

Disk.prototype.pause = function ()
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
		
		var barAngle = 270 - this.getDegreeAngle();
		if (barAngle < 0)
		{
			barAngle = 360 + barAngle;
		}
		
		for(var index = 0; index < this.popboxes.length; index++)
		{
			if (this.popboxes[index].angle > barAngle && !this.popboxes[index].played)
			{
				this.popboxes[index].played = true;
				this.notifyListeners("PLAYSOUND", this.popboxes[index].sound, this.popboxes[index].radius / this.getRadius());
				this.popboxes[index].pulse = PULSE_ME_LIKE_YOU_OWN_ME;
				
			}
			else if (this.popboxes[index].angle < barAngle)
			{
				this.popboxes[index].played = false;
			}
		}
	}
	
	if (this.getDegreeAngle() > 360)
	{
		this.angle = this.angle - 360;
	}
}

Disk.prototype.addPopbox = function (posX, posY, color, sound)
{
	var radiusX = Math.pow(posX - this.centerX, 2);
	var radiusY = Math.pow(posY - this.centerY, 2);
	var radius = Math.sqrt(radiusX + radiusY);
	
	if (radius < this.getRadius())
	{
		var x = posX - this.centerX;
		var y = posY - this.centerY;
		var angle = Math.atan(y/x);
		angle = angle / Math.PI * 180;
		
		if (x < 0)
		{
			angle = 180 + angle;
		}
			
		if (angle < 0)
		{
			angle = 360 + angle;
		}
		
		var newAngle = angle - this.getDegreeAngle();
		if (newAngle < 0)
		{
			newAngle = 360 + newAngle;
		}
		
		this.addPopboxToDisk(newAngle, radius, color, sound);
	}
}

Disk.prototype.addPopboxToDisk = function (angle, radius, color, sound)
{
	this.popboxes.push({angle : angle, radius : radius, color : color, sound : sound, played : true, pulse: PULSE_ME_LIKE_YOU_OWN_ME});
}

Disk.prototype.onDoubleTouch = function(object) 
{
    this.pause();
}

Disk.prototype.onDoubleTouchRelease = function(object) 
{
    this.start();
}

Disk.prototype.isTouched = function(x, y) 
{
	var radius = this.imageObj.width / 2;
	
	var distance = Math.sqrt(Math.pow(y - this.centerY, 2) + Math.pow(x - this.centerX, 2));
	
	return radius >= distance;
}