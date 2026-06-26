import React from 'react';
import Container from '../common/Container';
import navLogo from '/navLogo.png';

const Footer = () => {
    const links = ["About", "Products", "Models", "Contact"];

    return (
        <Container background="var(--black)" style={{ padding: "64px 0 32px" }}>
            <div style={{ paddingBottom: 48, borderBottom: "1px solid rgba(184,169,154,0.1)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
                    <div>
                        {/* ✅ Replaced "WEL" text with navLogo */}
                        <div style={{ marginBottom: 20 }}>
                            <img
                                src={navLogo}
                                alt="Wel Fragrance"
                                style={{ height: 32, width: 'auto', objectFit: 'contain' }}
                            />
                        </div>
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

export default Footer;