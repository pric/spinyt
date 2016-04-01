var Sound = function(context){
  if (this.constructor === Sound)
  {
    throw new Error("Can't instantiate abstract class!");
  }

  this.context = context;
  this.volume = 0;

}

Sound.prototype.play = function () {};


Sound.prototype.setVolume = function(volume)
{
  this.volume = volume;
}
