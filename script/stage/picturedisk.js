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
	ctx.rotate( - this.getRadianAngle());
	
	ctx.beginPath();
    ctx.moveTo(0, 0);
	ctx.lineTo(0, -this.getRadius());
	ctx.strokeStyle = '#FFFFFF';
	ctx.stroke();
	
	ctx.rotate(this.getRadianAngle());
	
	for(var index = 0; index < this.popboxes.length; index++)
	{
		var popboxX = Math.cos(this.popboxes[index].angle * Math.PI / 180) * this.popboxes[index].radius;
		var popboxY = Math.sin(this.popboxes[index].angle * Math.PI / 180) * this.popboxes[index].radius;
				
		ctx.fillStyle = this.popboxes[index].color;
		ctx.beginPath();
		ctx.arc(popboxX, popboxY, 20, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}

	ctx.restore();
}
