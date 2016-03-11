var PrimitiveSlider = function() {
    Slider.apply(this, arguments);
};

PrimitiveSlider.prototype = Object.create(Slider.prototype);
PrimitiveSlider.prototype.constructor = PrimitiveSlider;

PrimitiveSlider.prototype.draw = function()
{
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	ctx.clearRect(this.centerX - (this.width / 2), this.centerY - (this.height / 2), this.width, this.height);
	
	ctx.translate(this.centerX - (this.width / 2), this.centerY - (this.height / 2));
	
	ctx.fillStyle="#FF0000";
	ctx.fillRect(0 + (this.width / 2) - 5, 0, 10, this.height - 1);
	
	ctx.fillStyle="#0000FF";
	ctx.fillRect(0, this.height * this.value / 100, this.width - 1, 10);
	
	ctx.restore();
}