// Synthesized audio & hbdt.m4a Happy Birthday track management

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private hbdtAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Pre-load hbdt.m4a track (with mp3 fallback) so it plays instantly
  // Use cache-busting query to force reload when files change
  public initHbdtTrack() {
    if (typeof window !== 'undefined' && !this.hbdtAudio) {
      // Add cache-busting timestamp to force reload on file changes
      const timestamp = Date.now();
      this.hbdtAudio = new Audio(`/hbdt.m4a?t=${timestamp}`);
      this.hbdtAudio.preload = 'auto';
      this.hbdtAudio.onerror = () => {
        // Fallback to mp3 if m4a decoding fails on any platform
        if (this.hbdtAudio && !this.hbdtAudio.src.endsWith('/hbdt.mp3?t=' + timestamp)) {
          this.hbdtAudio.src = `/hbdt.mp3?t=${timestamp}`;
          this.hbdtAudio.load();
        }
      };
    }
  }

  // Play the uploaded hbdt.m4a track
  public playHbdtTrack() {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      this.initHbdtTrack();
      if (this.hbdtAudio) {
        this.hbdtAudio.currentTime = 0;
        const playPromise = this.hbdtAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay fallback if blocked by browser policy before first interaction
            this.speakHappyBirthday("Happy birthday Timmy!");
            this.playCelebratoryFanfare();
          });
        }
      } else {
        this.speakHappyBirthday("Happy birthday Timmy!");
        this.playCelebratoryFanfare();
      }
    } catch {
      this.speakHappyBirthday("Happy birthday Timmy!");
      this.playCelebratoryFanfare();
    }
  }

  public stopAllAudio() {
    if (this.hbdtAudio) {
      this.hbdtAudio.pause();
      this.hbdtAudio.currentTime = 0;
    }
  }

  // Play a soft tick/beep during 3, 2, 1
  playCountdownBeep(num: number) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs: Record<number, number> = { 3: 440, 2: 554.37, 1: 659.25 };
      const freq = freqs[num] || 523.25;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch {
      // Audio autoplay restrictions handled
    }
  }

  // Initialize speech voices early
  public initSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

  // Speak fallback using browser voice synthesis
  speakHappyBirthday(customPhrase = "Happy Birthday!") {
    if (!this.enabled || typeof window === 'undefined') return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        const utterance = new SpeechSynthesisUtterance(customPhrase);
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const preferredVoice =
            voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria'))) ||
            voices.find(v => v.lang.startsWith('en'));
          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }
        }
        utterance.rate = 1.0;
        utterance.pitch = 1.2;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Speech synthesis fallback
    }
  }

  // Play single warm bell note
  private playNote(freq: number, startTime: number, duration: number, gainLevel: number = 0.16) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // octave shimmer

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }

  // Play the iconic "Happy Birthday To You" song melody
  playHappyBirthdayMelody() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const startTime = this.ctx.currentTime + 0.05;

      const G4 = 392.00;
      const A4 = 440.00;
      const B4 = 493.88;
      const C5 = 523.25;
      const D5 = 587.33;
      const E5 = 659.25;
      const F5 = 698.46;
      const G5 = 783.99;

      const notes: [number, number, number][] = [
        // "Hap-py birth-day to you"
        [G4, 0.28, 0.32],
        [G4, 0.18, 0.22],
        [A4, 0.45, 0.48],
        [G4, 0.45, 0.48],
        [C5, 0.45, 0.48],
        [B4, 0.85, 0.95],

        // "Hap-py birth-day to you"
        [G4, 0.28, 0.32],
        [G4, 0.18, 0.22],
        [A4, 0.45, 0.48],
        [G4, 0.45, 0.48],
        [D5, 0.45, 0.48],
        [C5, 0.85, 0.95],

        // "Hap-py birth-day dear Tim-my"
        [G4, 0.28, 0.32],
        [G4, 0.18, 0.22],
        [G5, 0.45, 0.48],
        [E5, 0.45, 0.48],
        [C5, 0.45, 0.48],
        [B4, 0.40, 0.42],
        [A4, 0.75, 0.85],

        // "Hap-py birth-day to you!"
        [F5, 0.28, 0.32],
        [F5, 0.18, 0.22],
        [E5, 0.45, 0.48],
        [C5, 0.45, 0.48],
        [D5, 0.50, 0.52],
        [C5, 1.20, 1.30],
      ];

      // Bass downbeat chords
      const chords: [number, number, number][] = [
        [C5 / 2, 0.0, 1.8],
        [G4 / 2, 2.0, 1.8],
        [C5 / 2, 4.0, 1.8],
        [F5 / 2, 6.0, 1.0],
        [C5 / 2, 7.2, 1.8],
      ];

      chords.forEach(([freq, offset, dur]) => {
        this.playNote(freq, startTime + offset, dur, 0.08);
      });

      let currentOffset = 0;
      notes.forEach(([freq, dur, gap]) => {
        this.playNote(freq, startTime + currentOffset, dur, 0.18);
        currentOffset += gap;
      });
    } catch {
      // Audio fallback
    }
  }

  // Rapid sparkling celebratory chime fanfare for confetti clicks
  playCelebratoryFanfare() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const startTime = this.ctx.currentTime + 0.02;
      const fanfareNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      fanfareNotes.forEach((freq, idx) => {
        this.playNote(freq, startTime + idx * 0.08, 0.45, 0.2);
      });
    } catch {
      // Audio fallback
    }
  }

  // Main reveal: plays hbdt.m4a track as the happy birthday song
  playBirthdayReveal() {
    this.playHbdtTrack();
  }

  // Confetti trigger: plays hbdt.m4a track + celebratory fanfare
  playConfettiSound() {
    this.playHbdtTrack();
    this.playCelebratoryFanfare();
  }

  // Play sound when wax seal is broken and scroll unfolds
  playScrollUnfurlSound() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const startTime = this.ctx.currentTime;

      // Soft wax seal snap click
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(360, startTime);
      osc.frequency.exponentialRampToValueAtTime(120, startTime + 0.08);
      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.1);

      // Whispering parchment unroll flutter chimes
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        this.playNote(freq, startTime + 0.06 + idx * 0.05, 0.4, 0.1);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundManager = new SoundEffects();
