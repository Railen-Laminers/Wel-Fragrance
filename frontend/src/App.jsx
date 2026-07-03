import React, { useEffect } from 'react'; // ✅ added useEffect
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

// Register GSAP plugins (keep if used elsewhere)
gsap.registerPlugin(ScrollTrigger);

// ---- Route component with scroll-to-top on every route change ----
function AnimatedRoutes() {
  const location = useLocation();

  // Scroll to top instantly whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
        <div className="min-h-screen bg-warm-white dark:bg-dark-teal transition-colors duration-500">
          <CursorFollower />
          <Navbar />
          <AnimatedRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}