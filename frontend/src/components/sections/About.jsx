import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';
import { modelImages } from '../../assets/images';

const IMAGES = [
    modelImages.dsc09312,
    modelImages.dsc09323,
    modelImages.dsc09348,
    modelImages.dsc09358,
    modelImages.dsc09372,
    modelImages.dsc09388,
];

const IMAGE_COUNT = IMAGES.length;

// Each image occupies an equal slice of the 0→1 scroll progress.
// We give a short cross-fade overlap (OVERLAP) so transitions aren't a hard cut.
const OVERLAP = 0.08;

function getImageOpacity(index, progress) {
    const sliceSize = 1 / IMAGE_COUNT;
    const start = index * sliceSize;
    const end = start + sliceSize;

    if (index === 0) {
        // First image: fully visible at 0, fades out as second comes in
        if (progress < end - OVERLAP) return 1;
        if (progress < end) return 1 - (progress - (end - OVERLAP)) / OVERLAP;
        return 0;
    }

    if (index === IMAGE_COUNT - 1) {
        // Last image: fades in, then stays visible
        if (progress < start) return 0;
        if (progress < start + OVERLAP) return (progress - start) / OVERLAP;
        return 1;
    }

    // Middle images: fade in, hold, fade out
    if (progress < start) return 0;
    if (progress < start + OVERLAP) return (progress - start) / OVERLAP;
    if (progress < end - OVERLAP) return 1;
    if (progress < end) return 1 - (progress - (end - OVERLAP)) / OVERLAP;
    return 0;
}

const About = () => {
    const sectionRef = useRef(null);   // tall scroll container
    const ref = useRef(null);          // for internal image parallax

    // Scroll progress across the entire tall section (0 → 1)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Internal image parallax (driven by the same scroll)
    const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

    // Live opacity values for each image, updated on scroll
    const [opacities, setOpacities] = useState(() =>
        IMAGES.map((_, i) => getImageOpacity(i, 0))
    );

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setOpacities(IMAGES.map((_, i) => getImageOpacity(i, latest)));
    });

    // Slide-in entrance: About still glides up over Hero
    const { scrollYProgress: enterProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });
    const sectionY = useTransform(enterProgress, [0, 1], ["8%", "0%"]);

    return (
        /*
         * Tall wrapper — occupies (IMAGE_COUNT + 1) × 100vh of scroll space.
         * The sticky child is pinned at top:0 for the entire distance,
         * giving the impression the section is "held" while images transition.
         */
        <section
            ref={sectionRef}
            style={{
                position: "relative",
                zIndex: 2,
                height: `${(IMAGE_COUNT + 1) * 100}vh`,
            }}
        >
            {/* Sticky viewport-height frame */}
            <motion.div
                style={{
                    y: sectionY,
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Container
                    background="#0E0D0B"
                    style={{ padding: "120px 0", overflow: "hidden", width: "100%" }}
                >
                    <div
                        ref={ref}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 80,
                            alignItems: "center",
                        }}
                    >
                        {/* ── Image stack ── */}
                        <Reveal y={0}>
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                    aspectRatio: "4/5",
                                }}
                            >
                                <motion.div
                                    style={{
                                        y: imageY,
                                        position: "relative",
                                        height: "115%",
                                    }}
                                >
                                    {/*
                                     * All 6 images are stacked via absolute positioning.
                                     * Only their opacity changes — no layout shift, no flicker.
                                     */}
                                    {IMAGES.map((src, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                position: i === 0 ? "relative" : "absolute",
                                                inset: 0,
                                                width: "100%",
                                                height: "100%",
                                                opacity: opacities[i],
                                                transition: "opacity 0.05s linear",
                                            }}
                                        >
                                            <LazyImage
                                                src={src}
                                                alt={`Model ${i + 1}`}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Decorative line */}
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: -1,
                                        left: -1,
                                        width: "40%",
                                        height: 1,
                                        background: "var(--stone)",
                                    }}
                                />
                            </div>
                        </Reveal>

                        {/* ── Text column ── */}
                        <div>
                            <Reveal delay={0.1}>
                                <SectionLabel text="Our Story" />
                            </Reveal>
                            <Reveal delay={0.2}>
                                <h2
                                    className="serif"
                                    style={{
                                        fontSize: "clamp(32px,4vw,54px)",
                                        fontWeight: 300,
                                        color: "var(--ivory)",
                                        lineHeight: 1.15,
                                        marginBottom: 32,
                                    }}
                                >
                                    Born from the belief that <em>scent is memory</em>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.3}>
                                <p
                                    className="sans"
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 300,
                                        lineHeight: 1.9,
                                        color: "var(--stone)",
                                        marginBottom: 24,
                                    }}
                                >
                                    Wel Fragrance was founded in 2019 with a singular vision — to
                                    distill the most fleeting of human experiences into something
                                    that lingers. Every bottle in our collection is an ode to a
                                    place, an emotion, a fleeting afternoon light that cannot be
                                    photographed.
                                </p>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p
                                    className="sans"
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 300,
                                        lineHeight: 1.9,
                                        color: "var(--stone)",
                                        marginBottom: 48,
                                    }}
                                >
                                    Our perfumers travel the world — from the oud markets of the
                                    Middle East to the lavender fields of Grasse — sourcing only
                                    raw materials worthy of the name Wel.
                                </p>
                            </Reveal>
                            <Reveal delay={0.5}>
                                <a
                                    href="#products"
                                    className="sans"
                                    style={{
                                        padding: "14px 32px",
                                        fontSize: 11,
                                        textDecoration: "none",
                                        textTransform: "uppercase",
                                        display: "inline-block",
                                        background: "transparent",
                                        color: "var(--ivory)",
                                        border: "1px solid var(--ivory)",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "var(--ivory)";
                                        e.currentTarget.style.color = "var(--black)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.color = "var(--ivory)";
                                    }}
                                >
                                    Discover the story{" "}
                                    <span style={{ marginLeft: 8, opacity: 0.6 }}>→</span>
                                </a>
                            </Reveal>
                        </div>
                    </div>
                </Container>
            </motion.div>
        </section>
    );
};

export default About;