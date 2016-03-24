var PicturePopbox = function() {
    Popbox.apply(this, arguments);
	
	this.imageObj = new Image();
	this.imageObj.src = 'image/icon_' + arguments[4] + '.png';
};

PicturePopbox.prototype = Object.create(Popbox.prototype);
PicturePopbox.prototype.constructor = PicturePopbox;

PicturePopbox.prototype.draw = function(canvas)
{	
	var radiusX = this.imageObj.width / 2;
	var radiusY = this.imageObj.width / 2;
	
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	// ctx.clearRect(this.centerX - radiusX, this.centerY - radiusY, this.centerX + radiusX, this.centerY + radiusY);
	
	ctx.translate(this.centerX, this.centerY);
	
    ctx.drawImage(this.imageObj, -this.imageObj.width / 2, -this.imageObj.height / 2);
	
	ctx.restore();	
}