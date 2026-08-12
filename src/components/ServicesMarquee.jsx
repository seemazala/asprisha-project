import React from 'react';

// Same services, same names, same images as the Services page —
// kept in sync so Home and Services never show mismatched lists.
const services = [
  { icon: '🌐', title: 'Website Development', img: '/services/webdevelopment.jpg' },
  { icon: '🛒', title: 'E-Commerce Website Development', img: '/services/ecommerce.jpeg' },
  { icon: '💼', title: 'Custom Web Application Development', img: '/services/webapp.jpg' },
  { icon: '⚙️', title: 'Custom Software Development', img: '/services/software-development.jpg' },
  { icon: '📊', title: 'Admin Panel & CRM Development', img: '/services/admin-panel.jpg' },
  { icon: '🖥️', title: 'Desktop Application Development', img: '/services/desktop-app.jpg' },
  { icon: '🤖', title: 'AI Solutions & Automation', img: '/services/ai-solutions.jpg' },
  { icon: '🔗', title: 'API & Third-Party Integration', img: '/services/api-integration.jpg' },
  { icon: '☁️', title: 'Cloud Deployment & Hosting', img: '/services/clouddev.jpg' },
  { icon: '🛠️', title: 'Website Maintenance & Support', img: '/services/maintenance.jpg' },
  { icon: '🔧', title: 'Bug Fixing & Performance Optimization', img: '/services/bugfixing.jpg' },
  { icon: '📱', title: 'UI/UX Design', img: '/services/mobileapp.jpg' },
];

// Duplicate the list so the loop feels seamless (no visible jump/reset).
const marqueeItems = [...services, ...services];

const ServicesMarquee = () => {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {marqueeItems.map((s, i) => (
          <div className="marquee-item" key={i}>
            <img
              src={s.img}
              alt={s.title}
              width="300"
              height="190"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="marquee-item-fallback" style={{ display: 'none' }}>
              <span>{s.icon}</span>
            </div>
            <div className="marquee-item-overlay">
              <span className="marquee-item-icon">{s.icon}</span>
              <span className="marquee-item-title">{s.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesMarquee;