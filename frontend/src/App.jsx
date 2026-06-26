import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { bgImages, modelImages, productImages } from './assets/images';
import navLogo from '/navLogo.png';

// ─── Container Component ────────────────────────────────────────────────────
const Container = ({ children, background = 'transparent', className = '', style = {} }) => (
  <div className={className} style={{ maxWidth: '1440px', margin: '0 auto', background, ...style }}>
    <div style={{ padding: '0 40px' }}>
      {children}
    </div>
  </div>
);

// ─── Google Fonts & Global Styles ──────────────────────────────────────────
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

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const IconMenu = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
    <line x1="0" y1="1" x2="22" y2="1" stroke="#F5F0E8" strokeWidth="1" />
    <line x1="4" y1="7" x2="22" y2="7" stroke="#F5F0E8" strokeWidth="1" />
    <line x1="8" y1="13" x2="22" y2="13" stroke="#F5F0E8" strokeWidth="1" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <line x1="1" y1="1" x2="17" y2="17" stroke="#F5F0E8" strokeWidth="1" />
    <line x1="17" y1="1" x2="1" y2="17" stroke="#F5F0E8" strokeWidth="1" />
  </svg>
);
const IconArrow = ({ dir = "right" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Optimized Lazy Image Component ────────────────────────────────────────
const LazyImage = ({ src, alt, className, style }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ ...style, position: 'relative', overflow: 'hidden', background: '#1a1a1a' }}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            willChange: 'transform, opacity',
          }}
        />
      )}
      {!loaded && inView && (
        <div style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }} />
      )}
    </div>
  );
};

// ─── Scroll-reveal wrapper ──────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 32, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Section label ──────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
    <span className="divider" />
    <span className="sans" style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--stone)", textTransform: "uppercase" }}>{text}</span>
  </div>
);

// ─── Navigation – Logo left, Burger right ──────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Products", "Models", "Contact"];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 32px",
          height: 80,
          display: "flex",
          alignItems: "center",
          transition: "background 0.5s",
        }}
      >
        {/* Constrained inner container – this gets the glass effect */}
        <div
          className={scrolled ? "nav-glass" : ""}
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "0 24px",
            transition: "all 0.4s ease",
            borderRadius: scrolled ? "16px" : "0",
          }}
        >
          {/* Logo – left */}
          <div style={{ height: 40, display: "flex", alignItems: "center" }}>
            <img
              src={navLogo}
              alt="Wel Fragrance"
              style={{ height: "100%", width: "auto", objectFit: "contain" }}
            />
          </div>

          {/* Burger – right */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <IconMenu />
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen menu – unchanged */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "var(--black)",
              display: "flex",
              flexDirection: "column",
              padding: "72px 40px",
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: 28,
                right: 32,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <IconClose />
            </button>
            <div
              className="serif"
              style={{
                fontSize: 18,
                letterSpacing: "0.22em",
                color: "var(--stone)",
                marginBottom: 64,
              }}
            >
              WEL
            </div>
            {[...links, "Contact"].map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setMenuOpen(false)}
                className="serif"
                style={{
                  fontSize: 44,
                  fontWeight: 300,
                  color: "var(--ivory)",
                  textDecoration: "none",
                  lineHeight: 1.15,
                  borderBottom: "1px solid rgba(184,169,154,0.1)",
                  paddingBottom: 20,
                  marginBottom: 20,
                  display: "block",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--stone)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--ivory)")
                }
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref}>
      <Container
        background="#0D0C0B"
        style={{
          height: "100vh",
          maxHeight: "1000px",
          minHeight: "600px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Parallax background */}
        <motion.div style={{ y, position: "absolute", inset: 0, zIndex: 0 }}>
          <LazyImage
            src={bgImages.wel}
            alt="Wel Fragrance"
            style={{ width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 20%", opacity: 0.55 }}
          />
        </motion.div>

        {/* Vignette & gradient */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.7) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, #0A0A0A, transparent)", zIndex: 1 }} />

        {/* Content */}
        <motion.div style={{ opacity, position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 20px", width: "100%" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 36 }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="35" stroke="rgba(184,169,154,0.3)" strokeWidth="0.75" />
              <circle cx="36" cy="36" r="30" stroke="rgba(184,169,154,0.15)" strokeWidth="0.5" />
              <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle"
                fontFamily="Cormorant Garamond, serif" fontSize="32" fontWeight="300"
                fill="#B8A99A" letterSpacing="2">W</text>
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="serif"
            style={{ fontSize: "clamp(42px,7vw,88px)", fontWeight: 300, color: "var(--ivory)", lineHeight: 1.05, letterSpacing: "0.02em", maxWidth: 820 }}
          >The Scent of<br /><em style={{ fontStyle: "italic", color: "var(--stone)" }}>Quiet Luxury</em></motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="sans"
            style={{ fontSize: 14, fontWeight: 300, color: "var(--stone)", letterSpacing: "0.06em", marginTop: 28, maxWidth: 440, lineHeight: 1.9 }}
          >Refined compositions born from rare materials,<br />crafted for those who speak without words.</motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.9 }}
            style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}
          >
            <a href="#products" className="btn-dark sans" style={{
              padding: "14px 36px", fontSize: 11, textDecoration: "none",
              textTransform: "uppercase", border: "1px solid var(--ivory)", display: "inline-block"
            }}>Explore Collection</a>
            <a href="#about" className="btn-outline sans" style={{
              padding: "14px 36px", fontSize: 11, textDecoration: "none",
              textTransform: "uppercase", display: "inline-block", color: "var(--ivory)"
            }}>Our Story</a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 10 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            <svg width="1" height="48" viewBox="0 0 1 48">
              <line x1="0.5" y1="0" x2="0.5" y2="48" stroke="rgba(184,169,154,0.4)" strokeWidth="1" />
            </svg>
          </motion.div>
          <span className="sans" style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--stone)", textTransform: "uppercase" }}>Scroll</span>
        </motion.div>
      </Container>
    </section>
  );
};

// ─── About ──────────────────────────────────────────────────────────────────
const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref}>
      <Container background="#0E0D0B" style={{ padding: "120px 0", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal y={0}>
            <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/5" }}>
              <motion.div style={{ y: imageY, position: "relative", height: "115%" }}>
                <LazyImage
                  src={modelImages.dsc09312}
                  alt="Brand Story"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
              <div style={{ position: "absolute", bottom: -1, left: -1, width: "40%", height: 1, background: "var(--stone)" }} />
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <SectionLabel text="Our Story" />
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="serif" style={{ fontSize: "clamp(32px,4vw,54px)", fontWeight: 300, color: "var(--ivory)", lineHeight: 1.15, marginBottom: 32 }}>
                Born from the belief that <em>scent is memory</em>
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="sans" style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "var(--stone)", marginBottom: 24 }}>
                Wel Fragrance was founded in 2019 with a singular vision — to distill the most fleeting of human experiences into something that lingers. Every bottle in our collection is an ode to a place, an emotion, a fleeting afternoon light that cannot be photographed.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="sans" style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "var(--stone)", marginBottom: 48 }}>
                Our perfumers travel the world — from the oud markets of the Middle East to the lavender fields of Grasse — sourcing only raw materials worthy of the name Wel.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <a href="#products" className="sans btn-outline" style={{
                padding: "14px 32px", fontSize: 11, textDecoration: "none",
                textTransform: "uppercase", color: "var(--ivory)", display: "inline-block"
              }}>Discover the Collection <span style={{ marginLeft: 8, opacity: 0.6 }}>→</span></a>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

// ─── Products & Models ──────────────────────────────────────────────────────
const ProductsModels = () => {
  const productEntries = Object.entries(productImages);
  const modelEntries = Object.entries(modelImages);

  return (
    <Container background="var(--black)" style={{ padding: "120px 0", borderTop: "1px solid rgba(184,169,154,0.07)" }}>
      <Reveal>
        <SectionLabel text="The Collection" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <h2 className="serif" style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 300, color: "var(--ivory)", lineHeight: 1.1, maxWidth: 520 }}>
            Fragrances that<br /><em>define a moment</em>
          </h2>
          <span className="sans" style={{ fontSize: 11, color: "var(--mid)", letterSpacing: "0.1em" }}>{productEntries.length} fragrances</span>
        </div>
      </Reveal>

      {/* Products Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 28, marginBottom: 80 }}>
        {productEntries.map(([name, image], idx) => (
          <Reveal key={idx} delay={idx * 0.03}>
            <div className="product-card" style={{ cursor: "pointer", position: "relative" }}>
              <div style={{ position: "relative", overflow: "hidden", aspectRatio: "3/4", background: "#141414" }}>
                <LazyImage
                  src={image}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }}
                />
                <div className="product-overlay" style={{
                  position: "absolute", inset: 0,
                  background: "rgba(10,10,10,0.4)",
                  display: "flex", alignItems: "flex-end", padding: 20,
                  opacity: 0, transition: "opacity 0.5s ease",
                }}>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--ivory)", textTransform: "uppercase" }}>
                    {name.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 16 }}>
                <div className="serif" style={{ fontSize: 18, fontWeight: 400, color: "var(--ivory)", letterSpacing: "0.02em" }}>
                  {name.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Models Gallery */}
      <div id="models">
        <Reveal>
          <SectionLabel text="Behind the Lens" />
          <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "var(--ivory)", marginBottom: 48, lineHeight: 1.1 }}>
            The art of <em>visual storytelling</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
          {modelEntries.map(([_, image], idx) => (
            <Reveal key={idx} delay={idx * 0.02}>
              <div style={{ overflow: "hidden", aspectRatio: "3/4", background: "#141414" }}>
                <LazyImage
                  src={image}
                  alt={`Model ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
};

// ─── Contact ─────────────────────────────────────────────────────────────────
const Contact = () => {
  return (
    <Container background="#0E0D0B" style={{ padding: "100px 0", borderTop: "1px solid rgba(184,169,154,0.08)" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div className="serif" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--stone)", textTransform: "uppercase", marginBottom: 20 }}>Maison Wel</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "var(--ivory)", marginBottom: 16, lineHeight: 1.2 }}>
            Let’s create something<br />extraordinary together
          </h2>
          <p className="sans" style={{ fontSize: 14, fontWeight: 300, color: "var(--stone)", marginBottom: 40, lineHeight: 1.9 }}>
            For inquiries, collaborations, or simply to share your fragrance story — we’d love to hear from you.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <a href="mailto:hello@welfragrance.com" className="serif" style={{ fontSize: 24, color: "var(--ivory)", textDecoration: "none", borderBottom: "1px solid rgba(184,169,154,0.3)", paddingBottom: 4 }}>
              hello@welfragrance.com
            </a>
            <p className="sans" style={{ fontSize: 13, color: "var(--mid)", letterSpacing: "0.06em" }}>Grasse, France</p>
          </div>
          <Reveal delay={0.3}>
            <a href="#" className="sans btn-dark" style={{
              padding: "14px 48px", fontSize: 11, textDecoration: "none",
              textTransform: "uppercase", display: "inline-block", marginTop: 48,
              border: "1px solid var(--ivory)",
            }}>Get in Touch</a>
          </Reveal>
        </Reveal>
      </div>
    </Container>
  );
};

// ─── Footer ─────────────────────────────────────────────────────────────────
const Footer = () => {
  const links = ["About", "Products", "Models", "Contact"];

  return (
    <Container background="var(--black)" style={{ padding: "64px 0 32px" }}>
      <div style={{ paddingBottom: 48, borderBottom: "1px solid rgba(184,169,154,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div className="serif" style={{ fontSize: 28, letterSpacing: "0.22em", color: "var(--ivory)", fontWeight: 300, marginBottom: 20 }}>WEL</div>
            <p className="sans" style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.9, color: "var(--stone)", maxWidth: 280, marginBottom: 28 }}>
              A maison de parfum devoted to the beauty of restraint. Crafted for those who know that true luxury whispers.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {["IG", "FB", "X"].map((label, i) => (
                <a key={i} href="#" style={{
                  width: 36, height: 36, border: "1px solid rgba(184,169,154,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none", transition: "border-color 0.3s",
                  color: "var(--stone)", fontSize: 12, letterSpacing: "0.1em",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--stone)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(184,169,154,0.2)"}
                >{label}</a>
              ))}
            </div>
          </div>

          {[
            { title: "Explore", links },
            { title: "Service", links: ["Shipping", "Returns", "FAQ", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
          ].map(col => (
            <div key={col.title}>
              <div className="sans" style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--stone)", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map(l => (
                  <a key={l} href={l === "Contact" ? "#contact" : "#"} className="sans" style={{
                    fontSize: 13, fontWeight: 300, color: "rgba(184,169,154,0.6)",
                    textDecoration: "none", transition: "color 0.3s",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--ivory)"}
                    onMouseLeave={e => e.target.style.color = "rgba(184,169,154,0.6)"}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 32, flexWrap: "wrap", gap: 12 }}>
        <p className="sans" style={{ fontSize: 11, color: "var(--mid)", letterSpacing: "0.06em" }}>
          © 2025 Wel Fragrance. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(l => (
            <a key={l} href="#" className="sans" style={{
              fontSize: 11, color: "var(--mid)", textDecoration: "none",
              transition: "color 0.3s", letterSpacing: "0.04em",
            }}
              onMouseEnter={e => e.target.style.color = "var(--stone)"}
              onMouseLeave={e => e.target.style.color = "var(--mid)"}
            >{l}</a>
          ))}
        </div>
      </div>
    </Container>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <FontLoader />
      <div style={{ background: "var(--black)", minHeight: "100vh" }}>
        <Nav />
        <Hero />
        <About />
        <ProductsModels />
        <Contact />
        <Footer />
      </div>
    </>
  );
}