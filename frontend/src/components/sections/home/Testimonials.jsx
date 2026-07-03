import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// --- Testimonial data (3 stories, cycled) ---
const testimonialsData = [
  {
    author: 'Isabella Reyes',
    location: 'Manila, Philippines',
    quote:
      "Wel Fragrance Collection has completely transformed how I approach my daily ritual. The Midnight Orchid is now my signature scent — people always ask what I'm wearing.",
    rating: 5,
  },
  {
    author: 'Marcus Chen',
    location: 'Vancouver, Canada',
    quote:
      "I discovered Wel in Toronto and was immediately captivated. The craftsmanship is extraordinary — each fragrance tells a story that feels deeply personal.",
    rating: 5,
  },
  {
    author: 'Sofia Alonzo',
    location: 'Cebu, Philippines',
    quote:
      "Gifting a Wel fragrance has become my go-to for every special occasion. The packaging alone is a work of art, but the scent... unforgettable.",
    rating: 5,
  },
];

// --- Image data (profile photos) ---
const testimonialsImages = [
  { imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300', alt: 'Professional Man' },
  { imgSrc: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300', alt: 'Smiling Man' },
  { imgSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300', alt: 'Professional Woman' },
  { imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300', alt: 'Smiling Woman' },
  { imgSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300', alt: 'Man in a suit' },
  { imgSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300', alt: 'Bearded Man' },
  { imgSrc: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=300', alt: 'Man in a blue shirt' },
  { imgSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300', alt: 'Older Man' },
  { imgSrc: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=300', alt: 'Woman with curly hair' },
  { imgSrc: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300', alt: 'Woman in an office' },
  { imgSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300', alt: 'Woman with glasses' },
  { imgSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300', alt: 'Woman with a dog' },
];

// --- Desktop / tablet positions (revised to avoid clipping and use consistent sizing) ---
const desktopPositions = [
  { top: '5%', left: '8%', size: 'w-24 h-24' },
  { top: '10%', left: '28%', size: 'w-20 h-20' },
  { top: '3%', left: '52%', size: 'w-16 h-16' },
  { top: '8%', right: '10%', size: 'w-28 h-28' },
  { top: '22%', right: '4%', size: 'w-20 h-20' },
  { top: '44%', right: '6%', size: 'w-24 h-24' },
  { top: '48%', left: '4%', size: 'w-28 h-28' },
  { bottom: '5%', left: '16%', size: 'w-20 h-20' },
  { bottom: '12%', left: '40%', size: 'w-16 h-16' },
  { bottom: '8%', right: '24%', size: 'w-24 h-24' },
  { bottom: '2%', right: '10%', size: 'w-20 h-20' },
];

// --- Mobile-only positions (kept inside viewport) ---
const mobilePositions = [
  { top: '4%', left: '6%', size: 'w-14 h-14' },
  { top: '4%', right: '6%', size: 'w-16 h-16' },
  { top: '30%', left: '2%', size: 'w-14 h-14' },
  { top: '30%', right: '2%', size: 'w-16 h-16' },
  { bottom: '10%', left: '10%', size: 'w-16 h-16' },
  { bottom: '10%', right: '8%', size: 'w-14 h-14' },
];

// --- Star component ---
function Stars({ count }) {
  return (
    <div className="flex gap-0.5 justify-center">
      {[...Array(count)].map((_, i) => (
        <svg key={i} className="w-3 h-3 text-old-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function FloatingImage({ position, image, testimonial, refCallback }) {
  const floatDuration = 4 + Math.random() * 5;
  const floatDelay = Math.random() * 2;
  const floatStyle = {
    animation: `float ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate`,
  };

  // We now use only 'block' – no responsive 'hidden' – because we control visibility via the container's overflow and positioning.
  return (
    <div
      ref={refCallback}
      className={cn(
        'absolute rounded-lg shadow-xl border-2 border-old-gold/10 hover:border-old-gold/30 transition-all duration-300 group floating-image',
        position.size // size classes: w-* h-*
      )}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        ...floatStyle,
        // Ensure they are above the background but below the CTA
        zIndex: 10,
      }}
    >
      <img
        src={image.imgSrc}
        alt={image.alt}
        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
      />

      {/* Tooltip */}
      <div
        className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-48 sm:w-60 p-3 sm:p-4 rounded-lg bg-warm-white/95 dark:bg-charcoal/95 backdrop-blur-sm border border-old-gold/20 shadow-xl opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:-translate-y-1 z-30"
        style={{ transformOrigin: 'bottom center' }}
      >
        <Stars count={testimonial.rating} />
        <blockquote className="mt-1.5 font-cormorant italic text-xs sm:text-sm text-dark-teal dark:text-warm-white leading-snug text-center">
          "{testimonial.quote.length > 70 ? testimonial.quote.slice(0, 70) + '…' : testimonial.quote}"
        </blockquote>
        <div className="mt-2 text-center">
          <p className="font-jost text-[9px] sm:text-[10px] tracking-[0.15em] text-old-gold uppercase">
            {testimonial.author}
          </p>
          <p className="font-inter text-warm-gray dark:text-warm-white/60 text-[9px] sm:text-[10px] mt-0.5">
            {testimonial.location}
          </p>
        </div>
        {/* Caret */}
        <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-warm-white/95 dark:bg-charcoal/95 border-r border-b border-old-gold/20" />
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true, // animates only once even if you scroll back
        },
      });

      // Image animations – each image fades in and scales up
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        const delay = 0.1 + i * 0.08;
        gsap.from(el, {
          opacity: 0,
          scale: 0.5,
          duration: 0.9,
          delay: delay,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom', // triggers as soon as the section enters viewport
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let refIndex = 0;
  const setRef = (el) => {
    imageRefs.current[refIndex] = el;
    refIndex += 1;
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-32 z-10 bg-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- HEADER --- */}
        <div ref={headingRef} className="text-center mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
            <div className="relative inline-block px-3 sm:px-4 py-1 sm:py-1.5">
              <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-old-gold/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-old-gold/60" />
              <span className="font-jost text-[10px] sm:text-xs tracking-[0.3em] text-old-gold uppercase whitespace-nowrap">
                Testimonials
              </span>
            </div>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dark-teal dark:text-warm-white leading-tight">
            Voices of <span className="italic text-old-gold">Elegance</span>
          </h2>
        </div>

        {/* --- FLOATING IMAGES GRID --- */}
        {/* Increased minHeight to ensure all images have space */}
        <div className="relative w-full overflow-hidden" style={{ minHeight: '750px' }}>
          <div className="absolute inset-0">
            {/* Desktop / tablet set – visible on all screen sizes, but sized appropriately */}
            {desktopPositions.map((position, index) => {
              const image = testimonialsImages[index % testimonialsImages.length];
              const testimonial = testimonialsData[index % testimonialsData.length];
              return (
                <FloatingImage
                  key={`desktop-${index}`}
                  position={position}
                  image={image}
                  testimonial={testimonial}
                  refCallback={setRef}
                />
              );
            })}

            {/* Mobile-only set – also visible but we can hide on larger screens if desired; here we keep them but they may overlap. 
                To avoid clutter, we hide them on md and up. */}
            {mobilePositions.map((position, index) => {
              const image = testimonialsImages[index % testimonialsImages.length];
              const testimonial = testimonialsData[index % testimonialsData.length];
              return (
                <div
                  key={`mobile-${index}`}
                  className="block md:hidden" // Only visible on mobile
                  style={{ position: 'absolute', top: position.top, left: position.left, right: position.right, bottom: position.bottom }}
                >
                  <FloatingImage
                    position={{ ...position, size: position.size }} // reuse same size
                    image={image}
                    testimonial={testimonial}
                    refCallback={setRef}
                  />
                </div>
              );
            })}
          </div>

          {/* --- CENTERED CTA BUTTON --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <a
              href="#share"
              className="pointer-events-auto group relative px-8 sm:px-12 py-4 sm:py-5 bg-old-gold text-warm-white dark:text-dark-teal font-jost text-sm sm:text-base tracking-[0.15em] uppercase font-medium overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(199,159,72,0.3)]"
            >
              <span className="relative z-10">Share Your Story</span>
              <div className="absolute inset-0 bg-dark-teal dark:bg-warm-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
          </div>
        </div>
      </div>

      {/* CSS floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-16px); }
        }
      `}</style>
    </section>
  );
}