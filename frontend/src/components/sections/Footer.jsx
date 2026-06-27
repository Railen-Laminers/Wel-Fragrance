import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Container from '../common/Container';
import navLogo from '/navLogo.png';

const Footer = () => {
    const exploreLinks = ['About', 'Products', 'Models', 'Contact'];
    const supportLinks = ['FAQ', 'Shipping', 'Returns'];

    return (
        <Container className="py-12 md:py-16 lg:py-20 bg-white dark:bg-dark-teal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-12 border-b border-black/10 dark:border-white/10">
                <div>
                    <div className="mb-5">
                        <img src={navLogo} alt="Wel Fragrance" className="h-8 md:h-10 w-auto object-contain" />
                    </div>
                    <p className="font-jost text-sm font-light leading-relaxed text-black/70 dark:text-white/70 max-w-xs mb-6">
                        A maison de parfum devoted to the beauty of restraint. Crafted for
                        those who know that true luxury whispers.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com/Wel_FragranceCollection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-black/20 dark:border-white/20 flex items-center justify-center rounded-full text-black/70 dark:text-white/70 hover:text-old-gold hover:border-old-gold transition-colors duration-300"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 border border-black/20 dark:border-white/20 flex items-center justify-center rounded-full text-black/70 dark:text-white/70 hover:text-old-gold hover:border-old-gold transition-colors duration-300"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="w-9 h-9 border border-black/20 dark:border-white/20 flex items-center justify-center rounded-full text-black/70 dark:text-white/70 hover:text-old-gold hover:border-old-gold transition-colors duration-300"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                <div>
                    <div className="font-jost text-[10px] tracking-[0.25em] text-old-gold uppercase mb-4">Explore</div>
                    <div className="flex flex-col gap-3">
                        {exploreLinks.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="font-jost text-sm font-light text-black/60 dark:text-white/60 no-underline transition-colors hover:text-old-gold"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="font-jost text-[10px] tracking-[0.25em] text-old-gold uppercase mb-4">Support</div>
                    <div className="flex flex-col gap-3">
                        {supportLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="font-jost text-sm font-light text-black/60 dark:text-white/60 no-underline transition-colors hover:text-old-gold"
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4">
                <p className="font-jost text-[11px] text-black/60 dark:text-white/60 tracking-[0.06em]">
                    © 2025 Wel Fragrance. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                    <a href="#" className="font-jost text-[11px] text-black/60 dark:text-white/60 no-underline transition-colors hover:text-old-gold tracking-[0.04em]">
                        Privacy Policy
                    </a>
                    <a href="#" className="font-jost text-[11px] text-black/60 dark:text-white/60 no-underline transition-colors hover:text-old-gold tracking-[0.04em]">
                        Terms of Service
                    </a>
                    <a href="#" className="font-jost text-[11px] text-black/60 dark:text-white/60 no-underline transition-colors hover:text-old-gold tracking-[0.04em]">
                        Cookie Settings
                    </a>
                </div>
            </div>
        </Container>
    );
};

export default Footer;