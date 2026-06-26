import React from 'react';

export const IconMenu = () => (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
        <line x1="0" y1="1" x2="22" y2="1" stroke="#F5F0E8" strokeWidth="1" />
        <line x1="4" y1="7" x2="22" y2="7" stroke="#F5F0E8" strokeWidth="1" />
        <line x1="8" y1="13" x2="22" y2="13" stroke="#F5F0E8" strokeWidth="1" />
    </svg>
);

export const IconClose = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="1" y1="1" x2="17" y2="17" stroke="#F5F0E8" strokeWidth="1" />
        <line x1="17" y1="1" x2="1" y2="17" stroke="#F5F0E8" strokeWidth="1" />
    </svg>
);

export const IconArrow = ({ dir = "right" }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
        <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);