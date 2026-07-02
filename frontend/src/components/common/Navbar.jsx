import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link
import { useTheme } from '../../context/ThemeContext';
import webLogo from '/webLogo.png';
import welStore from '../../assets/bg/welStore.webp';

// ---- Custom Icons (unchanged) ----
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

    // ✅ Updated links: "ABOUT" goes to the dedicated About page, others scroll to sections on Home
    const links = [
        { label: 'ABOUT', to: '/about', isHash: false },
        { label: 'PRODUCTS', to: { pathname: '/', hash: 'products' }, isHash: true },
        { label: 'CATALOGUE', to: { pathname: '/', hash: 'catalogue' }, isHash: true },
        { label: 'CONTACT', to: { pathname: '/', hash: 'contact' }, isHash: true },
    ];

    return (
        <>
            {/* Navbar Bar */}
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
                        {/* Theme toggle (unchanged) */}
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

            {/* Overlay – full screen background, content constrained */}
            <div
                className={`
          fixed inset-0 z-[100] bg-white dark:bg-dark-teal flex items-center justify-center
          transition-transform duration-500 ease-out will-change-transform
          ${menuOpen
                        ? 'translate-y-0 pointer-events-auto'
                        : '-translate-y-full pointer-events-none'
                    }
        `}
            >
                <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col">
                    {/* Logo – inside constrained area */}
                    <div className="absolute top-6 left-6 sm:top-7 sm:left-8">
                        <Link to="/" onClick={toggleMenu}>
                            <img src={webLogo} alt="Wel Fragrance" className="h-9 w-auto object-contain" />
                        </Link>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={toggleMenu}
                        className="absolute top-6 right-6 sm:top-7 sm:right-8 bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-110 active:scale-95"
                    >
                        <IconClose />
                    </button>

                    {/* Main content: 60% nav / 40% image */}
                    <div className="flex flex-row flex-1 mt-20">
                        {/* Left: navigation */}
                        <div className="w-3/5 h-full flex flex-col justify-center items-start p-8 md:p-12 space-y-8">
                            <nav className="flex flex-col space-y-6 w-full">
                                {links.map((link) => (
                                    <Link
                                        key={link.label}
                                        to={link.to}
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
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Right: image */}
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