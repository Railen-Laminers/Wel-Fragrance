import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import webLogo from '/webLogo.png';
import webLogoText from '/webLogoText.png';
import welStore from '@/assets/bg/welStore.webp';

// ---- Icons ----
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
    <path d="M8.5 10.3H15.5V19.2C15.5 19.9 14.9 20.5 14.2 20.5H9.8C9.1 20.5 8.5 19.9 8.5 19.2V10.3Z" stroke="currentColor" strokeWidth="1" />
    <line x1="8.5" y1="16.5" x2="15.5" y2="16.5" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
  </svg>
);

const IconScentDark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M15.8 3.2C14.9 3.7 14.3 4.7 14.3 5.8C14.3 7.5 15.7 8.9 17.4 8.9C18.1 8.9 18.7 8.7 19.2 8.3C18.6 10 17 11.2 15.1 11.2C12.7 11.2 10.7 9.2 10.7 6.8C10.7 4.9 11.9 3.3 13.6 2.7C14.3 2.4 15.1 2.7 15.8 3.2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    <rect x="8.7" y="9" width="2.6" height="2.6" stroke="currentColor" strokeWidth="1" />
    <rect x="7.5" y="6.8" width="5" height="2.2" rx="0.4" stroke="currentColor" strokeWidth="1" />
    <path d="M6.5 11.6H13.5V19.2C13.5 19.9 12.9 20.5 12.2 20.5H7.8C7.1 20.5 6.5 19.9 6.5 19.2V11.6Z" stroke="currentColor" strokeWidth="1" />
    <line x1="6.5" y1="17" x2="13.5" y2="17" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
  </svg>
);
// -------------------------------------------------

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effect: background & bottom detection
  useEffect(() => {
    const handleScroll = () => {
      if (!menuOpen) {
        setScrolled(window.scrollY > 40);

        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const bottomThreshold = 100;

        // Guard: only consider "at bottom" if the page actually scrolls
        const atBottom =
          scrollHeight > windowHeight &&
          scrollY + windowHeight >= scrollHeight - bottomThreshold;

        setIsAtBottom(atBottom);
      }
    };

    handleScroll(); // run once on mount in case page loads already scrolled
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [menuOpen]);

  // Menu content delay
  useEffect(() => {
    if (menuOpen) {
      setContentVisible(false);
      const timer = setTimeout(() => setContentVisible(true), 700);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLinkClick = (path) => (e) => {
    e.preventDefault();
    if (isClosing) return;
    setIsClosing(true);
    setMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      setIsClosing(false);
    }, 750);
  };

  const toggleMenu = () => {
    if (isClosing) return;
    setMenuOpen((prev) => !prev);
  };

  const links = [
    { label: 'ABOUT', to: '/about' },
    { label: 'PRODUCTS', to: '/products' },
    { label: 'CATALOGUE', to: '/catalog' },
    { label: 'CONTACT', to: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Single source of truth for opacity + translate, so classes never conflict
  const navbarPosition = !isLoaded
    ? 'opacity-0 -translate-y-5'
    : isAtBottom && !menuOpen
      ? 'opacity-100 -translate-y-full'
      : 'opacity-100 translate-y-0';

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 
        flex flex-col
        transition-all duration-700 ease-out
        transform
        ${navbarPosition}
        ${menuOpen
          ? 'h-screen bg-white dark:bg-dark-teal overflow-y-auto'
          : `h-20 ${scrolled ? 'bg-white/70 dark:bg-dark-teal/70 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-soft' : 'bg-transparent border-b border-transparent'}`
        }
      `}
    >
      {/* Top bar */}
      <div className={`
        sticky top-0 z-10 w-full h-20 flex items-center justify-between px-4 sm:px-8 
        2xl:max-w-7xl 2xl:mx-auto
        transition-[background,box-shadow] duration-500
        ${menuOpen ? 'bg-white dark:bg-dark-teal' : ''}
      `}>
        <Link to="/" className="h-10 flex items-center" onClick={() => menuOpen && toggleMenu()}>
          <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
          <img
            src={webLogoText}
            alt="Wel Fragrance Text"
            className="h-[100%] w-auto object-contain brightness-0 dark:invert -ml-3"
          />
        </Link>

        <div className="flex items-center gap-4">
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
            <span className={`
              absolute inset-0 rounded-full blur-md transition-opacity duration-500
              ${theme === 'dark' ? 'bg-yellow-400/20 opacity-50' : 'bg-indigo-400/20 opacity-0'}
            `} />
            <span className={`
              block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-110
              ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}
            `}>
              {theme === 'dark' ? <IconScentLight /> : <IconScentDark />}
            </span>
          </button>

          <button
            onClick={toggleMenu}
            className="bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-105 active:scale-95"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            disabled={isClosing}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Menu content */}
      <div className={`
        flex-1 w-full 
        transition-all duration-700
        ${menuOpen ? 'overflow-y-auto' : 'overflow-hidden'}
        px-4 sm:px-8
        2xl:max-w-7xl 2xl:mx-auto
      `}>
        <div className={`
          flex flex-col lg:flex-row h-full w-full gap-8 lg:gap-12 
          py-8 lg:py-12
          transition-transform duration-500 ease-out
          ${contentVisible ? 'translate-y-0' : 'translate-y-8'}
        `}>
          <div className="lg:w-[70%] flex flex-col justify-center">
            <nav className="w-full">
              {links.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={handleLinkClick(link.to)}
                    className={`
                      group flex items-center gap-4 text-3xl sm:text-4xl md:text-5xl
                      font-light no-underline border-b border-black/10 dark:border-white/10
                      py-4 sm:py-5 mb-4 sm:mb-5 transition-colors
                      ${active
                        ? 'text-old-gold font-medium'
                        : 'text-black dark:text-white hover:text-old-gold'
                      }
                      w-full
                    `}
                  >
                    <span className="uppercase">{link.label}</span>
                    <span className="text-xs tracking-[0.2em] text-old-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                      DISCOVER
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="lg:w-[30%] flex items-center justify-center">
            <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-full overflow-hidden bg-warm-white/30 dark:bg-charcoal/30 backdrop-blur-sm">
              <div className="absolute inset-4 border border-old-gold/20 z-10 pointer-events-none" />
              <div className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 border-t border-l border-old-gold/50 z-10" />
              <div className="absolute bottom-4 right-4 w-8 h-8 sm:w-10 sm:h-10 border-b border-r border-old-gold/50 z-10" />
              <img
                src={welStore}
                alt="Wel Store"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-white/40 dark:from-dark-teal/40 via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;