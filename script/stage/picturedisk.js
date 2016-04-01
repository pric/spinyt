var PictureDisk = function() {
  Disk.apply(this, arguments);

  this.imageObj = new Image();
  this.imageObj.src = 'image/theme_' + THEME_ID + '/disk.png';
};

PictureDisk.prototype = Object.create(Disk.prototype);
PictureDisk.prototype.constructor = PictureDisk;

PictureDisk.prototype.draw = function(canvas)
{
  var backgroundIndicatorColor = '#494949';
  var centerRadius = 35;

  var radiusX = this.imageObj.width / 2;
  var radiusY = this.imageObj.width / 2;

  var ctx = canvas.getContext("2d");

  ctx.save();
  ctx.translate(this.centerX, this.centerY);

  ctx.rotate(this.getRadianAngle());
  ctx.drawImage(this.imageObj, -this.imageObj.width / 2, -this.imageObj.height / 2);

  if(true) {

    ctx.strokeStyle = backgroundIndicatorColor;
    ctx.lineWidth = 1;

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

  for(var arcIndex = 1; arcIndex < FREQUENCIES.length; arcIndex++) {

    ctx.strokeStyle = backgroundIndicatorColor;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    ctx.arc(0, 0, (this.getRadius() - centerRadius) / FREQUENCIES.length * arcIndex + centerRadius, 0, 2 * Math.PI);
    ctx.stroke();

  }

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

  ctx.rotate( - this.getRadianAngle());

  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(0, -this.getRadius());
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#a366ff';
  ctx.stroke();

  for(var notesIndex = 0; notesIndex < NOTES.length; notesIndex ++)
  {
    var division = (this.getRadius() - centerRadius) / NOTES.length;
    ctx.font = "12px Comic Sans MS";
    ctx.fillStyle = "#a366ff";
    ctx.fillText(NOTES[NOTES.length - notesIndex - 1], 7, - (division * notesIndex) - centerRadius - (division / 2) + 5);
  }

  ctx.restore();
}
