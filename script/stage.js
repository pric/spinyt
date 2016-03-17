function Stage(canvas) 
{
	this.canvas = canvas;	
	
	this.slider1 = new PrimitiveSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 2, 50, 600);
	this.disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2, 500, 500);
	
	this.listeners = [];
	
	stageObject = this;
	this.slider1.listenToEvent("SLIDE", function() { stageObject.disk.spin(stageObject.slider1.value / 2); });
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
		if(stageObject.listeners[touch.identifier].isStillTouched(touch.pageX, touch.pageY))
		{
			stageObject.listeners[touch.identifier].onMove(touch);
		}
		else
		{
			stageObject.listeners[touch.identifier].onTouchRelease();
			stageObject.listeners[touch.identifier] = null;
		}
	}
}

Stage.prototype.touchEnd = function(eventName, touch)
{
	if (stageObject.listeners[touch.identifier])
	{
		stageObject.listeners[touch.identifier].onTouchRelease();
	}
}

Stage.prototype.listenTouch = function(touchId, callback)
{
	if (!stageObject.listeners)
	{
		stageObject.listeners= [];
	}
	
	stageObject.listeners[touchId] = callback;
}

