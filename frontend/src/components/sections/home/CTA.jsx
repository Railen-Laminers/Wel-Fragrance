import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import Litz from '@/assets/products/Litz.png';

export default function CTA() {
    const sectionRef = useRef(null);
    const animated = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animated.current) {
                        animated.current = true;

                        const content = section.querySelector('.cta-content');
                        if (content) {
                            content.animate(
                                [
                                    { opacity: 0, transform: 'scale(0.95)' },
                                    { opacity: 1, transform: 'scale(1)' },
                                ],
                                {
                                    duration: 1200,
                                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // power3.out
                                    fill: 'forwards',
                                }
                            );
                        }

                        observer.unobserve(section);
                    }
                });
            },
            { threshold: 0.2 } // approximates 'top 80%'
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="cta-content relative overflow-hidden opacity-0 scale-95">
                    {/* Background Image with lighter overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={Litz}
                            alt="Fragrance Background"
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-warm-white/60 dark:bg-dark-teal/60" />
                        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/70 dark:from-dark-teal/70 via-warm-white/60 dark:via-dark-teal/60 to-transparent" />
                    </div>

                    <div className="relative z-10 py-16 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-16">
                        <div className="max-w-2xl">
                            {/* Eyebrow with camera‑cursor corners */}
                            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                                    <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                                    <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                        Begin Your Journey
                                    </span>
                                </div>
                            </div>

                            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight mb-4 sm:mb-6">
                                Discover Your <br />
                                <span className="italic text-old-gold">Signature Scent</span>
                            </h2>

                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed text-sm sm:text-base mb-6 sm:mb-10 max-w-lg">
                                Whether you're seeking a signature fragrance or a gift to celebrate life's
                                moments, Wel Fragrance Collection invites you to explore the world of evocative
                                aromas designed to resonate with your spirit.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <Link
                                    to="/products"
                                    className="group relative px-6 sm:px-10 py-3 sm:py-4 bg-old-gold text-warm-white dark:text-dark-teal font-jost text-xs sm:text-sm tracking-[0.15em] uppercase font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(199,159,72,0.3)]"
                                >
                                    <span className="relative z-10">Shop Now</span>
                                    <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="group flex items-center gap-3 font-jost text-xs sm:text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                                >
                                    <span>Contact Us</span>
                                    <svg
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-t border-r border-old-gold/20 hidden lg:block" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-20 sm:h-20 border-b border-r border-old-gold/20 hidden lg:block" />
                </div>
            </div>
        </section>
    );
}