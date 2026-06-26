import React from 'react';

const Container = ({ children, background = 'transparent', className = '', style = {} }) => (
    <div className={className} style={{ maxWidth: '1440px', margin: '0 auto', background, ...style }}>
        <div style={{ padding: '0 40px' }}>
            {children}
        </div>
    </div>
);

export default Container;