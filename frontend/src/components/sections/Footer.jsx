import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Container from '../common/Container';
import navLogo from '/navLogo.png';

const Footer = () => {
    const exploreLinks = ['About', 'Products', 'Models', 'Contact'];
    const supportLinks = ['FAQ', 'Shipping', 'Returns'];

    return (
        <Container
            background="#0E0D0B"
            className="py-12 md:py-16 lg:py-20"
        >
            {/* ─── Main Grid ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-12 border-b border-[rgba(184,169,154,0.1)]">
                {/* Brand Column */}
                <div>
                    <div className="mb-5">
                        <img
                            src={navLogo}
                            alt="Wel Fragrance"
                            className="h-8 md:h-10 w-auto object-contain"
                        />
                    </div>
                    <p className="sans text-sm font-light leading-relaxed text-stone max-w-xs mb-6">
                        A maison de parfum devoted to the beauty of restraint. Crafted for
                        those who know that true luxury whispers.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com/Wel_FragranceCollection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-[rgba(184,169,154,0.2)] flex items-center justify-center rounded-full text-stone hover:text-ivory hover:border-ivory transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 border border-[rgba(184,169,154,0.2)] flex items-center justify-center rounded-full text-stone hover:text-ivory hover:border-ivory transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 border border-[rgba(184,169,154,0.2)] flex items-center justify-center rounded-full text-stone hover:text-ivory hover:border-ivory transition-colors duration-300"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Explore – matches Nav links exactly */}
                <div>
                    <div className="sans text-[10px] tracking-[0.25em] text-stone uppercase mb-4">
                        Explore
                    </div>
                    <div className="flex flex-col gap-3">
                        {exploreLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="sans text-sm font-light text-[rgba(184,169,154,0.6)] no-underline transition-colors duration-300 hover:text-ivory"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Support */}
                <div>
                    <div className="sans text-[10px] tracking-[0.25em] text-stone uppercase mb-4">
                        Support
                    </div>
                    <div className="flex flex-col gap-3">
                        {supportLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="sans text-sm font-light text-[rgba(184,169,154,0.6)] no-underline transition-colors duration-300 hover:text-ivory"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Bottom Bar ─── */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
                <p className="sans text-[11px] text-mid tracking-[0.06em]">
                    © 2025 Wel Fragrance. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                    <a
                        href="#"
                        className="sans text-[11px] text-mid no-underline transition-colors duration-300 tracking-[0.04em] hover:text-stone"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="sans text-[11px] text-mid no-underline transition-colors duration-300 tracking-[0.04em] hover:text-stone"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="sans text-[11px] text-mid no-underline transition-colors duration-300 tracking-[0.04em] hover:text-stone"
                    >
                        Cookie Settings
                    </a>
                </div>
            </div>
        </Container>
    );
};

export default Footer;