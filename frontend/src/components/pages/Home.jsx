import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    FaChevronLeft,
    FaChevronRight,
    FaFlask,
    FaLeaf,
    FaHands,
    FaTag,
    FaEnvelope,
    FaPhoneAlt,
    FaInstagram,
    FaMapMarkerAlt,
} from 'react-icons/fa';

import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import Reveal from '../common/Reveal';
import Nav from '../sections/Nav';
import Footer from '../sections/Footer';

import {
    bgImages,
    dsc09312,
    dsc09348,
    dsc09388,
    dsc09413,
    dsc09468,
    dsc09498,
    dsc09541,
    dsc09587,
    dsc09632,
    dsc09681,
    dsc09687,
    dsc09749,
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

import welFragrance from '../../assets/videos/welFragrance.mp4';

// ------------------------------------------------------------
// Hero Section
// ------------------------------------------------------------
const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} className="sticky top-0 z-1">
            <Container className="h-screen max-h-[1000px] min-h-[600px] relative overflow-hidden bg-white dark:bg-dark-teal">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                    animate={{ x: [0, 6, -6, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <LazyImage
                        src={bgImages.wel}
                        alt="Wel Fragrance"
                        className="w-full h-full object-cover object-[center_20%]"
                    />
                </motion.div>

                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-0 left-0 right-0 z-2 flex justify-center px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16"
                >
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full sm:w-auto">
                        <motion.a
                            href="#products"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.9 }}
                            className="font-jost px-6 py-3 md:px-8 md:py-4 text-[11px] uppercase no-underline inline-block bg-old-gold text-white border border-old-gold transition-all duration-300 hover:bg-transparent hover:text-old-gold hover:border-old-gold text-center"
                        >
                            Explore Collection
                        </motion.a>
                        <motion.a
                            href="#about"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.9 }}
                            className="font-jost px-6 py-3 md:px-8 md:py-4 text-[11px] uppercase no-underline inline-block bg-dark-teal text-white border border-dark-teal transition-all duration-300 hover:bg-transparent hover:text-dark-teal hover:border-dark-teal text-center"
                        >
                            Our Story
                        </motion.a>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

// ------------------------------------------------------------
// About Section
// ------------------------------------------------------------
const About = () => {
    return (
        <section className="relative z-10">
            <Container
                className={`
          flex items-center py-16 md:py-28
          lg:h-screen lg:max-h-[1000px] lg:min-h-[600px]
          bg-white dark:bg-dark-teal
          overflow-hidden
        `}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center w-full">
                    <Reveal y={0}>
                        <div className="relative overflow-hidden aspect-[4/5]">
                            <video
                                src={welFragrance}
                                autoPlay
                                muted
                                playsInline
                                controls
                                loop
                                className="w-full h-full object-cover block"
                            />
                            <div className="absolute bottom-0 left-0 w-2/5 h-px bg-old-gold" />
                        </div>
                    </Reveal>

                    <Reveal stagger={0.15} className="space-y-6">
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light text-dark-teal dark:text-white leading-[1.15]">
                            The Essence of <br className="hidden sm:block" />
                            <span className="italic">Swiss Craftsmanship</span>
                        </h2>
                        <p className="font-jost text-sm sm:text-base font-light leading-relaxed text-black/80 dark:text-white/80">
                            Wel Fragrance Collection is more than perfume—it’s an expression of
                            passion, artistry, and the quiet beauty found in nature. Each scent
                            is composed to evoke a memory, a place, or a fleeting emotion,
                            turning the everyday into the unforgettable.
                        </p>
                        <p className="font-jost text-sm sm:text-base font-light leading-relaxed text-black/80 dark:text-white/80">
                            Founded by Joel Malabo, the brand carries a deeply personal vision:
                            to create a signature fragrance that resonates from the Philippines
                            to Canada. Every bottle is a tribute to dedication, family, and the
                            belief that scent has the power to connect us across borders.
                        </p>
                        <a
                            href="#about"
                            className="font-jost inline-block px-8 py-3.5 text-[11px] uppercase no-underline border border-old-gold text-old-gold transition-colors duration-300 hover:bg-old-gold hover:text-white"
                        >
                            Our Story <span className="ml-2 opacity-60">→</span>
                        </a>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
};

// ------------------------------------------------------------
// Products Section
// ------------------------------------------------------------
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
        enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
    };

    return (
        <Container
            className={`
        py-16 md:py-24 lg:py-0
        lg:mt-16
        lg:h-screen lg:max-h-[1000px] lg:min-h-[600px]
        flex flex-col justify-center
        overflow-hidden bg-white dark:bg-dark-teal
      `}
        >
            <div className="text-center mb-12 md:mb-16 lg:mb-8 flex-shrink-0">
                <Reveal>
                    <span className="font-playfair text-[11px] tracking-[0.3em] text-old-gold uppercase">
                        Wel Fragrance Collection
                    </span>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white mt-2">
                        Our Signature Scents
                    </h2>
                    <p className="font-jost text-sm md:text-base font-light text-black/70 dark:text-white/70 max-w-2xl mx-auto mt-4 leading-relaxed">
                        Each fragrance is a story waiting to be discovered. Let our collection
                        guide you through a world of emotion, memory, and artistry.
                    </p>
                </Reveal>
            </div>

            <Reveal
                y={20}
                delay={0.2}
                className="relative flex-1 flex items-center overflow-hidden"
            >
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
                            <div className="flex justify-center lg:justify-start">
                                <div className="w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-[3/4] overflow-hidden shadow-2xl">
                                    <LazyImage
                                        src={product.modelImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            <div className="text-center lg:text-left">
                                <span className="font-playfair text-[11px] tracking-[0.3em] text-old-gold uppercase">
                                    {product.type}
                                </span>
                                <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-dark-teal dark:text-white mt-2 leading-[1.05]">
                                    {product.name}
                                </h2>
                                <p className="font-jost text-sm font-light text-black/70 dark:text-white/70 mt-4 max-w-md mx-auto lg:mx-0">
                                    {product.notes}
                                </p>
                                <p className="font-jost text-xs text-black/60 dark:text-white/60 mt-2 max-w-md mx-auto lg:mx-0 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                                    <a
                                        href="#"
                                        className="font-jost px-8 py-3.5 text-[11px] uppercase no-underline border border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors"
                                    >
                                        Discover
                                    </a>
                                    <a
                                        href="#"
                                        className="font-jost px-8 py-3.5 text-[11px] uppercase no-underline text-black/60 dark:text-white/60 hover:text-old-gold transition-colors"
                                    >
                                        Learn More →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <button
                    onClick={prev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-old-gold/40 hover:text-old-gold transition-colors p-4"
                    aria-label="Previous"
                >
                    <FaChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-old-gold/40 hover:text-old-gold transition-colors p-4"
                    aria-label="Next"
                >
                    <FaChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </Reveal>
        </Container>
    );
};

// ------------------------------------------------------------
// Why Choose Us Section
// ------------------------------------------------------------
const values = [
    {
        icon: FaFlask,
        title: '100% Pure Oil',
        description:
            'Our fragrances are crafted with premium pure oils, ensuring lasting intensity and skin‑friendly wear.',
    },
    {
        icon: FaLeaf,
        title: 'Ethically Sourced',
        description:
            'We partner with sustainable suppliers who respect nature and local communities.',
    },
    {
        icon: FaHands,
        title: 'Artisan Craftsmanship',
        description:
            'Every blend is hand‑composed by experienced perfumers with a passion for storytelling.',
    },
    {
        icon: FaTag,
        title: 'Affordable Luxury',
        description:
            'Experience world‑class scents at a fraction of the price, without compromising quality.',
    },
];

const WhyChooseUs = () => {
    return (
        <Container className="py-16 md:py-24 lg:py-32 border-t border-old-gold/10 bg-white dark:bg-dark-teal">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="text-center mb-12 md:mb-16">
                        <span className="font-playfair text-[11px] tracking-[0.3em] text-old-gold uppercase">
                            Why Wel Fragrance
                        </span>
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white mt-2">
                            Crafted with Purpose
                        </h2>
                        <p className="font-jost text-sm md:text-base font-light text-black/70 dark:text-white/70 max-w-2xl mx-auto mt-4 leading-relaxed">
                            Every bottle carries the vision of our founder and the commitment to
                            quality that defines our brand.
                        </p>
                    </div>
                </Reveal>

                <Reveal
                    stagger={0.12}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
                >
                    {values.map((item, index) => (
                        <div key={index} className="text-center group">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-old-gold/10 text-old-gold text-2xl mb-4 group-hover:bg-old-gold group-hover:text-white transition-colors duration-300">
                                <item.icon />
                            </div>
                            <h3 className="font-playfair text-xl text-dark-teal dark:text-white font-light mb-2">
                                {item.title}
                            </h3>
                            <p className="font-jost text-sm font-light text-black/70 dark:text-white/70 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </Container>
    );
};

// ------------------------------------------------------------
// Contact Section
// ------------------------------------------------------------
const Contact = () => {
    return (
        <Container className="py-16 md:py-24 lg:py-32 border-t border-old-gold/10 bg-white dark:bg-dark-teal">
            <Reveal stagger={0.1} className="max-w-[640px] mx-auto text-center">
                <div className="font-playfair text-[11px] tracking-[0.3em] text-old-gold uppercase mb-5">
                    Wel Fragrance Collection
                </div>
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white mb-4 leading-[1.2]">
                    Let’s create something
                    <br />
                    extraordinary together
                </h2>
                <p className="font-jost text-sm md:text-base font-light text-black/70 dark:text-white/70 mb-8 md:mb-10 leading-relaxed">
                    For inquiries, collaborations, or simply to share your fragrance story —
                    we’d love to hear from you.
                </p>

                <div className="flex flex-col items-center gap-4 text-black dark:text-white">
                    <a
                        href="mailto:wel.fragrancecollection@gmail.com"
                        className="flex items-center gap-3 text-sm md:text-base no-underline border-b border-black/20 dark:border-white/20 pb-1 hover:border-old-gold transition-colors"
                    >
                        <FaEnvelope className="text-old-gold text-base" />
                        <span className="font-playfair">wel.fragrancecollection@gmail.com</span>
                    </a>

                    <div className="flex items-center gap-3 text-sm md:text-base">
                        <FaPhoneAlt className="text-old-gold text-base" />
                        <span className="font-jost">
                            +63 945 705 2630, +63 919 922 5430, +63 955 533 7500
                        </span>
                    </div>

                    <a
                        href="https://instagram.com/Wel_FragranceCollection"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm md:text-base no-underline border-b border-black/20 dark:border-white/20 pb-1 hover:border-old-gold transition-colors"
                    >
                        <FaInstagram className="text-old-gold text-base" />
                        <span className="font-jost">@Wel_FragranceCollection</span>
                    </a>

                    <div className="flex items-center gap-3 text-sm md:text-base">
                        <FaMapMarkerAlt className="text-old-gold text-base" />
                        <span className="font-jost">Philippines</span>
                    </div>
                </div>

                <a
                    href="mailto:wel.fragrancecollection@gmail.com"
                    className="font-jost inline-block px-8 py-4 md:px-12 md:py-4 text-[11px] uppercase no-underline border border-old-gold text-old-gold mt-10 md:mt-12 hover:bg-old-gold hover:text-white transition-colors"
                >
                    Get in Touch
                </a>
            </Reveal>
        </Container>
    );
};

// ------------------------------------------------------------
// Home – Main Page Component
// ------------------------------------------------------------
const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-teal">
            <Nav />
            <div className="relative">
                <Hero />
                <About />
            </div>
            <Products />
            <WhyChooseUs />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;