import { useEffect, useState } from 'react';
import { initialSiteData } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { CountdownHero } from './components/CountdownHero';
import { StoryArc } from './components/StoryArc';
import { HallOfFame } from './components/HallOfFame';
import { AdventuresTrail } from './components/AdventuresTrail';
import { CoffeeLetter } from './components/CoffeeLetter';
import { LightboxModal } from './components/LightboxModal';
import { preloadAllPhotos } from './utils/imagePreloader';
import { Link, ArrowUp } from 'lucide-react';

export default function App() {
  const [data] = useState(initialSiteData);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; src: string; title: string }>({
    isOpen: false,
    src: '',
    title: ''
  });

  // Preload and decode all 14 photos immediately on app start for instant display
  useEffect(() => {
    preloadAllPhotos();
  }, []);

  const handleOpenLightbox = (src: string, title: string) => {
    setLightbox({ isOpen: true, src, title });
  };

  const handleScrollToStory = () => {
    const el = document.getElementById('story-arc');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans-clean selection:bg-rose-200 selection:text-rose-900">
      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* ACT 1: Countdown Hero (Black screen -> 3-2-1 flash -> Happy birthday reveal for Timmy) */}
        <CountdownHero
          heroTitle={data.heroTitle}
          heroNickname={data.heroNickname}
          onScrollToStory={handleScrollToStory}
        />

        {/* ACT 2: Our Story Arc (1, indent 2, 3, indent 4 with Photos 1, 2, 3, 4 and 3 lines) */}
        <StoryArc
          milestones={data.storyMilestones}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* ACT 3: Hall of Fame (Pics 5, 6, 7 in luxurious French museum gilded frames) */}
        <HallOfFame
          photos={data.hallOfFame}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* ACT 4: Our Very Own Adventures (7 photos in a circle with twisting metallic 'friends' chains) */}
        <AdventuresTrail
          adventures={data.adventures}
          onOpenLightbox={handleOpenLightbox}
        />

        {/* ACT 5: The Handwritten Coffee Letter (Parchment card with 2-paragraph message) */}
        <CoffeeLetter letter={data.letter} />
      </main>

      {/* Light Aesthetic Birthday Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-center text-xs text-stone-500 space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-stone-700">
          <span>Made with all my love for my best friend</span>
          <span className="font-semibold text-rose-600">Tamanna</span>
          <Link className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
        </div>

        <div className="flex items-center justify-center gap-6 pt-1 text-stone-500">
          <button
            onClick={handleScrollToTop}
            className="hover:text-rose-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </footer>

      {/* Fullscreen Photo Lightbox Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        src={lightbox.src}
        title={lightbox.title}
        onClose={() => setLightbox({ isOpen: false, src: '', title: '' })}
      />
    </div>
  );
}
