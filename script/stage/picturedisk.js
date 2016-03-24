var PictureDisk = function() {
    Disk.apply(this, arguments);
	
	this.imageObj = new Image();
	this.imageObj.src = 'image/theme_' + THEME_ID + '/disk.png';
};

PictureDisk.prototype = Object.create(Disk.prototype);
PictureDisk.prototype.constructor = PictureDisk;

PictureDisk.prototype.draw = function(canvas)
{	
	var radiusX = this.imageObj.width / 2;
	var radiusY = this.imageObj.width / 2;
	
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	ctx.translate(this.centerX, this.centerY);
	
	ctx.rotate(this.getRadianAngle());
	
    ctx.drawImage(this.imageObj, -this.imageObj.width / 2, -this.imageObj.height / 2);
	
	for(var index = 0; index < this.popboxes.length; index++)
	{
		ctx.fillStyle = this.popboxes[index].type;
		ctx.beginPath();
		ctx.arc(this.popboxes[index].posX - this.centerX, this.popboxes[index].posY - this.centerY, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
	
	ctx.restore();	
}