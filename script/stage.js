function Stage(canvas)
{
	this.canvas = canvas;

	var slider1 = new PrimitiveSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 2, 50, 600);
	var disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2, 500, 500);

	this.listeners = [];

	stageObject = this;
	slider1.listenToEvent("SLIDE", function() { disk.spin(slider1.value / 2); });

	this.objects = [];
	this.objects.push(disk);
	this.objects.push(slider1);
}

var stageObject = null;

Stage.prototype.start = function()
{
	this.executeFunctionOnObjects("start");

	var current = this;
	setInterval(function(){ current.actualize(current); }, 50);
}

Stage.prototype.draw = function()
{
	this.executeFunctionOnObjects("draw", this.canvas);
}

Stage.prototype.actualize = function(current)
{
	current.executeFunctionOnObjects("spin");
	current.draw();
}

Stage.prototype.touchStart = function(eventName, touch)
{
	for(var index = 0; index < stageObject.objects.length; index++)
	{
		if (stageObject.objects[index].isTouched(touch.pageX, touch.pageY))
		{
			stageObject.objects[index].onTouch(touch);
			stageObject.listenTouch(touch.identifier, stageObject.objects[index]);
		}
	}
}

Stage.prototype.doubleTouchStart = function(eventName, touch)
{
	console.log("anus");
	for(var index = 0; index < stageObject.objects.length; index++)
	{
		if (stageObject.objects[index].isTouched(touch.pageX, touch.pageY))
		{
			stageObject.objects[index].onDoubleTouch(touch);
			stageObject.listenTouch(touch.identifier, stageObject.objects[index]);
		}
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

Stage.prototype.executeFunctionOnObjects = function(functionName, functionArguments)
{
	for(var index = 0; index < this.objects.length; index++)
	{
		if (typeof this.objects[index][functionName] == 'function')
		{
			this.objects[index][functionName](functionArguments);
		}
	}
}
