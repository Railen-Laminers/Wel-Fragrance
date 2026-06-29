import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/pages/Home';

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

  return (
    <div className="min-h-screen bg-white dark:bg-dark-teal">
      <Nav />
      <Home />
      <Footer />
    </div>
  );
}