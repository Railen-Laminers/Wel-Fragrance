import React, { useEffect, lazy, Suspense, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CursorFollower from './components/common/CursorFollower';
import GlobalParticles from './components/common/GlobalParticles';
import { ThemeProvider } from './context/ThemeContext';

import Home from './components/pages/public/Home';
const About = lazy(() => import('./components/pages/public/About'));
const Contact = lazy(() => import('./components/pages/public/Contact'));
const Products = lazy(() => import('./components/pages/public/Products'));
const MagazineCatalog = lazy(() => import('./components/pages/public/MagazineCatalog'));

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      // Instant teleport to top – no animation
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location]);

  return (
    <main className="relative">
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/catalog" element={<MagazineCatalog />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default function App() {
  useEffect(() => {
    // Initialize Lenis with smooth scrolling for wheel/touch
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.__lenis = lenis;

    // RAF loop for Lenis
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <GlobalParticles />
        <div className="min-h-screen bg-transparent transition-colors duration-500 flex flex-col">
          <CursorFollower />
          <Navbar />
          <AnimatedRoutes />
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}