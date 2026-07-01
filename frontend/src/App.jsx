import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import Home from './components/pages/Home';

export default function App() {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Home />
    </div>
  );
}