import React from 'react';
import Hero from '../sections/home/Hero';
import Philosophy from '../sections/home/Philosophy';
import Products from '../sections/home/Products';
import Lifestyle from '../sections/home/Lifestyle';
import Testimonials from '../sections/home/Testimonials';
import FAQ from '../sections/home/FAQ';
import CTA from '../sections/home/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-dark-teal dark:text-warm-white">
      <Hero />
      <Philosophy />
      <Products />
      <Lifestyle />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}