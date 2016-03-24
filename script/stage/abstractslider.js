var Slider = function() {
    if (this.constructor === Slider) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	StageObject.apply(this, arguments);
	
	this.value = 0;
};

Slider.prototype = Object.create(StageObject.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.slide = function (value)
{
	if (value)
	{		
		if (value < 0)
		{
			value = 0;
		}

		if (value > 100)
		{
			value = 100;
		}
		
		this.value = value;
	}
	
	this.notifyListeners("SLIDE");
}

Slider.prototype.onMove = function(object) 
{	
	var toBeRemoved = this.centerY - (this.height / 2);
	var newPosY = object.pageY - toBeRemoved;
	this.slide(newPosY * 100 / this.height);
}
