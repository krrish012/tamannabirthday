import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdventureMemory } from '../types';
import { PhotoCard } from './PhotoCard';
import { Compass, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

interface AdventuresTrailProps {
  adventures: AdventureMemory[];
  customPhotos?: Record<number, string>;
  onOpenLightbox?: (src: string, title: string) => void;
}

export const AdventuresTrail: React.FC<AdventuresTrailProps> = ({
  adventures,
  customPhotos,
  onOpenLightbox
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const total = adventures.length; // 7 photos
  const current = adventures[selectedIndex] || adventures[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + total) % total);
  };

  // Center coordinate and significantly expanded radius for the enlarged circle layout
  const viewBoxSize = 1200;
  const cx = viewBoxSize / 2; // 600
  const cy = viewBoxSize / 2; // 600
  const radius = 450; // Increased diameter: 900px wide circle

  // Calculate coordinates for the 7 photos around the enlarged circle
  const photoPositions = adventures.map((item, idx) => {
    // Start at top (-90 degrees) and rotate clockwise
    const angleRad = ((idx * 360) / total - 90) * (Math.PI / 180);
    const x = cx + radius * Math.cos(angleRad);
    const y = cy + radius * Math.sin(angleRad);
    return { ...item, idx, angleRad, x, y };
  });

  return (
    <section id="adventures" className="relative py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-amber-100/50 via-yellow-100/35 to-amber-200/25 blur-[180px] pointer-events-none rounded-full" />

      {/* Section Header with cinematic motion */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/80 text-xs font-mono tracking-widest text-amber-800 uppercase shadow-xs">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Act IV · The Unbroken Circle</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
          Our Very Own Adventures
        </h2>
        <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-light">
          Seven memories bound in an unbroken circle—woven together by twisting metallic chains of the word <span className="font-script font-bold text-amber-700 text-xl">"friends"</span>.
        </p>
      </motion.div>

      {/* THE 7 PICTURES GRAND CIRCULAR ARENA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[1100px] lg:max-w-[1250px] mx-auto aspect-square flex items-center justify-center select-none my-6"
      >
        {/* SVG LAYER: METALLIC CHAINS FORMED BY THE WORD "FRIENDS" TWISTING AND TURNING */}
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            {/* Metallic Gold Chain Gradient */}
            <linearGradient id="metallicGoldGrand" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="25%" stopColor="#fff2a3" />
              <stop offset="50%" stopColor="#aa7c11" />
              <stop offset="75%" stopColor="#f7d061" />
              <stop offset="100%" stopColor="#966a0a" />
            </linearGradient>

            {/* Glowing filter for metallic text */}
            <filter id="metallicGlowGrand" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#8c6414" floodOpacity="0.5" />
            </filter>

            {/* Generate curved connecting arc paths between adjacent photos in circle */}
            {photoPositions.map((p, i) => {
              const nextIndex = (i + 1) % total;
              const nextP = photoPositions[nextIndex];

              // Midpoint bulging outward along the circle arc
              const midAngleRad = (p.angleRad + nextP.angleRad) / 2 + (nextIndex === 0 ? Math.PI : 0);
              const arcRadius = radius + 25; // graceful outward sag for metallic chain
              const mx = cx + arcRadius * Math.cos(midAngleRad);
              const my = cy + arcRadius * Math.sin(midAngleRad);

              return (
                <path
                  key={`path-${i}`}
                  id={`friend-chain-grand-${i}`}
                  d={`M ${p.x} ${p.y} Q ${mx} ${my} ${nextP.x} ${nextP.y}`}
                  fill="none"
                />
              );
            })}
          </defs>

          {/* Underlay metallic chain link rail & anchor rings */}
          {photoPositions.map((p, i) => {
            const nextIndex = (i + 1) % total;
            const nextP = photoPositions[nextIndex];
            const midAngleRad = (p.angleRad + nextP.angleRad) / 2 + (nextIndex === 0 ? Math.PI : 0);
            const arcRadius = radius + 25;
            const mx = cx + arcRadius * Math.cos(midAngleRad);
            const my = cy + arcRadius * Math.sin(midAngleRad);

            return (
              <g key={`underlay-${i}`}>
                {/* Thin golden chain guide line */}
                <path
                  d={`M ${p.x} ${p.y} Q ${mx} ${my} ${nextP.x} ${nextP.y}`}
                  fill="none"
                  stroke="#dfb658"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.45"
                />

                {/* Metallic Chain Anchor Rings at both ends */}
                <circle cx={p.x} cy={p.y} r="8" fill="#fff" stroke="#b47a16" strokeWidth="3" />
                <circle cx={p.x} cy={p.y} r="3.5" fill="#d4af37" />
              </g>
            );
          })}

          {/* THE METALLIC TWISTING "FRIENDS" CHAIN LINKS */}
          {photoPositions.map((_, i) => (
            <text
              key={`text-${i}`}
              className="select-none font-script font-bold tracking-[0.16em]"
              style={{
                fontSize: '25px',
                fill: 'url(#metallicGoldGrand)',
                filter: 'url(#metallicGlowGrand)',
              }}
            >
              <textPath
                href={`#friend-chain-grand-${i}`}
                startOffset="50%"
                textAnchor="middle"
              >
                friends ✦ friends ✦ friends
              </textPath>
            </text>
          ))}
        </svg>

        {/* 7 ENLARGED PICTURES POSITIONED AROUND THE GRAND CIRCLE */}
        {photoPositions.map((p, i) => {
          const isSelected = selectedIndex === i;
          // Percentage coordinates within the relative container (0 to 100%)
          const leftPercent = (p.x / viewBoxSize) * 100;
          const topPercent = (p.y / viewBoxSize) * 100;

          return (
            <motion.div
              key={p.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setSelectedIndex(i)}
              className={`absolute z-20 cursor-pointer transition-all duration-300 group ${
                isSelected
                  ? 'scale-110 z-30'
                  : 'hover:scale-105 opacity-90 hover:opacity-100'
              }`}
            >
              {/* Photo Frame in Circle */}
              <div
                className={`w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38 lg:w-42 lg:h-42 rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-white transition-all shadow-md ${
                  isSelected
                    ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-[#faf8f5] shadow-[0_14px_32px_rgba(212,175,55,0.45)]'
                    : 'border-2 border-amber-300/80 hover:border-amber-400 shadow-[0_6px_16px_rgba(0,0,0,0.08)]'
                }`}
              >
                {/* Photo container */}
                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 relative">
                  <PhotoCard
                    photoId={p.photoId}
                    photoSrc={p.photoSrc}
                    customSrc={customPhotos?.[p.photoId]}
                    alt={`Adventure #${p.photoId} - ${p.title}`}
                    title={p.title}
                    aspectRatio="square"
                    onOpenLightbox={onOpenLightbox}
                  />

                  {/* Photo Index Tag */}
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-stone-900/80 text-[10px] font-mono font-bold text-amber-300">
                    #{p.photoId}
                  </div>
                </div>
              </div>

              {/* Stop Number Label badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-bold text-[9px] sm:text-[11px] uppercase font-mono shadow-xs border border-amber-200">
                Stop {i + 1}
              </div>
            </motion.div>
          );
        })}

        {/* NEATLY SIZED CENTER SPOTLIGHT CARD WITH ANIMATEPRESENCE TRANSITIONS */}
        <div className="relative z-20 max-w-[260px] sm:max-w-[310px] md:max-w-[340px] p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-amber-300/90 shadow-[0_16px_40px_rgba(180,120,40,0.18)] text-center space-y-2.5 sm:space-y-3 transition-all">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-2.5 sm:space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-amber-800 uppercase bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Memory {selectedIndex + 1} of 7</span>
                </span>

                <div className="flex items-center gap-1 text-[11px] sm:text-xs font-mono text-stone-500">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate max-w-[110px]">{current.locationOrDate}</span>
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="text-[11px] sm:text-xs text-amber-700 font-mono font-semibold">
                  Photo #{current.photoId}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-stone-900 font-display tracking-tight leading-snug">
                  {current.title}
                </h3>
              </div>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed p-2.5 sm:p-3 rounded-xl bg-[#faf6ee] border border-amber-200/60 italic font-serif">
                "{current.caption}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handlePrev}
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-stone-200 shadow-xs hover:bg-amber-50 hover:border-amber-300 text-stone-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Previous memory"
            >
              <ChevronLeft className="w-4 h-4 text-stone-800" />
            </button>

            <span className="text-[11px] font-mono text-stone-500">
              Click photo or rotate
            </span>

            <button
              onClick={handleNext}
              type="button"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-stone-200 shadow-xs hover:bg-amber-50 hover:border-amber-300 text-stone-700 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              title="Next memory"
            >
              <ChevronRight className="w-4 h-4 text-stone-800" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
