function Stage(canvas)
{
  this.canvas = canvas;
  this.listeners = [];
  stageObject = this;

  var slider1 = new PictureSlider(this.canvas.width - (this.canvas.width/ 10), this.canvas.height / 4, 54, 280);
  var slider2 = new PictureSlider(this.canvas.width - (this.canvas.width/ 10), (this.canvas.height / 4) * 3, 54, 280);

  var disk = new PictureDisk(this.canvas.width / 2, this.canvas.height / 2, 725, 725);
  var popbox1 = new PicturePopbox(64, 576, 100, 110, "eb6060", 1);
  var popbox2 = new PicturePopbox(64, 192, 100, 109, "5093D2", 2);
  var popbox3 = new PicturePopbox(64, 320, 100, 110, "8AC050", 3);
  var popbox4 = new PicturePopbox(64, 448, 100, 109, "DBDF59", 4);

	var audioContext = new AudioContext();
  var oscillatorSound = new OscillatorSound(audioContext);
	var metronomeSound = new MetronomeSound(audioContext);

  //disk.listenToEvent("PLAYSOUND", function(eventName, oscillatorType, frequency) { oscillatorSound.play(oscillatorType, frequency, 1); });
  disk.listenToEvent("PLAYSOUND", function(eventName, oscillatorType, frequency) { oscillatorSound.play(oscillatorType, frequency, 1); });
  disk.listenToEvent("POPOUT", function(eventName, type, touch) { var popbox = eval("popbox" + type); if (popbox) { popbox.onTouch(touch); } });
	//disk.listenToEvent("TICKMETRONOME", function() {metronomeSound.play();});
	slider1.listenToEvent("SLIDE", function() { disk.adjustSpin((100 - slider1.value) / 10); });
  popbox1.listenToEvent("POP", function() { disk.addPopbox(popbox1.centerX, popbox1.centerY, popbox1.popboxColor, OscillatorType.TRIANGLE, popbox1.type); });
  popbox2.listenToEvent("POP", function() { disk.addPopbox(popbox2.centerX, popbox2.centerY, popbox2.popboxColor, OscillatorType.SAWTOOTH, popbox2.type); });
  popbox3.listenToEvent("POP", function() { disk.addPopbox(popbox3.centerX, popbox3.centerY, popbox3.popboxColor, OscillatorType.SQUARE, popbox3.type); });
  popbox4.listenToEvent("POP", function() { disk.addPopbox(popbox4.centerX, popbox4.centerY, popbox4.popboxColor, OscillatorType.SINE, popbox4.type); });

  this.objects = [];
  this.objects.push(disk);
  this.objects.push(slider1);
  this.objects.push(slider2);
  this.objects.push(popbox1);
  this.objects.push(popbox2);
  this.objects.push(popbox3);
  this.objects.push(popbox4);
}

var stageObject = null;

Stage.prototype.start = function()
{
  this.executeFunctionOnObjects("start");

  var current = this;
  setInterval(function(){ current.actualize(current); }, 25);
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

Stage.prototype.doubleTouchEnd = function(eventName, touch)
{
  if (stageObject.listeners[touch.identifier])
  {
    stageObject.listeners[touch.identifier].onDoubleTouchRelease();
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
