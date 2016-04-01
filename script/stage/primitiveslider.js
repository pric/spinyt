var PrimitiveSlider = function() {
  Slider.apply(this, arguments);

  this.handleHeigth = this.width;
};

PrimitiveSlider.prototype = Object.create(Slider.prototype);
PrimitiveSlider.prototype.constructor = PrimitiveSlider;

PrimitiveSlider.prototype.draw = function(canvas)
{
  var ctx = canvas.getContext("2d");

  ctx.save();
  ctx.translate(this.centerX - (this.width / 2), this.centerY - (this.height / 2));

  ctx.fillStyle="#FF0000";
  ctx.fillRect(0 + (this.width / 2) - 5, 0, 10, this.height);

  ctx.fillStyle="#0000FF";
  ctx.fillRect(0, (this.value * this.height / 100) - (this.handleHeigth / 2), this.width - 1, this.handleHeigth);

  ctx.restore();
}

PrimitiveSlider.prototype.isTouched = function(x, y)
{
  var handleHeigth = this.handleHeigth;
  var handleWidth = this.width;
  var handleX = (this.centerX - (handleWidth / 2));
  var handleY = (this.centerY - (this.height / 2)) + ((this.value * this.height / 100) - (this.handleHeigth / 2));

  if (handleY < y && handleY + handleHeigth > y && handleX < x && handleX + handleWidth > x)
  {
    return true;
  }

  return false;
}
