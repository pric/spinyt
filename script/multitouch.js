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

Multitouch.prototype.getTouchIndexById = function(idToFind, array)
{
	for(var i = 0; i < array.length; i++)
	{
		var id = array[i].identifier;
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
	var isDoubleTouch = false;

	for (var i = 0; i < touches.length; i++)
	{
		var currentTouch = {
			identifier: touches[i].identifier,
			pageX: touches[i].pageX,
			pageY: touches[i].pageY,
			createTime: event.timeStamp
		};

		// Validate if double touch
		if(multitouchObject.activeTouches.single.length - 1 >= 0) {

			var lastTouchIndex = multitouchObject.activeTouches.single.length - 1;
			var lastTouch = multitouchObject.activeTouches.single[lastTouchIndex];
			var timeDiff = currentTouch.createTime - lastTouch.createTime;
			var pointsDistance = (Math.pow(currentTouch.pageX - lastTouch.pageX, 2) + Math.pow(currentTouch.pageY - lastTouch.pageY, 2));

			if(timeDiff < 100 && pointsDistance < 5000) {

				multitouchObject.activeTouches.double.push(currentTouch);
				multitouchObject.activeTouches.single.splice(lastTouchIndex,1);
				multitouchObject.notifyListeners(DOUBLE_TOUCH_START_EVENT, currentTouch);
				isDoubleTouch = true;

			}

		}

		if(!isDoubleTouch) {

			multitouchObject.activeTouches.single.push(currentTouch);
		}

		setTimeout(function() {
			multitouchObject.notifyListeners(SINGLE_TOUCH_START_EVENT, currentTouch);
		}, TOUCH_EVENT_TIMEOUT);
	}

	console.log(multitouchObject.activeTouches);
}

Multitouch.prototype.handleMove = function(event)
{
	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++)
	{
		var idx = multitouchObject.getTouchIndexById(touches[i].identifier, multitouchObject.activeTouches.single);

		if(idx != -1) {
			multitouchObject.activeTouches.single[idx].pageX = touches[i].pageX;
			multitouchObject.activeTouches.single[idx].pageY = touches[i].pageY;

			multitouchObject.notifyListeners(SINGLE_TOUCH_MOVE_EVENT, multitouchObject.activeTouches.single[idx]);
		}
	}
}

Multitouch.prototype.handleEnd = function(event)
{
	event.preventDefault();

	var touches = event.changedTouches;

	for (var i = 0; i < touches.length; i++)
	{
		var singleTouchIdx = multitouchObject.getTouchIndexById(touches[i].identifier, multitouchObject.activeTouches.single);
		var doubleTouchIdx = multitouchObject.getTouchIndexById(touches[i].identifier, multitouchObject.activeTouches.double);

		if(singleTouchIdx != -1) {
			multitouchObject.notifyListeners(SINGLE_TOUCH_END_EVENT, multitouchObject.activeTouches.single[singleTouchIdx]);
			multitouchObject.activeTouches.single.splice(singleTouchIdx,1);
		}

		if(doubleTouchIdx != -1) {
			multitouchObject.notifyListeners(DOUBLE_TOUCH_END_EVENT, multitouchObject.activeTouches.double[doubleTouchIdx]);
			multitouchObject.activeTouches.double.splice(doubleTouchIdx,1);
		}

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
