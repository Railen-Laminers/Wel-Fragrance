import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import Container from '../common/Container';
import Reveal from '../common/Reveal';

const Contact = () => {
    return (
        <Container className="py-16 md:py-24 lg:py-32 border-t border-old-gold/10 bg-white dark:bg-dark-teal">
            <div className="max-w-[640px] mx-auto text-center">
                <Reveal>
                    <div className="font-playfair text-[11px] tracking-[0.3em] text-old-gold uppercase mb-5">
                        Wel Fragrance Collection
                    </div>
                    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-light text-dark-teal dark:text-white mb-4 leading-[1.2]">
                        Let’s create something<br />extraordinary together
                    </h2>
                    <p className="font-jost text-sm md:text-base font-light text-black/70 dark:text-white/70 mb-8 md:mb-10 leading-relaxed">
                        For inquiries, collaborations, or simply to share your fragrance story — we’d love to hear from you.
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
                            <span className="font-jost">+63 945 705 2630, +63 919 922 5430, +63 955 533 7500</span>
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

                    <Reveal delay={0.3}>
                        <a
                            href="mailto:wel.fragrancecollection@gmail.com"
                            className="font-jost inline-block px-8 py-4 md:px-12 md:py-4 text-[11px] uppercase no-underline border border-old-gold text-old-gold mt-10 md:mt-12 hover:bg-old-gold hover:text-white transition-colors"
                        >
                            Get in Touch
                        </a>
                    </Reveal>
                </Reveal>
            </div>
        </Container>
    );
};

export default Contact;