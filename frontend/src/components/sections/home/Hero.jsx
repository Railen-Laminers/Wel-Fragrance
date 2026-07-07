import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Jomalone from '@/assets/products/Jomalone.webp';

export default function Hero() {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const headlineRef = useRef(null);
  const eyebrowRef = useRef(null);
  const ctaRef = useRef(null);

  // Mouse parallax for image
  useEffect(() => {
    const onMouseMove = (e) => {
      if (imageWrapperRef.current) {
        const x = ((e.clientX / window.innerWidth) - 0.5) * 10;
        const y = ((e.clientY / window.innerHeight) - 0.5) * 10;
        imageWrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Entrance animations using Web Animations API
  useEffect(() => {
    const animations = [];

    const eyebrow = eyebrowRef.current;
    if (eyebrow) {
      const anim = eyebrow.animate(
        [
          { opacity: 0, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 1000,
          delay: 300,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animations.push(anim);
    }

    const lines = headlineRef.current?.querySelectorAll('.headline-line') || [];
    const lineDelay = 800;
    lines.forEach((line, i) => {
      const anim = line.animate(
        [
          { opacity: 0, transform: 'translateY(100%)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 1200,
          delay: lineDelay + i * 150,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animations.push(anim);
    });

    const cta = ctaRef.current;
    if (cta) {
      const anim = cta.animate(
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        {
          duration: 800,
          delay: 1700,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animations.push(anim);
    }

    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      const anim = heroImage.animate(
        [
          { transform: 'scale(1.1)' },
          { transform: 'scale(1)' },
        ],
        {
          duration: 1500,
          delay: 1100,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );
      animations.push(anim);
    }

    return () => {
      animations.forEach((anim) => anim.cancel());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center z-10 pt-20 pb-16 sm:pb-20 lg:py-24 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-20 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-old-gold/40 to-transparent hidden lg:block" />
            <div className="space-y-6 sm:space-y-8">
              {/* Eyebrow */}
              <div
                ref={eyebrowRef}
                className="flex items-center gap-4 opacity-0 translate-y-4"
              >
                <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                  <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                  <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                    Philippines & Canada
                  </span>
                </div>
              </div>

              {/* Headline */}
              <h1
                ref={headlineRef}
                className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl leading-[1.1] text-dark-teal dark:text-warm-white"
              >
                <span className="block overflow-hidden">
                  <span className="headline-line block pb-2 sm:pb-4 opacity-0 translate-y-full">
                    Every
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="headline-line block pb-2 sm:pb-4 opacity-0 translate-y-full bg-gradient-to-r from-old-gold via-[#E8D5A3] to-old-gold bg-clip-text text-transparent italic">
                    Fragrance
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="headline-line block pb-2 sm:pb-4 opacity-0 translate-y-full">
                    Tells a Story
                  </span>
                </span>
              </h1>

              {/* CTAs */}
              <div
                ref={ctaRef}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4 opacity-0 translate-y-6"
              >
                <Link
                  to="/products"
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-old-gold text-warm-white dark:text-dark-teal font-jost text-xs sm:text-sm tracking-[0.15em] uppercase font-medium overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(199,159,72,0.3)]"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
                <Link
                  to="/about"
                  className="group flex items-center gap-3 font-jost text-xs sm:text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                >
                  <span>Our Story</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right image – now exactly like About: aspect-ratio only, no max-height */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <div className="absolute inset-4 border border-old-gold/20 z-20 pointer-events-none" />
              <div className="absolute top-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-t border-l border-old-gold/60 z-20" />
              <div className="absolute bottom-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-b border-r border-old-gold/60 z-20" />
              <div
                ref={imageWrapperRef}
                className="absolute inset-0 transition-transform duration-300 ease-out"
              >
                <img
                  src={Jomalone}
                  alt="Luxury Perfume Collection"
                  className="hero-image w-full h-full object-cover scale-110"
                  fetchpriority="high"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-white dark:from-dark-teal via-transparent to-transparent opacity-60" />
              </div>
              {/* Floating Badge */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-30 bg-warm-white/80 dark:bg-dark-teal/80 backdrop-blur-sm border border-old-gold/30 p-3 sm:p-4 max-w-[180px] sm:max-w-[220px] hidden xs:block">
                <p className="font-cormorant text-old-gold text-base sm:text-lg italic leading-snug">
                  "Every scent is a reflection of you."
                </p>
                <div className="mt-2 h-px w-full bg-gradient-to-r from-old-gold/50 to-transparent" />
                <p className="font-jost text-[10px] sm:text-xs text-warm-gray dark:text-warm-white/70 mt-1 sm:mt-2 tracking-wider uppercase">
                  — Joel Malabo, CEO
                </p>
              </div>
            </div>
            {/* Giant watermark */}
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden xl:block">
              <span
                className="font-playfair text-[14rem] leading-none text-old-gold/[0.03]"
                style={{ writingMode: 'vertical-rl' }}
              >
                WEL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}