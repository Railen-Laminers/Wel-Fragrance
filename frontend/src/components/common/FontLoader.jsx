import React from 'react';

const FontLoader = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: #0A0A0A; color: #F5F0E8; font-family: 'Jost', sans-serif; }

    :root {
      --black:   #0A0A0A;
      --ivory:   #F5F0E8;
      --charcoal:#2C2C2C;
      --stone:   #B8A99A;
      --white:   #FFFFFF;
      --mid:     #6B6055;
    }

    .serif { font-family: 'Cormorant Garamond', serif; }
    .sans  { font-family: 'Jost', sans-serif; }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--stone); }

    .nav-glass {
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      background: rgba(10,10,10,0.72);
      border-bottom: 1px solid rgba(184,169,154,0.12);
    }

    .btn-outline {
      border: 1px solid rgba(245,240,232,0.35);
      letter-spacing: 0.18em;
      transition: background 0.4s, color 0.4s, border-color 0.4s;
    }
    .btn-outline:hover {
      background: var(--ivory);
      color: var(--black);
      border-color: var(--ivory);
    }
    .btn-dark {
      background: var(--ivory);
      color: var(--black);
      letter-spacing: 0.18em;
      transition: background 0.4s, color 0.4s;
    }
    .btn-dark:hover {
      background: transparent;
      color: var(--ivory);
      border-color: var(--ivory);
    }

    .product-card:hover .product-overlay { opacity: 1; }
    .product-card:hover img { transform: scale(1.04); }

    .divider {
      width: 40px; height: 1px;
      background: var(--stone);
      display: inline-block;
    }
  `}</style>
);

export default FontLoader;