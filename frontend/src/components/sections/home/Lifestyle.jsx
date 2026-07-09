import React, { useEffect, useRef } from 'react';

import MorningSwim from '@/assets/products/MorningSwim.webp';

export default function Lifestyle() {
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

                        // Text slides in from the right (x: 60px → 0)
                        const text = section.querySelector('.lifestyle-text');
                        if (text) {
                            text.animate(
                                [
                                    { opacity: 0, transform: 'translateX(60px)' },
                                    { opacity: 1, transform: 'translateX(0)' },
                                ],
                                {
                                    duration: 1200,
                                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)', // power3.out
                                    fill: 'forwards',
                                }
                            );
                        }

                        // Image slides in from the left (x: -60px → 0)
                        const image = section.querySelector('.lifestyle-image');
                        if (image) {
                            image.animate(
                                [
                                    { opacity: 0, transform: 'translateX(-60px)' },
                                    { opacity: 1, transform: 'translateX(0)' },
                                ],
                                {
                                    duration: 1200,
                                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    fill: 'forwards',
                                }
                            );
                        }

                        observer.unobserve(section);
                    }
                });
            },
            { threshold: 0.3 } // matches 'top 70%'
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
                    <div className="lifestyle-image relative opacity-0 -translate-x-16">
                        <div className="relative aspect-[4/5] overflow-hidden bg-warm-white/50 dark:bg-charcoal/50 backdrop-blur-sm">
                            <div className="absolute inset-4 border border-old-gold/20 z-10 pointer-events-none" />
                            <div className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 border-t border-l border-old-gold/40 z-10" />
                            <div className="absolute bottom-4 right-4 w-10 h-10 sm:w-12 sm:h-12 border-b border-r border-old-gold/40 z-10" />

                            <img
                                src={MorningSwim}
                                alt="Luxury Lifestyle"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-warm-white/60 dark:from-dark-teal/60 via-transparent to-transparent opacity-60" />
                        </div>

                        <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 lg:-left-12 z-20 bg-warm-white/80 dark:bg-dark-teal/80 backdrop-blur-sm border border-old-gold/30 p-4 sm:p-6 max-w-[200px] sm:max-w-[240px]">
                            <p className="font-cormorant text-old-gold text-base sm:text-lg italic leading-snug">
                                "Because every scent is a reflection of you."
                            </p>
                            <div className="mt-2 h-px w-full bg-gradient-to-r from-old-gold/50 to-transparent" />
                            <p className="font-jost text-[10px] sm:text-xs text-warm-gray dark:text-warm-white/70 mt-1 sm:mt-2 tracking-wider uppercase">
                                — Wel Philosophy
                            </p>
                        </div>
                    </div>

                    <div className="lifestyle-text space-y-6 sm:space-y-8 opacity-0 translate-x-16">
                        {/* Eyebrow with camera‑cursor corners */}
                        <div className="flex items-center gap-4">
                            <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                                <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                                <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                    The Lifestyle
                                </span>
                            </div>
                        </div>

                        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight">
                            A Scent for <br />
                            <span className="italic text-old-gold">Every Moment</span>
                        </h2>

                        <div className="space-y-4 sm:space-y-6">
                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed text-sm sm:text-base">
                                Whether you're seeking a signature fragrance or a gift to celebrate life's moments,
                                Wel Fragrance Collection invites you to explore the world of evocative aromas
                                designed to resonate with your spirit.
                            </p>
                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed text-sm sm:text-base">
                                From intimate evenings to grand celebrations, our curated scents accompany you
                                through every chapter of your story — leaving an impression that lasts long after
                                you've left the room.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-old-gold/10">
                            <div>
                                <span className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-old-gold">50+</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-1 sm:mt-2">
                                    Unique Scents
                                </p>
                            </div>
                            <div>
                                <span className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-old-gold">2</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-1 sm:mt-2">
                                    Countries
                                </p>
                            </div>
                            <div>
                                <span className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-old-gold">100%</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-1 sm:mt-2">
                                    Handcrafted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}