function Stage(canvas) 
{
	this.canvas = canvas;	
	
	this.slider1 = new PrimitiveSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 2, 50, 600);
	this.disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2, 500, 500);
	this.disk.spin(this.slider1.value);
	
	this.listeners = [];
	
	stageObject = this;
	this.slider1.listenToEvent("slide", function() { stageObject.disk.spin(stageObject.slider1.value / 2); });
}

var stageObject = null;

Stage.prototype.start = function()
{
	this.disk.start();
	
	var current = this;
	setInterval(function(){ current.actualize(current); }, 50);
}

Stage.prototype.draw = function()
{
	this.disk.draw(this.canvas);
	this.slider1.draw(this.canvas);
}

Stage.prototype.actualize = function(current)
{
	current.disk.spin();
	current.draw();
}

Stage.prototype.touchStart = function(eventName, touch)
{
	if (stageObject.slider1.isTouched(touch.pageX, touch.pageY))
	{
		stageObject.slider1.onTouch(touch);
		stageObject.listenTouch(touch.identifier, stageObject.slider1);
	}
	
	if (stageObject.disk.isTouched(touch.pageX, touch.pageY))
	{
		stageObject.disk.onTouch(touch);
		stageObject.listenTouch(touch.identifier, stageObject.disk);
	}
}

Stage.prototype.touchMove = function(eventName, touch)
{
	if (stageObject.listeners[touch.identifier])
	{
		for(var callbackIndex = 0; callbackIndex < stageObject.listeners[touch.identifier].length; callbackIndex++)
		{
			stageObject.listeners[touch.identifier][callbackIndex].onMove();
		}
	}
}

Stage.prototype.touchEnd = function(eventName, touch)
{
	if (stageObject.listeners[touch.identifier])
	{
		for(var callbackIndex = 0; callbackIndex < stageObject.listeners[touch.identifier].length; callbackIndex++)
		{
			stageObject.listeners[touch.identifier][callbackIndex].onTouchRelease();
		}
		
		delete stageObject.listeners[touch.identifier];
	}
}

Stage.prototype.listenTouch = function(touchId, callback)
{
	if (!stageObject.listeners[touchId])
	{
		stageObject.listeners[touchId] = [];
	}
	
	stageObject.listeners[touchId].push(callback);
}

