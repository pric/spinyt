const OscillatorType  = {
  TRIANGLE : 'triangle',
  SAWTOOTH : 'sawtooth',
  SQUARE : 'square',
  SINE : 'sine'
};

var OscillatorSound = function(audioContext) {

  Sound.apply(this, arguments);
}

OscillatorSound.prototype = Object.create(Sound.prototype);
OscillatorSound.prototype.constructor = OscillatorSound;

OscillatorSound.prototype.play = function (oscillatorType, frequency, volume) {

  var now = this.context.currentTime;
  var gain = this.context.createGain();
  gain.connect(this.context.destination);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  this.oscillator = this.context.createOscillator();
  this.oscillator.frequency = 500;
  this.oscillator.detune.value = 1000 * frequency;
  this.oscillator.connect(gain);
  this.oscillator.type = oscillatorType;
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.5);

};
