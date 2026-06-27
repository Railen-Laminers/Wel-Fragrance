import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import Container from '../common/Container';
import Reveal from '../common/Reveal';

const Contact = () => {
    return (
        <Container
            background="#0E0D0B"
            className="py-16 md:py-24 lg:py-32 border-t border-[rgba(184,169,154,0.08)]"
        >
            <div className="max-w-[640px] mx-auto text-center">
                <Reveal>
                    <div className="serif text-[11px] tracking-[0.3em] text-stone uppercase mb-5">
                        Wel Fragrance Collection
                    </div>
                    <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory mb-4 leading-[1.2]">
                        Let’s create something<br />extraordinary together
                    </h2>
                    <p className="sans text-sm md:text-base font-light text-stone mb-8 md:mb-10 leading-relaxed">
                        For inquiries, collaborations, or simply to share your fragrance story — we’d love to hear from you.
                    </p>

                    {/* Contact items */}
                    <div className="flex flex-col items-center gap-4 text-ivory">
                        {/* Email */}
                        <a
                            href="mailto:wel.fragrancecollection@gmail.com"
                            className="flex items-center gap-3 text-sm md:text-base no-underline border-b border-[rgba(184,169,154,0.2)] pb-1 hover:border-ivory transition-colors"
                        >
                            <FaEnvelope className="text-stone text-base" />
                            <span className="serif">wel.fragrancecollection@gmail.com</span>
                        </a>

                        {/* Phone numbers */}
                        <div className="flex items-center gap-3 text-sm md:text-base">
                            <FaPhoneAlt className="text-stone text-base" />
                            <span className="sans">
                                +63 945 705 2630, +63 919 922 5430, +63 955 533 7500
                            </span>
                        </div>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/Wel_FragranceCollection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm md:text-base no-underline border-b border-[rgba(184,169,154,0.2)] pb-1 hover:border-ivory transition-colors"
                        >
                            <FaInstagram className="text-stone text-base" />
                            <span className="sans">@Wel_FragranceCollection</span>
                        </a>

                        {/* Location */}
                        <div className="flex items-center gap-3 text-sm md:text-base">
                            <FaMapMarkerAlt className="text-stone text-base" />
                            <span className="sans">Philippines</span>
                        </div>
                    </div>

                    <Reveal delay={0.3}>
                        <a
                            href="mailto:wel.fragrancecollection@gmail.com"
                            className="sans btn-dark inline-block px-8 py-4 md:px-12 md:py-4 text-[11px] no-underline uppercase border border-ivory mt-10 md:mt-12 hover:bg-ivory hover:text-black transition-colors"
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