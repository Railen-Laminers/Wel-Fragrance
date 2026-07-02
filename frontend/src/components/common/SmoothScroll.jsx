import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function SmoothScroll({ children, ease = 0.08, className = '' }) {
    const { pathname } = useLocation();
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        targetRef.current = 0;
        currentRef.current = 0;
    }, [pathname]);

    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouch) {
            document.documentElement.style.scrollBehavior = 'smooth';
            return () => {
                document.documentElement.style.scrollBehavior = '';
            };
        }

        const easeLocal = ease;
        const maxScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

        const onWheel = (e) => {
            e.preventDefault();
            targetRef.current += e.deltaY;
            targetRef.current = Math.max(0, Math.min(targetRef.current, maxScroll()));
        };

        const onKeyDown = (e) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;
            const tag = e.target.tagName;
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || e.target.isContentEditable) return;

            const pageHeight = window.innerHeight;
            let delta = 0;
            switch (e.key) {
                case 'ArrowUp': delta = -60; break;
                case 'ArrowDown': delta = 60; break;
                case 'PageUp': delta = -pageHeight; break;
                case 'PageDown': delta = pageHeight; break;
                case 'Home': targetRef.current = 0; return;
                case 'End': targetRef.current = maxScroll(); return;
                case ' ': delta = e.shiftKey ? -pageHeight : pageHeight; break;
                default: return;
            }
            e.preventDefault();
            targetRef.current += delta;
            targetRef.current = Math.max(0, Math.min(targetRef.current, maxScroll()));
        };

        const animate = () => {
            const diff = targetRef.current - currentRef.current;
            if (Math.abs(diff) > 0.5) {
                currentRef.current += diff * easeLocal;
                window.scrollTo(0, currentRef.current);
            } else if (currentRef.current !== targetRef.current) {
                currentRef.current = targetRef.current;
                window.scrollTo(0, targetRef.current);
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('keydown', onKeyDown, { passive: false });
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [ease]);

    return <div className={className}>{children}</div>;
}