import React from 'react';

const Services = ({ setActivePage }) => {
  const services = [
    { icon: '🎨', title: 'UI/UX Design', desc: 'Beautiful, intuitive interfaces designed with user experience at the core.', features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Responsive Design'] },
    { icon: '💻', title: 'Frontend Development', desc: 'Modern, responsive frontend solutions using latest technologies.', features: ['React.js', 'HTML5/CSS3', 'JavaScript/ES6', 'Responsive Design', 'Performance Optimization'] },
    { icon: '⚙️', title: 'Backend Development', desc: 'Robust and scalable backend systems to power your applications.', features: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Authentication'] },
    { icon: '🗄️', title: 'Database Integration', desc: 'Efficient database design and integration for your applications.', features: ['MongoDB', 'MySQL', 'PostgreSQL', 'Data Modeling', 'Query Optimization'] },
    { icon: '👑', title: 'Admin Panel Development', desc: 'Custom admin dashboards to manage your application effectively.', features: ['Role Management', 'Content Management', 'Analytics Dashboard', 'User Management', 'Settings Panel'] },
    { icon: '✅', title: 'Testing & Quality Assurance', desc: 'Thorough testing to ensure bug-free, reliable applications.', features: ['Unit Testing', 'Integration Testing', 'E2E Testing', 'Performance Testing', 'Security Testing'] },
    { icon: '🚀', title: 'Deployment & Launch Support', desc: 'Seamless deployment and launch assistance for your project.', features: ['AWS Deployment', 'CI/CD Setup', 'Domain Configuration', 'SSL Certificate', 'Post-Launch Support'] },
    { icon: '🛒', title: 'E-Commerce Website', desc: 'Feature-rich e-commerce websites with secure payments.', features: ['Razorpay/Stripe', 'Product Management', 'Order Tracking', 'Shopping Cart', 'Wishlist'] },
    { icon: '🏢', title: 'Business Website', desc: 'Professional business websites to build your brand and attract customers.', features: ['Custom Branding', 'Multi-page Layout', 'CMS Integration', 'Google Analytics', 'SEO Optimized'] },
    { icon: '🔧', title: 'Bug Fixing & Maintenance', desc: 'Fix bugs and provide ongoing support to keep your application running smoothly.', features: ['Performance Audit', 'Bug Resolution', 'Code Refactoring', 'Security Patches', 'Monthly Reports'] },
  ];

  return (
    <div style={{ paddingTop: '70px' }}>
      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)' }}>
        <div className="section-subtitle">What We Offer</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>Our Services</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          Comprehensive digital solutions — from concept to deployment and beyond.
        </p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.75rem' }}>
          {services.map((s, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{s.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
                {s.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {s.features.map(f => (
                  <span key={f} style={{ 
                    background: 'var(--teal-glow)', 
                    border: '1px solid var(--border)', 
                    color: 'var(--teal)', 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-display)'
                  }}>
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ margin: '2rem auto 5rem', maxWidth: '700px', background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }} />
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.6rem', color: 'var(--white)', marginBottom: '0.75rem' }}>
          Have a project in mind?
        </h2>
        <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', lineHeight: 1.6 }}>
          Tell us about your idea and we'll get back to you with a customized plan.
        </p>
        <button onClick={() => setActivePage('Contact')} className="btn-primary">
          Get a Free Quote
        </button>
      </section>
    </div>
  );
};

export default Services;