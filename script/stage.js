function Stage(canvas)
{
	this.canvas = canvas;
	this.listeners = [];	
	stageObject = this;
	
	var slider1 = new PrimitiveSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 2, 50, 600);
	var disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2, 500, 500);
	var popbox1 = new PrimitivePopbox(64, 64, 128, 128);
	//var popbox1 = new PicturePopbox(64, 64, 128, 128, 1);
	var popbox2 = new PicturePopbox(64, 192, 128, 128, 2);
	var popbox3 = new PicturePopbox(64, 320, 128, 128, 3);
	var popbox4 = new PicturePopbox(64, 448, 128, 128, 4);
	var popbox5 = new PicturePopbox(64, 576, 128, 128, 5);

	slider1.listenToEvent("SLIDE", function() { disk.spin(slider1.value / 2); });
	popbox1.listenToEvent("POP", function() { disk.addPopbox(popbox1.centerX, popbox1.centerY, "#00FF00"); });
	popbox2.listenToEvent("POP", function() { disk.addPopbox(popbox2.centerX, popbox2.centerY, "#FF0000"); });
	popbox3.listenToEvent("POP", function() { disk.addPopbox(popbox3.centerX, popbox3.centerY, "#FFFF00"); });
	popbox4.listenToEvent("POP", function() { disk.addPopbox(popbox4.centerX, popbox4.centerY, "#0000FF"); });
	popbox5.listenToEvent("POP", function() { disk.addPopbox(popbox5.centerX, popbox5.centerY, "#FFFFFF"); });

	this.objects = [];
	this.objects.push(disk);
	this.objects.push(slider1);
	this.objects.push(popbox1);
	this.objects.push(popbox2);
	this.objects.push(popbox3);
	this.objects.push(popbox4);
	this.objects.push(popbox5);
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
	var ctx = this.canvas.getContext("2d");
	ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
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
