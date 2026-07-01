import React, { useEffect, useState, useRef } from "react";

import jaime from "../../../assets/products/jaime.webp";
import joe from "../../../assets/products/joe.webp";
import lenski from "../../../assets/products/lenski.webp";

/**
 * Hero — Wel Fragrance Collection
 * ------------------------------------------------------------------
 * Three signature bottles presented as overlapping images with
 * a slow-drifting mist. Plain images, no card styling, no rotation.
 */

const CARDS = [
  {
    src: jaime,
    alt: "Jaime — Wel Fragrance Collection",
    y: 18,
    z: 10,
    delay: 0,
  },
  {
    src: joe,
    alt: "Joe — Wel Fragrance Collection",
    y: -6,
    z: 20,
    delay: 0.12,
  },
  {
    src: lenski,
    alt: "Lenski — Wel Fragrance Collection",
    y: 26,
    z: 15,
    delay: 0.24,
  },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 监听鼠标移动，计算相对于 Hero 区域的位置
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // 计算鼠标在 Hero 区域内的相对位置 (0 到 1)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 计算背景偏移量：基于鼠标位置，偏移范围在 -2% 到 2% 之间
  const backgroundOffsetX = (mousePosition.x - 0.5) * 4; // -2% to 2%
  const backgroundOffsetY = (mousePosition.y - 0.5) * 4; // -2% to 2%

  return (
    <>
      <section
        ref={heroRef}
        className="relative isolate w-full overflow-hidden bg-dark-teal px-6 py-28 sm:px-10"
      >
        {/* ---------- Ambient background (full‑width) ---------- */}
        {/* 背景层应用平滑的视差移动 */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translate(${backgroundOffsetX}%, ${backgroundOffsetY}%)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_112%,rgba(199,159,72,0.16)_0%,rgba(199,159,72,0)_55%),radial-gradient(90%_70%_at_18%_-10%,rgba(199,159,72,0.10)_0%,rgba(199,159,72,0)_60%),radial-gradient(80%_60%_at_88%_0%,rgba(120,180,190,0.10)_0%,rgba(120,180,190,0)_55%),linear-gradient(180deg,#081a21_0%,#0B212A_45%,#0B212A_100%)]" />

          <div className="absolute -left-1/4 top-1/3 h-[60vw] w-[60vw] max-h-[720px] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(245,241,229,0.05)_0%,rgba(245,241,229,0)_70%)] blur-3xl animate-mist-drift-slow" />
          <div className="absolute -right-1/4 top-0 h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] rounded-full bg-[radial-gradient(circle,rgba(199,159,72,0.09)_0%,rgba(199,159,72,0)_70%)] blur-3xl animate-mist-drift-slower" />

          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0)_38%,rgba(255,255,255,0.035)_48%,rgba(255,255,255,0)_58%)]" />
          <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
        </div>

        {/* ---------- Content wrapper (constrained & centred) ---------- */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
          {/* Copy */}
          <div className="flex max-w-3xl flex-col items-center text-center">
            <span className="mb-5 font-jost text-[0.7rem] font-medium uppercase tracking-[0.32em] text-old-gold/90 sm:text-xs">
              Wel Fragrance Collection
            </span>

            <h1 className="font-playfair text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.98] tracking-[-0.02em] text-white">
              Scent, carried
              <br className="hidden sm:block" /> between{" "}
              <span className="font-cormorant italic text-old-gold">
                two shores
              </span>
            </h1>

            <p className="mt-6 max-w-xl font-cormorant text-lg italic text-white/60 sm:text-xl">
              Three signature expressions, composed where Manila's warmth
              meets Montréal's quiet cool.
            </p>
          </div>

          {/* Floating images */}
          {isMobile ? (
            <div className="relative z-10 mt-16 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CARDS.map((card, i) => (
                <div
                  key={card.alt}
                  className="relative aspect-[3/4.3] w-[68vw] max-w-[280px] flex-shrink-0 snap-center"
                  style={{ zIndex: card.z }}
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative z-10 mt-16 flex h-[420px] w-full max-w-[860px] items-center justify-center md:h-[460px]">
              {CARDS.map((card, i) => {
                const offsetX = (i - 1) * 190;
                return (
                  <div
                    key={card.alt}
                    className="absolute w-[220px] md:w-[250px] transition-transform duration-500 ease-out hover:scale-105 hover:z-30 group"
                    style={{
                      left: "50%",
                      transform: `translate(calc(-50% + ${offsetX}px), ${card.y}px) rotate(0deg)`,
                      zIndex: card.z,
                    }}
                  >
                    <div
                      className={
                        i === 0
                          ? "animate-card-float-a"
                          : i === 1
                          ? "animate-card-float-b"
                          : "animate-card-float-c"
                      }
                    >
                      <div className="aspect-[3/4.3] w-full overflow-hidden rounded-lg shadow-lg transition-shadow duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-old-gold/20">
                        <img
                          src={card.src}
                          alt={card.alt}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          loading={i === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Scroll cue */}
          <div className="relative z-10 mt-16 flex flex-col items-center gap-3 sm:mt-20">
            <span className="font-jost text-[0.65rem] uppercase tracking-[0.28em] text-white/40">
              Discover the collection
            </span>
            <span className="h-9 w-px bg-gradient-to-b from-old-gold/70 to-transparent animate-scroll-line" />
          </div>
        </div>

        {/* ---------- Keyframes ---------- */}
        <style>{`
          @keyframes mist-drift-slow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(3%, -4%) scale(1.06); }
          }
          @keyframes mist-drift-slower {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-4%, 3%) scale(1.05); }
          }
          @keyframes card-float-a {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes card-float-b {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-14px); }
          }
          @keyframes card-float-c {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes scroll-line {
            0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
            40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
            60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
            100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
          }
          .animate-mist-drift-slow { animation: mist-drift-slow 16s ease-in-out infinite; }
          .animate-mist-drift-slower { animation: mist-drift-slower 20s ease-in-out infinite; }
          .animate-card-float-a { animation: card-float-a 6s ease-in-out infinite; }
          .animate-card-float-b { animation: card-float-b 7s ease-in-out infinite 0.4s; }
          .animate-card-float-c { animation: card-float-c 6.5s ease-in-out infinite 0.8s; }
          .animate-scroll-line { animation: scroll-line 2.4s ease-in-out infinite; }

          @media (prefers-reduced-motion: reduce) {
            .animate-mist-drift-slow,
            .animate-mist-drift-slower,
            .animate-card-float-a,
            .animate-card-float-b,
            .animate-card-float-c,
            .animate-scroll-line {
              animation: none !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}