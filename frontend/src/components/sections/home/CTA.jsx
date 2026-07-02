import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cta-content', {
                scale: 0.95,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 z-10 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="cta-content relative overflow-hidden">
                    {/* Background Image with lighter overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1400&h=800&fit=crop"
                            alt="Fragrance Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-warm-white/60 dark:bg-dark-teal/60" />
                        <div className="absolute inset-0 bg-gradient-to-r from-warm-white/70 dark:from-dark-teal/70 via-warm-white/60 dark:via-dark-teal/60 to-transparent" />
                    </div>

                    <div className="relative z-10 py-20 lg:py-28 px-8 lg:px-16">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-px w-12 bg-old-gold/40" />
                                <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                                    Begin Your Journey
                                </span>
                            </div>

                            <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight mb-6">
                                Discover Your <br />
                                <span className="italic text-old-gold">Signature Scent</span>
                            </h2>

                            <p className="font-inter text-warm-gray dark:text-warm-white/70 leading-relaxed mb-10 max-w-lg">
                                Whether you're seeking a signature fragrance or a gift to celebrate life's moments, Wel Fragrance Collection invites you to explore the world of evocative aromas designed to resonate with your spirit.
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <a
                                    href="#shop"
                                    className="group relative px-10 py-4 bg-old-gold text-warm-white dark:text-dark-teal font-jost text-sm tracking-[0.15em] uppercase font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(199,159,72,0.3)]"
                                >
                                    <span className="relative z-10">Shop Now</span>
                                    <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                </a>
                                <a
                                    href="#contact"
                                    className="group flex items-center gap-3 font-jost text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                                >
                                    <span>Contact Us</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-old-gold/20 hidden lg:block" />
                    <div className="absolute bottom-8 right-8 w-20 h-20 border-b border-r border-old-gold/20 hidden lg:block" />
                </div>
            </div>
        </section>
    );
}