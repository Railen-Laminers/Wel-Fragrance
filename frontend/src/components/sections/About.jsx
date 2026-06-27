// src/components/sections/About.jsx
import React from 'react';
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import Reveal from '../common/Reveal';
import prada from '../../assets/Products/Prada.jpg';

const About = () => {
    return (
        <section className="relative z-10">
            <Container
                background="#0E0D0B"
                className="min-h-screen flex items-center py-16 md:py-28"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center w-full">
                    {/* Image */}
                    <Reveal y={0}>
                        <div className="relative overflow-hidden aspect-[4/5]">
                            <LazyImage
                                src={prada} // using Prada image
                                alt="Model"
                                className="w-full h-full object-cover block"
                            />
                            <div className="absolute bottom-0 left-0 w-2/5 h-px bg-stone" />
                        </div>
                    </Reveal>

                    {/* Text */}
                    <div>
                        <Reveal delay={0.1}>
                            <h2 className="serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light text-ivory leading-[1.15] mb-6">
                                The Essence of <br className="hidden sm:block" />
                                <span className="italic">Swiss Craftsmanship</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="sans text-sm sm:text-base font-light leading-relaxed text-stone mb-6">
                                Wel Fragrance Collection is more than perfume—it’s an expression of
                                passion, artistry, and the quiet beauty found in nature. Each scent
                                is composed to evoke a memory, a place, or a fleeting emotion,
                                turning the everyday into the unforgettable.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <p className="sans text-sm sm:text-base font-light leading-relaxed text-stone mb-12">
                                Founded by Joel Malabo, the brand carries a deeply personal vision:
                                to create a signature fragrance that resonates from the Philippines
                                to Canada. Every bottle is a tribute to dedication, family, and the
                                belief that scent has the power to connect us across borders.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <a
                                href="#about"
                                className="sans inline-block px-8 py-3.5 text-[11px] uppercase no-underline border border-[var(--ivory)] text-[var(--ivory)] transition-colors duration-300 hover:bg-[var(--ivory)] hover:text-[var(--black)]"
                            >
                                Our Story <span className="ml-2 opacity-60">→</span>
                            </a>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default About;