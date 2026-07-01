import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

const LazyImage = ({
    src,
    alt,
    className,
    style,
    delay = 0,
    placeholderColor = '#1a1a1a',
    sizes = '100vw',
    loading = 'lazy',
    fetchPriority = 'auto',
    priority = false,
    srcSet,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, {
        once: true,
        margin: '200px 0px',
    });

    const [loaded, setLoaded] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        if (priority || inView) {
            const timer = setTimeout(() => setShouldLoad(true), delay);
            return () => clearTimeout(timer);
        }
    }, [inView, delay, priority]);

    if (!src) return null;

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                position: 'relative',
                overflow: 'hidden',
                background: placeholderColor,
            }}
        >
            {shouldLoad && (
                <img
                    src={src}
                    srcSet={srcSet}
                    sizes={sizes}
                    alt={alt}
                    loading={priority ? 'eager' : loading}
                    fetchPriority={priority ? 'high' : fetchPriority}
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                        willChange: 'transform, opacity',
                    }}
                />
            )}
        </div>
    );
};

export default LazyImage;