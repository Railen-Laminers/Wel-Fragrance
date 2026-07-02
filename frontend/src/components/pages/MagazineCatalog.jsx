// src/components/pages/MagazineCatalog.jsx
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

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

// ---------- PRODUCT DATA (all tags are now empty strings) ----------
const allProducts = [
    { id: 1, name: 'Midnight Orchid', notes: 'Black Orchid, Vanilla, Sandalwood', price: '', tag: '', story: 'A mysterious blend of dark florals and warm vanilla, inspired by the allure of a moonlit garden. Perfect for evening elegance.' },
    { id: 2, name: 'Golden Dawn', notes: 'Bergamot, Jasmine, Amber', price: '', tag: '', story: 'Bright citrus and luminous florals capture the first light of morning, awakening the senses with optimism and grace.' },
    { id: 3, name: 'Velvet Rose', notes: 'Damask Rose, Oud, Musk', price: '', tag: '', story: 'Luxurious rose layered with smoky oud and soft musk – a timeless scent that embodies refined sensuality.' },
    { id: 4, name: 'Ocean Whisper', notes: 'Sea Salt, Citrus, Driftwood', price: '', tag: '', story: 'A breath of fresh sea air, with zesty citrus and sun‑bleached driftwood. Evokes the freedom of endless shores.' },
    { id: 5, name: 'Santal Noir', notes: 'Sandalwood, Cedar, Cardamom', price: '', tag: '', story: 'Creamy sandalwood and warm cedar, spiced with cardamom. A woody, sophisticated scent for the discerning connoisseur.' },
    { id: 6, name: 'Jardin de Minuit', notes: 'Lavender, Iris, Musk', price: '', tag: '', story: 'A midnight garden in full bloom – powdery iris and calming lavender softened by velvety musk.' },
    { id: 7, name: 'Café Noir', notes: 'Coffee, Tonka, Vetiver', price: '', tag: '', story: 'Rich, roasted coffee beans meet sweet tonka and earthy vetiver. A bold, addictive fragrance for the urban explorer.' },
    { id: 8, name: "L'Eau d'Été", notes: 'Neroli, Bergamot, Basil', price: '', tag: '', story: 'A fresh, aromatic blend of sunny neroli, zesty bergamot, and aromatic basil – the essence of a Mediterranean summer.' },
    { id: 9, name: 'Ambre Suprême', notes: 'Amber, Vanilla, Benzoin', price: '', tag: '', story: 'A warm, resinous amber with creamy vanilla and benzoin. Deeply comforting and radiant, like a golden sunset.' },
    { id: 10, name: 'Fleur de Peau', notes: 'Rose, Violet, Aldehydes', price: '', tag: '', story: 'A powdery, floral bouquet of rose and violet, lifted by sparkling aldehydes. It whispers of vintage glamour.' },
    { id: 11, name: 'Bois Mystérieux', notes: 'Oud, Incense, Leather', price: '', tag: '', story: 'An enigmatic blend of smoky oud, sacred incense, and supple leather. A scent that commands attention and intrigue.' },
    { id: 12, name: 'Eau de Rêve', notes: 'Lily, Jasmine, White Musk', price: '', tag: '', story: 'A dreamy, ethereal composition of white florals and clean musk. Soft, luminous, and effortlessly romantic.' },
    { id: 13, name: 'Spice Route', notes: 'Cinnamon, Clove, Pepper', price: '', tag: '', story: 'A warm, spicy journey through exotic bazaars – cinnamon, clove, and black pepper mingle with a touch of sweetness.' },
    { id: 14, name: 'Vétiver Intense', notes: 'Vetiver, Grapefruit, Cedar', price: '', tag: '', story: 'Intensely earthy vetiver brightened by juicy grapefruit and grounded by cedar. A modern classic for the bold.' },
    { id: 15, name: 'Myrrh & Encens', notes: 'Myrrh, Frankincense, Labdanum', price: '', tag: '', story: 'Ancient resins of myrrh and frankincense, deepened with labdanum. A sacred, meditative fragrance of timeless spirituality.' },
];

// ---------- MAP MODEL IMAGES TO PRODUCTS ----------
const modelImages = [
    DSC09313, DSC09348, DSC09388, DSC09413, DSC09428,
    DSC09468, DSC09498, DSC09525, DSC09587, DSC09622,
    DSC09675, DSC09687, DSC09749,
];

const catalogData = allProducts.map((product, index) => ({
    ...product,
    modelImage: modelImages[index % modelImages.length],
}));

// ---------- COMPONENT ----------
export default function MagazineCatalog() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipping, setFlipping] = useState(false);

    const currentIndexRef = useRef(0);
    const isAnimatingRef = useRef(false);

    const pageRef = useRef(null);
    const shadowRef = useRef(null);
    const tlRef = useRef(null);

    const totalPages = catalogData.length;

    // Render page content (no overlay, text left-aligned)
    const renderPageContent = (index) => {
        const page = catalogData[index];
        return `
      <div class="magazine-page-content" style="background-image: url(${page.modelImage});">
        <div class="magazine-text-block">
          ${page.tag ? `<span class="magazine-tag">${page.tag}</span>` : ''}
          <h2 class="magazine-title">${page.name}</h2>
          <p class="magazine-notes">${page.notes}</p>
          <p class="magazine-story">${page.story}</p>
        </div>
      </div>
    `;
    };

    // Preload images
    useEffect(() => {
        modelImages.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Initial render
    useEffect(() => {
        pageRef.current.innerHTML = renderPageContent(0);
        return () => {
            tlRef.current?.kill();
        };
    }, []);

    const goTo = (direction) => {
        if (isAnimatingRef.current || totalPages <= 1) return;
        isAnimatingRef.current = true;
        setFlipping(true);

        const nextIndex =
            (currentIndexRef.current + direction + totalPages) % totalPages;

        const rotateOut = direction > 0 ? -92 : 92;
        const rotateInStart = direction > 0 ? 92 : -92;

        const tl = gsap.timeline({
            defaults: { transformOrigin: '50% 50%' },
            onComplete: () => {
                isAnimatingRef.current = false;
                setFlipping(false);
            },
        });
        tlRef.current = tl;

        tl.set(pageRef.current, { willChange: 'transform' })
            .to(pageRef.current, {
                rotationY: rotateOut,
                duration: 0.34,
                ease: 'power2.in',
            }, 0)
            .to(shadowRef.current, {
                opacity: 0.35,
                duration: 0.17,
                ease: 'power1.in',
            }, 0)
            .call(() => {
                currentIndexRef.current = nextIndex;
                setCurrentIndex(nextIndex);
                pageRef.current.innerHTML = renderPageContent(nextIndex);
                gsap.set(pageRef.current, { rotationY: rotateInStart });
            })
            .to(pageRef.current, {
                rotationY: 0,
                duration: 0.34,
                ease: 'power2.out',
            })
            .to(shadowRef.current, {
                opacity: 0,
                duration: 0.28,
                ease: 'power1.out',
            }, '<')
            .set(pageRef.current, { willChange: 'auto' });
    };

    const flipNext = () => goTo(1);
    const flipPrev = () => goTo(-1);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipNext();
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <style>{`
        /* Full viewport container – transparent background */
        .magazine-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          padding: 0;
          margin: 0;
          perspective: 1400px;
          overflow: hidden;
        }

        .magazine-card-wrapper {
          flex: 1;
          width: 100%;
          max-width: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .magazine-card {
          width: 100%;
          height: 100%;
          max-height: calc(100vh - 120px);
          aspect-ratio: 3 / 4;
          position: relative;
          background: transparent;
        }

        .magazine-page {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
          background: transparent;
        }

        .magazine-page-shadow {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%);
          opacity: 0;
          pointer-events: none;
          z-index: 2;
        }

        /* New layout: flex container, no overlay, text on left */
        .magazine-page-content {
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-color: transparent;
          padding: 2.5rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;          /* vertical center */
          justify-content: flex-start;   /* left */
          position: relative;
        }

        .magazine-text-block {
          max-width: 55%;
          color: white;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.3);
          font-family: 'Inter', sans-serif;
        }

        .magazine-tag {
          display: inline-block;
          background: #c79f48;
          color: white;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.25rem 0.8rem;
          margin-bottom: 0.8rem;
          text-shadow: none; /* no shadow on tag itself */
        }

        .magazine-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          line-height: 1.1;
        }

        .magazine-notes {
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          opacity: 0.85;
          margin-bottom: 0.75rem;
        }

        .magazine-story {
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.9;
          font-style: italic;
          margin-bottom: 0;
        }

        /* Controls (unchanged) */
        .magazine-controls {
          width: 100%;
          max-width: 1000px;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent;
        }

        .magazine-btn {
          background: transparent;
          border: none;
          color: #1a2e2c;
          cursor: pointer;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          transition: color 0.3s ease, opacity 0.3s ease;
          border-radius: 2px;
        }

        .magazine-btn:hover:not(:disabled) {
          color: #c79f48;
        }

        .magazine-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .dark .magazine-btn {
          color: #faf8f5;
        }

        .dark .magazine-btn:hover:not(:disabled) {
          color: #c79f48;
        }

        .magazine-btn svg {
          width: 24px;
          height: 24px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }

        .magazine-page-indicator {
          font-family: 'Jost', sans-serif;
          font-size: 0.9rem;
          color: #1a2e2c;
          letter-spacing: 0.1em;
        }

        .dark .magazine-page-indicator {
          color: #faf8f5;
        }

        @media (max-width: 768px) {
          .magazine-page-content {
            padding: 1.5rem;
          }
          .magazine-text-block {
            max-width: 85%;
          }
          .magazine-title {
            font-size: 2.2rem;
          }
          .magazine-card {
            max-height: calc(100vh - 100px);
          }
          .magazine-controls {
            padding: 0.5rem 1rem;
          }
        }
      `}</style>

            <div className="magazine-container">
                <div className="magazine-card-wrapper">
                    <div className="magazine-card">
                        <div className="magazine-page" ref={pageRef}></div>
                        <div className="magazine-page-shadow" ref={shadowRef}></div>
                    </div>
                </div>

                <div className="magazine-controls">
                    <button className="magazine-btn prev" onClick={flipPrev} disabled={flipping || totalPages <= 1}>
                        <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                        Prev
                    </button>
                    <span className="magazine-page-indicator">
                        {currentIndex + 1} / {totalPages}
                    </span>
                    <button className="magazine-btn next" onClick={flipNext} disabled={flipping || totalPages <= 1}>
                        Next
                        <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
                    </button>
                </div>
            </div>
        </>
    );
}