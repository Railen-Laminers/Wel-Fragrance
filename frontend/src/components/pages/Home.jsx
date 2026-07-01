import React from 'react';
import Hero from '../sections/home/Hero';
import About from '../sections/home/About';

const Home = () => {
    return (
        <div className="min-h-screen bg-transparent">
            <Hero />
            <About />
        </div>
    );
};

export default Home;