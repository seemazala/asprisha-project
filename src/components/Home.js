import React, { useState, useEffect, useRef } from 'react';

const Home = ({ setActivePage }) => {
  const [typed, setTyped] = useState('');
  const phrases = ['Website Development', 'Web Applications', 'Mobile Apps', 'E-Commerce Solutions', 'Cloud & DevOps'];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          clearInterval(timer);
          setTimeout(() => {
            const t2 = setInterval(() => {
              charIdx.current--;
              setTyped(current.slice(0, charIdx.current));
              if (charIdx.current === 0) {
                deleting.current = false;
                phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
                clearInterval(t2);
              }
            }, 40);
          }, 1800);
        }
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { num: '6+', label: 'Projects Delivered' },
    { num: '2017', label: 'Est. in Gujarat' },
    { num: 'MERN', label: 'Core Stack' },
    { num: '100%', label: 'Client Focused' },
  ];

  const services = [
    { icon: '💻', title: 'Website Development', desc: 'Responsive, modern websites built for performance and impact.' },
    { icon: '⚙️', title: 'Web Applications', desc: 'Scalable web apps with seamless user experiences.' },
    { icon: '📱', title: 'Mobile Apps', desc: 'Android & iOS cross-platform apps for your business.' },
    { icon: '🛒', title: 'E-Commerce', desc: 'Full-featured stores with payment integration.' },
    { icon: '🔧', title: 'Bug Fixing', desc: 'Performance optimization and ongoing maintenance.' },
    { icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS deployment, CI/CD pipelines, server management.' },
  ];

  return (
    <div>
      <section className="hero-section">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              borderRadius: '50%',
              background: 'var(--teal)',
              opacity: 0.2 + Math.random() * 0.3,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
            border: '1px solid var(--border)', background: 'var(--teal-glow)',
            color: 'var(--teal)', fontSize: '0.8rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginBottom: '2rem', fontFamily: 'var(--font-display)',
          }}>
            Jamnagar, Gujarat · Est. 2017
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.1,
            marginBottom: '1rem', color: 'var(--white)',
          }}>
            Transforming Ideas Into<br />
            <span style={{ color: 'var(--teal)' }}>Digital Excellence</span>
          </h1>

          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: 'var(--muted)', marginBottom: '2.5rem', minHeight: '2rem',
          }}>
            We build → <span style={{ color: 'var(--teal)', fontWeight: 600 }}>{typed}<span style={{ animation: 'blink 1s infinite', borderLeft: '2px solid var(--teal)' }}>|</span></span>
          </div>

          <p style={{
            color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7,
            maxWidth: '520px', margin: '0 auto 2.5rem',
          }}>
            Asprisha Innovation Solutions is a technology-driven company delivering reliable, scalable digital solutions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActivePage('Portfolio')} className="btn-primary">
              View Our Work
            </button>
            <button onClick={() => setActivePage('Contact')} className="btn-secondary">
              Let's Talk
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section" style={{ padding: '3rem 2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--navy-mid)' }}>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">What We Do</div>
          <h2 className="section-title">Our Services</h2>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button onClick={() => setActivePage('Services')} className="btn-outline" style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--teal)', padding: '12px 28px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem' }}>
            See All Services →
          </button>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', background: 'var(--navy-mid)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-subtitle">How We Work</div>
            <h2 className="section-title">Our Development Process</h2>
          </div>
          <div className="process-steps">
            {['Discover', 'Plan', 'Design', 'Develop', 'Deploy', 'Support'].map((step, i) => (
              <div key={i} className="process-step">
                <div className="step-number">0{i + 1}</div>
                <div className="step-label">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(13,207,207,0.06) 0%, transparent 70%)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'var(--white)', marginBottom: '1rem' }}>
          Let's Build Something <span style={{ color: 'var(--teal)' }}>Amazing</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>Have a project in mind? Let's talk about it.</p>
        <button onClick={() => setActivePage('Contact')} className="btn-primary">
          Start a Project
        </button>
      </section>
    </div>
  );
};

export default Home;