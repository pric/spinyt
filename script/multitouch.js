var Multitouch = function(canvas)
{
	this.canvas = canvas;
	this.canvas.addEventListener('touchstart', this.handleStart, false);
	this.canvas.addEventListener('touchend', this.handleEnd, false);
	this.canvas.addEventListener('touchmove', this.handleMove, false);
	
	this.listeners = [];
	this.activeTouches = {
		single: [],
		double: []
	};
	
	multitouchObject = this;
}

var multitouchObject = null;

Multitouch.prototype.getTouchIndexById = function(idToFind) 
{
	for(var i = 0; i < multitouchObject.activeTouches.single.length; i++) 
	{
		var id = multitouchObject.activeTouches.single[i].identifier;
		if (id == idToFind) 
		{
			return i;
		}
	}

	return -1;
}

Multitouch.prototype.handleStart = function(event) 
{
	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++) 
	{
		var currentTouch = {
			identifier: touches[i].identifier,
			pageX: touches[i].pageX,
			pageY: touches[i].pageY,
			createTime: event.timeStamp
		};
		
		multitouchObject.activeTouches.single.push(currentTouch);
	
		multitouchObject.notifyListeners("TOUCH_START", currentTouch);
	}
}

Multitouch.prototype.handleMove = function(event)
{
	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++) 
	{
		var idx = multitouchObject.getTouchIndexById(touches[i].identifier);
		multitouchObject.activeTouches.single[idx].pageX = touches[i].pageX;
		multitouchObject.activeTouches.single[idx].pageY = touches[i].pageY;
	
		multitouchObject.notifyListeners("TOUCH_MOVE", multitouchObject.activeTouches.single[idx]);
	}
}

Multitouch.prototype.handleEnd = function(event) 
{
	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++) 
	{
		var idx = multitouchObject.getTouchIndexById(touches[i].identifier);
	
		multitouchObject.notifyListeners("TOUCH_END", multitouchObject.activeTouches.single[idx]);
		multitouchObject.activeTouches.single.splice(idx,1);
	}
}

Multitouch.prototype.listenToEvent = function(eventName, callback)
{
	if (!this.listeners[eventName])
	{
		this.listeners[eventName] = [];
	}
	
	this.listeners[eventName].push(callback);
}

Multitouch.prototype.notifyListeners = function(eventName)
{
	if (this.listeners[eventName])
	{
		for(var callbackIndex = 0; callbackIndex < this.listeners[eventName].length; callbackIndex++)
		{
			this.listeners[eventName][callbackIndex].apply(this, arguments);
		}
	}
}

