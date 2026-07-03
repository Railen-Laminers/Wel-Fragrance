import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Products from './components/pages/Products';
import MagazineCatalog from './components/pages/MagazineCatalog';
import Navbar from './components/common/Navbar';
import CursorFollower from './components/common/CursorFollower';
import GlobalParticles from './components/common/GlobalParticles';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/common/SmoothScroll';

// Register GSAP plugins (keep if used elsewhere, e.g. in page components)
gsap.registerPlugin(ScrollTrigger);

// ---- Simplified route component without any transition animation ----
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <main className="relative">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/catalog" element={<MagazineCatalog />} />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalParticles />
        <SmoothScroll ease={0.08} className="min-h-screen bg-warm-white dark:bg-dark-teal transition-colors duration-500">
          <CursorFollower />
          <Navbar />
          <AnimatedRoutes />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}