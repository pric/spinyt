var Sound = function(context){
  if (this.constructor === Sound)
  {
    throw new Error("Can't instantiate abstract class!");
  }

  this.context = context;

}

Sound.prototype.play = function () {};
