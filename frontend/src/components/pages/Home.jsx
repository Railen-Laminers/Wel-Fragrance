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

// ✅ Correct relative paths (up one level to components/)
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import Reveal from '../common/Reveal';

// ✅ Assets (two levels up from pages/ to assets/)
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
                    className="absolute bottom-0 left-0 right-0 z-2 flex justify-center px-4 sm:px-6 pb-10 sm:pb-14 md:pb-18"
                >
                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full sm:w-auto">
                        <motion.a
                            href="#products"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.9 }}
                            className="font-jost text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 no-underline inline-block bg-old-gold text-white border border-old-gold transition-all duration-300 hover:bg-transparent hover:text-old-gold hover:border-old-gold text-center"
                        >
                            Explore Collection
                        </motion.a>
                        <motion.a
                            href="#about"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8, duration: 0.9 }}
                            className="font-jost text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 no-underline inline-block bg-dark-teal text-white border border-dark-teal transition-all duration-300 hover:bg-transparent hover:text-dark-teal hover:border-dark-teal text-center"
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
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white leading-[1.15]">
                            The Essence of <br className="hidden sm:block" />
                            <span className="italic">Swiss Craftsmanship</span>
                        </h2>
                        <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                            Wel Fragrance Collection is more than perfume—it's an expression of
                            passion, artistry, and the quiet beauty found in nature. Each scent
                            is composed to evoke a memory, a place, or a fleeting emotion,
                            turning the everyday into the unforgettable.
                        </p>
                        <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                            Founded by Joel Malabo, the brand carries a deeply personal vision:
                            to create a signature fragrance that resonates from the Philippines
                            to Canada. Every bottle is a tribute to dedication, family, and the
                            belief that scent has the power to connect us across borders.
                        </p>
                        <a
                            href="#about"
                            className="font-jost text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 no-underline border border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors duration-300"
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

// ─── UPDATED Products component with cinematic transition ──────────
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

    // ─── Animation variants (type annotations removed for .jsx) ────

    const bgVariants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 0.12,
            transition: { duration: 1.2, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    const modelVariants = {
        hidden: (dir) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
        }),
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 1.2 },
        },
        exit: (dir) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            transition: { duration: 0.4, ease: 'easeInOut' },
        }),
    };

    const contentContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 1.9,
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3, staggerChildren: 0.05, staggerDirection: -1 },
        },
    };

    const contentItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    // ─── Render ──────────────────────────────────────────────────────

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
            {/* Header – unchanged */}
            <div className="text-center mb-12 md:mb-16 lg:mb-8 flex-shrink-0">
                <Reveal>
                    <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold">
                        Wel Fragrance Collection
                    </span>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white mt-2">
                        Our Signature Scents
                    </h2>
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70 max-w-2xl mx-auto mt-4">
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
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={product.id}
                        custom={direction}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full h-full"
                    >
                        {/* ── Background product image ── */}
                        <motion.div
                            variants={bgVariants}
                            className="absolute inset-0 z-0"
                        >
                            <LazyImage
                                src={product.productImage}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* ── Main content grid ── */}
                        <div className="relative z-10 w-full h-full flex items-center">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4 md:px-8 w-full">
                                {/* Model image */}
                                <motion.div
                                    variants={modelVariants}
                                    custom={direction}
                                    className="flex justify-center lg:justify-start"
                                >
                                    <div className="w-[240px] sm:w-[280px] md:w-[340px] lg:w-[400px] aspect-[3/4] overflow-hidden shadow-2xl">
                                        <LazyImage
                                            src={product.modelImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </motion.div>

                                {/* Content with staggered fade-up */}
                                <motion.div
                                    variants={contentContainerVariants}
                                    className="text-center lg:text-left"
                                >
                                    <motion.span
                                        variants={contentItemVariants}
                                        className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold"
                                    >
                                        {product.type}
                                    </motion.span>

                                    <motion.h2
                                        variants={contentItemVariants}
                                        className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-dark-teal dark:text-white mt-2 leading-[1.05]"
                                    >
                                        {product.name}
                                    </motion.h2>

                                    <motion.p
                                        variants={contentItemVariants}
                                        className="font-jost text-xs md:text-sm font-light leading-relaxed text-black/60 dark:text-white/60 mt-4 max-w-md mx-auto lg:mx-0"
                                    >
                                        {product.notes}
                                    </motion.p>

                                    <motion.p
                                        variants={contentItemVariants}
                                        className="font-jost text-xs md:text-sm font-light leading-relaxed text-black/60 dark:text-white/60 mt-2 max-w-md mx-auto lg:mx-0"
                                    >
                                        {product.description}
                                    </motion.p>

                                    <motion.div
                                        variants={contentItemVariants}
                                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8"
                                    >
                                        <a
                                            href="#"
                                            className="font-jost text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 no-underline border border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors"
                                        >
                                            Discover
                                        </a>
                                        <a
                                            href="#"
                                            className="font-jost text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 no-underline text-black/60 dark:text-white/60 hover:text-old-gold transition-colors"
                                        >
                                            Learn More →
                                        </a>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation buttons – unchanged */}
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
// Why Choose Us Section — Awwwards-inspired luxury narrative
// ------------------------------------------------------------
const values = [
    {
        icon: FaFlask,
        title: '100% Pure Oil',
        description:
            'Our fragrances are crafted with premium pure oils, ensuring lasting intensity and skin‑friendly wear.',
        detail:
            'Each drop is a concentrate of nature\'s finest, free from fillers or synthetic extenders.',
    },
    {
        icon: FaLeaf,
        title: 'Ethically Sourced',
        description:
            'We partner with sustainable suppliers who respect nature and local communities.',
        detail:
            'From harvest to bottle, every ingredient tells a story of responsible stewardship.',
    },
    {
        icon: FaHands,
        title: 'Artisan Craftsmanship',
        description:
            'Every blend is hand‑composed by experienced perfumers with a passion for storytelling.',
        detail:
            'Time‑honored techniques meet contemporary vision in each composition.',
    },
    {
        icon: FaTag,
        title: 'Affordable Luxury',
        description:
            'Experience world‑class scents at a fraction of the price, without compromising quality.',
        detail:
            'Luxury should be felt, not financed. We believe exceptional fragrance is for everyone.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="relative bg-white dark:bg-dark-teal overflow-hidden">
            {/* Decorative background line — subtle brand signature */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-old-gold/20 to-transparent" />

            <Container className="py-20 md:py-28 lg:py-36">
                <div className="max-w-7xl mx-auto">
                    {/* Header — reduced, editorial, with a single strong sentence */}
                    <Reveal>
                        <div className="text-center mb-16 md:mb-20 lg:mb-24">
                            <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold">
                                The Wel Philosophy
                            </span>
                            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-dark-teal dark:text-white mt-3 leading-[1.1] max-w-4xl mx-auto">
                                Crafted with intention,
                                <br className="hidden sm:block" />
                                worn with meaning.
                            </h2>
                            <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/60 dark:text-white/60 max-w-2xl mx-auto mt-5">
                                Four pillars define our approach — each one a promise we make to
                                you, and to ourselves.
                            </p>
                            {/* Decorative divider */}
                            <div className="w-12 h-px bg-old-gold/40 mx-auto mt-6" />
                        </div>
                    </Reveal>

                    {/* Values — presented as a visual essay, not a grid of cards */}
                    <Reveal stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 lg:gap-y-20">
                        {values.map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="group relative border-b border-old-gold/10 pb-8 md:pb-10 last:border-b-0 md:even:border-b-0"
                            >
                                <div className="flex items-start gap-5 md:gap-6">
                                    {/* Icon — refined, with a subtle glow on hover */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-old-gold/20 text-old-gold text-xl md:text-2xl transition-all duration-500 group-hover:border-old-gold/60 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(184,151,94,0.08)]">
                                            <item.icon />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-playfair text-xl md:text-2xl font-light text-dark-teal dark:text-white tracking-wide">
                                            {item.title}
                                        </h3>
                                        <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70 mt-1.5">
                                            {item.description}
                                        </p>
                                        {/* Secondary detail line — adds depth */}
                                        <p className="font-jost text-xs md:text-sm font-light italic text-black/40 dark:text-white/40 mt-2 leading-relaxed border-l-2 border-old-gold/20 pl-3">
                                            {item.detail}
                                        </p>
                                        {/* Decorative line that appears on hover */}
                                        <div className="w-8 h-px bg-old-gold/0 group-hover:bg-old-gold/40 transition-all duration-700 mt-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </Reveal>

                    {/* Closing statement — like a brand manifesto footer */}
                    <Reveal delay={0.3}>
                        <div className="mt-16 md:mt-20 lg:mt-24 text-center">
                            <div className="w-16 h-px bg-old-gold/30 mx-auto mb-6" />
                            <p className="font-playfair text-sm md:text-base font-light italic text-black/50 dark:text-white/50 max-w-lg mx-auto leading-relaxed">
                                "Every bottle carries the vision of our founder and the commitment
                                to quality that defines our brand."
                            </p>
                            <div className="mt-4 flex justify-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                                <span className="w-1.5 h-1.5 rounded-full bg-old-gold/40" />
                                <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
};

// ------------------------------------------------------------
// Contact Section
// ------------------------------------------------------------
const Contact = () => (
    <section id="contact" className="bg-white dark:bg-dark-teal border-t border-old-gold/10">
        <Container className="py-20 md:py-28 lg:py-32">
            <div className="max-w-5xl mx-auto">
                {/* Two-column split */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-12 lg:gap-16 items-start">

                    {/* ── Left: emotional CTA ── */}
                    <Reveal stagger={0.1}>
                        <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold block mb-6">
                            Wel Fragrance Collection
                        </span>
                        <h2
                            className="font-playfair font-light text-dark-teal dark:text-white leading-[1.1] mb-6"
                            style={{ fontSize: 'clamp(30px, 4vw, 50px)' }}
                        >
                            Let's create something<br />
                            <em className="italic text-old-gold">extraordinary</em>
                        </h2>
                        <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70 mb-10 max-w-sm">
                            For inquiries, collaborations, or simply to share your fragrance story —
                            we'd love to hear from you.
                        </p>
                        <a
                            href="mailto:wel.fragrancecollection@gmail.com"
                            className="
                                font-jost text-[10px] tracking-[0.3em] uppercase
                                px-10 py-4 inline-block no-underline
                                bg-dark-teal dark:bg-old-gold
                                text-white border border-dark-teal dark:border-old-gold
                                transition-all duration-300
                                hover:bg-old-gold hover:border-old-gold dark:hover:bg-transparent dark:hover:text-old-gold
                            "
                        >
                            Send a Message
                        </a>
                    </Reveal>

                    {/* ── Vertical divider (lg only) ── */}
                    <div className="hidden lg:block bg-old-gold/15 self-stretch" aria-hidden="true" />

                    {/* ── Right: contact details ── */}
                    <Reveal stagger={0.08} className="flex flex-col gap-7 pt-2">
                        {[
                            {
                                Icon: FaEnvelope,
                                label: 'Email',
                                value: 'wel.fragrancecollection@gmail.com',
                                href: 'mailto:wel.fragrancecollection@gmail.com',
                            },
                            {
                                Icon: FaPhoneAlt,
                                label: 'Phone',
                                value: '+63 945 705 2630 · +63 919 922 5430 · +63 955 533 7500',
                            },
                            {
                                Icon: FaInstagram,
                                label: 'Instagram',
                                value: '@Wel_FragranceCollection',
                                href: 'https://instagram.com/Wel_FragranceCollection',
                                external: true,
                            },
                            {
                                Icon: FaMapMarkerAlt,
                                label: 'Location',
                                value: 'Philippines',
                            },
                        ].map(({ Icon, label, value, href, external }) => (
                            <div key={label} className="flex gap-4 items-start">
                                {/* Icon box */}
                                <div className="
                                    w-8 h-8 flex-shrink-0 flex items-center justify-center
                                    border border-old-gold/25 text-old-gold text-[12px] mt-0.5
                                ">
                                    <Icon />
                                </div>
                                <div>
                                    <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold mb-1">
                                        {label}
                                    </p>
                                    {href ? (
                                        <a
                                            href={href}
                                            target={external ? '_blank' : undefined}
                                            rel={external ? 'noopener noreferrer' : undefined}
                                            className="
                                                font-jost text-sm md:text-base font-light
                                                text-dark-teal dark:text-white
                                                no-underline border-b border-old-gold/30
                                                hover:border-old-gold transition-colors duration-200
                                            "
                                        >
                                            {value}
                                        </a>
                                    ) : (
                                        <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                                            {value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </div>
        </Container>
    </section>
);

// ------------------------------------------------------------
// Home – Main Page Component
// ------------------------------------------------------------
const Home = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-dark-teal">
            <div className="relative">
                <Hero />
                <About />
            </div>
            <Products />
            <WhyChooseUs />
            <Contact />
        </div>
    );
};

export default Home;