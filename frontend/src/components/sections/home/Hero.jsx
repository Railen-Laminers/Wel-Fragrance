import React, { useState, useEffect } from 'react';
import GridMotion from '@/components/common/GridMotion';
import { useTheme } from '@/context/ThemeContext';
import LetterReveal from '@/components/common/LetterReveal';

// Individual image imports
import img5237 from '@/assets/products/IMG_5237.webp';
import img5238 from '@/assets/products/IMG_5238.webp';
import img5240 from '@/assets/products/IMG_5240.webp';
import img5241 from '@/assets/products/IMG_5241.webp';
import img5242 from '@/assets/products/IMG_5242.webp';
import img5243 from '@/assets/products/IMG_5243.webp';
import img5246 from '@/assets/products/IMG_5246.webp';
import img5247 from '@/assets/products/IMG_5247.webp';
import img5250 from '@/assets/products/IMG_5250.webp';
import img5251 from '@/assets/products/IMG_5251.webp';
import img5257 from '@/assets/products/IMG_5257.webp';
import img5258 from '@/assets/products/IMG_5258.webp';
import img5259 from '@/assets/products/IMG_5259.webp';
import img5260 from '@/assets/products/IMG_5260.webp';
import img5262 from '@/assets/products/IMG_5262.webp';

const imgImages = [
  img5237, img5238, img5240, img5241, img5242, img5243,
  img5246, img5247, img5250, img5251, img5257, img5258,
  img5259, img5260, img5262
];

const gridItems = Array.from({ length: 28 }, (_, i) => {
  const img = imgImages[i % imgImages.length];
  return (
    <div key={i} className="absolute inset-0">
      <img src={img} alt={`Wel product ${i + 1}`} className="w-full h-full object-cover" />
    </div>
  );
});

export default function Hero() {
  const [active, setActive] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const gradientColor = theme === 'dark' ? '#0B212A' : '#f3f4f6';

  return (
    <section className="relative h-screen w-full overflow-hidden 2xl:max-w-7xl 2xl:mx-auto">
      <GridMotion items={gridItems} gradientColor={gradientColor} />

      <div className="absolute inset-0 z-5 bg-white/30 dark:bg-black/60" />

      <div
        id="hero-overlay"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10"
      >
        <div className="mb-4 sm:mb-5 font-jost text-[0.6rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.28em] sm:tracking-[0.32em] text-old-gold/90">
          <LetterReveal
            active={active}
            lines={['Wel Fragrance Collection']}
            letterDelay={0.06}
            className="text-old-gold/90"
          />
        </div>

        <h1 className="font-playfair text-[clamp(2rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em]">
          <LetterReveal
            active={active}
            lines={['Scent, carried', 'between two shores']}
            letterDelay={0.08}
            className="text-dark-teal dark:text-white"
          />
        </h1>

        <div className="mt-4 sm:mt-6 max-w-xs sm:max-w-xl font-cormorant text-base sm:text-lg md:text-xl italic">
          <LetterReveal
            active={active}
            lines={[
              'Three signature expressions, composed where Manila\'s warmth',
              'meets Montréal\'s quiet cool.',
            ]}
            letterDelay={0.05}
            className="text-dark-teal/80 dark:text-white/80"
          />
        </div>

        <div className="absolute bottom-6 sm:bottom-8 flex flex-col items-center gap-3">
          <span className="font-jost text-[0.55rem] sm:text-[0.65rem] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-dark-teal/50 dark:text-white/50">
            <LetterReveal
              active={active}
              lines={['Discover the collection']}
              letterDelay={0.06}
              className="text-dark-teal/50 dark:text-white/50"
            />
          </span>
          <span className="h-7 sm:h-9 w-px bg-gradient-to-b from-old-gold/70 to-transparent animate-scroll-line" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .animate-scroll-line {
          animation: scroll-line 2.4s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}