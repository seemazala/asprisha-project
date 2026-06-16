import React from 'react';

const Logo = ({ size = 40, showText = true }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img 
        src={`${process.env.PUBLIC_URL}/logo.png`}
        alt="AISPL Logo" 
        style={{ 
          width: size, 
          height: size, 
          objectFit: 'contain' 
        }} 
      />
      {showText && (
        <div>
          <div style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 700, 
            fontSize: `${size * 0.3}px`, 
            color: 'var(--white)', 
            letterSpacing: '0.05em' 
          }}>
            AISPL
          </div>
          <div style={{ 
            fontSize: `${size * 0.14}px`, 
            color: 'var(--teal)', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase', 
            marginTop: '-2px',
            lineHeight: '1.2'
          }}>
            Asprisha Innovation Solutions Pvt. Ltd.
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;