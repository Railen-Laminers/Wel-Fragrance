import React from 'react';
import Container from '../common/Container';
import Reveal from '../common/Reveal';

const Contact = () => {
    return (
        <Container background="#0E0D0B" style={{ padding: "100px 0", borderTop: "1px solid rgba(184,169,154,0.08)" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
                <Reveal>
                    <div className="serif" style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--stone)", textTransform: "uppercase", marginBottom: 20 }}>Wel Fragrance</div>
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
                        <p className="sans" style={{ fontSize: 13, color: "var(--mid)", letterSpacing: "0.06em" }}>Philippines</p>
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

export default Contact;