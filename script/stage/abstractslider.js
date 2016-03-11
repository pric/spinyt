var Slider = function(posX, posY, width, height) {
    if (this.constructor === Slider) 
	{
      throw new Error("Can't instantiate abstract class!");
    }
	
	StageObject.apply(this, arguments);
	
	this.width = width;
	this.height = height;
	
	this.value = 50;
};

Slider.prototype = Object.create(StageObject.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.slide = function (speed)
{
	if (speed)
	{
		if (speed > 100)
		{
			speed = 100;
		}
		
		this.value = speed;
	}
	
	this.notifyListeners("slide");
}
