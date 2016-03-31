var PictureSlider = function() {
    Slider.apply(this, arguments);

	// this.handleWidth = 54;
  // this.handleHeigth = 57;
  // this.guideWidth = 17;
  // this.guideHeight = 280;

  this.handleWidth = this.width;
  this.handleHeigth = this.width + 3;
  this.guideWidth = 17;
  this.guideHeight = this.height;

  this.guideImg = new Image();
  this.handleImg = new Image();
  this.guideImg.src = 'image/theme_' + THEME_ID + '/sliderguide.png';
  this.handleImg.src = 'image/theme_' + THEME_ID + '/sliderhandle.png';
};

PictureSlider.prototype = Object.create(Slider.prototype);
PictureSlider.prototype.constructor = PictureSlider;

PictureSlider.prototype.draw = function(canvas)
{
	var ctx = canvas.getContext("2d");

	ctx.save();
	ctx.translate(this.centerX, this.centerY);

  ctx.drawImage(this.guideImg, -this.guideWidth/2, -this.guideHeight / 2, this.guideWidth, this.guideHeight);

  ctx.drawImage(this.handleImg, -this.handleWidth/2, -(this.guideHeight/2) + (this.value * this.guideHeight/100) - (this.handleHeigth/2), this.handleWidth, this.handleHeigth);

	ctx.restore();
}

PictureSlider.prototype.isTouched = function(x, y)
{
	var handleX = (this.centerX - (this.handleWidth / 2));
	var handleY = (this.centerY - (this.guideHeight / 2)) + (this.value * this.guideHeight / 100) - (this.handleHeigth / 2);

	if (handleY < y && handleY + this.handleHeigth > y && handleX < x && handleX + this.handleWidth > x)
	{
		return true;
	}

	return false;
}
