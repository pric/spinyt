var MetronomeSound = function(audioContext) {

  Sound.apply(this, arguments);
}

MetronomeSound.prototype = Object.create(Sound.prototype);
MetronomeSound.prototype.constructor = MetronomeSound;

MetronomeSound.prototype.play = function (volume) {

  var now = this.context.currentTime;
  var gain = this.context.createGain();
  gain.connect(this.context.destination);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.3);

  this.oscillator = this.context.createOscillator();
  this.oscillator.frequency = 10;
  this.oscillator.connect(gain);
  this.oscillator.type = 'square';
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.5);

};
