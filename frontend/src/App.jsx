import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Products from './components/pages/Products';   // <-- changed import
import Navbar from './components/common/Navbar';
import CursorFollower from './components/common/CursorFollower';
import GlobalParticles from './components/common/GlobalParticles';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/common/SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

function AnimatedRoutes() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          setTransitionStage('fadeIn');
          window.scrollTo(0, 0);
        }
      });
      tl.to(mainRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    } else if (transitionStage === 'fadeIn') {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
      ScrollTrigger.refresh();
    }
  }, [transitionStage, location, displayLocation]);

  return (
    <main ref={mainRef} className="relative">
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />   {/* updated */}
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