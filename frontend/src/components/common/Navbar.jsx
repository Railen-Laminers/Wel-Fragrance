// src/components/common/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import webLogo from '/webLogo.png';

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

const IconScentLight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="1" x2="12" y2="3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="6.5" y1="3" x2="8" y2="4.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="17.5" y1="3" x2="16" y2="4.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="3.5" y1="7.5" x2="5.5" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="20.5" y1="7.5" x2="18.5" y2="7.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <rect x="9.5" y="5.5" width="5" height="2.2" rx="0.4" stroke="currentColor" strokeWidth="1" />
        <rect x="10.7" y="7.7" width="2.6" height="2.6" stroke="currentColor" strokeWidth="1" />
        <path
            d="M8.5 10.3H15.5V19.2C15.5 19.9 14.9 20.5 14.2 20.5H9.8C9.1 20.5 8.5 19.9 8.5 19.2V10.3Z"
            stroke="currentColor"
            strokeWidth="1"
        />
        <line x1="8.5" y1="16.5" x2="15.5" y2="16.5" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    </svg>
);

const IconScentDark = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
            d="M15.8 3.2C14.9 3.7 14.3 4.7 14.3 5.8C14.3 7.5 15.7 8.9 17.4 8.9C18.1 8.9 18.7 8.7 19.2 8.3C18.6 10 17 11.2 15.1 11.2C12.7 11.2 10.7 9.2 10.7 6.8C10.7 4.9 11.9 3.3 13.6 2.7C14.3 2.4 15.1 2.7 15.8 3.2Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="round"
        />
        <rect x="8.7" y="9" width="2.6" height="2.6" stroke="currentColor" strokeWidth="1" />
        <rect x="7.5" y="6.8" width="5" height="2.2" rx="0.4" stroke="currentColor" strokeWidth="1" />
        <path
            d="M6.5 11.6H13.5V19.2C13.5 19.9 12.9 20.5 12.2 20.5H7.8C7.1 20.5 6.5 19.9 6.5 19.2V11.6Z"
            stroke="currentColor"
            strokeWidth="1"
        />
        <line x1="6.5" y1="17" x2="13.5" y2="17" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    </svg>
);
// -------------------------------------------------

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navRef = useRef(null);
    const drawerRef = useRef(null);
    const backdropRef = useRef(null);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP entrance animation for the navbar
    useEffect(() => {
        gsap.fromTo(
            navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
        );
    }, []);

    // Animate drawer open/close
    useEffect(() => {
        if (menuOpen) {
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.6,
                ease: 'power3.out',
            });
            gsap.to(backdropRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.4,
                ease: 'power2.out',
            });
            document.body.style.overflow = 'hidden';
        } else {
            gsap.to(drawerRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
            });
            gsap.to(backdropRef.current, {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.4,
                ease: 'power2.in',
            });
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // Navigation links – CATALOGUE now points to /catalog
    const links = [
        { label: 'ABOUT', to: '/about' },
        { label: 'PRODUCTS', to: '/products' },
        { label: 'CATALOGUE', to: '/catalog' },    // <-- UPDATED
        { label: 'CONTACT', to: '/contact' },
    ];

    return (
        <>
            {/* Navbar Bar */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center"
            >
                <div
                    className={`
            w-full h-full flex items-center justify-between
            2xl:max-w-7xl 2xl:mx-auto
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
                        {/* Theme toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                transition-colors duration-300
                ${theme === 'dark'
                                    ? 'bg-white/10 hover:bg-white/20 text-white'
                                    : 'bg-black/5 hover:bg-black/10 text-dark-teal'
                                }
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-old-gold
              `}
                            aria-label="Toggle theme"
                        >
                            <span
                                className={`
                  absolute inset-0 rounded-full blur-md transition-opacity duration-500
                  ${theme === 'dark'
                                        ? 'bg-yellow-400/20 opacity-50'
                                        : 'bg-indigo-400/20 opacity-0'
                                    }
                `}
                            />
                            <span
                                className={`
                  block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  hover:scale-110
                  ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}
                `}
                            >
                                {theme === 'dark' ? <IconScentLight /> : <IconScentDark />}
                            </span>
                        </button>

                        {/* Burger button */}
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

            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm opacity-0 pointer-events-none"
                onClick={toggleMenu}
            />

            {/* Side Drawer Panel */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 z-[70] h-full w-80 max-w-[85vw] bg-white dark:bg-dark-teal shadow-2xl transform translate-x-full overflow-y-auto p-6 flex flex-col"
            >
                {/* Header: Logo | Dark Mode | Close */}
                <div className="grid grid-cols-3 items-center mb-10">
                    <div className="flex justify-start">
                        <Link to="/" onClick={toggleMenu} className="h-8 flex items-center">
                            <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={toggleTheme}
                            className={`
                relative w-10 h-10 rounded-full flex items-center justify-center
                transition-colors duration-300
                ${theme === 'dark'
                                    ? 'bg-white/10 hover:bg-white/20 text-white'
                                    : 'bg-black/5 hover:bg-black/10 text-dark-teal'
                                }
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-old-gold
              `}
                            aria-label="Toggle theme"
                        >
                            <span
                                className={`
                  absolute inset-0 rounded-full blur-md transition-opacity duration-500
                  ${theme === 'dark'
                                        ? 'bg-yellow-400/20 opacity-50'
                                        : 'bg-indigo-400/20 opacity-0'
                                    }
                `}
                            />
                            <span
                                className={`
                  block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  hover:scale-110
                  ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}
                `}
                            >
                                {theme === 'dark' ? <IconScentLight /> : <IconScentDark />}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={toggleMenu}
                            className="bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-110 active:scale-95"
                        >
                            <IconClose />
                        </button>
                    </div>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col space-y-6 flex-1">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            onClick={toggleMenu}
                            className="group flex items-center gap-4 text-2xl md:text-3xl font-jost font-light tracking-wider text-dark-teal dark:text-white no-underline border-b border-black/10 dark:border-white/10 py-3 transition-colors hover:text-old-gold"
                        >
                            <span className="uppercase">{link.label}</span>
                            <span className="text-xs uppercase tracking-widest text-old-gold opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                DISCOVER
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navbar;