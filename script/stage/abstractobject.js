var StageObject = function(centerX, centerY, width, height) {
    if (this.constructor === StageObject) 
	{
		throw new Error("Can't instantiate abstract class!");
    }
	
	this.centerX = centerX;
	this.centerY = centerY;
	this.width = width;
	this.height = height;
	this.listeners = [];
};

StageObject.prototype.isTouched = function(x, y) 
{
    if (this.centerX < x && this.centerX + this.width > x && this.centerY < y && this.centerY + this.height > y)
	{
		console.log("YES!!!!!!");
		return true;
	}
	
	return false;
}

StageObject.prototype.draw = function(canvas) 
{
    throw new Error("Abstract method!");
}

StageObject.prototype.listenToEvent = function(eventName, callback)
{
	if (!this.listeners[eventName])
	{
		this.listeners[eventName] = [];
	}
	
	this.listeners[eventName].push(callback);
}

StageObject.prototype.notifyListeners = function(eventName)
{
	if (this.listeners[eventName])
	{
		for(var callbackIndex = 0; callbackIndex < this.listeners[eventName].length; callbackIndex++)
		{
			this.listeners[eventName][callbackIndex]();
		}
	}
}