var PrimitivePopbox = function() {
    Popbox.apply(this, arguments);
};

PrimitivePopbox.prototype = Object.create(Popbox.prototype);
PrimitivePopbox.prototype.constructor = PrimitivePopbox;

PrimitivePopbox.prototype.draw = function(canvas)
{
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	
	ctx.translate(this.centerX - (this.width / 2), this.centerY - (this.height / 2));
	
	ctx.fillStyle="#00FF00";
	ctx.fillRect(0, 0, this.width, this.height);
	
	ctx.restore();
}