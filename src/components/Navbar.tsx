import React from 'react';
import { Link, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/75 border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Kicker */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-display font-bold text-stone-900 tracking-tight text-lg">
            For Mr. Jerry
          </span>
        </div>

        {/* Navigation Anchors */}
        <nav className="hidden sm:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-stone-600">
          <button
            onClick={() => scrollTo('story-arc')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Our Story Arc
          </button>
          <button
            onClick={() => scrollTo('hall-of-fame')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Jerry's Hall of Fame
          </button>
          <button
            onClick={() => scrollTo('adventures')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Our Adventures
          </button>
          <button
            onClick={() => scrollTo('coffee-letter')}
            className="hover:text-rose-600 transition-colors cursor-pointer"
          >
            Finale
          </button>
        </nav>

        {/* Right Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-medium">
          <Link className="w-3.5 h-3.5 fill-rose-200 text-rose-200" />
          <span>Happy Birthday Tamanna</span>
        </div>
      </div>
    </header>
  );
};
