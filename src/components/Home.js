import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from './useScrollReveal';
import CodeTypingWindow from './CodeTypingWindow';
import ServicesMarquee from './ServicesMarquee';
import ParticleNetwork from './ParticleNetwork';

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
    { num: '20+', label: 'Projects Delivered' },
    { num: '2017', label: 'Est. in Gujarat' },
    { num: 'MERN', label: 'Core Stack' },
    { num: '100%', label: 'Client Focused' },
  ];


  return (
    <div>
      {/* ================= HERO SECTION WITH VIDEO BACKGROUND ================= */}
      <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.2,
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay so text + code window stay readable over the video */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(7,13,31,0.65) 0%, rgba(7,13,31,0.92) 100%)',
            zIndex: 1,
          }}
        />

        {/* Three.js interactive particle network */}
        <ParticleNetwork />

        <style>{`
          .hero-flex-row {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            flex-wrap: nowrap;
            max-width: 1200px;
            margin: 0 auto;
          }
          @media (max-width: 760px) {
            .hero-flex-row {
              flex-wrap: wrap;
            }
          }
        `}</style>
        <div className="hero-flex-row">
          {/* Left: text content */}
          <div style={{ maxWidth: '560px', textAlign: 'left', flex: '1 1 0', minWidth: 0 }}>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                background: 'var(--teal-glow)',
                color: 'var(--teal)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              Jamnagar, Gujarat · Est. 2017
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 6vw, 4rem)',
                lineHeight: 1.1,
                marginBottom: '1rem',
                color: 'var(--white)',
              }}
            >
              Transforming Ideas Into
              <br />
              <span style={{ color: 'var(--teal)' }}>Digital Excellence</span>
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: 'var(--muted)',
                marginBottom: '2.5rem',
                minHeight: '2rem',
              }}
            >
              We build →{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 600 }}>
                {typed}
                <span style={{ animation: 'blink 1s infinite', borderLeft: '2px solid var(--teal)' }}>|</span>
              </span>
            </div>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: '1rem',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '2.5rem',
              }}
            >
              Asprisha Innovation Solutions is a technology-driven company delivering reliable, scalable digital solutions.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setActivePage('Portfolio')} className="btn-primary">
                View Our Work
              </button>
              <button onClick={() => setActivePage('Contact')} className="btn-secondary">
                Let's Talk
              </button>
            </div>
          </div>

          {/* Right: animated code typing window */}
          <div style={{ flex: '0 1 460px', display: 'flex', justifyContent: 'center', minWidth: 0 }}>
            <CodeTypingWindow />
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION WITH ANIMATED COUNTERS ================= */}
      <section
        className="stats-section"
        style={{
          padding: '3rem 2rem',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--navy-mid)',
        }}
      >
        <div className="stats-grid">
          {stats.map((s, i) => (
            <AnimatedStat key={i} num={s.num} label={s.label} />
          ))}
        </div>
      </section>

      {/* ================= SERVICES SECTION — SCROLLING MARQUEE ================= */}
      <section style={{ padding: '5rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 2rem' }}>
          <div className="section-subtitle">What We Do</div>
          <h2 className="section-title">Our Services</h2>
        </div>
        <ServicesMarquee />
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => setActivePage('Services')}
            className="btn-outline"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              color: 'var(--teal)',
              padding: '12px 28px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            See All Services →
          </button>
        </div>
      </section>

      {/* ================= PROCESS STEPS SECTION WITH STAGGER ANIMATION ================= */}
      <section style={{ padding: '5rem 2rem', background: 'var(--navy-mid)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-subtitle">How We Work</div>
            <h2 className="section-title">Our Development Process</h2>
          </div>
          <ProcessSteps steps={['Discover', 'Plan', 'Design', 'Develop', 'Deploy', 'Support']} />
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section
        style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(13,207,207,0.06) 0%, transparent 70%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--white)',
            marginBottom: '1rem',
          }}
        >
          Let's Build Something <span style={{ color: 'var(--teal)' }}>Amazing</span>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
          Have a project in mind? Let's talk about it.
        </p>
        <button onClick={() => setActivePage('Contact')} className="btn-primary">
          Start a Project
        </button>
      </section>
    </div>
  );
};

/* ================= HELPER COMPONENTS ================= */

// Stat number that counts up from 0 when scrolled into view
const AnimatedStat = ({ num, label }) => {
  const [ref, visible] = useScrollReveal();
  const [count, setCount] = useState(0);
  const numericPart = parseInt(num, 10) || 0;
  const suffix = num.replace(/[0-9]/g, '');
  const isPureText = numericPart === 0; // e.g. "MERN" has no digits

  useEffect(() => {
    if (!visible || isPureText) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(numericPart / 40));
    const timer = setInterval(() => {
      start += step;
      if (start >= numericPart) {
        start = numericPart;
        clearInterval(timer);
      }
      setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <div ref={ref}>
      <div className="stat-number">{isPureText ? num : `${count}${suffix}`}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

// Process steps that pop in one after another
const ProcessSteps = ({ steps }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className="process-steps">
      {steps.map((step, i) => (
        <div
          key={i}
          className="process-step"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.8)',
            transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
          }}
        >
          <div className="step-number">0{i + 1}</div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default Home;