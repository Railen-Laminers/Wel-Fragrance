import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* Images with BG's
import img5237 from '@/assets/products/IMG_5237.webp';
import img5238 from '@/assets/products/IMG_5238.webp';
import img5240 from '@/assets/products/IMG_5240.webp';
import img5241 from '@/assets/products/IMG_5241.webp';
import img5242 from '@/assets/products/IMG_5242.webp';
import img5243 from '@/assets/products/IMG_5243.webp';
import img5246 from '@/assets/products/IMG_5246.webp';
import img5247 from '@/assets/products/IMG_5247.webp';
import img5250 from '@/assets/products/IMG_5250.webp';
import img5251 from '@/assets/products/IMG_5251.webp';
import img5257 from '@/assets/products/IMG_5257.webp';
import img5258 from '@/assets/products/IMG_5258.webp';
import img5259 from '@/assets/products/IMG_5259.webp';
import img5260 from '@/assets/products/IMG_5260.webp';
import img5262 from '@/assets/products/IMG_5262.webp';
*/



// ---------- BlockReveal component (slowed down) ----------
const BlockReveal = ({ active, rows = 4, cols = 7 }) => {
    return (
        <div
            className="absolute inset-0 grid pointer-events-none z-10"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {Array.from({ length: rows * cols }).map((_, i) => {
                const row = Math.floor(i / cols);
                const col = i % cols;
                // Delay increases with row + column for a wave
                const delay = active ? `${row * 0.12 + col * 0.03}s` : '0s';
                return (
                    <div
                        key={i}
                        className="w-full h-full bg-white dark:bg-gray-900 transition-opacity duration-[1200ms] ease-out"
                        style={{
                            opacity: active ? 0 : 1,
                            transitionDelay: delay,
                        }}
                    />
                );
            })}
        </div>
    );
};
// ---------- End BlockReveal ----------

const GridMotion = ({ items = [], gradientColor = 'black' }) => {
    const gridRef = useRef(null);
    const rowRefs = useRef([]);
    const mouseXRef = useRef(window.innerWidth / 2);
    const [revealed, setRevealed] = useState(false);

    const totalItems = 28;
    const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
    const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

    useEffect(() => {
        // Grid reveal starts after 300ms
        const timer = setTimeout(() => setRevealed(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        gsap.ticker.lagSmoothing(0);

        const handleMouseMove = e => {
            mouseXRef.current = e.clientX;
        };

        const updateMotion = () => {
            const maxMoveAmount = 300;
            const baseDuration = 0.8;
            const inertiaFactors = [0.6, 0.4, 0.3, 0.2];

            rowRefs.current.forEach((row, index) => {
                if (row) {
                    const direction = index % 2 === 0 ? 1 : -1;
                    const moveAmount = ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) * direction;

                    gsap.to(row, {
                        x: moveAmount,
                        duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
                        ease: 'power3.out',
                        overwrite: 'auto'
                    });
                }
            });
        };

        const removeAnimationLoop = gsap.ticker.add(updateMotion);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            removeAnimationLoop();
        };
    }, []);

    return (
        <div ref={gridRef} className="h-full w-full overflow-hidden">
            <section
                className="w-full h-screen overflow-hidden relative flex items-center justify-center"
                style={{
                    background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`
                }}
            >
                <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>

                {/* Grid container */}
                <div className="gap-4 flex-none relative w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
                    {[...Array(4)].map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="grid gap-4 grid-cols-7"
                            style={{ willChange: 'transform, filter' }}
                            ref={el => (rowRefs.current[rowIndex] = el)}
                        >
                            {[...Array(7)].map((_, itemIndex) => {
                                const content = combinedItems[rowIndex * 7 + itemIndex];
                                const isImageUrl =
                                    typeof content === 'string' && /(https?:\/\/|\.webp|\.png|\.jpe?g|\.gif)$/i.test(content);

                                return (
                                    <div key={itemIndex} className="relative">
                                        <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">
                                            {isImageUrl ? (
                                                <div
                                                    className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                                                    style={{ backgroundImage: `url(${content})` }}
                                                ></div>
                                            ) : (
                                                <div className="p-4 text-center z-[1]">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {/* BlockReveal overlay – same 4x7 grid */}
                    <BlockReveal active={revealed} rows={4} cols={7} />
                </div>

                <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
            </section>
        </div>
    );
};

export default GridMotion;