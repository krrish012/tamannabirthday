import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { ChevronDown, RotateCcw, Volume2, VolumeX, Sparkles, Link } from 'lucide-react';

interface CountdownHeroProps {
  heroTitle: string;
  heroNickname: string;
  onScrollToStory: () => void;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({
  heroTitle,
  heroNickname,
  onScrollToStory
}) => {
  // Stages: 'counting' (3, 2, 1) -> 'revealed'
  const [stage, setStage] = useState<'counting' | 'revealed'>('counting');
  const [currentNum, setCurrentNum] = useState<number | null>(3);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [flashActive, setFlashActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fireConfetti = () => {
    // Play celebratory confetti sound requested by user
    soundManager.playConfettiSound();

    // Joyful, light pastel & vibrant celebratory confetti burst
    const count = 200;
    const defaults = {
      origin: { y: 0.62 },
      colors: ['#FB7185', '#F43F5E', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const startCountdown = () => {
    setStage('counting');
    setCurrentNum(3);
    setFlashActive(true);

    soundManager.playCountdownBeep(3);
    setTimeout(() => setFlashActive(false), 200);

    const timer2 = setTimeout(() => {
      setCurrentNum(2);
      setFlashActive(true);
      soundManager.playCountdownBeep(2);
      setTimeout(() => setFlashActive(false), 200);
    }, 1000);

    const timer1 = setTimeout(() => {
      setCurrentNum(1);
      setFlashActive(true);
      soundManager.playCountdownBeep(1);
      setTimeout(() => setFlashActive(false), 200);
    }, 2000);

    const timerReveal = setTimeout(() => {
      setCurrentNum(null);
      setStage('revealed');
      soundManager.playBirthdayReveal();
      fireConfetti();
    }, 3000);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer1);
      clearTimeout(timerReveal);
    };
  };

  useEffect(() => {
    soundManager.initSpeech();
    soundManager.initHbdtTrack();
    const cleanup = startCountdown();
    return cleanup;
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (!next) {
      soundManager.stopAllAudio();
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        stage === 'counting'
          ? flashActive
            ? 'bg-white'
            : 'bg-black text-white'
          : 'bg-[#faf7f2] text-stone-900'
      }`}
    >
      {/* Light celebratory background accents during reveal */}
      {stage === 'revealed' && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(251,113,133,0.12),rgba(255,255,255,0))] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(251,191,36,0.1),transparent)] pointer-events-none" />
          
          {/* Subtle floating celebratory particles */}
          <div className="absolute top-16 left-12 text-rose-300/40 text-2xl animate-float">✦</div>
          <div className="absolute top-24 right-16 text-amber-300/40 text-xl animate-float" style={{ animationDelay: '1.5s' }}>★</div>
          <div className="absolute bottom-20 left-20 text-rose-300/30 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>♥</div>
          <div className="absolute bottom-32 right-24 text-amber-400/30 text-2xl animate-float" style={{ animationDelay: '0.8s' }}>✨</div>
        </>
      )}

      {/* Floating sound and replay controls */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={toggleSound}
          type="button"
          className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
            stage === 'counting'
              ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
              : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200 shadow-md'
          }`}
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-rose-500" />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
        </button>

        {stage === 'revealed' && (
          <button
            onClick={startCountdown}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/85 hover:bg-white text-stone-700 border border-stone-200/80 backdrop-blur-md text-xs font-medium transition-all shadow-md cursor-pointer"
            title="Replay Countdown"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
            <span>Replay</span>
          </button>
        )}
      </div>

      {/* STAGE 1: BLACKOUT COUNTDOWN NUMBERS FLASHING */}
      {stage === 'counting' && currentNum !== null && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center select-none animate-in fade-in zoom-in-75 duration-300">
          <div
            key={currentNum}
            className="text-[12rem] sm:text-[18rem] md:text-[22rem] font-black tracking-tighter text-white font-sans-clean leading-none drop-shadow-[0_0_80px_rgba(255,255,255,0.9)] animate-pulse"
          >
            {currentNum}
          </div>
          <p className="text-stone-400 tracking-[0.35em] uppercase text-xs sm:text-sm font-mono mt-6 opacity-75">
            Hold on tight...
          </p>
        </div>
      )}

      {/* STAGE 2: LIGHT THEME BIRTHDAY REVEAL FOR TIMMY (TAMANNA) */}
      {stage === 'revealed' && (
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center py-16 animate-in fade-in zoom-in-95 duration-1000">
          {/* Confetti Trigger Badge */}
          <button
            onClick={fireConfetti}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200/80 text-rose-600 text-xs font-semibold tracking-wide uppercase mb-6 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Click for more Confetti</span>
          </button>

          {/* Main Birthday Greeting */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-stone-600 font-serif italic tracking-wide">
              {heroTitle}
            </h2>
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 drop-shadow-sm font-display">
              {heroNickname}
            </h1>
            <div className="flex items-center justify-center gap-2 text-rose-500/80 text-xs tracking-widest uppercase font-mono pt-2">
              <Link className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
              <span>Timmy ka Happy Birthday lesgooo!!!!</span>
              <Link className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
            </div>
          </div>

          <p className="mt-8 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
            To the one who turned every single day into an unforgettable adventure.
            I present to you... drumroll please... scroll kar khud abh lol
          </p>

          {/* Scroll Down Action Prompt */}
          <div className="mt-14 flex flex-col items-center">
            <button
              onClick={onScrollToStory}
              className="group flex flex-col items-center gap-2.5 text-stone-500 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <span className="text-xs tracking-widest uppercase font-mono font-medium">
                Scroll Down to Enter
              </span>
              <div className="w-10 h-10 rounded-full border border-stone-300 group-hover:border-rose-400 flex items-center justify-center bg-white shadow-md transition-all group-hover:scale-110 animate-bounce">
                <ChevronDown className="w-5 h-5 text-rose-500" />
              </div>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
