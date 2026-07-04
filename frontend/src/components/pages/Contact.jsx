import React, { useEffect, useState } from 'react';
import { FaInstagram, FaEnvelope, FaPhone, FaStore, FaMapPin } from 'react-icons/fa';

export default function Contact() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sent, setSent] = useState(false);
    const [values, setValues] = useState({ name: '', email: '', message: '' });
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const [formError, setFormError] = useState('');

    const fields = [
        { key: 'name', placeholder: 'Your Name', type: 'text', rows: null },
        { key: 'email', placeholder: 'Your Email', type: 'email', rows: null },
        { key: 'message', placeholder: 'Your Message / Feedback', type: 'textarea', rows: 4 },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const resetForm = () => {
        setValues({ name: '', email: '', message: '' });
        setPrivacyAgreed(false);
        setFormError('');
        setSent(false);
    };

    const handleSubmit = () => {
        setFormError('');

        if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
            setFormError('Name, email, and message are all required.');
            return;
        }

        if (!privacyAgreed) {
            setFormError('You must agree to the data privacy terms to continue.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email.trim())) {
            setFormError('Please enter a valid email address.');
            return;
        }

        console.log('Form submitted:', values);
        setSent(true);
        setValues({ name: '', email: '', message: '' });
        setPrivacyAgreed(false);
        setFormError('');
    };

    const handleFieldChange = (key, value) => {
        setValues({ ...values, [key]: value });
        if (formError) setFormError('');
    };

    const handlePrivacyChange = (checked) => {
        setPrivacyAgreed(checked);
        if (formError) setFormError('');
    };

    const animClass = (delay) =>
        `transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`;
    const animStyle = (delay) => ({ transitionDelay: `${delay}ms` });

    return (
        <div className="min-h-screen bg-transparent pt-20 sm:pt-24 md:pt-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                    {/* ===== LEFT COLUMN ===== */}
                    <div>
                        {/* Eyebrow */}
                        <div
                            className={`contact-label flex items-center gap-4 mb-6 ${animClass(0)}`}
                            style={animStyle(0)}
                        >
                            <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
                                <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
                                <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                                    Get in Touch
                                </span>
                            </div>
                        </div>

                        {/* Headline */}
                        <h2
                            className={`contact-headline font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-[1.1] mb-4 sm:mb-6 ${animClass(100)}`}
                            style={animStyle(100)}
                        >
                            Let's <br />
                            <span className="italic text-old-gold">Connect</span>
                        </h2>

                        {/* Contact details with icons */}
                        <div
                            className={`contact-details space-y-4 border-b border-old-gold/20 pb-4 mb-6 sm:mb-8 ${animClass(200)}`}
                            style={animStyle(200)}
                        >
                            <div className="flex items-start gap-3">
                                <FaStore className="text-old-gold/70 dark:text-old-gold/60 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-jost text-[0.58rem] tracking-[0.2em] text-warm-gray dark:text-warm-white/60 uppercase">
                                        Business
                                    </p>
                                    <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg">
                                        Wel Fragrance Collection
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaEnvelope className="text-old-gold/70 dark:text-old-gold/60 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-jost text-[0.58rem] tracking-[0.2em] text-warm-gray dark:text-warm-white/60 uppercase">
                                        Email
                                    </p>
                                    <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg">
                                        wel.fragrancecollection@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaPhone className="text-old-gold/70 dark:text-old-gold/60 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-jost text-[0.58rem] tracking-[0.2em] text-warm-gray dark:text-warm-white/60 uppercase">
                                        Phone
                                    </p>
                                    <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg">
                                        +1 7782219055
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaInstagram className="text-old-gold/70 dark:text-old-gold/60 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-jost text-[0.58rem] tracking-[0.2em] text-warm-gray dark:text-warm-white/60 uppercase">
                                        Instagram
                                    </p>
                                    <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg">
                                        @Wel_FragranceCollection
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaMapPin className="text-old-gold/70 dark:text-old-gold/60 text-base sm:text-lg mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-jost text-[0.58rem] tracking-[0.2em] text-warm-gray dark:text-warm-white/60 uppercase">
                                        Location
                                    </p>
                                    <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg">
                                        Farcon Ville, San Cristobal, Calamba Laguna
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sticky note */}
                        <div
                            className={`contact-sticky ${animClass(300)}`}
                            style={animStyle(300)}
                        >
                            <div className="relative p-4 sm:p-6 border border-old-gold/10 bg-warm-white/40 dark:bg-charcoal/40 backdrop-blur-sm transform -rotate-0.5 hover:rotate-0 transition-transform duration-500">
                                <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t border-l border-old-gold/30" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b border-r border-old-gold/30" />
                                <p className="font-jost text-[0.58rem] text-warm-gray dark:text-warm-white/60 tracking-widest mb-2">
                                    NOTE /
                                </p>
                                <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-base sm:text-lg mb-4 max-w-sm leading-relaxed">
                                    "Every connection begins with a scent—let's find yours."
                                </p>
                                <div className="h-px w-full bg-gradient-to-r from-old-gold/30 to-transparent" />
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className="md:pt-8 lg:pt-16">
                        {sent ? (
                            <div className="text-center py-12 sm:py-16">
                                <p className="font-cormorant italic text-dark-teal dark:text-warm-white text-3xl sm:text-4xl md:text-5xl mb-4">
                                    Received.
                                </p>
                                <p className="font-inter italic text-warm-gray dark:text-warm-white/70 text-sm sm:text-base">
                                    Your message has been received. We'll respond with the same care we put into every bottle.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="group flex items-center gap-2 font-jost text-xs sm:text-sm tracking-[0.15em] text-dark-teal dark:text-warm-white uppercase hover:text-old-gold transition-colors mt-6 sm:mt-8"
                                >
                                    <span>send another</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 sm:space-y-8">
                                {fields.map((field, index) => {
                                    const delay = 400 + index * 100;
                                    return (
                                        <div
                                            key={field.key}
                                            className={animClass(delay)}
                                            style={animStyle(delay)}
                                        >
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    rows={field.rows}
                                                    placeholder={field.placeholder}
                                                    value={values[field.key]}
                                                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                    className="w-full px-4 py-3 bg-warm-white/70 dark:bg-charcoal/70 backdrop-blur-sm border border-old-gold/10 focus:border-old-gold/50 hover:border-old-gold/30 transition-colors duration-300 font-inter text-warm-gray dark:text-warm-white/80 placeholder:text-warm-gray/60 dark:placeholder:text-warm-white/40 resize-none text-sm sm:text-base"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={values[field.key]}
                                                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                                                    className="w-full px-4 py-3 bg-warm-white/70 dark:bg-charcoal/70 backdrop-blur-sm border border-old-gold/10 focus:border-old-gold/50 hover:border-old-gold/30 transition-colors duration-300 font-inter text-warm-gray dark:text-warm-white/80 placeholder:text-warm-gray/60 dark:placeholder:text-warm-white/40 text-sm sm:text-base"
                                                />
                                            )}
                                        </div>
                                    );
                                })}

                                <div
                                    className={animClass(700)}
                                    style={animStyle(700)}
                                >
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={privacyAgreed}
                                            onChange={(e) => handlePrivacyChange(e.target.checked)}
                                            className="mt-0.5 w-4 h-4 accent-old-gold bg-warm-white/70 dark:bg-charcoal/70 border-old-gold/30 rounded-sm focus:ring-0 focus:ring-offset-0"
                                        />
                                        <span className="font-inter text-xs text-warm-gray dark:text-warm-white/70 leading-relaxed">
                                            I agree to the{' '}
                                            <span className="border-b border-old-gold/30 italic hover:border-old-gold/60 transition-colors">data privacy terms</span> — my name, email, and message will only be used to reply, never shared or stored forever.
                                        </span>
                                    </label>
                                </div>

                                {formError && (
                                    <div
                                        className={animClass(800)}
                                        style={animStyle(800)}
                                    >
                                        <p className="font-inter text-sm text-rose-600/80 dark:text-rose-400/80 border-l-2 border-rose-600/50 dark:border-rose-400/50 pl-3 italic">
                                            {formError}
                                        </p>
                                    </div>
                                )}

                                <div
                                    className={animClass(900)}
                                    style={animStyle(900)}
                                >
                                    <button
                                        onClick={handleSubmit}
                                        className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-old-gold text-warm-white dark:text-dark-teal font-jost text-xs sm:text-sm tracking-[0.15em] uppercase font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(199,159,72,0.3)]"
                                    >
                                        <span className="relative z-10">Submit</span>
                                        <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}