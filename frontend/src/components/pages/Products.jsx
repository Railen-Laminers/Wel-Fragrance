import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

// Import your product images
import img5237 from '@/assets/products/IMG_5237.webp';
import img5238 from '@/assets/products/IMG_5238.webp';
import img5240 from '@/assets/products/IMG_5240.webp';
import img5241 from '@/assets/products/IMG_5241.webp';
import img5242 from '@/assets/products/IMG_5242.webp';
import img5243 from '@/assets/products/IMG_5243.webp';
import img5246 from '@/assets/products/IMG_5246.webp';
import img5247 from '@/assets/products/IMG_5247.webp';
import img5250 from '@/assets/products/IMG_5250.webp';
import img5251 from '@/assets/products/IMG_5251.webp';
import img5257 from '@/assets/products/IMG_5257.webp';
import img5258 from '@/assets/products/IMG_5258.webp';
import img5259 from '@/assets/products/IMG_5259.webp';
import img5260 from '@/assets/products/IMG_5260.webp';
import img5262 from '@/assets/products/IMG_5262.webp';

gsap.registerPlugin(ScrollTrigger);

const allProducts = [
    { id: 1, name: 'Midnight Orchid', notes: 'Black Orchid, Vanilla, Sandalwood', price: '₱4,500', image: img5237, tag: 'Bestseller', story: 'A mysterious blend of dark florals and warm vanilla, inspired by the allure of a moonlit garden. Perfect for evening elegance.' },
    { id: 2, name: 'Golden Dawn', notes: 'Bergamot, Jasmine, Amber', price: '₱3,800', image: img5238, tag: 'New', story: 'Bright citrus and luminous florals capture the first light of morning, awakening the senses with optimism and grace.' },
    { id: 3, name: 'Velvet Rose', notes: 'Damask Rose, Oud, Musk', price: '₱5,200', image: img5240, tag: null, story: 'Luxurious rose layered with smoky oud and soft musk – a timeless scent that embodies refined sensuality.' },
    { id: 4, name: 'Ocean Whisper', notes: 'Sea Salt, Citrus, Driftwood', price: '₱3,500', image: img5241, tag: null, story: 'A breath of fresh sea air, with zesty citrus and sun‑bleached driftwood. Evokes the freedom of endless shores.' },
    { id: 5, name: 'Santal Noir', notes: 'Sandalwood, Cedar, Cardamom', price: '₱4,900', image: img5242, tag: 'Limited', story: 'Creamy sandalwood and warm cedar, spiced with cardamom. A woody, sophisticated scent for the discerning connoisseur.' },
    { id: 6, name: 'Jardin de Minuit', notes: 'Lavender, Iris, Musk', price: '₱4,200', image: img5243, tag: null, story: 'A midnight garden in full bloom – powdery iris and calming lavender softened by velvety musk.' },
    { id: 7, name: 'Café Noir', notes: 'Coffee, Tonka, Vetiver', price: '₱4,700', image: img5246, tag: null, story: 'Rich, roasted coffee beans meet sweet tonka and earthy vetiver. A bold, addictive fragrance for the urban explorer.' },
    { id: 8, name: 'L’Eau d’Été', notes: 'Neroli, Bergamot, Basil', price: '₱3,600', image: img5247, tag: null, story: 'A fresh, aromatic blend of sunny neroli, zesty bergamot, and aromatic basil – the essence of a Mediterranean summer.' },
    { id: 9, name: 'Ambre Suprême', notes: 'Amber, Vanilla, Benzoin', price: '₱5,500', image: img5250, tag: 'Exclusive', story: 'A warm, resinous amber with creamy vanilla and benzoin. Deeply comforting and radiant, like a golden sunset.' },
    { id: 10, name: 'Fleur de Peau', notes: 'Rose, Violet, Aldehydes', price: '₱4,800', image: img5251, tag: null, story: 'A powdery, floral bouquet of rose and violet, lifted by sparkling aldehydes. It whispers of vintage glamour.' },
    { id: 11, name: 'Bois Mystérieux', notes: 'Oud, Incense, Leather', price: '₱6,100', image: img5257, tag: 'Bestseller', story: 'An enigmatic blend of smoky oud, sacred incense, and supple leather. A scent that commands attention and intrigue.' },
    { id: 12, name: 'Eau de Rêve', notes: 'Lily, Jasmine, White Musk', price: '₱3,900', image: img5258, tag: null, story: 'A dreamy, ethereal composition of white florals and clean musk. Soft, luminous, and effortlessly romantic.' },
    { id: 13, name: 'Spice Route', notes: 'Cinnamon, Clove, Pepper', price: '₱4,400', image: img5259, tag: null, story: 'A warm, spicy journey through exotic bazaars – cinnamon, clove, and black pepper mingle with a touch of sweetness.' },
    { id: 14, name: 'Vétiver Intense', notes: 'Vetiver, Grapefruit, Cedar', price: '₱4,600', image: img5260, tag: null, story: 'Intensely earthy vetiver brightened by juicy grapefruit and grounded by cedar. A modern classic for the bold.' },
    { id: 15, name: 'Myrrh & Encens', notes: 'Myrrh, Frankincense, Labdanum', price: '₱5,800', image: img5262, tag: 'New', story: 'Ancient resins of myrrh and frankincense, deepened with labdanum. A sacred, meditative fragrance of timeless spirituality.' },
];

export default function Products() {
    const sectionRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalMounted, setIsModalMounted] = useState(false); // controls presence in DOM
    const modalRef = useRef(null);
    const modalContentRef = useRef(null);
    const closingRef = useRef(false); // guards against double-close firing two tweens

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.products-header', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.2 });
            gsap.from('.products-subtitle', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.4 });
            gsap.from('.product-card', {
                y: 80, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Open: mount modal, then animate in
    useEffect(() => {
        if (selectedProduct) {
            closingRef.current = false;
            setIsModalMounted(true);
        }
    }, [selectedProduct]);

    // Play the open animation once the modal is actually in the DOM
    useEffect(() => {
        if (isModalMounted && selectedProduct && !closingRef.current) {
            document.body.style.overflow = 'hidden';
            gsap.set(modalRef.current, { pointerEvents: 'auto' });
            gsap.to(modalRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
            gsap.fromTo(modalContentRef.current,
                { scale: 0.9, y: 30, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
            );
        }
    }, [isModalMounted, selectedProduct]);

    const openModal = (product) => setSelectedProduct(product);

    const closeModal = () => {
        if (closingRef.current || !isModalMounted) return;
        closingRef.current = true;

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                setIsModalMounted(false);
                setSelectedProduct(null);
            },
        });

        tl.to(modalContentRef.current, {
            scale: 0.9,
            y: 30,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
        }, 0);
        tl.to(modalRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.35,
            ease: 'power2.in',
        }, 0.05); // backdrop lingers a touch behind the card for a nicer feel
    };

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) closeModal();
    };

    return (
        <>
            <div ref={sectionRef} className="min-h-screen bg-transparent pt-24 md:pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="products-header text-center mb-16">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-old-gold/40" />
                            <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                                The Complete Collection
                            </span>
                            <div className="h-px w-16 bg-old-gold/40" />
                        </div>
                        <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white">
                            Our <span className="italic text-old-gold">Fragrances</span>
                        </h1>
                        <p className="products-subtitle font-inter text-warm-gray dark:text-warm-white/70 max-w-2xl mx-auto mt-4 text-sm md:text-base">
                            Explore our full range of handcrafted scents, each inspired by the beauty of contrast and the art of storytelling.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        {allProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className="product-card group relative cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => openModal(product)}
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

                                    <div className={`absolute bottom-6 left-6 right-6 z-20 transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <button
                                            className="group/btn relative w-full py-3 overflow-hidden bg-warm-white/20 dark:bg-dark-teal/20 backdrop-blur-md border border-warm-white/30 dark:border-dark-teal/30 font-jost text-xs tracking-[0.2em] uppercase text-dark-teal dark:text-warm-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,159,72,0.3)]"
                                            onClick={(e) => { e.stopPropagation(); openModal(product); }}
                                        >
                                            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-warm-white dark:group-hover/btn:text-dark-teal">
                                                Discover
                                            </span>
                                            <div className="absolute inset-0 bg-old-gold transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-center sm:text-left">
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

                    <div className="text-center mt-16">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 font-jost text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors"
                        >
                            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* MODAL — portaled to document.body; stays mounted through the exit tween */}
            {isModalMounted && selectedProduct && createPortal(
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md opacity-0"
                    style={{ pointerEvents: 'none' }}
                    onClick={handleBackdropClick}
                >
                    <div
                        ref={modalContentRef}
                        className="relative max-w-4xl w-full max-h-[90vh] bg-warm-white dark:bg-dark-teal border border-old-gold/20 shadow-2xl overflow-y-auto"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-warm-white/80 dark:bg-dark-teal/80 backdrop-blur-sm border border-old-gold/20 text-dark-teal dark:text-warm-white hover:bg-old-gold hover:text-warm-white dark:hover:text-dark-teal transition-colors duration-300"
                            aria-label="Close preview"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden bg-warm-white/30 dark:bg-charcoal/30">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-warm-white/30 dark:from-dark-teal/30 via-transparent to-transparent opacity-60" />
                                {selectedProduct.tag && (
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="font-jost text-[10px] tracking-[0.2em] uppercase bg-old-gold text-warm-white dark:text-dark-teal px-4 py-1.5">
                                            {selectedProduct.tag}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-px w-12 bg-old-gold/40" />
                                        <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                                            Signature Scent
                                        </span>
                                    </div>
                                    <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-dark-teal dark:text-warm-white leading-tight">
                                        {selectedProduct.name}
                                    </h2>
                                </div>

                                <p className="font-inter text-warm-gray dark:text-warm-white/70 text-sm leading-relaxed mb-4">
                                    {selectedProduct.notes}
                                </p>

                                <div className="border-t border-old-gold/10 pt-4 mb-6">
                                    <p className="font-inter text-warm-gray dark:text-warm-white/70 text-base leading-relaxed italic">
                                        "{selectedProduct.story}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="font-jost text-old-gold text-2xl tracking-wider">
                                        {selectedProduct.price}
                                    </span>
                                    <button className="group relative px-8 py-3 overflow-hidden bg-old-gold text-warm-white dark:text-dark-teal font-jost text-sm tracking-[0.15em] uppercase font-medium transition-all hover:shadow-[0_0_30px_rgba(199,159,72,0.3)]">
                                        <span className="relative z-10">Add to Cart</span>
                                        <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}