import React from 'react';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import welFragrance from '../../assets/videos/welFragrance.mp4'; // portrait short video

const About = () => {
    return (
        <section className="relative z-10">
            <Container
                className={`
          flex items-center py-16 md:py-28
          lg:h-screen lg:max-h-[1000px] lg:min-h-[600px]
          bg-white dark:bg-dark-teal
          overflow-hidden   // <-- FIX: clips the overflowing video
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

                    <div>
                        <Reveal delay={0.1}>
                            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-light text-dark-teal dark:text-white leading-[1.15] mb-6">
                                The Essence of <br className="hidden sm:block" />
                                <span className="italic">Swiss Craftsmanship</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="font-jost text-sm sm:text-base font-light leading-relaxed text-black/80 dark:text-white/80 mb-6">
                                Wel Fragrance Collection is more than perfume—it’s an expression of
                                passion, artistry, and the quiet beauty found in nature. Each scent
                                is composed to evoke a memory, a place, or a fleeting emotion,
                                turning the everyday into the unforgettable.
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <p className="font-jost text-sm sm:text-base font-light leading-relaxed text-black/80 dark:text-white/80 mb-12">
                                Founded by Joel Malabo, the brand carries a deeply personal vision:
                                to create a signature fragrance that resonates from the Philippines
                                to Canada. Every bottle is a tribute to dedication, family, and the
                                belief that scent has the power to connect us across borders.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <a
                                href="#about"
                                className="font-jost inline-block px-8 py-3.5 text-[11px] uppercase no-underline border border-old-gold text-old-gold transition-colors duration-300 hover:bg-old-gold hover:text-white"
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