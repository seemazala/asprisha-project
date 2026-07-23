import React from 'react';

const Services = ({ setActivePage }) => {
  const services = [
    { icon: '🌐', title: 'Website Development', img: '/services/webdevelopment.jpg', desc: 'Responsive, modern websites built for performance and impact.', features: ['Responsive Design', 'SEO Friendly', 'Fast Load Times', 'Modern UI', 'Cross-Browser Support'] },
    { icon: '🛒', title: 'E-Commerce Website Development', img: '/services/ecommerce.jpeg', desc: 'Feature-rich online stores with secure payments and smooth checkout.', features: ['Razorpay/Stripe', 'Product Management', 'Order Tracking', 'Shopping Cart', 'Wishlist'] },
    { icon: '💼', title: 'Custom Web Application Development', img: '/services/webapp.jpg', desc: 'Scalable web apps tailored to your exact business workflow.', features: ['React.js', 'Custom Dashboards', 'Real-Time Features', 'Scalable Architecture', 'API-Driven'] },
    { icon: '⚙️', title: 'Custom Software Development', img: '/services/software-development.jpg', desc: 'Purpose-built software solutions engineered around your business needs.', features: ['System Architecture', 'Enterprise Solutions', 'Custom Logic', 'Scalable Design', 'Third-Party Integration'] },
    { icon: '📊', title: 'Admin Panel & CRM Development', img: '/services/admin-panel.jpg', desc: 'Custom admin dashboards and CRMs to manage your business effectively.', features: ['Role Management', 'Analytics Dashboard', 'Customer Management', 'Reports & Insights', 'Access Control'] },
    { icon: '🖥️', title: 'Desktop Application Development', img: '/services/desktop-app.jpg', desc: 'Cross-platform desktop applications built for speed and reliability.', features: ['Electron.js', 'Windows/Mac/Linux', 'Native Performance', 'Auto-Update Support', 'Offline Functionality'] },
    { icon: '🤖', title: 'AI Solutions & Automation', img: '/services/ai-solutions.jpg', desc: 'Smart AI-powered features that automate work and unlock new capabilities.', features: ['Chatbots', 'Machine Learning', 'AI Integration', 'Data Analysis', 'Process Automation'] },
    { icon: '🔗', title: 'API & Third-Party Integration', img: '/services/api-integration.jpg', desc: 'Seamless integration with payment gateways, tools, and external services.', features: ['REST APIs', 'Payment Gateways', 'Webhooks', 'Third-Party Services', 'Custom Connectors'] },
    { icon: '☁️', title: 'Cloud Deployment & Hosting', img: '/services/deployment-launch.jpg', desc: 'Reliable cloud deployment and hosting to keep your product live and fast.', features: ['AWS Deployment', 'CI/CD Setup', 'Domain Configuration', 'SSL Certificate', 'Server Management'] },
    { icon: '🛠️', title: 'Website Maintenance & Support', img: '/services/maintenance.jpg', desc: 'Ongoing maintenance and support to keep your website running smoothly.', features: ['Regular Updates', 'Performance Monitoring', 'Uptime Assurance', 'Priority Support', 'Monthly Reports'] },
    { icon: '🔧', title: 'Bug Fixing & Performance Optimization', img: '/services/bugfixing.jpg', desc: 'Fast, thorough bug resolution and performance tuning for a smoother product.', features: ['Performance Audit', 'Bug Resolution', 'Code Refactoring', 'Security Patches', 'Speed Optimization'] },
    { icon: '📱', title: 'UI/UX Design', img: '/services/mobileapp.jpg', desc: 'Beautiful, intuitive interfaces designed with user experience at the core.', features: ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Responsive Design'] },
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
            <ServiceImageCard key={i} s={s} />
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

// Card with an image banner on top (icon badge overlaid on the image),
// zooms slightly on hover. Falls back to a plain icon banner if the
// image file isn't found, so nothing breaks before photos are added.
const ServiceImageCard = ({ s }) => {
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Image banner */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
        <img
          src={s.img}
          alt={s.title}
          className="service-banner-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          style={{
            display: 'none',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.8rem',
            background: 'radial-gradient(circle, rgba(13,207,207,0.14) 0%, transparent 70%)',
          }}
        >
          {s.icon}
        </div>

        {/* Bottom fade so image blends into card body */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            background: 'linear-gradient(180deg, transparent, rgba(17,24,39,0.95))',
          }}
        />

        {/* Icon badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '14px',
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(13,207,207,0.15)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
          }}
        >
          {s.icon}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
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
    </div>
  );
};

export default Services;