import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '@/context/ThemeContext';
import LetterReveal from './LetterReveal';

// ---------- Fade‑in text for details (blur‑in) ----------
export const FadeRevealText = ({ lines, className, active, duration }) => {
    const containerRef = useRef(null);
    const { theme } = useTheme();
    const text = lines.join(' ');

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        gsap.killTweensOf(el);

        if (!active) {
            gsap.set(el, { opacity: 0, filter: 'blur(12px)' });
            return;
        }

        gsap.set(el, { opacity: 0, filter: 'blur(12px)' });
        gsap.to(el, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: duration / 1000,
            ease: 'power2.out',
        });

        return () => {
            gsap.killTweensOf(el);
        };
    }, [active, theme, duration]);

    return <div ref={containerRef} className={className}>{text}</div>;
};

// ---------- Theme‑aware reveal: letter (titles) or fade (details) ----------
export const ThemeRevealText = ({
    lines,
    className = '',
    letterDelay = 0.08,
    active = false,
    initialDelay = 0,
    duration = 1200,
    letter = true,
}) => {
    const { theme } = useTheme();
    const [internalActive, setInternalActive] = useState(false);

    useEffect(() => {
        if (active) {
            const timer = setTimeout(() => setInternalActive(true), initialDelay);
            return () => clearTimeout(timer);
        } else {
            setInternalActive(false);
        }
    }, [active, initialDelay]);

    useEffect(() => {
        if (active) {
            setInternalActive(false);
            const timer = setTimeout(() => setInternalActive(true), 50);
            return () => clearTimeout(timer);
        }
    }, [theme, active]);

    if (letter) {
        return (
            <LetterReveal
                active={internalActive}
                lines={lines}
                letterDelay={letterDelay}
                className={className}
                duration={duration}
            />
        );
    } else {
        return (
            <FadeRevealText
                active={internalActive}
                lines={lines}
                className={className}
                duration={duration}
            />
        );
    }
};