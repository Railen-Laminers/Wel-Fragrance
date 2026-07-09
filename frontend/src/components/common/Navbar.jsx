import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import webLogo from '/webLogo.webp';
import webLogoText from '/webLogoText.webp';
import welStore from '@/assets/bg/welStore.webp';

// ---- Icons ----

/**
 * Animated hamburger / close toggle.
 * Adapted from the Uiverse.io "hamburger" by talhabangyal — same morph
 * animation (top/bottom bars rotate into an X, middle bar fades away),
 * but wired up as a controlled component and recolored via currentColor
 * so it follows the navbar's light/dark text color automatically.
 */
const HAMBURGER_STYLES = `
  .wf-hamburger { cursor: pointer; display: inline-flex; }
  .wf-hamburger input { display: none; }
  .wf-hamburger svg {
    height: 1.7em;
    color: inherit;
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .wf-hamburger .wf-line {
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .wf-hamburger .wf-line-top-bottom { stroke-dasharray: 12 63; }
  .wf-hamburger input:checked + svg { transform: rotate(-45deg); }
  .wf-hamburger input:checked + svg .wf-line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;

let hamburgerStylesInjected = false;

const HamburgerButton = ({ checked, onToggle, className = '' }) => {
  useEffect(() => {
    if (hamburgerStylesInjected) return;
    const style = document.createElement('style');
    style.setAttribute('data-wf-hamburger', 'true');
    style.textContent = HAMBURGER_STYLES;
    document.head.appendChild(style);
    hamburgerStylesInjected = true;
  }, []);

  return (
    <label className={`wf-hamburger ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        aria-label={checked ? 'Close menu' : 'Open menu'}
      />
      <svg viewBox="0 0 32 32">
        <path
          className="wf-line wf-line-top-bottom"
          d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
        />
        <path className="wf-line" d="M7 16 27 16" />
      </svg>
    </label>
  );
};

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

const LINKS = [
  { label: 'ABOUT', to: '/about' },
  { label: 'PRODUCTS', to: '/products' },
  { label: 'CATALOGUE', to: '/catalog' },
  { label: 'CONTACT', to: '/contact' },
];

const NAV_HEIGHT = 80; // px, matches h-20

/**
 * Fixed top bar. Always h-20 — it never grows to fill the screen.
 * The full-screen menu lives in its own <MenuPanel/> that sits behind/under it.
 */
const TopBar = ({ menuOpen, toggleMenu, scrolled, hideBar, theme, toggleTheme }) => (
  <header
    className={`
      fixed top-0 left-0 right-0 z-50 h-20
      flex items-center justify-between px-4 sm:px-8
      2xl:max-w-7xl 2xl:mx-auto 2xl:inset-x-0
      transition-transform duration-700 ease-out
      ${hideBar ? '-translate-y-full' : 'translate-y-0'}
      ${menuOpen || scrolled
        ? 'bg-[#F2EDE6]/90 dark:bg-dark-teal/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-soft'
        : 'bg-transparent border-b border-transparent'
      }
    `}
  >
    <Link to="/" className="h-10 flex items-center" onClick={() => menuOpen && toggleMenu()}>
      <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
      <img
        src={webLogoText}
        alt="Wel Fragrance Text"
        className="h-full w-auto object-contain brightness-0 dark:invert -ml-3"
      />
    </Link>

    <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className={`
          relative w-10 h-10 rounded-full flex items-center justify-center
          transition-colors duration-300
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-old-gold
          ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-dark-teal'}
        `}
      >
        <span
          className={`
            absolute inset-0 rounded-full blur-md transition-opacity duration-500
            ${theme === 'dark' ? 'bg-yellow-400/20 opacity-50' : 'bg-indigo-400/20 opacity-0'}
          `}
        />
        <span
          className={`
            block transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110
            ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}
          `}
        >
          {theme === 'dark' ? <IconScentLight /> : <IconScentDark />}
        </span>
      </button>

      <HamburgerButton
        checked={menuOpen}
        onToggle={toggleMenu}
        className="text-black dark:text-white"
      />
    </div>
  </header>
);

/**
 * The full-screen menu, decoupled from the top bar.
 * Always mounted so it can animate in/out.
 * Now expands vertically from the top (navbar) using scaleY.
 */
const MenuPanel = ({ open, contentVisible, onNavigate, isActive }) => (
  <div
    className={`
      fixed inset-0 z-40
      bg-[#F2EDE6] dark:bg-dark-teal
      origin-top overflow-hidden
      transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      ${open ? 'scale-y-100' : 'scale-y-0 pointer-events-none'}
    `}
    style={{ paddingTop: NAV_HEIGHT }}
    aria-hidden={!open}
  >
    <div className="h-full w-full overflow-y-auto px-4 sm:px-8 2xl:max-w-7xl 2xl:mx-auto">
      <div
        className={`
          flex flex-col lg:flex-row h-full w-full gap-8 lg:gap-12 py-8 lg:py-12
          transition-transform duration-500 ease-out
          ${contentVisible ? 'translate-y-0' : 'translate-y-8'}
        `}
      >
        <nav className="lg:w-[70%] flex flex-col justify-center">
          {LINKS.map((link) => {
            const active = isActive(link.to);
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={onNavigate(link.to)}
                className={`
                  group flex items-center gap-4 w-full
                  text-3xl sm:text-4xl md:text-5xl font-light no-underline
                  border-b border-black/10 dark:border-white/10
                  py-4 sm:py-5 mb-4 sm:mb-5 transition-colors
                  ${active ? 'text-old-gold font-medium' : 'text-black dark:text-white hover:text-old-gold'}
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

        <div className="lg:w-[30%] flex items-center justify-center">
          {/* Outer container: background, borders, and corners remain static */}
          <div className="relative aspect-[4/5] w-full max-w-sm lg:max-w-full overflow-hidden bg-warm-white/30 dark:bg-charcoal/30 backdrop-blur-sm">
            {/* Decorative elements — always visible */}
            <div className="absolute inset-4 border border-old-gold/20 z-10 pointer-events-none" />
            <div className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 border-t border-l border-old-gold/50 z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 sm:w-10 sm:h-10 border-b border-r border-old-gold/50 z-10" />

            {/* Image reveal wrapper: clip‑path animates from top‑to‑bottom */}
            <div
              className="relative w-full h-full transition-[clip-path] duration-700 delay-300 ease-out"
              style={{
                clipPath: contentVisible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
              }}
            >
              <img
                src={welStore}
                alt="Wel Store"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-white/40 dark:from-dark-teal/40 via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll effect: background tint & "hide near bottom" detection
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) return;

      setScrolled(window.scrollY > 40);

      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const bottomThreshold = 100;

      const atBottom =
        scrollHeight > windowHeight && scrollY + windowHeight >= scrollHeight - bottomThreshold;

      setIsAtBottom(atBottom);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [menuOpen]);

  // Stagger the menu content in slightly after the panel expands
  useEffect(() => {
    if (menuOpen) {
      setContentVisible(false);
      const timer = setTimeout(() => setContentVisible(true), 250);
      return () => clearTimeout(timer);
    }
    setContentVisible(false);
  }, [menuOpen]);

  // Scroll lock removed — the main page scrollbar stays visible

  const toggleMenu = () => {
    if (isClosing) return;
    setMenuOpen((prev) => !prev);
  };

  const handleNavigate = (path) => (e) => {
    e.preventDefault();
    if (isClosing) return;
    setIsClosing(true);
    setMenuOpen(false);
    setTimeout(() => {
      navigate(path);
      setIsClosing(false);
    }, 500);
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <TopBar
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        scrolled={scrolled}
        hideBar={isAtBottom && !menuOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <MenuPanel
        open={menuOpen}
        contentVisible={contentVisible}
        onNavigate={handleNavigate}
        isActive={isActive}
      />
    </>
  );
};

export default Navbar;