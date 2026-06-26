import React from 'react';

const SectionLabel = ({ text }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <span className="divider" />
        <span className="sans" style={{ fontSize: 11, letterSpacing: "0.25em", color: "var(--stone)", textTransform: "uppercase" }}>{text}</span>
    </div>
);

export default SectionLabel;