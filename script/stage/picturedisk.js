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

  if(true) {

    ctx.strokeStyle = 'rgba(215,85,85,0.4)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, -35);
    ctx.lineTo(0, -this.getRadius());
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25, -25);
    ctx.lineTo((this.getRadius()-106),-(this.getRadius()-106));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 35);
    ctx.lineTo(0, this.getRadius());
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo((this.getRadius()-106),(this.getRadius()-106));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-35, 0);
    ctx.lineTo(-this.getRadius(), 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-25, 25);
    ctx.lineTo(-(this.getRadius()-106),(this.getRadius()-106));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(35, 0);
    ctx.lineTo(this.getRadius(), 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-25, -25);
    ctx.lineTo(-(this.getRadius()-106),-(this.getRadius()-106));
    ctx.stroke();
    
  }

  ctx.rotate( - this.getRadianAngle());

  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(0, -this.getRadius());
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.stroke();

  ctx.rotate(this.getRadianAngle());

  for(var index = 0; index < this.popboxes.length; index++)
  {
    var popboxX = Math.cos(this.popboxes[index].angle * Math.PI / 180) * this.popboxes[index].radius;
    var popboxY = Math.sin(this.popboxes[index].angle * Math.PI / 180) * this.popboxes[index].radius;
    var fillStyle = this.popboxes[index].color;
    if (this.popboxes[index].pulse > 0)
    {
      this.popboxes[index].pulse--;

      if (this.popboxes[index].pulse < PULSE_TIME / 2)
      {
        fillStyle = (parseInt(fillStyle, 16) + parseInt("101010", 16)).toString(16);
      }
      else
      {
        fillStyle = (parseInt(fillStyle, 16) - parseInt("101010", 16)).toString(16);
      }
      while (fillStyle.length < 6) { fillStyle = '0' + fillStyle; } // Zero pad.
    }

    this.popboxes[index].color = fillStyle;

    ctx.fillStyle = "#" + fillStyle;
    ctx.beginPath();
    ctx.arc(popboxX, popboxY, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  ctx.restore();
}
