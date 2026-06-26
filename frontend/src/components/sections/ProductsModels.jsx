import React from 'react';
import Container from '../common/Container';
import LazyImage from '../common/LazyImage';
import Reveal from '../common/Reveal';
import SectionLabel from '../common/SectionLabel';
import { productImages, modelImages } from '../../assets/images';

const ProductsModels = () => {
    const productEntries = Object.entries(productImages);
    const modelEntries = Object.entries(modelImages);

    return (
        <Container
            background="var(--black)"
            style={{ padding: '120px 0', borderTop: '1px solid rgba(184,169,154,0.07)' }}
        >
            <Reveal>
                <SectionLabel text="The Collection" />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: 56,
                        flexWrap: 'wrap',
                        gap: 20,
                    }}
                >
                    <h2
                        className="serif"
                        style={{
                            fontSize: 'clamp(36px,5vw,64px)',
                            fontWeight: 300,
                            color: 'var(--ivory)',
                            lineHeight: 1.1,
                            maxWidth: 520,
                        }}
                    >
                        Fragrances that
                        <br />
                        <em>define a moment</em>
                    </h2>
                    <span className="sans" style={{ fontSize: 11, color: 'var(--mid)', letterSpacing: '0.1em' }}>
                        {productEntries.length} fragrances
                    </span>
                </div>
            </Reveal>

            {/* Products Grid – each image loads with a staggered delay */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 28,
                    marginBottom: 80,
                }}
            >
                {productEntries.map(([name, image], idx) => (
                    <Reveal key={idx} delay={idx * 0.03}>
                        <div className="product-card" style={{ cursor: 'pointer', position: 'relative' }}>
                            <div
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    aspectRatio: '3/4',
                                    background: '#141414',
                                }}
                            >
                                <LazyImage
                                    src={image}
                                    alt={name}
                                    delay={idx * 200} // 200ms between each product image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.8s ease',
                                    }}
                                />
                                <div
                                    className="product-overlay"
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'rgba(10,10,10,0.4)',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        padding: 20,
                                        opacity: 0,
                                        transition: 'opacity 0.5s ease',
                                    }}
                                >
                                    <div
                                        className="sans"
                                        style={{
                                            fontSize: 10,
                                            letterSpacing: '0.1em',
                                            color: 'var(--ivory)',
                                            textTransform: 'uppercase',
                                        }}
                                    >
                                        {name.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingTop: 16 }}>
                                <div
                                    className="serif"
                                    style={{ fontSize: 18, fontWeight: 400, color: 'var(--ivory)', letterSpacing: '0.02em' }}
                                >
                                    {name.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>

            {/* Models Gallery – also staggered */}
            <div id="models">
                <Reveal>
                    <SectionLabel text="Behind the Lens" />
                    <h2
                        className="serif"
                        style={{
                            fontSize: 'clamp(28px,4vw,48px)',
                            fontWeight: 300,
                            color: 'var(--ivory)',
                            marginBottom: 48,
                            lineHeight: 1.1,
                        }}
                    >
                        The art of <em>visual storytelling</em>
                    </h2>
                </Reveal>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: 16,
                    }}
                >
                    {modelEntries.map(([_, image], idx) => (
                        <Reveal key={idx} delay={idx * 0.02}>
                            <div style={{ overflow: 'hidden', aspectRatio: '3/4', background: '#141414' }}>
                                <LazyImage
                                    src={image}
                                    alt={`Model ${idx + 1}`}
                                    delay={idx * 150} // 150ms between each model image
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s ease',
                                    }}
                                />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default ProductsModels;