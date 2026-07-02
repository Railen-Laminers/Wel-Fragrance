import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Lifestyle() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.lifestyle-text', {
                x: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });

            gsap.from('.lifestyle-image', {
                x: -60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 z-10 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="lifestyle-image relative">
                        <div className="relative aspect-[4/5] overflow-hidden bg-warm-white/50 dark:bg-charcoal/50 backdrop-blur-sm">
                            <div className="absolute inset-4 border border-old-gold/20 z-10 pointer-events-none" />
                            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-old-gold/40 z-10" />
                            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-old-gold/40 z-10" />

                            <img
                                src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&h=1000&fit=crop"
                                alt="Luxury Lifestyle"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-warm-white/60 dark:from-dark-teal/60 via-transparent to-transparent opacity-60" />
                        </div>

                        <div className="absolute -bottom-6 -left-6 lg:-left-12 z-20 bg-warm-white/80 dark:bg-dark-teal/80 backdrop-blur-sm border border-old-gold/30 p-6 max-w-[240px]">
                            <p className="font-cormorant text-old-gold text-lg italic leading-snug">
                                "Because every scent is a reflection of you."
                            </p>
                            <div className="mt-2 h-px w-full bg-gradient-to-r from-old-gold/50 to-transparent" />
                            <p className="font-jost text-xs text-warm-gray dark:text-warm-white/70 mt-2 tracking-wider uppercase">
                                — Wel Philosophy
                            </p>
                        </div>
                    </div>

                    <div className="lifestyle-text space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-px w-12 bg-old-gold/40" />
                            <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                                The Lifestyle
                            </span>
                        </div>

                        <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight">
                            A Scent for <br />
                            <span className="italic text-old-gold">Every Moment</span>
                        </h2>

                        <div className="space-y-6">
                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed">
                                Whether you're seeking a signature fragrance or a gift to celebrate life's moments, Wel Fragrance Collection invites you to explore the world of evocative aromas designed to resonate with your spirit.
                            </p>
                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed">
                                From intimate evenings to grand celebrations, our curated scents accompany you through every chapter of your story — leaving an impression that lasts long after you've left the room.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-old-gold/10">
                            <div>
                                <span className="font-cormorant text-3xl lg:text-4xl text-old-gold">50+</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-2">Unique Scents</p>
                            </div>
                            <div>
                                <span className="font-cormorant text-3xl lg:text-4xl text-old-gold">2</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-2">Countries</p>
                            </div>
                            <div>
                                <span className="font-cormorant text-3xl lg:text-4xl text-old-gold">100%</span>
                                <p className="font-jost text-[10px] tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase mt-2">Handcrafted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}