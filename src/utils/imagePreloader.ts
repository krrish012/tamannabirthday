// Preloads and decodes all 14 birthday tribute photos immediately into browser & GPU cache

export const preloadAllPhotos = () => {
  if (typeof window === 'undefined') return;

  for (let i = 1; i <= 14; i++) {
    const src = `/${i}.jpg`;
    const img = new Image();
    img.src = src;
    if ('decode' in img) {
      img.decode().catch(() => {
        // Silently handle if decode completes on display
      });
    }
  }
};
