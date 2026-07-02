import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.product-card', {
                y: 80,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const products = [
        {
            name: 'Midnight Orchid',
            notes: 'Black Orchid, Vanilla, Sandalwood',
            price: '₱4,500',
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop',
            tag: 'Bestseller',
        },
        {
            name: 'Golden Dawn',
            notes: 'Bergamot, Jasmine, Amber',
            price: '₱3,800',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop',
            tag: 'New',
        },
        {
            name: 'Velvet Rose',
            notes: 'Damask Rose, Oud, Musk',
            price: '₱5,200',
            image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=800&fit=crop',
            tag: null,
        },
        {
            name: 'Ocean Whisper',
            notes: 'Sea Salt, Citrus, Driftwood',
            price: '₱3,500',
            image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=800&fit=crop',
            tag: null,
        },
    ];

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 z-10 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-old-gold/40" />
                            <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                                The Collection
                            </span>
                        </div>
                        <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white">
                            Signature <span className="italic text-old-gold">Fragrances</span>
                        </h2>
                    </div>
                    <a
                        href="#all-products"
                        className="mt-6 md:mt-0 group flex items-center gap-3 font-jost text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                    >
                        <span>View All</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.name}
                            className="product-card group relative"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-warm-white/50 dark:bg-charcoal/50 backdrop-blur-sm">
                                <div className="absolute inset-4 border border-old-gold/10 z-10 pointer-events-none group-hover:border-old-gold/30 transition-colors duration-500" />
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-warm-white/60 dark:from-dark-teal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {product.tag && (
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="font-jost text-[10px] tracking-[0.2em] uppercase bg-old-gold text-warm-white dark:text-dark-teal px-3 py-1">
                                            {product.tag}
                                        </span>
                                    </div>
                                )}

                                <div className={`absolute bottom-6 left-6 right-6 z-20 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}>
                                    <button className="group/btn relative w-full py-3 overflow-hidden bg-warm-white/20 dark:bg-dark-teal/20 backdrop-blur-md border border-warm-white/30 dark:border-dark-teal/30 font-jost text-xs tracking-[0.2em] uppercase text-dark-teal dark:text-warm-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,159,72,0.3)]">
                                        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-warm-white dark:group-hover/btn:text-dark-teal">
                                            Discover
                                        </span>
                                        <div className="absolute inset-0 bg-old-gold transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-cormorant text-xl lg:text-2xl text-dark-teal dark:text-warm-white group-hover:text-old-gold transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="font-inter text-warm-gray dark:text-warm-white/70 text-xs tracking-wide">
                                    {product.notes}
                                </p>
                                <p className="font-jost text-old-gold text-sm tracking-wider">
                                    {product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}