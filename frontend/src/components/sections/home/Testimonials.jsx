import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonial-content', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const testimonials = [
        {
            quote:
                "Wel Fragrance Collection has completely transformed how I approach my daily ritual. The Midnight Orchid is now my signature scent — people always ask what I'm wearing.",
            author: 'Isabella Reyes',
            location: 'Manila, Philippines',
            rating: 5,
        },
        {
            quote:
                "I discovered Wel in Toronto and was immediately captivated. The craftsmanship is extraordinary — each fragrance tells a story that feels deeply personal.",
            author: 'Marcus Chen',
            location: 'Vancouver, Canada',
            rating: 5,
        },
        {
            quote:
                "Gifting a Wel fragrance has become my go-to for every special occasion. The packaging alone is a work of art, but the scent... unforgettable.",
            author: 'Sofia Alonzo',
            location: 'Cebu, Philippines',
            rating: 5,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent"
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    {/* Eyebrow with camera‑cursor corners - centered */}
                    <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                        <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                            <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                Testimonials
                            </span>
                        </div>
                    </div>

                    <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-dark-teal dark:text-warm-white">
                        Voices of <span className="italic text-old-gold">Elegance</span>
                    </h2>
                </div>

                <div className="testimonial-content relative bg-warm-white/70 dark:bg-charcoal/70 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-lg border border-old-gold/10">
                    <div className="relative min-h-[260px] sm:min-h-[280px] flex items-center justify-center">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-out ${index === activeIndex
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8 pointer-events-none'
                                    }`}
                            >
                                <div className="flex gap-1 mb-6 sm:mb-8">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-old-gold"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <blockquote className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl text-dark-teal dark:text-warm-white leading-relaxed max-w-3xl italic px-4">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="mt-6 sm:mt-10">
                                    <p className="font-jost text-xs sm:text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase">
                                        {testimonial.author}
                                    </p>
                                    <p className="font-inter text-warm-gray dark:text-warm-white/70 text-xs mt-1">
                                        {testimonial.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8 sm:mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-500 ${index === activeIndex
                                        ? 'bg-old-gold w-8'
                                        : 'bg-warm-gray/40 dark:bg-warm-white/20 hover:bg-warm-gray/60 dark:hover:bg-warm-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}