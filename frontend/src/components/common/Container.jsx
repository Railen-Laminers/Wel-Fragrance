import React from 'react';

const Container = ({ children, background = 'transparent', className = '', style = {} }) => (
    <div
        className={`max-w-[1440px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 ${className}`}
        style={{ background, ...style }}
    >
        {children}
    </div>
);

export default Container;