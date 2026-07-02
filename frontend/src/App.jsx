// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // 确保引入了 Router
import Home from './components/pages/Home';
import Navbar from './components/common/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <ThemeProvider>
      <Router> {/* 1. Router 需要包裹住使用路由的组件 */}
        <SmoothScroll
          ease={0.08}
          className="min-h-screen bg-white dark:bg-dark-teal transition-colors duration-300"
        >
          <Navbar />
          <Home />
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
}