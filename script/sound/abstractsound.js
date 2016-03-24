var Sound = function(context, oscillatorType){
  if (this.constructor === Sound)
  {
    throw new Error("Can't instantiate abstract class!");
  }

  this.context = context;
  this.oscillatorType = oscillatorType;
  
}

Sound.prototype.play = function () {

};
