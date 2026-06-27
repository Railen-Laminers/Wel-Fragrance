import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu, IconClose } from '../common/Icons';
import webLogo from '/webLogo.png';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    const links = ['About', 'Products', 'Models', 'Contact'];

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="fixed top-0 left-0 right-0 z-50 px-8 h-20 flex items-center"
            >
                <div
                    className={`
            max-w-[1440px] mx-auto flex items-center justify-between w-full h-full px-6
            transition-all duration-400
            ${scrolled
                            ? 'bg-white/70 dark:bg-dark-teal/70 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-soft rounded-2xl'
                            : ''}
          `}
                >
                    <div className="h-10 flex items-center">
                        <img src={webLogo} alt="Wel Fragrance" className="h-full w-auto object-contain" />
                    </div>
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="bg-transparent border-none cursor-pointer text-black dark:text-white"
                    >
                        <IconMenu />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-dark-teal flex flex-col p-18 md:p-20"
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-7 right-8 bg-transparent border-none cursor-pointer text-black dark:text-white"
                        >
                            <IconClose />
                        </button>

                        <div className="mb-16">
                            <img src={webLogo} alt="Wel Fragrance" className="h-9 w-auto object-contain" />
                        </div>

                        {links.map((l, i) => (
                            <motion.a
                                key={l}
                                href={`#${l.toLowerCase()}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                onClick={() => setMenuOpen(false)}
                                className="group flex items-center gap-4 text-4xl md:text-5xl font-light text-black dark:text-white no-underline border-b border-black/10 dark:border-white/10 py-5 mb-5 transition-colors hover:text-old-gold"
                            >
                                {l}
                                <span className="text-xs tracking-[0.2em] text-old-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3">
                                    discover
                                </span>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;