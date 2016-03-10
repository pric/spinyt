var PrimitiveDisk = function() {
    Disk.apply(this, arguments);
};

PrimitiveDisk.prototype = Object.create(Disk.prototype);
PrimitiveDisk.prototype.constructor = PrimitiveDisk;

PrimitiveDisk.prototype.draw = function()
{
	var radius = 100;
	
	var canvas = document.getElementsByTagName('canvas')[0];
	var ctx = canvas.getContext("2d");
	
	ctx.clearRect(this.centerX - radius, this.centerY - radius, this.centerX + radius, this.centerY + radius);
	
	ctx.beginPath();
	ctx.moveTo(this.centerX, this.centerY);
	ctx.lineTo(this.centerX + Math.cos(this.getRadianAngle()) * radius, this.centerY + Math.sin(this.getRadianAngle()) * radius);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(this.centerX, this.centerY, radius, 0, 2*Math.PI);
	ctx.stroke();
}