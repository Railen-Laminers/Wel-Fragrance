import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll('.philosophy-card');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play reverse play reverse',
                },
                defaults: { ease: 'power3.out' },
            });

            gsap.set(cards, {
                y: 80,
                scale: 0.9,
                opacity: 0,
                rotationX: 10,
                transformOrigin: 'center bottom',
            });

            tl.to(cards, {
                y: 0,
                scale: 1,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'back.out(1.5)',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const pillars = [
        {
            number: '01',
            title: 'Passion',
            desc: 'Every fragrance is born from an unwavering dedication to the art of perfumery, capturing emotions in every drop.',
        },
        {
            number: '02',
            title: 'Artistry',
            desc: "We blend nature's purest essences with masterful craftsmanship, creating compositions that transcend ordinary scents.",
        },
        {
            number: '03',
            title: 'Individuality',
            desc: 'Your scent is your signature. We design fragrances that resonate with your unique spirit and story.',
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 sm:mb-20">
                    {/* Eyebrow – now using camera‑cursor corners */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                            {/* Top-Left Corner */}
                            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                            {/* Bottom-Right Corner */}
                            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                            <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                The Philosophy
                            </span>
                        </div>
                    </div>

                    <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight">
                        Beyond Scent, <br />
                        <span className="italic text-old-gold">Timeless Experiences</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.number}
                            className="philosophy-card group relative p-6 sm:p-8 lg:p-10 border border-old-gold/10 hover:border-old-gold/30 transition-all duration-700 bg-warm-white/70 dark:bg-charcoal/70 backdrop-blur-sm"
                        >
                            <div className="absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 border-t border-l border-old-gold/20 group-hover:border-old-gold/50 transition-colors duration-500" />
                            <div className="absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 border-b border-r border-old-gold/20 group-hover:border-old-gold/50 transition-colors duration-500" />

                            <span className="font-playfair text-5xl sm:text-6xl text-old-gold/10 group-hover:text-old-gold/20 transition-colors duration-500">
                                {pillar.number}
                            </span>
                            <h3 className="font-cormorant text-xl sm:text-2xl lg:text-3xl text-dark-teal dark:text-warm-white mt-4 mb-3 sm:mb-4 group-hover:text-old-gold transition-colors duration-500">
                                {pillar.title}
                            </h3>
                            <p className="font-inter text-warm-gray dark:text-warm-white/70 text-sm leading-relaxed">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}