import React from 'react';
import { motion } from 'framer-motion';
import { HallOfFamePhoto } from '../types';
import { PhotoCard } from './PhotoCard';
import { Crown, Sparkles, Award } from 'lucide-react';

interface HallOfFameProps {
  photos: HallOfFamePhoto[];
  customPhotos?: Record<number, string>;
  onOpenLightbox?: (src: string, title: string) => void;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({
  photos,
  customPhotos,
  onOpenLightbox
}) => {
  return (
    <section id="hall-of-fame" className="relative py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Warm gallery spotlight background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-amber-100/50 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header with cinematic motion */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-20 space-y-3 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300/80 text-xs font-mono tracking-widest text-amber-800 uppercase shadow-xs">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Act III · Permanent Collection</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
          Hall of Fame
        </h2>
        <p className="text-stone-600 text-base max-w-xl mx-auto leading-relaxed font-light">
          The three crowning portraits of our journey, preserved in custom French salon gilded frames.
        </p>
      </motion.div>

      {/* 3 Museum Gallery Frames animated as they enter the viewport */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14 items-center relative z-10">
        {photos.map((item, idx) => {
          const isCenter = idx === 1;

          // Distinct cinematic entry direction per frame position
          const initialVariants = idx === 0
            ? { opacity: 0, x: -70, y: 35, rotate: -2 }
            : idx === 1
            ? { opacity: 0, y: 70, scale: 0.92 }
            : { opacity: 0, x: 70, y: 35, rotate: 2 };

          return (
            <motion.div
              key={item.id}
              initial={initialVariants}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.85,
                delay: idx * 0.18,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: isCenter ? -12 : -8, transition: { duration: 0.3 } }}
              className={`flex flex-col items-center group transition-all duration-500 ${
                isCenter ? 'md:-translate-y-4 md:scale-105 z-20' : 'z-10'
              }`}
            >
              {/* Museum Brass Wall Rosette & Picture Hanging Wire */}
              <div className="flex flex-col items-center mb-1">
                {/* Brass wall rosette */}
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 border border-amber-600 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-900" />
                </div>
                {/* Braided picture wire */}
                <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />
              </div>

              {/* MASTERPIECE FRAME CONTAINER */}
              <div
                className="w-full relative rounded-2xl p-4 sm:p-5 transition-all duration-500 group-hover:shadow-[0_30px_60px_rgba(180,120,40,0.25)]"
                style={{
                  background: 'linear-gradient(135deg, #dfc187 0%, #aa823a 25%, #eedbb0 50%, #8c6728 75%, #d6b472 100%)',
                  boxShadow: '0 20px 45px -10px rgba(80, 50, 15, 0.28), 0 4px 12px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 4px rgba(0,0,0,0.4)',
                  border: '3px solid #78521a'
                }}
              >
                {/* Center frame crown emblem */}
                {isCenter && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-900 text-[10px] font-bold uppercase tracking-wider shadow-md border border-amber-200 flex items-center gap-1 z-30">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>The Centerpiece</span>
                  </div>
                )}

                {/* Stepped Inner Bevel (Carved Wood Accent) */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-b from-[#5c3e17] to-[#3d270c] shadow-inner">
                  {/* Fine Linen Texture Passe-partout / Mat Board */}
                  <div className="p-4 sm:p-5 rounded-lg bg-[#fbf9f4] shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] relative overflow-hidden">
                    {/* Inner Gilded Fillet / Slip */}
                    <div className="p-1 rounded-md bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-500 shadow-xs">
                      {/* Photo Container with Specular Glass Sheen */}
                      <div className="relative rounded-sm overflow-hidden bg-stone-900 shadow-inner">
                        <PhotoCard
                          photoId={item.photoId}
                          photoSrc={item.photoSrc}
                          customSrc={customPhotos?.[item.photoId]}
                          alt={`Hall of Fame Masterpiece #${item.photoId} - ${item.title}`}
                          title={item.title}
                          aspectRatio="portrait"
                          onOpenLightbox={onOpenLightbox}
                        />

                        {/* Subtle diagonal glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ENGRAVED POLISHED BRASS MUSEUM PLAQUE */}
                <div className="mt-4 px-2">
                  <div
                    className="relative px-5 py-3.5 rounded-lg text-center shadow-md transition-transform group-hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #f5e4b7 0%, #d8b257 30%, #fbf3db 50%, #c4993a 70%, #edd39a 100%)',
                      border: '1.5px solid #8f6c23',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 3px 6px rgba(0,0,0,0.18)'
                    }}
                  >
                    {/* Four Corner Brass Rivets */}
                    <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-300/60 shadow-xs" />
                    <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-300/60 shadow-xs" />
                    <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-300/60 shadow-xs" />
                    <div className="absolute bottom-1.5 right-2 w-1.5 h-1.5 rounded-full bg-amber-900 border border-amber-300/60 shadow-xs" />

                    {/* Engraved Plaque Typography */}
                    <div className="space-y-0.5">
                      <div className="text-[10px] tracking-[0.2em] uppercase font-mono font-bold text-amber-950 flex items-center justify-center gap-1">
                        <Award className="w-3 h-3 text-amber-800" />
                        <span>{item.year}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#2a1708] tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs font-serif italic text-amber-950/80 line-clamp-2 max-w-[280px] mx-auto pt-0.5">
                        "{item.tagline}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
