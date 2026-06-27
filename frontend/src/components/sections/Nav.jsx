import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconMenu, IconClose } from '../common/Icons';
import webLogo from '/webLogo.png';

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const links = ["About", "Products", "Models", "Contact"];

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: "0 32px",
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    transition: "background 0.5s",
                }}
            >
                <div
                    className={scrolled ? "nav-glass" : ""}
                    style={{
                        maxWidth: "1440px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                        padding: "0 24px",
                        transition: "all 0.4s ease",
                        // ✅ Border radius only on bottom corners when scrolled
                        borderBottomLeftRadius: scrolled ? "16px" : "0",
                        borderBottomRightRadius: scrolled ? "16px" : "0",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "0",
                    }}
                >
                    {/* Logo – left */}
                    <div style={{ height: 40, display: "flex", alignItems: "center" }}>
                        <img
                            src={webLogo}
                            alt="Wel Fragrance"
                            style={{ height: "100%", width: "auto", objectFit: "contain" }}
                        />
                    </div>

                    {/* Burger – right */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                        <IconMenu />
                    </button>
                </div>
            </motion.nav>

            {/* Fullscreen Burger Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 200,
                            background: "var(--black)",
                            display: "flex",
                            flexDirection: "column",
                            padding: "72px 40px",
                        }}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: "absolute",
                                top: 28,
                                right: 32,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            <IconClose />
                        </button>

                        <div style={{ marginBottom: 64 }}>
                            <img
                                src={webLogo}
                                alt="Wel Fragrance"
                                style={{ height: 36, width: 'auto', objectFit: 'contain' }}
                            />
                        </div>

                        {links.map((l, i) => (
                            <motion.a
                                key={l}
                                href={`#${l.toLowerCase()}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + i * 0.08 }}
                                onClick={() => setMenuOpen(false)}
                                className="group flex items-center gap-4"
                                style={{
                                    fontSize: 44,
                                    fontWeight: 300,
                                    color: "var(--ivory)",
                                    textDecoration: "none",
                                    lineHeight: 1.15,
                                    borderBottom: "1px solid rgba(184,169,154,0.1)",
                                    paddingBottom: 20,
                                    marginBottom: 20,
                                    display: "flex",
                                    alignItems: "center",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--stone)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ivory)")}
                            >
                                {l}
                                <span
                                    className="text-[11px] tracking-[0.2em] text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ marginLeft: 12 }}
                                >
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