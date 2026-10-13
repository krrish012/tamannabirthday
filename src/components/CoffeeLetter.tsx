import React, { useState } from 'react';
import { LetterContent } from '../types';
import { Link, Feather, Coffee, Sparkles, Scroll, RotateCcw } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CoffeeLetterProps {
  letter: LetterContent;
}

export const CoffeeLetter: React.FC<CoffeeLetterProps> = ({ letter }) => {
  const [isUnfurled, setIsUnfurled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUnfurl = () => {
    soundManager.playScrollUnfurlSound();
    setIsUnfurled(true);
  };

  const handleReseal = () => {
    soundManager.playScrollUnfurlSound();
    setIsUnfurled(false);
  };

  return (
    <section
      id="coffee-letter"
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-[#f7f2e9] overflow-hidden"
    >
      {/* Soft warm desk lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,230,205,0.7),rgba(235,215,185,0.3))]" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee0cc] border border-[#d6be9c] text-xs font-mono tracking-widest text-[#7c5631] uppercase shadow-xs">
          <Feather className="w-3.5 h-3.5 text-[#9c6a38]" />
          <span>Act V · A Few Words From The Heart</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#382314] tracking-tight font-display">
          A Letter For You
        </h2>
        <p className="text-[#7c5d42] text-sm sm:text-base max-w-md mx-auto">
          {isUnfurled
            ? 'Pen on vintage coffee-stained parchment. Some feelings are best kept in ink.'
            : 'A private scroll tied in crimson silk, sealed with royal wax for the birthday boy.'}
        </p>
      </div>

      {/* INTERACTIVE CONTAINER: SEALED SCROLL VS UNFURLED LETTER */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {!isUnfurled ? (
          /* =========================================================
             STATE 1: WAX SEALED ANCIENT ROLLED SCROLL
             ========================================================= */
          <div
            onClick={handleUnfurl}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer flex flex-col items-center my-8 transition-transform duration-500 hover:scale-[1.03] select-none"
          >
            {/* Ambient desk shadow */}
            <div className="absolute -bottom-6 w-11/12 h-10 bg-amber-950/25 blur-xl rounded-full" />

            {/* Hint Badge above scroll */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-amber-300/80 shadow-md backdrop-blur-md text-stone-800 text-xs sm:text-sm font-medium tracking-wide animate-bounce">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Click the wax seal to unroll & read</span>
            </div>

            {/* The Rolled Parchment Cylinder */}
            <div className="relative w-[310px] sm:w-[460px] md:w-[540px] h-[140px] sm:h-[170px] rounded-2xl flex items-center justify-center overflow-visible shadow-[0_22px_45px_rgba(100,60,20,0.28)] border-y-2 border-[#b89568] bg-gradient-to-b from-[#e2cbb0] via-[#faebd7] to-[#caa579]">
              {/* Top rolled lip curl */}
              <div className="absolute -top-3 inset-x-2 h-6 bg-gradient-to-r from-[#b69165] via-[#f7e6ce] to-[#b69165] rounded-full border border-[#9b7548] shadow-inner" />

              {/* Bottom rolled lip curl */}
              <div className="absolute -bottom-3 inset-x-2 h-6 bg-gradient-to-r from-[#b69165] via-[#f7e6ce] to-[#b69165] rounded-full border border-[#9b7548] shadow-md" />

              {/* Wooden / gilded scroll spindle rods on left & right */}
              <div className="absolute -left-4 sm:-left-6 inset-y-2 w-5 sm:w-7 rounded-l-xl bg-gradient-to-r from-[#5a391c] via-[#8f6236] to-[#3a200d] border border-[#2b1506] shadow-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
              </div>
              <div className="absolute -right-4 sm:-right-6 inset-y-2 w-5 sm:w-7 rounded-r-xl bg-gradient-to-l from-[#5a391c] via-[#8f6236] to-[#3a200d] border border-[#2b1506] shadow-lg flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300/80" />
              </div>

              {/* Aged parchment paper texture stripes */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,rgba(165,122,76,0.3)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_0%,rgba(90,50,20,0.4)_50%,transparent_100%)] pointer-events-none" />

              {/* Crimson Silk Ribbon Band wrapped vertically around center */}
              <div className="relative w-20 sm:w-24 h-full bg-gradient-to-r from-rose-950 via-rose-700 to-red-950 shadow-[0_0_12px_rgba(0,0,0,0.35)] flex items-center justify-center border-x border-rose-900/60 z-10">
                {/* Golden ribbon stitching edges */}
                <div className="absolute inset-y-0 left-1 w-0.5 border-r border-amber-300/60 border-dashed" />
                <div className="absolute inset-y-0 right-1 w-0.5 border-l border-amber-300/60 border-dashed" />

                {/* THE 3D EMBOSSED CRIMSON WAX SEAL */}
                <div className="relative group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {/* Outer melted wax drip ring */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-red-950 shadow-[0_10px_25px_rgba(140,20,30,0.65),inset_0_3px_6px_rgba(255,255,255,0.4)] border-2 border-red-950 flex flex-col items-center justify-center select-none cursor-pointer">
                    {/* Inner pressed stamp circle */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-rose-900/80 bg-gradient-to-br from-rose-800 to-rose-950 flex flex-col items-center justify-center text-rose-100 shadow-inner">
                      <Link className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-300 text-rose-300 animate-pulse drop-shadow-sm" />
                      <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-bold text-rose-200 mt-0.5">
                        TIMMY
                      </span>
                    </div>
                  </div>

                  {/* Pulsing glow ring around wax */}
                  <div className="absolute inset-0 rounded-full border-2 border-amber-300/50 animate-ping pointer-events-none opacity-40" />
                </div>
              </div>

              {/* Handwritten Label on parchment */}
              <div className="absolute left-6 sm:left-10 text-xs sm:text-sm font-handwriting text-[#5c3e24] font-bold opacity-80 hidden sm:block">
                For Tamanna
              </div>
              <div className="absolute right-6 sm:right-10 text-xs sm:text-sm font-handwriting text-[#5c3e24] font-bold opacity-80 hidden sm:block">
                With Love
              </div>
            </div>

            {/* Sub-label */}
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#8a5f32]">
              <Scroll className="w-4 h-4 text-rose-600" />
              <span>Royal Delivery · Click to Open</span>
            </div>
          </div>
        ) : (
          /* =========================================================
             STATE 2: UNFURLED COFFEE-STAINED LETTER
             ========================================================= */
          <div className="relative w-full animate-in fade-in zoom-in-95 duration-700">
            {/* Re-seal action button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleReseal}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#d6be9c] text-xs font-mono text-[#7c5631] shadow-sm hover:shadow-md transition-all cursor-pointer"
                title="Roll scroll back up"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                <span>Roll back up</span>
              </button>
            </div>

            {/* Subtle desk drop shadow and aged paper stack effect */}
            <div className="absolute inset-0 translate-y-3 translate-x-2 bg-[#decbb0] rounded-2xl opacity-50 blur-xs transform rotate-1 pointer-events-none" />
            <div className="absolute inset-0 translate-y-1.5 -translate-x-1.5 bg-[#e4d4bc] rounded-2xl opacity-70 transform -rotate-1 pointer-events-none" />

            {/* Main Coffee Parchment Sheet */}
            <div className="relative parchment-paper rounded-2xl p-8 sm:p-14 md:p-16 text-[#352011] transition-all duration-300 shadow-2xl">
              {/* Coffee mug stain graphic element in corner */}
              <div className="absolute top-6 right-8 w-24 h-24 rounded-full border-[5px] border-[#a57a4c]/20 pointer-events-none rotate-12 blur-[0.5px]" />
              <div className="absolute top-8 right-10 w-20 h-20 rounded-full border-[3px] border-[#8a5f32]/25 pointer-events-none -rotate-6 blur-[0.3px]" />

              {/* Letter Header / Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#a57a4c]/30 pb-4 mb-8 text-[#5c3e24]">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono">
                  <Coffee className="w-4 h-4 text-[#8a5f32]" />
                  <span>Highly Confidential</span>
                </div>
                <div className="font-handwriting text-[#5c3e24] text-lg mt-1 sm:mt-0">
                  {letter.date}
                </div>
              </div>

              {/* Salutation */}
              <div className="mb-6">
                <h3 className="text-3xl sm:text-4xl font-handwriting font-bold text-[#2a170a] tracking-wide">
                  {letter.salutation}
                </h3>
              </div>

              {/* PARAGRAPH 1 (Requested 2 paragraph letter) */}
              <div className="mb-8">
                <p className="text-xl sm:text-2xl font-handwriting text-[#2f1b0e] leading-relaxed sm:leading-loose tracking-wide">
                  {letter.paragraph1}
                </p>
              </div>

              {/* PARAGRAPH 2 (Requested 2 paragraph letter) */}
              <div className="mb-10">
                <p className="text-xl sm:text-2xl font-handwriting text-[#2f1b0e] leading-relaxed sm:leading-loose tracking-wide">
                  {letter.paragraph2}
                </p>
              </div>

              {/* Sign-off, Wax Seal & Signature */}
              <div className="pt-6 border-t border-[#a57a4c]/25 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div className="space-y-1">
                  <p className="text-xl font-handwriting text-[#4a301b]">
                    {letter.signoff}
                  </p>
                  <p className="text-3xl sm:text-4xl font-script font-bold text-[#1f0d04] tracking-wide mt-1">
                    {letter.signature}
                  </p>
                </div>

                {/* Crimson Wax Seal Emblem (Opened) */}
                <div className="shrink-0 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-red-900 border-2 border-red-950 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_6px_12px_rgba(100,20,20,0.3)] flex flex-col items-center justify-center text-rose-100 select-none">
                    <Link className="w-5 h-5 fill-rose-200 text-rose-200" />
                    <span className="text-[8px] font-mono tracking-tighter uppercase font-bold mt-0.5">UNSEALED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
