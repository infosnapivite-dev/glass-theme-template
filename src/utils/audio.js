// Procedural romantic ambient music player using Web Audio API
class RomanticAmbientAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.gainNode = null;
    // Romantic melody chords (Cmaj7, Am9, Fmaj7, G6)
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 523.25], // Cmaj7
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 261.63, 329.63, 392.00, 440.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00, 493.88], // G6
    ];
    this.currentChord = 0;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(freq, delay = 0, duration = 3.5) {
    if (!this.ctx || !this.isPlaying) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm sine/triangle wave blend
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

    // Warm lowpass filter to create an organic harp/felt piano sound
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime + delay);
    filter.Q.setValueAtTime(3, this.ctx.currentTime + delay);

    const startTime = this.ctx.currentTime + delay;
    // Smooth attack and long romantic decay
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  tick() {
    if (!this.isPlaying) return;

    const chord = this.chords[this.currentChord];
    const note = chord[this.step % chord.length];

    // Play note with soft micro-variation
    this.playNote(note, 0, 4.0);

    // Occasionally play a high bell harmonic
    if (Math.random() > 0.6) {
      this.playNote(note * 2, 0.4, 2.5);
    }

    this.step++;
    if (this.step % 4 === 0) {
      this.currentChord = (this.currentChord + 1) % this.chords.length;
    }

    const nextDelay = 800 + Math.random() * 400; // Romantic gentle cadence
    this.timerId = setTimeout(() => this.tick(), nextDelay);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.tick();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientMusic = new RomanticAmbientAudio();
