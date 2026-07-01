import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import webLogo from '/webLogo.png';
import welStore from '../../assets/bg/welStore.webp';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <>
            {/* Fixed Navbar */}
            <nav
                className={`
          fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between
          transition-all duration-700 ease-out transform -translate-y-full
          ${scrolled ? 'bg-white/40 dark:bg-dark-teal/40 backdrop-blur-sm' : 'bg-transparent'}
          ${menuOpen ? 'translate-y-0' : 'translate-y-0'}
        `}
                style={{
                    animation: 'slideDown 0.7s ease-out forwards',
                }}
            >
                <div className="flex items-center">
                    <img src={webLogo} alt="Wel Fragrance" className="h-10 w-auto" />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors duration-200 text-dark-teal dark:text-white"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md hover:bg-white/30 dark:hover:bg-black/30 transition-colors duration-200 text-dark-teal dark:text-white"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                <style>{`
          @keyframes slideDown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(0); }
          }
        `}</style>
            </nav>

            {/* Full‑screen Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={toggleMenu}
            >
                <div
                    className={`absolute top-0 left-0 w-full h-full bg-white dark:bg-dark-teal shadow-2xl transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-row h-full">
                        {/* Left side: Navigation – 60% */}
                        <div className="w-3/5 h-full flex flex-col justify-center items-start p-8 md:p-12 space-y-8">
                            <nav className="flex flex-col space-y-6 w-full">
                                {['About', 'Products', 'Catalogue', 'Contact'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="group flex items-center gap-4 text-4xl md:text-5xl font-jost font-light tracking-wider text-dark-teal dark:text-white hover:text-old-gold transition-colors duration-300"
                                        onClick={toggleMenu}
                                    >
                                        <span className="uppercase">{item}</span>
                                        <span className="text-xs md:text-sm uppercase tracking-widest text-old-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                            DISCOVER
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Right side: Image – 40% */}
                        <div className="w-2/5 h-full relative overflow-hidden">
                            <img src={welStore} alt="Wel Store" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;