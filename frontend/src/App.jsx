import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import FontLoader from './components/common/FontLoader';
import Nav from './components/sections/Nav';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import ProductsModels from './components/sections/ProductsModels';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <FontLoader />
      <div style={{ background: "var(--black)", minHeight: "100vh" }}>
        <Nav />

        {/* Stacking wrapper — Hero is sticky inside here */}
        <div style={{ position: "relative" }}>
          <Hero />
          <About />
        </div>

        <ProductsModels />
        <Contact />
        <Footer />
      </div>
    </>
  );
}