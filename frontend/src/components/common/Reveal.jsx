import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const Reveal = ({
    children,
    delay = 0,
    y = 32,
    x = 0,
    scale = 1,
    duration = 0.8,
    once = true,
    rootMargin = "-80px 0px -80px 0px",
    amount = 0.2,
    stagger = 0,
    className = "",
}) => {
    const ref = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const inView = useInView(ref, {
        once,
        margin: rootMargin,
        amount,
    });

    // Tween transition – much lighter on CPU than spring
    const transition = {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
    };

    const variants = {
        hidden: { opacity: 0, y, x, scale },
        visible: { opacity: 1, y: 0, x: 0, scale: 1 },
    };

    if (prefersReducedMotion) {
        return (
            <div ref={ref} className={className} style={{ willChange: 'auto' }}>
                {children}
            </div>
        );
    }

    if (stagger && React.Children.count(children) > 1) {
        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={{ visible: { transition: { staggerChildren: stagger } } }}
                className={className}
                style={{ willChange: "transform, opacity" }}
            >
                {React.Children.map(children, (child, i) => (
                    <motion.div
                        key={i}
                        custom={i}
                        variants={{
                            hidden: { opacity: 0, y, x, scale },
                            visible: (i) => ({
                                opacity: 1,
                                y: 0,
                                x: 0,
                                scale: 1,
                                transition: {
                                    ...transition,
                                    delay: delay + i * stagger,
                                },
                            }),
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={transition}
            className={className}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
};

export default Reveal;