var MetronomeSound = function(audioContext) {

  Sound.apply(this, arguments);
}

MetronomeSound.prototype = Object.create(Sound.prototype);
MetronomeSound.prototype.constructor = MetronomeSound;

MetronomeSound.prototype.play = function () {

  var now = this.context.currentTime;
  var gain = this.context.createGain();
  gain.connect(this.context.destination);
  gain.gain.value = this.volume / 100;

  this.oscillator = this.context.createOscillator();
  this.oscillator.frequency = 10;
  this.oscillator.connect(gain);
  this.oscillator.type = 'square';
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.01);

};
