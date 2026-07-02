import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import webLogo from '/webLogo.png';
import welStore from '../../assets/bg/welStore.webp';

// ---- Custom Icons ----
const IconMenu = () => (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
        <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1" />
        <line x1="4" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1" />
        <line x1="8" y1="13" x2="22" y2="13" stroke="currentColor" strokeWidth="1" />
    </svg>
);

const IconClose = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1" />
        <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1" />
    </svg>
);
// -------------------------------------------------

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const links = [
        { label: 'ABOUT', href: '#about' },
        { label: 'PRODUCTS', href: '#products' },
        { label: 'CATALOGUE', href: '#catalogue' },
        { label: 'CONTACT', href: '#contact' },
    ];

    return (
        <>
            {/* Navbar – full width, no side padding */}
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50 h-20 flex items-center
          transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
        `}
            >
                <div
                    className={`
            w-full h-full flex items-center justify-between
            transition-[background,backdrop-filter,box-shadow] duration-500 ease-out
            ${scrolled
                            ? 'bg-white/70 dark:bg-dark-teal/70 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-soft'
                            : 'border-b border-transparent'
                        }
          `}
                >
                    <Link to="/" className="h-10 flex items-center pl-4">
                        <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
                    </Link>

                    <div className="flex items-center gap-4 pr-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 transition-colors duration-200 text-dark-teal dark:text-white"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>

                        <button
                            onClick={toggleMenu}
                            className="bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-105 active:scale-95"
                            aria-label="Toggle menu"
                        >
                            <IconMenu />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Overlay – slides vertically, no fade, click‑through when closed */}
            <div
                className={`
          fixed inset-0 z-[100] bg-white dark:bg-dark-teal flex flex-col
          transition-transform duration-500 ease-out will-change-transform
          ${menuOpen
                        ? 'translate-y-0 pointer-events-auto'
                        : '-translate-y-full pointer-events-none'
                    }
        `}
            >
                {/* Close button */}
                <button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 sm:top-7 sm:right-8 bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-110 active:scale-95"
                >
                    <IconClose />
                </button>

                {/* Logo in overlay */}
                <div className="absolute top-6 left-6 sm:top-7 sm:left-8">
                    <Link to="/" onClick={toggleMenu}>
                        <img src={webLogo} alt="Wel Fragrance" className="h-9 w-auto object-contain" />
                    </Link>
                </div>

                {/* Content */}
                <div className="flex flex-row h-full w-full mt-20">
                    {/* Left: 60% navigation */}
                    <div className="w-3/5 h-full flex flex-col justify-center items-start p-8 md:p-12 space-y-8">
                        <nav className="flex flex-col space-y-6 w-full">
                            {links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={toggleMenu}
                                    className={`
                    group flex items-center gap-4 text-4xl md:text-5xl font-jost font-light tracking-wider
                    text-dark-teal dark:text-white no-underline border-b border-black/10 dark:border-white/10
                    py-4 sm:py-5 transition-colors hover:text-old-gold
                  `}
                                >
                                    <span className="uppercase">{link.label}</span>
                                    <span
                                        className="text-xs md:text-sm uppercase tracking-widest text-old-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                                    >
                                        DISCOVER
                                    </span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Right: 40% image */}
                    <div className="w-2/5 h-full relative overflow-hidden">
                        <img src={welStore} alt="Wel Store" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;