import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.faq-item', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const faqs = [
        {
            question: 'What makes Wel fragrances unique?',
            answer: 'Each Wel fragrance is handcrafted with nature\'s purest essences, inspired by the vision of our CEO Joel Malabo. We blend traditional perfumery techniques with modern innovation to create scents that are both timeless and deeply personal.',
        },
        {
            question: 'Do you ship to both the Philippines and Canada?',
            answer: 'Yes, we proudly ship to all regions of the Philippines and across Canada. We offer express shipping options to ensure your fragrance arrives in perfect condition, no matter where you are.',
        },
        {
            question: 'How do I choose my signature scent?',
            answer: 'We recommend exploring our fragrance families — Floral, Oriental, Woody, and Fresh. Each scent is designed to resonate with different personalities and moods. You can also visit our boutiques for a personalized consultation.',
        },
        {
            question: 'Are Wel fragrances suitable as gifts?',
            answer: 'Absolutely. Every Wel fragrance comes in elegant, gift-ready packaging. We also offer complimentary gift wrapping and personalized message cards to make your gift truly special.',
        },
        {
            question: 'What is your return policy?',
            answer: 'We stand behind the quality of our fragrances. If you\'re not completely satisfied, you may return unopened products within 14 days for a full refund. Opened products can be exchanged within 7 days.',
        },
    ];

    return (
        <section ref={sectionRef} className="relative py-24 lg:py-32 z-10 bg-transparent">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-16 bg-old-gold/40" />
                        <span className="font-jost text-xs tracking-[0.3em] text-old-gold uppercase">
                            Questions
                        </span>
                        <div className="h-px w-16 bg-old-gold/40" />
                    </div>
                    <h2 className="font-cormorant text-4xl md:text-5xl text-dark-teal dark:text-warm-white">
                        Frequently <span className="italic text-old-gold">Asked</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="faq-item border border-old-gold/10 hover:border-old-gold/20 transition-colors duration-300 bg-warm-white/70 dark:bg-charcoal/70 backdrop-blur-sm"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 lg:p-8 text-left group"
                            >
                                <span className="font-cormorant text-lg lg:text-xl text-dark-teal dark:text-warm-white group-hover:text-old-gold transition-colors duration-300 pr-8">
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-8 h-8 border border-old-gold/30 flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-old-gold border-old-gold rotate-45' : ''}`}>
                                    <svg
                                        className={`w-3 h-3 transition-colors duration-300 ${openIndex === index ? 'text-warm-white dark:text-dark-teal' : 'text-old-gold'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ease-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                                    <div className="h-px w-full bg-old-gold/10 mb-4" />
                                    <p className="font-inter text-warm-gray dark:text-warm-white/70 text-sm leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}