import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import LazyImage from '../common/LazyImage';

// ─── Images ────────────────────────────────────────────────────────────────
// IMPORTANT: use actual imports so Webpack/Vite can process them
import ceoImage from '../../assets/Models/DSC09812.jpg';    // CEO portrait
import jomalone from '../../assets/Products/Jomalone.jpg';  // Perfume bottle

// ─── Components ─────────────────────────────────────────────────────────────

// Decorative divider
const GoldDivider = ({ className = '' }) => (
    <div className={`flex items-center gap-4 ${className}`}>
        <div className="w-8 h-px bg-old-gold/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-old-gold/40" />
        <div className="w-16 h-px bg-old-gold/20" />
    </div>
);

// Section label
const SectionLabel = ({ children }) => (
    <span className="font-jost text-[10px] tracking-[0.35em] uppercase text-old-gold block mb-4">
        {children}
    </span>
);

// Stat block (kept for reference, not used)
const Stat = ({ value, label, delay = 0 }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px 0px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
            className="border-l border-old-gold/20 pl-6"
        >
            <div className="font-playfair text-3xl md:text-4xl font-light text-old-gold">{value}</div>
            <div className="font-jost text-[11px] tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mt-1">
                {label}
            </div>
        </motion.div>
    );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const AboutHero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section ref={ref} id="about" className="relative h-[60vh] min-h-[420px] max-h-[700px] overflow-hidden bg-dark-teal">
            <motion.div style={{ y }} className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-b from-dark-teal/30 via-dark-teal/10 to-dark-teal" />
            </motion.div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionLabel>Wel Fragrance Collection</SectionLabel>
                    <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.08]">
                        About <em className="italic text-old-gold">Us</em>
                    </h1>
                    <GoldDivider className="justify-center mt-8" />
                    <p className="font-jost text-sm md:text-base font-light text-white/60 max-w-lg mx-auto mt-6 leading-relaxed">
                        Every scent is a reflection of you.
                    </p>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-dark-teal to-transparent" />
        </section>
    );
};

// ─── History ──────────────────────────────────────────────────────────────────
const History = () => (
    <section className="bg-white dark:bg-dark-teal">
        <Container className="py-20 md:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 md:gap-20 items-center max-w-6xl mx-auto">
                {/* Image block */}
                <Reveal y={0} className="relative">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-old-gold/30" aria-hidden="true" />
                        <div className="aspect-[4/5] overflow-hidden bg-dark-teal/5 dark:bg-white/5">
                            <LazyImage
                                src={jomalone}
                                alt="Wel Fragrance Collection perfume bottle"
                                className="w-full h-full object-cover"
                                placeholderColor="#0B212A"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-old-gold/30" aria-hidden="true" />
                        <div className="absolute bottom-0 left-0 w-2/5 h-px bg-old-gold" />
                    </div>
                </Reveal>

                {/* Text */}
                <Reveal stagger={0.12} className="space-y-6">
                    <div>
                        <SectionLabel>Our History</SectionLabel>
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white leading-[1.12]">
                            Where It All <em className="italic">Began</em>
                        </h2>
                    </div>
                    <GoldDivider />
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                        At Wel Fragrance Collection, we believe that every fragrance tells a story—a story of passion, artistry, and individuality. Inspired by nature's purest essences and the beauty of human emotion, we craft perfumes that go beyond scent, creating timeless experiences that linger in memory.
                    </p>
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                        Our journey began with a vision of our CEO Joel Malabo to discover a scent that will be known in all part of the Philippines & Canada. Each bottle reflects his determination, dreams and the love for his Family.
                    </p>
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                        Whether you're seeking a signature fragrance or a gift to celebrate life's moments, Well Fragrance Collection invites you to explore the world of evocative aromas designed to resonate with your spirit. Because at Wel Fragrance Collection every scent is a reflection of you.
                    </p>
                </Reveal>
            </div>
        </Container>
    </section>
);

// ─── CEO ──────────────────────────────────────────────────────────────────────
const CEO = () => (
    <section className="relative bg-dark-teal overflow-hidden">
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #C79F48 0, #C79F48 1px, transparent 0, transparent 50%)',
                backgroundSize: '12px 12px',
            }}
            aria-hidden="true"
        />
        <Container className="py-20 md:py-28 lg:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 md:gap-20 items-center max-w-6xl mx-auto">
                {/* Portrait */}
                <Reveal y={16} className="relative order-2 lg:order-1">
                    <div className="relative max-w-[420px] mx-auto lg:mx-0">
                        <div className="absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-old-gold/50" aria-hidden="true" />
                        <div className="absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-old-gold/50" aria-hidden="true" />
                        <div className="aspect-[3/4] overflow-hidden relative">
                            <LazyImage
                                src={ceoImage}
                                alt="Joel Malabo — CEO, Wel Fragrance Collection"
                                className="w-full h-full"
                                placeholderColor="#0B212A"
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark-teal/60 to-transparent" />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute bottom-6 left-6 right-6"
                        >
                            <div className="border-l-2 border-old-gold pl-4">
                                <div className="font-playfair text-xl font-light text-white">Joel Malabo</div>
                                <div className="font-jost text-[10px] tracking-[0.25em] uppercase text-old-gold/80 mt-0.5">
                                    Founder & CEO
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Reveal>

                {/* Narrative */}
                <Reveal stagger={0.12} className="space-y-7 order-1 lg:order-2">
                    <div>
                        <SectionLabel>Leadership</SectionLabel>
                        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-white leading-[1.1]">
                            The Vision <br />
                            <em className="italic text-old-gold">Behind the Bottle</em>
                        </h2>
                    </div>
                    <GoldDivider />
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-white/65">
                        Joel Malabo founded Wel Fragrance Collection with a singular dream: to build a fragrance brand that resonates across borders — from the Philippines to Canada — carrying the warmth of family and the fire of ambition in every bottle.
                    </p>
                    <p className="font-jost text-sm md:text-base font-light leading-relaxed text-white/65">
                        His vision goes beyond commerce. Every scent he brings to life is a chapter of a deeply personal story — one of determination, cultural pride, and an unwavering love for the people who shape him most.
                    </p>
                    <blockquote className="border-l-2 border-old-gold/40 pl-6 py-1">
                        <p className="font-playfair text-base md:text-lg font-light italic text-white/80 leading-relaxed">
                            "Each bottle reflects determination, dreams and the love for family."
                        </p>
                        <cite className="font-jost text-[10px] tracking-[0.25em] uppercase text-old-gold/60 mt-3 block not-italic">
                            — Joel Malabo, Founder & CEO
                        </cite>
                    </blockquote>
                </Reveal>
            </div>
        </Container>
    </section>
);

// ─── Mission & Vision (UPDATED) ──────────────────────────────────────────
const MissionVision = () => {
    // Mission & Vision data – counters removed, full texts from your copy
    const pillars = [
        {
            label: 'Mission',
            heading: 'Our Mission',
            body: 'We are dedicated to crafting exquisite fragrances that evoke emotions, tell stories, and enhance the beauty of everyday moments. We believe in the power of scent to connect people, inspire creativity, and promote well-being. With a commitment to sustainability and ethical sourcing, we blend artistry and innovation to create signature scents that resonate with the soul. Our mission is to elevate personal expression through fragrance, inviting everyone to discover their unique identities through scent.',
        },
        {
            label: 'Vision',
            heading: 'Our Vision',
            body: 'We envision a world where fragrance transcends mere scent, becoming a universal language of connection and self-expression. We aspire to be a leader in the fragrance industry, known for our innovative creations and commitment to sustainability. Our goal is to inspire individuals to embrace their unique identities through the art of scent, fostering a deeper appreciation for the beauty and richness of life. Together, we aim to create a future where for a minimal price we could provide every scent to tell a story and every moment is enriched by the power of fragrance.',
        },
    ];

    return (
        <section className="bg-white dark:bg-dark-teal border-t border-old-gold/10">
            <Container className="py-20 md:py-28 lg:py-32">
                <Reveal className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
                    <SectionLabel>Purpose & Direction</SectionLabel>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white leading-[1.1]">
                        What Drives <em className="italic">Every Drop</em>
                    </h2>
                    <div className="w-12 h-px bg-old-gold/40 mx-auto mt-6" />
                </Reveal>

                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {pillars.map((pillar, i) => (
                        <Reveal key={pillar.label} delay={i * 0.15}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="group relative border border-old-gold/10 p-8 md:p-10 hover:border-old-gold/30 transition-colors duration-500"
                            >
                                {/* Counter (accent number) has been removed */}
                                <SectionLabel>{pillar.label}</SectionLabel>
                                <h3 className="font-playfair text-2xl md:text-3xl font-light text-dark-teal dark:text-white leading-[1.15] mb-5">
                                    {pillar.heading}
                                </h3>
                                <GoldDivider className="mb-6" />
                                <p className="font-jost text-sm md:text-base font-light leading-relaxed text-black/70 dark:text-white/70">
                                    {pillar.body}
                                </p>
                                <div className="w-0 group-hover:w-12 h-px bg-old-gold/50 transition-all duration-700 mt-8" />
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
};

// ─── Manifesto ──────────────────────────────────────────────────────────────
const Manifesto = () => (
    <section className="bg-dark-teal border-t border-old-gold/10 relative overflow-hidden">
        <Container className="py-24 md:py-32 text-center relative z-10">
            <Reveal stagger={0.1}>
                <div className="flex justify-center gap-3 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                </div>
                <p className="font-playfair text-xl md:text-2xl lg:text-3xl font-light italic text-white/80 max-w-2xl mx-auto leading-relaxed">
                    "Because at Wel Fragrance Collection, every scent is a reflection of you."
                </p>
                <div className="flex justify-center gap-3 mt-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/50" />
                    <span className="w-1.5 h-1.5 rounded-full bg-old-gold/20" />
                </div>
                <a
                    href="#products"
                    className="font-jost text-[10px] tracking-[0.3em] uppercase px-10 py-4 no-underline inline-block border border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-all duration-300 mt-12"
                >
                    Explore Our Collection
                </a>
            </Reveal>
        </Container>
    </section>
);

// ─── About Page ────────────────────────────────────────────────────────────
const About = () => (
    <div className="bg-white dark:bg-dark-teal">
        <AboutHero />
        <History />
        <MissionVision />
        <CEO />
        <Manifesto />
    </div>
);

export default About;