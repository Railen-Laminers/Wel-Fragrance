// src/components/sections/WhyChooseUs.jsx
import React from 'react';
import { FaFlask, FaLeaf, FaHands, FaTag } from 'react-icons/fa';
import Container from '../common/Container';
import Reveal from '../common/Reveal';

const values = [
    {
        icon: FaFlask,
        title: '100% Pure Oil',
        description: 'Our fragrances are crafted with premium pure oils, ensuring lasting intensity and skin‑friendly wear.',
    },
    {
        icon: FaLeaf,
        title: 'Ethically Sourced',
        description: 'We partner with sustainable suppliers who respect nature and local communities.',
    },
    {
        icon: FaHands,
        title: 'Artisan Craftsmanship',
        description: 'Every blend is hand‑composed by experienced perfumers with a passion for storytelling.',
    },
    {
        icon: FaTag,
        title: 'Affordable Luxury',
        description: 'Experience world‑class scents at a fraction of the price, without compromising quality.',
    },
];

const WhyChooseUs = () => {
    return (
        <Container background="#12100E" className="py-16 md:py-24 lg:py-32 border-t border-[rgba(184,169,154,0.06)]">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <div className="text-center mb-12 md:mb-16">
                        <span className="serif text-[11px] tracking-[0.3em] text-stone uppercase">
                            Why Wel Fragrance
                        </span>
                        <h2 className="serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory mt-2">
                            Crafted with Purpose
                        </h2>
                        <p className="sans text-sm md:text-base font-light text-stone max-w-2xl mx-auto mt-4 leading-relaxed">
                            Every bottle carries the vision of our founder and the commitment to quality that defines our brand.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {values.map((item, index) => (
                        <Reveal key={index} delay={0.1 * index}>
                            <div className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1e1c1a] text-ivory text-2xl mb-4 group-hover:bg-ivory group-hover:text-black transition-colors duration-300">
                                    <item.icon />
                                </div>
                                <h3 className="serif text-xl text-ivory font-light mb-2">{item.title}</h3>
                                <p className="sans text-sm font-light text-stone leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default WhyChooseUs;