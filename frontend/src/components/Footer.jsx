import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';  // ← added
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import Container from './common/Container';
import webLogo from '/webLogo.png';

// ─── Custom hook: element in viewport ──────────────────────────────────────
const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.2, ...options }
        );

        const el = ref.current;
        if (el) observer.observe(el);

        return () => {
            if (el) observer.unobserve(el);
        };
    }, [options]);

    return { ref, isInView };
};

// ─── Fragrance name marquee (CSS-only) ──────────────────────────────────────
const SCENTS = ['Jaime', 'Dorz', 'Rupert', 'Vian', 'Litz', 'Iluminare', 'Fely', 'Lenzki', 'Rei', 'Joe', 'Mar', 'Greg'];

const ScentMarquee = () => (
    <div className="overflow-hidden border-t border-old-gold/10 py-5" aria-hidden="true">
        <div
            className="flex w-max"
            style={{ animation: 'marqueeFwd 32s linear infinite' }}
        >
            {[...SCENTS, ...SCENTS].map((name, i) => (
                <span key={i} className="flex items-center">
                    <span className="font-playfair italic font-light text-[13px] text-old-gold/35 tracking-[0.08em] px-8 whitespace-nowrap">
                        {name}
                    </span>
                    <span className="text-old-gold/20 text-[8px]">·</span>
                </span>
            ))}
        </div>
        <style>{`
      @keyframes marqueeFwd {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) {
        [style*="marqueeFwd"] { animation: none; }
      }
    `}</style>
    </div>
);

// ─── Social icon button (no Framer Motion) ─────────────────────────────────
const SocialBtn = ({ Icon, href, label }) => (
    <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        aria-label={label}
        className="
      w-9 h-9 border border-white/15 flex items-center justify-center
      text-white/50 hover:text-old-gold hover:border-old-gold/50
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 active:scale-95
    "
    >
        <Icon size={13} />
    </a>
);

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => {
    const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });

    const exploreLinks = ['About', 'Products', 'Catalogue', 'Contact'];
    const supportLinks = ['FAQ', 'Shipping', 'Returns'];
    const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Settings'];

    // Stagger delays (in seconds) for each section
    const delays = [0, 0.1, 0.2, 0.3]; // brand, explore, support, bottom bar

    return (
        <footer ref={ref} className="bg-dark-teal">
            <ScentMarquee />

            <Container className="pt-14 pb-0">
                <div className="max-w-[1440px] mx-auto">
                    {/* Grid columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16 pb-14 border-b border-old-gold/10">

                        {/* Brand column – delay 0 */}
                        <div
                            className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                transform
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
                            style={{ transitionDelay: `${delays[0]}s` }}
                        >
                            <div className="mb-6">
                                <Link to="/">
                                    <img
                                        src={webLogo}
                                        alt="Wel Fragrance"
                                        className="h-9 w-auto object-contain brightness-0 invert"
                                    />
                                </Link>
                            </div>

                            <p className="font-jost text-[13px] font-light leading-relaxed text-white/45 max-w-[280px] mb-8">
                                A maison de parfum devoted to the beauty of restraint.
                                Crafted for those who know that true luxury whispers.
                            </p>

                            <div className="space-y-2 mb-8">
                                <a
                                    href="mailto:wel.fragrancecollection@gmail.com"
                                    className="block font-jost text-[12px] text-white/40 hover:text-old-gold no-underline transition-colors duration-200"
                                >
                                    wel.fragrancecollection@gmail.com
                                </a>
                                <p className="font-jost text-[12px] text-white/30">Philippines</p>
                            </div>

                            <div className="flex gap-3">
                                <SocialBtn Icon={FaInstagram} href="https://instagram.com/Wel_FragranceCollection" label="Instagram" />
                                <SocialBtn Icon={FaFacebookF} href="#" label="Facebook" />
                                <SocialBtn Icon={FaTwitter} href="#" label="Twitter" />
                            </div>
                        </div>

                        {/* Explore column – delay 0.1s */}
                        <div
                            className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                transform
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
                            style={{ transitionDelay: `${delays[1]}s` }}
                        >
                            <div className="font-jost text-[9px] tracking-[0.32em] text-old-gold uppercase mb-6">
                                Explore
                            </div>
                            <div className="flex flex-col gap-3.5">
                                {exploreLinks.map((link) => {
                                    const isRoute = link === 'About' || link === 'Contact';
                                    const path = isRoute ? `/${link.toLowerCase()}` : `#${link.toLowerCase()}`;
                                    if (isRoute) {
                                        return (
                                            <Link
                                                key={link}
                                                to={path}
                                                className="
                          font-jost text-[13px] font-light text-white/45
                          no-underline relative group w-fit
                          hover:text-white transition-colors duration-200
                        "
                                            >
                                                {link}
                                                <span className="
                          absolute left-0 -bottom-px w-0 h-px bg-old-gold
                          transition-all duration-300 group-hover:w-full
                        " />
                                            </Link>
                                        );
                                    } else {
                                        return (
                                            <a
                                                key={link}
                                                href={path}
                                                className="
                          font-jost text-[13px] font-light text-white/45
                          no-underline relative group w-fit
                          hover:text-white transition-colors duration-200
                        "
                                            >
                                                {link}
                                                <span className="
                          absolute left-0 -bottom-px w-0 h-px bg-old-gold
                          transition-all duration-300 group-hover:w-full
                        " />
                                            </a>
                                        );
                                    }
                                })}
                            </div>
                        </div>

                        {/* Support column – delay 0.2s */}
                        <div
                            className={`
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                transform
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
                            style={{ transitionDelay: `${delays[2]}s` }}
                        >
                            <div className="font-jost text-[9px] tracking-[0.32em] text-old-gold uppercase mb-6">
                                Support
                            </div>
                            <div className="flex flex-col gap-3.5">
                                {supportLinks.map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="
                      font-jost text-[13px] font-light text-white/45
                      no-underline relative group w-fit
                      hover:text-white transition-colors duration-200
                    "
                                    >
                                        {link}
                                        <span className="
                      absolute left-0 -bottom-px w-0 h-px bg-old-gold
                      transition-all duration-300 group-hover:w-full
                    " />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar – delay 0.3s */}
                    <div
                        className={`
              flex flex-col sm:flex-row justify-between items-center py-6 gap-5
              transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
              transform
              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
                        style={{ transitionDelay: `${delays[3]}s` }}
                    >
                        <p className="font-jost text-[11px] text-white/25 tracking-[0.08em]">
                            © 2025 Wel Fragrance Collection. All rights reserved.
                        </p>

                        <div className="flex flex-wrap gap-5 justify-center sm:justify-end">
                            {legalLinks.map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="
                    font-jost text-[11px] text-white/25
                    no-underline hover:text-white/60
                    transition-colors duration-200
                    tracking-[0.04em]
                  "
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;