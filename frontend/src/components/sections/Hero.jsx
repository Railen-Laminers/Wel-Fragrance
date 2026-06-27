import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import { bgImages } from '../../assets/images';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} className="sticky top-0 z-1">
            <Container
                background="#0D0C0B"
                className="h-screen max-h-[1000px] min-h-[600px] relative overflow-hidden"
            >
                {/* Parallax + gentle ping‑pong */}
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0"
                    animate={{
                        x: [0, 6, -6, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <LazyImage
                        src={bgImages.wel}
                        alt="Wel Fragrance"
                        className="w-full h-full object-cover object-[center_20%]"
                    />
                </motion.div>

                {/* Buttons wrapper – pinned to the bottom */}
                <motion.div
                    style={{ opacity }}
                    className="absolute bottom-0 left-0 right-0 z-2 flex justify-center px-4 sm:px-6 pb-8 sm:pb-12 md:pb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full sm:w-auto"
                    >
                        <a
                            href="#products"
                            className="sans px-6 py-3 md:px-8 md:py-4 text-[11px] no-underline uppercase inline-block bg-[var(--ivory)] text-[var(--black)] border border-[var(--ivory)] transition-all duration-300 cursor-pointer hover:bg-transparent hover:text-[var(--ivory)] hover:border-[var(--ivory)] text-center"
                        >
                            Explore Collection
                        </a>

                        <a
                            href="#about"
                            className="sans px-6 py-3 md:px-8 md:py-4 text-[11px] no-underline uppercase inline-block bg-[var(--black)] text-[var(--ivory)] border border-[var(--black)] transition-all duration-300 cursor-pointer hover:bg-transparent hover:text-[var(--ivory)] hover:border-[var(--ivory)] text-center"
                        >
                            Our Story
                        </a>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
};

export default Hero;