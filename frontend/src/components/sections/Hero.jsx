import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import { bgImages } from '../../assets/images';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={ref}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
            }}
        >
            <Container
                background="#0D0C0B"
                style={{
                    height: "100vh",
                    maxHeight: "1000px",
                    minHeight: "600px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Parallax + gentle ping‑pong */}
                <motion.div
                    style={{ y, position: "absolute", inset: 0, zIndex: 0 }}
                    animate={{
                        x: [0, 6, -6, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <LazyImage
                        src={bgImages.wel}
                        alt="Wel Fragrance"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center 20%",
                            opacity: 1,
                        }}
                    />
                </motion.div>

                {/* Buttons wrapper – pinned to the bottom */}
                <motion.div
                    style={{
                        opacity,
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "center",
                        padding: "0 20px 60px 20px",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.9 }}
                        style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {/* Explore Collection – White bg, dark text, outline on hover */}
                        <a
                            href="#products"
                            className="sans"
                            style={{
                                padding: "14px 36px",
                                fontSize: 11,
                                textDecoration: "none",
                                textTransform: "uppercase",
                                display: "inline-block",
                                background: "var(--ivory)",
                                color: "var(--black)",
                                border: "1px solid var(--ivory)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--ivory)";
                                e.currentTarget.style.border = "1px solid var(--ivory)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "var(--ivory)";
                                e.currentTarget.style.color = "var(--black)";
                                e.currentTarget.style.border = "1px solid var(--ivory)";
                            }}
                        >
                            Explore Collection
                        </a>

                        {/* Our Story – Dark bg, white text, outline on hover */}
                        <a
                            href="#about"
                            className="sans"
                            style={{
                                padding: "14px 36px",
                                fontSize: 11,
                                textDecoration: "none",
                                textTransform: "uppercase",
                                display: "inline-block",
                                background: "var(--black)",
                                color: "var(--ivory)",
                                border: "1px solid var(--black)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "var(--ivory)";
                                e.currentTarget.style.border = "1px solid var(--ivory)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "var(--black)";
                                e.currentTarget.style.color = "var(--ivory)";
                                e.currentTarget.style.border = "1px solid var(--black)";
                            }}
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