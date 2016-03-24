var NoteSound = function() {
  Sound.apply(this, arguments);
}

NoteSound.prototype = Object.create(Sound.prototype);
NoteSound.prototype.constructor = NoteSound;

NoteSound.prototype.play = function (frequency, volume) {

  this.oscillator = this.context.createOscillator();
  var now = this.context.currentTime;
  var gain = this.context.createGain();
  
  gain.connect(this.context.destination);
  gain.gain.setValueAtTime(3, now);
  gain.gain.value = volume;
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  this.oscillator.frequency.value = 500 + (2500 * frequency);
  this.oscillator.type = this.oscillatorType;
  this.oscillator.connect(gain);
  
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.5);
};
