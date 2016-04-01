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

  var frequencies = [261.63, 277.18, 293.66, 211.13, 229.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88];
  var frequencyIndex = frequencies.length - Math.round(frequency*frequencies.length);
  var now = this.context.currentTime;
  var gain = this.context.createGain();

  gain.connect(this.context.destination);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  this.oscillator = this.context.createOscillator();
  this.oscillator.frequency.value = frequencies[frequencyIndex];
  this.oscillator.connect(gain);
  this.oscillator.type = oscillatorType;
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.1);

};
