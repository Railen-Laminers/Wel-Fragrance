// src/components/pages/MagazineCatalog.jsx
import React from 'react';
import FlipGallery from '@/components/common/FlipGallery';

// ---------- MODEL IMAGES ----------
import DSC09313 from '@/assets/models/DSC09313.webp';
import DSC09348 from '@/assets/models/DSC09348.webp';
import DSC09388 from '@/assets/models/DSC09388.webp';
import DSC09413 from '@/assets/models/DSC09413.webp';
import DSC09428 from '@/assets/models/DSC09428.webp';
import DSC09468 from '@/assets/models/DSC09468.webp';
import DSC09498 from '@/assets/models/DSC09498.webp';
import DSC09525 from '@/assets/models/DSC09525.webp';
import DSC09587 from '@/assets/models/DSC09587.webp';
import DSC09622 from '@/assets/models/DSC09622.webp';
import DSC09675 from '@/assets/models/DSC09675.webp';
import DSC09687 from '@/assets/models/DSC09687.webp';
import DSC09749 from '@/assets/models/DSC09749.webp';

const modelImages = [
  { title: 'Model 1', url: DSC09313 },
  { title: 'Model 2', url: DSC09348 },
  { title: 'Model 3', url: DSC09388 },
  { title: 'Model 4', url: DSC09413 },
  { title: 'Model 5', url: DSC09428 },
  { title: 'Model 6', url: DSC09468 },
  { title: 'Model 7', url: DSC09498 },
  { title: 'Model 8', url: DSC09525 },
  { title: 'Model 9', url: DSC09587 },
  { title: 'Model 10', url: DSC09622 },
  { title: 'Model 11', url: DSC09675 },
  { title: 'Model 12', url: DSC09687 },
  { title: 'Model 13', url: DSC09749 },
];

export default function MagazineCatalog() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-transparent">
      {/* Left-aligned title */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-8 md:pl-12 lg:pl-16 z-10 hidden sm:block">
        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-dark-teal dark:text-warm-white leading-[0.9]">
          Magazine
          <br />
          <span className="italic text-old-gold">Catalog</span>
        </h1>
        {/* Optional decorative line */}
        <div className="mt-4 w-16 h-px bg-old-gold/50" />
        <p className="mt-4 font-jost text-xs tracking-[0.2em] text-warm-gray dark:text-warm-white/70 uppercase">
          Our Collection
        </p>
      </div>

      {/* Centered gallery – same as before */}
      <FlipGallery images={modelImages} />
    </div>
  );
}