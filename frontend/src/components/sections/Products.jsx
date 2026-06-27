// src/components/sections/Products.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import LazyImage from '../common/LazyImage';

// Import model images (main visuals)
import {
    dsc09312, // Jaime
    dsc09348, // Dorz
    dsc09388, // Rupert
    dsc09413, // Vian
    dsc09468, // Litz
    dsc09498, // Iluminare
    dsc09541, // Fely
    dsc09587, // Lenzki
    dsc09632, // Rei
    dsc09681, // Joe
    dsc09687, // Mar
    dsc09749, // Greg
} from '../../assets/images';

// Import product bottle images (background blur)
import {
    jaime,
    dorz,
    rupert,
    vian,
    litz,
    iluminare,
    fely,
    lenski,
    rei,
    joe,
    mar,
    greg,
} from '../../assets/images';

const products = [
    {
        id: 'jaime',
        name: 'Jaime',
        type: 'For Women',
        modelImage: dsc09312,
        productImage: jaime,
        notes: 'Passionfruit · Bitter Orange · Gardenia · Woody',
        description:
            'An exotic floral‑fruity fragrance inspired by the brilliant blue‑green of the Brazilian Paraiba Tourmaline.',
    },
    {
        id: 'dorz',
        name: 'Dorz',
        type: 'For Women',
        modelImage: dsc09348,
        productImage: dorz,
        notes: 'Coconut · Tuberose · Vanilla · Sandalwood',
        description:
            'An oriental floral that captures the romantic intensity of the city of love – intoxicating and unforgettable.',
    },
    {
        id: 'rupert',
        name: 'Rupert',
        type: 'For Men',
        modelImage: dsc09388,
        productImage: rupert,
        notes: 'Calabrian Bergamot · Amber Wood · Desert Landscape',
        description:
            'Inspired by wide‑open spaces under a blazing sky, this woody fragrance evokes the spirit of adventure.',
    },
    {
        id: 'vian',
        name: 'Vian',
        type: 'For Women',
        modelImage: dsc09413,
        productImage: vian,
        notes: 'Red Berries · Datura Flower · White Musk · Patchouli',
        description:
            'A sensuous, romantic perfume that embodies the whirlwind journey to Paris – desire for the senses.',
    },
    {
        id: 'litz',
        name: 'Litz',
        type: 'For Women',
        modelImage: dsc09468,
        productImage: litz,
        notes: 'Orange · Peach · Jasmine · Vanilla · Sandalwood',
        description:
            'A floral fruity blend with warm, comforting base notes – perfect for everyday elegance.',
    },
    {
        id: 'iluminare',
        name: 'Iluminare',
        type: 'For Women',
        modelImage: dsc09498,
        productImage: iluminare,
        notes: 'Jasmine · Tuberose · Rangoon Creeper',
        description:
            'A luminous floral composition that blooms with radiant, feminine energy.',
    },
    {
        id: 'fely',
        name: 'Fely',
        type: 'For Women',
        modelImage: dsc09541,
        productImage: fely,
        notes: 'Quince · Grapefruit · Rose · Jasmine · White Musk',
        description:
            'A fresh, fruity floral with a delicate musky finish – gentle yet captivating.',
    },
    {
        id: 'lenzki',
        name: 'Lenzki',
        type: 'For Women',
        modelImage: dsc09587,
        productImage: lenski,
        notes: 'Jasmine · Ambergris · Bitter Almond',
        description:
            'An intense, gourmand extract that plays with light and shadow, echoing mythical crystal houses.',
    },
    {
        id: 'rei',
        name: 'Rei',
        type: 'For Men',
        modelImage: dsc09632,
        productImage: rei,
        notes: 'Sea Water · Citrus · Rosemary · Spices · Woody',
        description:
            'A harmonious blend of salty sea notes and warm, sun‑kissed spices – the Mediterranean in a bottle.',
    },
    {
        id: 'joe',
        name: 'Joe',
        type: 'For Men',
        modelImage: dsc09681,
        productImage: joe,
        notes: 'Lime · Green Notes · Freesia · Jasmine · Cypress · Musk',
        description:
            'A citrus aromatic fragrance with a fresh, aquatic heart and a woody, musky base.',
    },
    {
        id: 'mar',
        name: 'Mar',
        type: 'For Men',
        modelImage: dsc09687,
        productImage: mar,
        notes: 'Bergamot · Pineapple · Jasmine · Patchouli · Amber · Vanilla',
        description:
            'A tantalising citrus splurge with a leathery, chypre musky effect – virile and enticing.',
    },
    {
        id: 'greg',
        name: 'Greg',
        type: 'For Men',
        modelImage: dsc09749,
        productImage: greg,
        notes: 'Aldehydes · Lavender · Ginger · Seagrass · Sandalwood · Amber',
        description:
            'An aromatic green fragrance that captures the freshness of the ocean and the warmth of wood.',
    },
];

const Products = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % products.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + products.length) % products.length);
    };

    const product = products[current];

    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 60 : -60,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            x: dir < 0 ? 60 : -60,
            opacity: 0,
        }),
    };

    return (
        <Container background="#0E0D0B" className="py-16 md:py-24 overflow-hidden">
            {/* Intro section */}
            <div className="text-center mb-12 md:mb-16">
                <Reveal>
                    <span className="serif text-[11px] tracking-[0.3em] text-stone uppercase">
                        Wel Fragrance Collection
                    </span>
                    <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory mt-2">
                        Our Signature Scents
                    </h2>
                    <p className="sans text-sm md:text-base font-light text-stone max-w-2xl mx-auto mt-4 leading-relaxed">
                        Each fragrance is a story waiting to be discovered. Let our collection guide you
                        through a world of emotion, memory, and artistry.
                    </p>
                </Reveal>
            </div>

            {/* Carousel wrapper – overflow hidden to prevent scrollbars */}
            <div className="relative min-h-[70vh] flex items-center overflow-hidden">
                {/* Background blur – product bottle image */}
                <motion.div
                    key={product.id + '-bg'}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.12 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 z-0"
                >
                    <LazyImage
                        src={product.productImage}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Main content */}
                <div className="relative z-10 w-full">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={product.id}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-8"
                        >
                            {/* Model image – main visual */}
                            <div className="flex justify-center lg:justify-start">
                                <div className="w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-[3/4] overflow-hidden shadow-2xl">
                                    <LazyImage
                                        src={product.modelImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Text */}
                            <div className="text-center lg:text-left">
                                <span className="serif text-[11px] tracking-[0.3em] text-stone uppercase">
                                    {product.type}
                                </span>
                                <h2 className="serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-ivory mt-2 leading-[1.05]">
                                    {product.name}
                                </h2>
                                <p className="sans text-sm font-light text-stone/70 mt-4 max-w-md mx-auto lg:mx-0">
                                    {product.notes}
                                </p>
                                <p className="sans text-xs text-stone/50 mt-2 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                                    <a
                                        href="#"
                                        className="sans px-8 py-3.5 text-[11px] uppercase no-underline border border-ivory text-ivory hover:bg-ivory hover:text-black transition-colors"
                                    >
                                        Discover
                                    </a>
                                    <a
                                        href="#"
                                        className="sans px-8 py-3.5 text-[11px] uppercase no-underline text-stone/60 hover:text-ivory transition-colors"
                                    >
                                        Learn More →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows – positioned at edges, vertically centered */}
                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-ivory/40 hover:text-ivory transition-colors p-4 bg-black/20 backdrop-blur-sm rounded-r-full hover:bg-black/40"
                    aria-label="Previous"
                >
                    <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-ivory/40 hover:text-ivory transition-colors p-4 bg-black/20 backdrop-blur-sm rounded-l-full hover:bg-black/40"
                    aria-label="Next"
                >
                    <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Dots navigation – centered at bottom */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setDirection(i > current ? 1 : -1);
                                setCurrent(i);
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-ivory w-6' : 'bg-ivory/30'
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default Products;