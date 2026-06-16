/*import React from 'react';

const About = () => {
  const skills = [
    { cat: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap'] },
    { cat: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
    { cat: 'Database', items: ['MongoDB', 'MySQL', 'MongoDB Atlas'] },
    { cat: 'Cloud & Tools', items: ['AWS', 'Git', 'GitHub', 'Netlify', 'Vercel', 'Render'] },
  ];

  return (
    <div style={{ paddingTop: '70px' }}>
      <section style={{ padding: '5rem 2rem 3rem', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)', textAlign: 'center' }}>
        <div className="section-subtitle">Who We Are</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>About AISPL</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          A technology-driven company committed to delivering innovative, reliable and scalable digital solutions from Jamnagar, Gujarat.
        </p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)', marginBottom: '1.25rem' }}>
              Our <span style={{ color: 'var(--teal)' }}>Story</span>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Asprisha Innovation Solutions Pvt. Ltd. (AISPL) was founded in December 2017 with a clear vision — to be a trusted global technology partner recognized for innovation and excellence.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Based in Jamnagar, Gujarat, we build digital products that solve real business challenges.
            </p>
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Founded', val: 'December 2017' },
                { label: 'CIN', val: 'U74999GJ2017PTC100177' },
                { label: 'Location', val: 'Jamnagar, Gujarat' },
                { label: 'Status', val: 'Active & Compliant' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ color: 'var(--teal)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: 'var(--white)', fontWeight: 500, fontSize: '0.85rem' }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--teal-dim), var(--teal))' }} />
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-dim), var(--navy-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.25rem', border: '2px solid var(--teal)' }}>SZ</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--white)', marginBottom: '4px' }}>Seema Zala</h3>
            <div style={{ color: 'var(--teal)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Director & Full Stack Developer</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Full Stack Developer with hands-on expertise in the MERN stack, cloud infrastructure, and scalable application architecture.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['React.js', 'Node.js', 'MongoDB', 'AWS', 'Express.js'].map(t => (
                <span key={t} style={{ background: 'var(--teal-glow)', border: '1px solid var(--border)', color: 'var(--teal)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">Technology Stack</div>
          <h2 className="section-title">Tools We Work With</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {skills.map((s, i) => (
            <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--teal)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{s.cat}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.items.map(item => (
                  <span key={item} style={{ background: 'rgba(13,207,207,0.07)', border: '1px solid var(--border)', color: 'var(--white)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;*/

import React from 'react';

const About = ({ setActivePage }) => {
  const skills = [
    { cat: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Bootstrap', 'Angular'] },
    { cat: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
    { cat: 'Database', items: ['MongoDB', 'MySQL', 'MongoDB Atlas', 'AWS RDS'] },
    { cat: 'Cloud & Tools', items: ['AWS EC2', 'AWS S3', 'CloudFront', 'PM2', 'Git', 'GitHub', 'Postman', 'Figma', 'Netlify', 'Vercel'] },
  ];

  const achievements = [
    {
      icon: '🏆',
      title: 'CyberPeace Winner',
      subtitle: 'eRaksha CyberPeace Initiative',
      desc: 'Project "Spot the Fake - Be Aware" won recognition in the eRaksha CyberPeace Cyber Awareness Program.',
      color: '#f4a261',
    },
    {
      icon: '🎓',
      title: 'IIT Roorkee Certified',
      subtitle: 'Executive PG Certification',
      desc: 'Executive Post Graduate Certification in Full Stack Web Development from iHUB DivyaSampark, IIT Roorkee in association with Intellipaat. ID: IPTIH26030360',
      color: '#0dcfcf',
    },
    {
      icon: '🛡️',
      title: 'Cyber Awareness Certified',
      subtitle: 'CyberPeace Foundation',
      desc: 'Certified in Cyber Awareness by CyberPeace Foundation under the eRaksha Program.',
      color: '#2ec4b6',
    },
  ];

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* ── Page Hero ── */}
      <section style={{
        padding: '5rem 2rem 3rem',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <div className="section-subtitle">Who We Are</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>
          About AISPL
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          A technology-driven company committed to delivering innovative, reliable and scalable digital solutions from Jamnagar, Gujarat.
        </p>
      </section>

      {/* ── Story + Founder ── */}
      <section style={{ padding: '4rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

          {/* Company Story */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)', marginBottom: '1.25rem' }}>
              Our <span style={{ color: 'var(--teal)' }}>Story</span>
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Asprisha Innovation Solutions Pvt. Ltd. (AISPL) was founded in December 2017 with a clear vision — to be a trusted global technology partner recognized for innovation and excellence.
            </p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Based in Jamnagar, Gujarat, we build digital products that solve real business challenges. From startups needing their first web presence to businesses scaling online — we deliver clean, efficient, and future-ready solutions.
            </p>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Founded', val: 'December 2017' },
                { label: 'CIN', val: 'U74999GJ2017PTC100177' },
                { label: 'Location', val: 'Jamnagar, Gujarat' },
                { label: 'Status', val: 'Active & Compliant' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ color: 'var(--teal)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ color: 'var(--white)', fontWeight: 500, fontSize: '0.85rem' }}>{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Founder Card */}
          <div style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--teal-dim), var(--teal))' }} />

            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal-dim), var(--navy-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.25rem', border: '2px solid var(--teal)' }}>SZ</div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--white)', marginBottom: '4px' }}>Seema Zala</h3>
            <div style={{ color: 'var(--teal)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Director & Full Stack Developer</div>

            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Full Stack Developer with expertise in building responsive web applications using the MERN stack and AWS Cloud. Executive PG Certified from <strong style={{ color: 'var(--teal)' }}>IIT Roorkee</strong> in Full Stack Web Development.
            </p>

            {/* Mini badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
              {['React.js', 'Node.js', 'MongoDB', 'AWS', 'Express.js', 'MySQL'].map(t => (
                <span key={t} style={{ background: 'var(--teal-glow)', border: '1px solid var(--border)', color: 'var(--teal)', padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem' }}>{t}</span>
              ))}
            </div>

            {/* Achievement pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(244,162,97,0.1)', border: '1px solid rgba(244,162,97,0.25)', borderRadius: '8px', padding: '8px 12px' }}>
                <span style={{ fontSize: '1rem' }}>🏆</span>
                <span style={{ color: '#f4a261', fontSize: '0.78rem', fontWeight: 600 }}>CyberPeace eRaksha Winner</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(13,207,207,0.08)', border: '1px solid var(--border)', borderRadius: '8px', padding: '8px 12px' }}>
                <span style={{ fontSize: '1rem' }}>🎓</span>
                <span style={{ color: 'var(--teal)', fontSize: '0.78rem', fontWeight: 600 }}>IIT Roorkee · Executive PG Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievements ── */}
      <section style={{ padding: '4rem 2rem', background: 'var(--navy-mid)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-subtitle">Recognition</div>
            <h2 className="section-title">Achievements & Certifications</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {achievements.map((a, i) => (
              <div key={i} style={{
                background: 'var(--navy-card)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.75rem', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = a.color; e.currentTarget.style.boxShadow = `0 8px 30px ${a.color}22`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }} />
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{a.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '4px' }}>{a.title}</h3>
                <div style={{ color: a.color, fontSize: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{a.subtitle}</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision Mission Values ── */}
      <section style={{ padding: '4rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '🎯', title: 'Our Vision', text: 'To be a trusted global technology partner recognized for innovation and excellence.' },
            { icon: '🚀', title: 'Our Mission', text: 'To deliver high-quality, future-ready digital solutions that empower businesses and create real impact.' },
            { icon: '💡', title: 'Our Values', text: 'Clean code, honest communication, on-time delivery, and building long-term partnerships.' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--teal)', marginBottom: '0.75rem' }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-subtitle">Technology Stack</div>
          <h2 className="section-title">Tools We Work With</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {skills.map((s, i) => (
            <div key={i} style={{ background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--teal)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{s.cat}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.items.map(item => (
                  <span key={item} style={{ background: 'rgba(13,207,207,0.07)', border: '1px solid var(--border)', color: 'var(--white)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;