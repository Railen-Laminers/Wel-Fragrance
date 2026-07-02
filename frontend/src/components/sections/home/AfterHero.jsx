import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeContext';
import LetterReveal from '@/components/common/LetterReveal';
import { FadeRevealText, ThemeRevealText } from '@/components/common/RevealText';

// ---------- PRODUCT IMAGES ----------
import eassyMiyaki from '@/assets/products/EassyMiyaki.webp';
import Jomalone from '@/assets/products/Jomalone.webp';

// ---------- MODEL IMAGES ----------
import DSC09312 from '@/assets/models/DSC09312.webp';
import DSC09348 from '@/assets/models/DSC09348.webp';
import DSC09388 from '@/assets/models/DSC09388.webp';
import DSC09413 from '@/assets/models/DSC09413.webp';
import DSC09428 from '@/assets/models/DSC09428.webp';
import DSC09468 from '@/assets/models/DSC09468.webp';
import DSC09498 from '@/assets/models/DSC09498.webp';
import DSC09525 from '@/assets/models/DSC09525.webp';
import DSC09587 from '@/assets/models/DSC09587.webp';
import DSC09622 from '@/assets/models/DSC09622.webp';
import DSC09675 from '@/assets/models/DSC09675.webp';
import DSC09687 from '@/assets/models/DSC09687.webp';
import DSC09749 from '@/assets/models/DSC09749.webp';

const allModelImages = [
    DSC09312, DSC09348, DSC09388, DSC09413,
    DSC09428, DSC09468, DSC09498, DSC09525,
    DSC09587, DSC09622, DSC09675, DSC09687,
    DSC09749,
];

gsap.registerPlugin(ScrollTrigger);

// ---------- Component: Section with Image + Text (with optional button) ----------
const SectionWithImage = ({
    image,
    imageAlt,
    heading,
    paragraphs,
    reverse = false,
    imageRefs,
    index,
    buttonText = null,
    buttonLink = '#',
}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [textReveal, setTextReveal] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        const img = imageRef.current;
        if (!el || !img) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top bottom-=10%',
                toggleActions: 'play none none none',
            },
        });

        tl.fromTo(
            img,
            { opacity: 1, y: 60, scale: 0.85, rotate: -2, filter: 'blur(12px)' },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
            }
        )
            .add(() => setTextReveal(true), '+=0.3');

        return () => {
            tl.kill();
        };
    }, []);

    useEffect(() => {
        if (imageRef.current && imageRefs.current) {
            imageRefs.current[index] = imageRef.current;
        }
    }, [imageRefs, index]);

    const imageElement = (
        <div ref={imageRef} className="rounded-2xl overflow-hidden shadow-2xl">
            <img src={image} alt={imageAlt} className="w-full h-72 md:h-96 object-cover" />
        </div>
    );

    const textElement = (
        <div>
            <div className="mb-4">
                <ThemeRevealText
                    active={textReveal}
                    lines={[heading]}
                    letterDelay={0.05}
                    duration={1200}
                    className="font-playfair text-3xl md:text-4xl text-old-gold"
                />
            </div>
            <div className="mb-4">
                <ThemeRevealText
                    active={textReveal}
                    lines={paragraphs}
                    letter={false}
                    duration={700}
                    className="font-cormorant text-lg md:text-xl text-dark-teal/80 dark:text-white/80 leading-relaxed"
                />
            </div>
            {buttonText && (
                <div className="mt-6">
                    <a
                        href={buttonLink}
                        className="inline-block border-2 border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors duration-300 px-6 py-2 rounded-md uppercase tracking-wider text-sm font-medium"
                    >
                        {buttonText}
                    </a>
                </div>
            )}
        </div>
    );

    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
            {reverse ? (
                <>
                    {textElement}
                    {imageElement}
                </>
            ) : (
                <>
                    {imageElement}
                    {textElement}
                </>
            )}
        </div>
    );
};

// ---------- Component: Full‑width image with overlay text ----------
const FullWidthImageSection = ({ image, heading, subtext, imageRefs, index }) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const [textReveal, setTextReveal] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        const img = imageRef.current;
        if (!el || !img) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top bottom-=10%',
                toggleActions: 'play none none none',
            },
        });

        tl.fromTo(
            img,
            { opacity: 1, scale: 0.95, filter: 'blur(12px)' },
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                ease: 'power3.out',
            }
        )
            .add(() => setTextReveal(true), '+=0.3');

        return () => tl.kill();
    }, []);

    useEffect(() => {
        if (imageRef.current && imageRefs.current) {
            imageRefs.current[index] = imageRef.current;
        }
    }, [imageRefs, index]);

    return (
        <div ref={containerRef} className="relative mb-24 rounded-3xl overflow-hidden">
            <div ref={imageRef} className="w-full h-[40vh] md:h-[60vh]">
                <img src={image} alt="Full width" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex flex-col items-center justify-center text-center p-6">
                <div className="mb-4">
                    <ThemeRevealText
                        active={textReveal}
                        lines={[heading]}
                        letterDelay={0.06}
                        duration={1200}
                        className="font-playfair text-3xl md:text-5xl text-white"
                    />
                </div>
                <div className="max-w-xl">
                    <ThemeRevealText
                        active={textReveal}
                        lines={subtext}
                        letter={false}
                        duration={900}
                        className="font-cormorant text-lg md:text-xl text-white/90 italic"
                    />
                </div>
            </div>
        </div>
    );
};

// ---------- Helper Components ----------
const ScrollHeading = ({ text, className = '' }) => {
    const ref = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top bottom-=10%',
            onEnter: () => setRevealed(true),
            toggleActions: 'play none none none',
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill();
            });
        };
    }, []);

    useEffect(() => {
        if (revealed) {
            setRevealed(false);
            const timer = setTimeout(() => setRevealed(true), 50);
            return () => clearTimeout(timer);
        }
    }, [theme]);

    return (
        <div ref={ref} className={className}>
            <ThemeRevealText
                active={revealed}
                lines={[text]}
                letterDelay={0.05}
                duration={1200}
                className={className}
            />
        </div>
    );
};

const ScrollQuote = ({ mainText, subText }) => {
    const ref = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        ScrollTrigger.create({
            trigger: el,
            start: 'top bottom-=10%',
            onEnter: () => setRevealed(true),
            toggleActions: 'play none none none',
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === el) st.kill();
            });
        };
    }, []);

    useEffect(() => {
        if (revealed) {
            setRevealed(false);
            const timer = setTimeout(() => setRevealed(true), 50);
            return () => clearTimeout(timer);
        }
    }, [theme]);

    return (
        <div ref={ref}>
            <div className="mb-6">
                <ThemeRevealText
                    active={revealed}
                    lines={[mainText]}
                    letterDelay={0.05}
                    duration={1200}
                    className="font-playfair text-3xl md:text-4xl text-dark-teal/90 dark:text-white/90"
                />
            </div>
            <div>
                <ThemeRevealText
                    active={revealed}
                    lines={[subText]}
                    letter={false}
                    duration={900}
                    className="font-cormorant text-lg text-old-gold/70 dark:text-old-gold/70 italic tracking-wide"
                />
            </div>
        </div>
    );
};

// ---------- Main AfterHero Component ----------
const AfterHero = () => {
    const imageRefs = useRef([]);
    const galleryRefs = useRef([]);

    useEffect(() => {
        // Product images (the two products in the "Expressions" section)
        const productImages = imageRefs.current.slice(3, 5);
        productImages.forEach((el) => {
            if (!el) return;
            gsap.fromTo(
                el,
                { opacity: 1, y: 40, scale: 0.9, filter: 'blur(12px)' },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom-=10%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        // Gallery images (the model grid)
        const galleryImages = galleryRefs.current;
        galleryImages.forEach((el) => {
            if (!el) return;
            gsap.fromTo(
                el,
                { opacity: 1, y: 30, scale: 0.95, filter: 'blur(12px)' },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top bottom-=10%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section className="relative w-full overflow-hidden py-20 md:py-32 bg-white dark:bg-dark-teal transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <SectionWithImage
                    image={DSC09312}
                    imageAlt="Fragrance artistry"
                    heading="The Art of Fragrance"
                    paragraphs={[
                        'At Wel Fragrance Collection, we believe that every fragrance tells a story ',
                        '— a story of passion, artistry, and individuality. Inspired by nature\'s purest',
                        ' essences and the beauty of human emotion, we craft perfumes that',
                        ' go beyond scent, creating timeless experiences that linger in memory.',
                    ]}
                    imageRefs={imageRefs}
                    index={0}
                />

                <SectionWithImage
                    image={DSC09468}
                    imageAlt="CEO vision"
                    heading="The Story Behind the Scent"
                    paragraphs={[
                        'Our journey began with a vision of our CEO Joel Malabo to discover a scent that',
                        'will be known in all parts of the Philippines & Canada. Each bottle reflects his',
                        'determination, dreams and the love for his Family. Whether you\'re seeking a',
                        'signature fragrance or a gift to celebrate life\'s moments, Wel Fragrance Collection',
                        'invites you to explore the world of evocative aromas designed to resonate with',
                        'your spirit. Because at Wel Fragrance Collection every scent is a reflection of you.',
                    ]}
                    reverse={true}
                    imageRefs={imageRefs}
                    index={1}
                    buttonText="Learn More"
                    buttonLink="#"
                />

                <FullWidthImageSection
                    image={DSC09587}
                    heading="The Third Shore"
                    subtext={[
                        'Where the two currents meet – a harmony of citrus, spice, and driftwood.',
                        'A fragrance that belongs to neither, yet both.',
                    ]}
                    imageRefs={imageRefs}
                    index={2}
                />

                {/* Expressions section */}
                <div className="mb-24">
                    <ScrollHeading text="Expressions" className="font-playfair text-4xl md:text-6xl text-old-gold text-center mb-10" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[eassyMiyaki, Jomalone].map((img, idx) => (
                            <div
                                key={idx}
                                ref={(el) => (imageRefs.current[3 + idx] = el)}
                                className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500"
                            >
                                <img src={img} alt={`Product ${idx + 1}`} className="w-full h-64 md:h-80 object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <a
                            href="#"
                            className="inline-block border-2 border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors duration-300 px-6 py-2 rounded-md uppercase tracking-wider text-sm font-medium"
                        >
                            Discover the Products
                        </a>
                    </div>
                </div>

                {/* The Journey in Images */}
                <div className="mb-24">
                    <ScrollHeading text="The Journey in Images" className="font-playfair text-4xl md:text-6xl text-old-gold text-center mb-10" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allModelImages.map((img, idx) => (
                            <div
                                key={idx}
                                ref={(el) => (galleryRefs.current[idx] = el)}
                                className="rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.03] duration-500"
                            >
                                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-64 md:h-72 object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <a
                            href="#"
                            className="inline-block border-2 border-old-gold text-old-gold hover:bg-old-gold hover:text-white transition-colors duration-300 px-6 py-2 rounded-md uppercase tracking-wider text-sm font-medium"
                        >
                            View Catalogue
                        </a>
                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto">
                    <ScrollQuote
                        mainText="“Every bottle holds a journey”"
                        subText="— crafted for those who carry more than one home."
                    />
                </div>

            </div>
        </section>
    );
};

export default AfterHero;