import React, { useState, useEffect } from 'react';
import { Camera, Maximize2 } from 'lucide-react';

interface PhotoCardProps {
  photoId: number;
  photoSrc: string;
  customSrc?: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'auto';
  className?: string;
  onOpenLightbox?: (src: string, title: string) => void;
  title?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photoId,
  photoSrc,
  customSrc,
  alt,
  aspectRatio = 'portrait',
  className = '',
  onOpenLightbox,
  title
}) => {
  const [loadError, setLoadError] = useState(false);
  const activeSrc = customSrc || photoSrc;

  useEffect(() => {
    setLoadError(false);
  }, [activeSrc]);

  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/10]',
    auto: 'h-auto'
  }[aspectRatio];

  return (
    <div className={`relative group overflow-hidden rounded-2xl transition-all duration-300 ${className}`}>
      {!loadError ? (
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-100`}>
          <img
            src={activeSrc}
            alt={alt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setLoadError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ imageOrientation: 'from-image' }}
          />

          {/* Gentle warm vignette overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3" />

          {/* Expand Lightbox Button */}
          {onOpenLightbox && (
            <button
              type="button"
              onClick={() => onOpenLightbox(activeSrc, title || alt)}
              title="View full photo"
              className="absolute bottom-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-800 text-xs rounded-full shadow-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-stone-700" />
            </button>
          )}

          {/* Minimal Photo Tag */}
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/85 backdrop-blur-md border border-stone-200/80 text-[11px] font-mono font-medium text-stone-700 shadow-xs">
            #{photoId}
          </div>
        </div>
      ) : (
        /* Light theme aesthetic placeholder */
        <div
          className={`relative w-full ${aspectClass} bg-gradient-to-b from-[#fbf8f3] to-[#f4ece1] border border-[#e8dccb] rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-xs`}
        >
          <div className="flex items-center justify-between w-full text-xs text-stone-400">
            <span className="font-mono bg-white px-2 py-0.5 rounded-md border border-[#e2d4c0] text-stone-600">
              Photo #{photoId}
            </span>
            <span className="text-rose-400 font-serif italic">memory</span>
          </div>

          <div className="my-auto space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-white border border-[#e8dccb] flex items-center justify-center text-rose-400/90 shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-stone-800 font-display">
              {title || `Memory #${photoId}`}
            </p>
            <p className="text-xs text-stone-500 max-w-[200px] leading-relaxed line-clamp-2">
              {alt}
            </p>
          </div>

          <div className="text-[10px] text-stone-400 font-mono tracking-tight">
            public/{photoId}.jpg
          </div>
        </div>
      )}
    </div>
  );
};
