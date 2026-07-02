import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/common/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/common/SmoothScroll';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll
          ease={0.08}
          className="min-h-screen bg-white dark:bg-dark-teal transition-colors duration-300"
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}