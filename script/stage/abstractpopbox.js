var Popbox = function() {
  if (this.constructor === Popbox)
  {
    throw new Error("Can't instantiate abstract class!");
  }

  StageObject.apply(this, arguments);

  this.startUpPosX = arguments[0];
  this.startUpPosY = arguments[1];
  this.startUpWidth = arguments[2];
  this.startUpHeigth = arguments[3];
  this.popboxColor = arguments[4];
  this.type = arguments[5];
};

Popbox.prototype = Object.create(StageObject.prototype);
Popbox.prototype.constructor = Popbox;

Popbox.prototype.onTouch = function(object)
{
  this.centerX = object.pageX;
  this.centerY = object.pageY;
  this.width = this.startUpWidth / 3;
  this.height = this.startUpHeigth / 3;
}

Popbox.prototype.onMove = function(object)
{
  this.centerX = object.pageX;
  this.centerY = object.pageY;
}

Popbox.prototype.onTouchRelease = function(object)
{
  this.notifyListeners("POP");

  this.centerX = this.startUpPosX;
  this.centerY = this.startUpPosY;
  this.width = this.startUpWidth;
  this.height = this.startUpHeigth;
}
