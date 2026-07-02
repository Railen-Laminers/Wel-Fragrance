import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/home/Hero';
import AfterHero from '../sections/home/AfterHero';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const aboutWrapperRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const aboutWrapper = aboutWrapperRef.current;
    if (!hero || !aboutWrapper) return;

    // Set initial states
    gsap.set(aboutWrapper, { opacity: 0, y: 60 });
    gsap.set('#hero-overlay', { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,               // smooth scrubbing
        pin: hero,                // Hero stays pinned – background remains visible
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: { ease: 'power2.inOut' },
    });

    // Animate only the overlay content (text, not the background)
    tl.to('#hero-overlay', {
      opacity: 0,
      y: -40,                    // moves up slightly as it fades
      duration: 1,
    }, 0)
    // Fade in the About section with a small overlap
    .to(aboutWrapper, {
      opacity: 1,
      y: 0,
      duration: 1,
    }, 0.2);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={aboutWrapperRef} className="relative z-10">
        <About />
      </div>
    </div>
  );
};

export default Home;