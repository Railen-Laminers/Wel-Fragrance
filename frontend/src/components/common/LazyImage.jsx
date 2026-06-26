import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, style, delay = 0 }) => {
    const [loaded, setLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const timeoutRef = useRef(null);

    // IntersectionObserver – triggers when the element enters the viewport
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

    // When in view, start the loading timer with the given delay
    useEffect(() => {
        if (inView) {
            timeoutRef.current = setTimeout(() => {
                setShouldLoad(true);
            }, delay);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [inView, delay]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                position: 'relative',
                overflow: 'hidden',
                background: '#1a1a1a',
            }}
        >
            {shouldLoad && (
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
            {!loaded && shouldLoad && (
                <div style={{ position: 'absolute', inset: 0, background: '#1a1a1a' }} />
            )}
        </div>
    );
};

export default LazyImage;