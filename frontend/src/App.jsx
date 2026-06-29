import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Home from './components/pages/Home'; // 👈 the single merged file

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.6,
      touchMultiplier: 1.0,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <Home />;
}