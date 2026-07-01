import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Home from './components/pages/Home'; // direct import (no lazy)

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Disable Lenis on low‑end devices or when reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const lowEndDevice =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 2;

    if (prefersReducedMotion || isMobile || lowEndDevice) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-teal">
      <Home />
    </div>
  );
}