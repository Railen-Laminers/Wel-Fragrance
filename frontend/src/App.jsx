import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import CursorFollower from './components/common/CursorFollower';
import GlobalParticles from './components/common/GlobalParticles';
import { ThemeProvider } from './context/ThemeContext';

const About = lazy(() => import('./components/pages/About'));
const Contact = lazy(() => import('./components/pages/Contact'));
const Products = lazy(() => import('./components/pages/Products'));
const MagazineCatalog = lazy(() => import('./components/pages/MagazineCatalog'));

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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