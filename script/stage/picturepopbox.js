var PicturePopbox = function() {
    Popbox.apply(this, arguments);
	
	this.imageObj = new Image();
	this.imageObj.src = 'image/theme_' + THEME_ID + '/icon_' + arguments[5] + '.png';
};

PicturePopbox.prototype = Object.create(Popbox.prototype);
PicturePopbox.prototype.constructor = PicturePopbox;

PicturePopbox.prototype.draw = function(canvas)
{	
	var radiusX = this.imageObj.width / 2;
	var radiusY = this.imageObj.width / 2;
	
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	ctx.translate(this.centerX, this.centerY);
	
    ctx.drawImage(this.imageObj, -this.width / 2, -this.height / 2, this.width, this.height);
	
	ctx.restore();	
}