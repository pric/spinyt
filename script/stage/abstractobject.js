var StageObject = function(posX, posY) {
    if (this.constructor === StageObject) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	this.centerX = posX;
	this.centerY = posY;
	this.listeners = [];
};

StageObject.prototype.slide = function(value) 
{
    this.value = value;
}

StageObject.prototype.draw = function() 
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