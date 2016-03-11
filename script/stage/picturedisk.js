var PictureDisk = function() {
    Disk.apply(this, arguments);
	
	this.imageObj = new Image();
	this.imageObj.src = 'image/disk.png';
};

PictureDisk.prototype = Object.create(Disk.prototype);
PictureDisk.prototype.constructor = PictureDisk;

PictureDisk.prototype.draw = function()
{	
	var radiusX = this.imageObj.width / 2;
	var radiusY = this.imageObj.width / 2;
	
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext("2d");
	
	ctx.save();
	ctx.clearRect(this.centerX - radiusX, this.centerY - radiusY, this.centerX + radiusX, this.centerY + radiusY);
	
	ctx.translate(this.centerX, this.centerY);
	
	ctx.rotate(this.getRadianAngle());
    ctx.drawImage(this.imageObj, -this.imageObj.width / 2, -this.imageObj.height / 2);
	
	ctx.restore();	
}