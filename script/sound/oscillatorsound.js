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

  this.oscillator = this.context.createOscillator();
  var now = this.context.currentTime;
  var gain = this.context.createGain();

  gain.connect(this.context.destination);
  gain.gain.value = volume;

  this.oscillator.frequency.value = 500 + (2500 * frequency);
  this.oscillator.type = oscillatorType;
  this.oscillator.connect(gain);

  this.oscillator.start(now);
  this.oscillator.stop(now + 0.2);
};
