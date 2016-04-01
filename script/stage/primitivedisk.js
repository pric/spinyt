var PrimitiveDisk = function() {
  Disk.apply(this, arguments);
};

PrimitiveDisk.prototype = Object.create(Disk.prototype);
PrimitiveDisk.prototype.constructor = PrimitiveDisk;

PrimitiveDisk.prototype.draw = function(canvas)
{
  var radius = 100;
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(this.centerX, this.centerY);
  ctx.lineTo(this.centerX + Math.cos(this.getRadianAngle()) * radius, this.centerY + Math.sin(this.getRadianAngle()) * radius);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(this.centerX, this.centerY, radius, 0, 2*Math.PI);
  ctx.stroke();
}
