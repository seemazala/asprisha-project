import React from 'react';

const Footer = ({ setActivePage }) => {
  const quickLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  // Services - EXACTLY MATCHING with Services Page
  const services = [
    'UI/UX Design',
    'Frontend Development',
    'Backend Development',
    'Database Integration',
    'Admin Panel Development',
    'Testing & Quality Assurance',
    'Deployment & Launch Support',
    'E-Commerce Website',
    'Business Website',
    'Bug Fixing & Maintenance',
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* ── Brand ── Left Aligned */}
        <div className="footer-brand">
          <div
            className="logo-wrapper"
            onClick={() => setActivePage('Home')}
            style={{ marginBottom: '1rem', cursor: 'pointer', alignItems: 'flex-start' }}
          >
            <img
              src="/logo.png"
              alt="AISPL Logo"
              className="logo-img"
              style={{ width: '58px', height: '58px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <div className="logo-text-block" style={{ alignItems: 'flex-start' }}>
              <div className="logo-text">AISPL</div>
              <div className="logo-subtext">Asprisha Innovation Solutions Pvt. Ltd.</div>
            </div>
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6, textAlign: 'left' }}>
            Transforming Ideas Into Digital Excellence.<br />
            Jamnagar, Gujarat · Est. 2017
          </p>

          {/* Social */}
          <a
            href="https://www.instagram.com/asprisha.innovative"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '1rem',
              color: 'var(--teal)',
              fontSize: '0.82rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <span style={{ fontSize: '1rem' }}>📸</span>
            @asprisha.innovation
          </a>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <div className="footer-heading" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--white)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Quick Links
          </div>
          {quickLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActivePage(link)}
              className="footer-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: '0.85rem',
                padding: '6px 0',
                display: 'block',
                textAlign: 'left',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--teal)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {link}
            </button>
          ))}
        </div>

        {/* ── Services ── */}
        <div>
          <div className="footer-heading" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--white)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Our Services
          </div>
          {services.map((s) => (
            <button
              key={s}
              onClick={() => setActivePage('Services')}
              className="footer-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
                fontSize: '0.8rem',
                padding: '5px 0',
                display: 'block',
                textAlign: 'left',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--teal)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
            >
              {s}
            </button>
          ))}
        </div>

        {/* ── Contact ── */}
        <div>
          <div className="footer-heading" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--white)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            Contact
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ color: 'var(--teal)', marginRight: '8px' }}>📞</span>
              <a href="tel:+919978567153" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.82rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--teal)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                +91 9978567153
              </a>
            </div>
            <div>
              <span style={{ color: 'var(--teal)', marginRight: '8px' }}>📧</span>
              <a href="mailto:seemazala0422@gmail.com" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.82rem' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--teal)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
                info@asprisha.com
              </a>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--teal)', marginRight: '8px' }}>📍</span>
              40, Digvijay Plot,<br />
              Near Pavan Chaki Road,<br />
              Jamnagar, Gujarat – 361005
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setActivePage('Contact')}
            style={{
              marginTop: '1.5rem',
              background: 'var(--teal)',
              color: 'var(--navy)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              transition: 'all 0.2s',
              width: '100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start a Project →
          </button>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className="footer-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
          © 2026 Asprisha Innovation Solutions Pvt. Ltd. · CIN: U74999GJ2017PTC100177
        </div>
        <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
          Innovate · Develop · Deploy · Grow
        </div>
      </div>
    </footer>
  );
};

export default Footer;