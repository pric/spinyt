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

OscillatorSound.prototype.play = function (oscillatorType, frequency) {

  console.log(this.volume);

  var frequencyIndex = FREQUENCIES.length - Math.round(frequency*FREQUENCIES.length);
  var now = this.context.currentTime;
  var gain = this.context.createGain();
  var volumeNode = this.context.createGain();


  volumeNode.connect(this.context.destination);
  volumeNode.gain.value = this.volume / 100;

  gain.connect(volumeNode);
  gain.gain.setValueAtTime(1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

  this.oscillator = this.context.createOscillator();
  this.oscillator.frequency.value = FREQUENCIES[frequencyIndex];
  this.oscillator.connect(gain);
  this.oscillator.type = oscillatorType;
  this.oscillator.start(now);
  this.oscillator.stop(now + 0.1);

};
