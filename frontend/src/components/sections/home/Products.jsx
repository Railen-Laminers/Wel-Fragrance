import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Local product images
import Paradoxie2 from '@/assets/products/Paradoxie2.webp';
import Litz3 from '@/assets/products/Litz3.webp';
import Nicol2 from '@/assets/products/Nicol2.webp';
import Greedy_choco from '@/assets/products/Greedy_choco.webp';

export default function Products() {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const animated = useRef(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animated.current) {
                        animated.current = true;

                        const cards = section.querySelectorAll('.product-card');
                        const staggerDelay = 150;

                        cards.forEach((card, index) => {
                            card.animate(
                                [
                                    { opacity: 0, transform: 'translateY(80px)' },
                                    { opacity: 1, transform: 'translateY(0)' },
                                ],
                                {
                                    duration: 1000,
                                    delay: index * staggerDelay,
                                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    fill: 'forwards',
                                }
                            );
                        });

                        observer.unobserve(section);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const products = [
        {
            name: 'Paradoxie',
            notes: 'Floral fruity • 100% pure oil fragrance',
            price: '₱500',
            image: Paradoxie2,
            tag: 'New',
        },
        {
            name: 'Litz',
            notes: 'Oriental floral • For women',
            price: '₱500',
            image: Litz3,
            tag: 'Featured',
        },
        {
            name: 'Nicol',
            notes: 'Woody citrus • For men',
            price: '₱500',
            image: Nicol2,
            tag: null,
        },
        {
            name: 'Greedy Choco',
            notes: 'Sweet fruity floral • For women',
            price: '₱500',
            image: Greedy_choco,
            tag: null,
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                                <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                                <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                    The Collection
                                </span>
                            </div>
                        </div>

                        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white">
                            Signature <span className="italic text-old-gold">Fragrances</span>
                        </h2>
                    </div>

                    <Link
                        to="/products"
                        className="mt-6 md:mt-0 group flex items-center gap-3 font-jost text-xs sm:text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                    >
                        <span>View All</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.name}
                            className="product-card group relative opacity-0 translate-y-20"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden mb-4 sm:mb-6 bg-warm-white/50 dark:bg-charcoal/50 backdrop-blur-sm">
                                <div className="absolute inset-4 border border-old-gold/10 z-10 pointer-events-none group-hover:border-old-gold/30 transition-colors duration-500" />
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-warm-white/60 dark:from-dark-teal/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {product.tag && (
                                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                                        <span className="font-jost text-[10px] tracking-[0.2em] uppercase bg-old-gold text-warm-white dark:text-dark-teal px-3 py-1">
                                            {product.tag}
                                        </span>
                                    </div>
                                )}

                                {/* Discover button now a Link */}
                                <div
                                    className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 transition-all duration-500 ${hoveredIndex === index
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-4'
                                        }`}
                                >
                                    <Link
                                        to="/products"
                                        className="group/btn relative w-full py-3 overflow-hidden bg-warm-white/20 dark:bg-dark-teal/20 backdrop-blur-md border border-warm-white/30 dark:border-dark-teal/30 font-jost text-xs tracking-[0.2em] uppercase text-dark-teal dark:text-warm-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,159,72,0.3)] flex items-center justify-center"
                                    >
                                        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-warm-white dark:group-hover/btn:text-dark-teal">
                                            Discover
                                        </span>
                                        <div className="absolute inset-0 bg-old-gold transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-1 sm:space-y-2">
                                <h3 className="font-cormorant text-lg sm:text-xl lg:text-2xl text-dark-teal dark:text-warm-white group-hover:text-old-gold transition-colors duration-300">
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