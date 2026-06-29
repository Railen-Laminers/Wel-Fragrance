import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconMenu, IconClose } from './common/Icons';
import webLogo from '/webLogo.png';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const links = [
        { label: 'ABOUT', to: '/about', isRoute: true },
        { label: 'PRODUCTS', href: '#products', isRoute: false },
        { label: 'CATALOGUE', href: '#catalogue', isRoute: false },
        { label: 'CONTACT', to: '/contact', isRoute: true },
    ];

    return (
        <>
            <nav
                className={`
          fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 h-20 flex items-center
          transition-all duration-700 ease-out
          ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
        `}
            >
                <div
                    className={`
            max-w-[1440px] mx-auto flex items-center justify-between w-full h-full px-4 sm:px-6
            transition-[background,backdrop-filter,box-shadow] duration-500 ease-out
            rounded-b-2xl
            ${scrolled
                            ? 'bg-white/70 dark:bg-dark-teal/70 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-soft'
                            : 'border border-transparent'
                        }
          `}
                >
                    <Link to="/" className="h-10 flex items-center">
                        <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
                    </Link>

                    <button
                        onClick={() => setMenuOpen(true)}
                        className="bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-105 active:scale-95"
                    >
                        <IconMenu />
                    </button>
                </div>
            </nav>

            <div
                className={`
          fixed inset-0 z-[100] bg-white dark:bg-dark-teal flex flex-col p-12 sm:p-18 md:p-20
          transition-all duration-500 ease-out
          transform
          ${menuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-full pointer-events-none'
                    }
        `}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-6 right-6 sm:top-7 sm:right-8 bg-transparent border-none cursor-pointer text-black dark:text-white transition-transform hover:scale-110 active:scale-95"
                >
                    <IconClose />
                </button>

                <div className="mb-12 sm:mb-16">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <img src={webLogo} alt="Wel Fragrance" className="h-9 w-auto object-contain" />
                    </Link>
                </div>

                {links.map((link) => {
                    if (link.isRoute) {
                        return (
                            <Link
                                key={link.label}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={`
                  group flex items-center gap-4 text-3xl sm:text-4xl md:text-5xl font-light
                  text-black dark:text-white no-underline border-b border-black/10 dark:border-white/10
                  py-4 sm:py-5 mb-4 sm:mb-5 transition-colors hover:text-old-gold
                `}
                            >
                                {link.label}
                                <span className="text-xs tracking-[0.2em] text-old-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                                    DISCOVER
                                </span>
                            </Link>
                        );
                    } else {
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className={`
                  group flex items-center gap-4 text-3xl sm:text-4xl md:text-5xl font-light
                  text-black dark:text-white no-underline border-b border-black/10 dark:border-white/10
                  py-4 sm:py-5 mb-4 sm:mb-5 transition-colors hover:text-old-gold
                `}
                            >
                                {link.label}
                                <span className="text-xs tracking-[0.2em] text-old-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                                    DISCOVER
                                </span>
                            </a>
                        );
                    }
                })}
            </div>
        </>
    );
};

export default Nav;