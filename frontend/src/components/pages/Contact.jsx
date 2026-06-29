import React, { useState } from 'react';
import Container from '../common/Container';
import Reveal from '../common/Reveal';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally send the form data (e.g., to an API)
        alert('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section className="bg-white dark:bg-dark-teal min-h-screen pt-28 md:pt-36 pb-20">
            <Container>
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <Reveal>
                        <div className="text-center mb-16 md:mb-20">
                            <span className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold">
                                Get in Touch
                            </span>
                            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-light text-dark-teal dark:text-white mt-4 leading-[1.1]">
                                Let's Connect
                            </h1>
                            <div className="w-16 h-px bg-old-gold/40 mx-auto mt-6" />
                            <p className="font-jost text-sm md:text-base font-light text-black/60 dark:text-white/60 max-w-xl mx-auto mt-6">
                                We'd love to hear from you. Whether you have a question, a collaboration idea,
                                or just want to say hello – reach out.
                            </p>
                        </div>
                    </Reveal>

                    {/* Two-column layout: form + info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Form – takes 2/3 on large screens */}
                        <div className="lg:col-span-2">
                            <Reveal>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block font-jost text-[10px] tracking-[0.2em] uppercase text-old-gold mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 px-1 text-dark-teal dark:text-white font-jost text-base outline-none focus:border-old-gold transition-colors duration-300"
                                            placeholder="e.g., Maria Santos"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block font-jost text-[10px] tracking-[0.2em] uppercase text-old-gold mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 px-1 text-dark-teal dark:text-white font-jost text-base outline-none focus:border-old-gold transition-colors duration-300"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block font-jost text-[10px] tracking-[0.2em] uppercase text-old-gold mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 px-1 text-dark-teal dark:text-white font-jost text-base outline-none resize-y focus:border-old-gold transition-colors duration-300"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="font-jost text-[10px] tracking-[0.3em] uppercase px-10 py-4 bg-old-gold text-white border border-old-gold hover:bg-transparent hover:text-old-gold transition-colors duration-300"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </Reveal>
                        </div>

                        {/* Contact Info – 1/3 */}
                        <div className="lg:col-span-1">
                            <Reveal stagger={0.1} className="space-y-8">
                                <div>
                                    <h3 className="font-jost text-[10px] tracking-[0.3em] uppercase text-old-gold mb-4">
                                        Reach Us
                                    </h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-4">
                                            <FaEnvelope className="text-old-gold text-sm mt-1 flex-shrink-0" />
                                            <a
                                                href="mailto:wel.fragrancecollection@gmail.com"
                                                className="font-jost text-sm font-light text-black/70 dark:text-white/70 hover:text-old-gold transition-colors duration-200"
                                            >
                                                wel.fragrancecollection@gmail.com
                                            </a>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <FaPhoneAlt className="text-old-gold text-sm mt-1 flex-shrink-0" />
                                            <div className="font-jost text-sm font-light text-black/70 dark:text-white/70">
                                                <p>+63 945 705 2630</p>
                                                <p>+63 919 922 5430</p>
                                                <p>+63 955 533 7500</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <FaMapMarkerAlt className="text-old-gold text-sm mt-1 flex-shrink-0" />
                                            <span className="font-jost text-sm font-light text-black/70 dark:text-white/70">
                                                Philippines
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <FaInstagram className="text-old-gold text-sm mt-1 flex-shrink-0" />
                                            <a
                                                href="https://instagram.com/Wel_FragranceCollection"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-jost text-sm font-light text-black/70 dark:text-white/70 hover:text-old-gold transition-colors duration-200"
                                            >
                                                @Wel_FragranceCollection
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-old-gold/10">
                                    <p className="font-playfair text-sm italic text-black/40 dark:text-white/40">
                                        “We believe in the beauty of connection.”
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Contact;