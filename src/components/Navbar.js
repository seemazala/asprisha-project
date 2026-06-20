import React, { useState, useEffect } from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>

      {/* Logo + Brand — logo on top, text below */}
      <div className="logo-wrapper" onClick={() => setActivePage('Home')}>
        <img
          src="/logo.png"
          alt="AISPL Logo"
          className="logo-img"
          onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
        />
        <div className="logo-text-block">
          <div className="logo-text">AISPL</div>
          <div className="logo-subtext">Asprisha Innovation Solution Private Limited</div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="desktop-nav">
        {links.map((link) => (
          <button
            key={link}
            onClick={() => setActivePage(link)}
            className={`nav-link ${activePage === link ? 'nav-link-active' : 'nav-link-inactive'}`}
          >
            {link}
          </button>
        ))}
        <button onClick={() => setActivePage('Contact')} className="btn-primary" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
          Get In Touch
        </button>
      </div>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger">
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0,
          background: 'rgba(7,13,31,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column',
          gap: '1rem', borderBottom: '1px solid var(--border)', zIndex: 999,
        }}>
          {links.map((link) => (
            <button key={link} onClick={() => { setActivePage(link); setMenuOpen(false); }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: activePage === link ? 'var(--teal)' : 'var(--white)',
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              textAlign: 'left', padding: '8px 0', borderBottom: '1px solid var(--border)',
            }}>
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
