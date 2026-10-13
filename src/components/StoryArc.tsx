import React from 'react';
import { motion } from 'framer-motion';
import { StoryMilestone } from '../types';
import { PhotoCard } from './PhotoCard';
import { Sparkles, Bookmark } from 'lucide-react';

interface StoryArcProps {
  milestones: StoryMilestone[];
  customPhotos?: Record<number, string>;
  onOpenLightbox?: (src: string, title: string) => void;
}

export const StoryArc: React.FC<StoryArcProps> = ({
  milestones,
  customPhotos,
  onOpenLightbox
}) => {
  return (
    <section id="story-arc" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header with cinematic motion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-3xl mx-auto mb-20 space-y-3"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/90 text-xs font-mono tracking-widest text-amber-700 uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Act II · Chronicle</span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-display">
          Our Story Arc
        </h2>
        <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
          The unforgettable chapters told across our favorite snapshots, each with our timeless memories.
        </p>
      </motion.div>

      {/* The 1, (indent) 2, 3, (indent) 4 Layout with framer-motion entry */}
      <div className="space-y-16 sm:space-y-20">
        {milestones.map((item, index) => {
          // Even indices (0 -> Pic 1, 2 -> Pic 3) are unindented (flush left / start)
          // Odd indices (1 -> Pic 2, 3 -> Pic 4) are indented to the right
          const isIndented = index % 2 === 1;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: isIndented ? 60 : -60, y: 35 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full transition-all duration-300 ${
                isIndented
                  ? 'sm:pl-16 md:pl-28 lg:pl-36 max-w-5xl ml-auto'
                  : 'sm:pr-16 md:pr-28 lg:pr-36 max-w-5xl mr-auto'
              }`}
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(217,119,6,0.08)] transition-all flex flex-col md:flex-row items-center gap-8 group">
                {/* Photo Column */}
                <div className="w-full md:w-5/12 shrink-0">
                  <div className="p-2.5 bg-[#fbf9f5] rounded-2xl border border-stone-200/80 shadow-xs relative">
                    <PhotoCard
                      photoId={item.photoId}
                      photoSrc={item.photoSrc}
                      customSrc={customPhotos?.[item.photoId]}
                      alt={`Story Arc Photo #${item.photoId} - ${item.title}`}
                      title={item.title}
                      aspectRatio="portrait"
                      onOpenLightbox={onOpenLightbox}
                    />

                    {/* Step indicator pill */}
                    <div className="mt-3 px-2 flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                        Part {index + 1}
                      </span>
                      <span>Photo #{item.photoId}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Lines & Story Details Column */}
                <div className="w-full md:w-7/12 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-600 font-semibold">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-display">
                      {item.title}
                    </h3>
                  </div>

                  {/* The 3 Lines */}
                  <div className="space-y-3.5 pt-2">
                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-stone-50/80 border border-stone-100 hover:bg-amber-50/50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        01
                      </div>
                      <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                        {item.line1}
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-stone-50/80 border border-stone-100 hover:bg-amber-50/50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        02
                      </div>
                      <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                        {item.line2}
                      </p>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-stone-50/80 border border-stone-100 hover:bg-amber-50/50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        03
                      </div>
                      <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                        {item.line3}
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
