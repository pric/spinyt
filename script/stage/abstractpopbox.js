var Popbox = function() {
    if (this.constructor === Popbox) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	StageObject.apply(this, arguments);
	
	this.startUpPosX = arguments[0];
	this.startUpPosY = arguments[1];
	this.startUpWidth = arguments[2];
	this.startUpHeigth = arguments[3];
};

Popbox.prototype = Object.create(StageObject.prototype);
Popbox.prototype.constructor = Popbox;

Popbox.prototype.onDoubleTouch = function(object) 
{	
	this.centerX = object.pageX;
	this.centerY = object.pageY;
	this.width = this.startUpWidth / 5;
	this.height = this.startUpHeigth / 5;
}

Popbox.prototype.onMove = function(object) 
{	
	this.centerX = object.pageX;
	this.centerY = object.pageY;
}

Popbox.prototype.onTouchRelease = function(object) 
{	
	this.centerX = this.startUpPosX;
	this.centerY = this.startUpPosY;
	this.width = this.startUpWidth;
	this.height = this.startUpHeigth;
}