import React, { useState } from 'react';
import { api } from '../services/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields');
      return;
    }
    
    setStatus('sending');
    setErrorMsg('');
    
    try {
      const data = await api.submitContact(form);
      
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setStatus('error');
      setErrorMsg('Network error. Please check if backend is running.');
    }
  };

  const serviceOptions = [
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
    'Others'
  ];

  const contactInfo = [
    { icon: '📞', label: 'Phone', val: '+91 9978567153', href: 'tel:+919978567153' },
    { icon: '📧', label: 'Email', val: 'info@asprisha.com', href: 'mailto:info@asprisha.com' },
    { icon: '📍', label: 'Address', val: '40, Digvijay Plot, Near Pavan Chaki Road, Jamnagar, Gujarat - 361005', href: null },
    { icon: '📱', label: 'Instagram', val: '@asprisha.innovative', href: 'https://www.instagram.com/asprisha.innovative' },
  ];

  return (
    <div style={{ paddingTop: '70px' }}>
      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)' }}>
        <div className="section-subtitle">Reach Out</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>Let's Build Together</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Have a project idea? Drop us a message.</p>
      </section>

      <section style={{ padding: '4rem 2rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', marginBottom: '2rem' }}>
              Contact <span style={{ color: 'var(--teal)' }}>Information</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {contactInfo.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--teal-glow)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="form-label" style={{ marginBottom: '3px' }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ color: 'var(--white)', fontSize: '0.9rem', textDecoration: 'none' }}>
                        {c.val}
                      </a>
                    ) : (
                      <div style={{ color: 'var(--white)', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--navy-card)', border: '1px solid var(--border)', borderRadius: '12px' }}>
              <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.5rem' }}>
                "We build digital solutions that drive growth, innovation and success."
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>— Asprisha Innovation Solutions</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--teal), transparent)' }} />
            
            {status === 'sent' ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--teal)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)' }}>We'll get back to you soon.</p>
                <button 
                  onClick={() => setStatus('')}
                  className="btn-outline"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Send a Message</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Name *</label>
                    <input 
                      className="form-input" 
                      placeholder="Your name" 
                      value={form.name} 
                      onChange={e => setForm({ ...form, name: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">Email *</label>
                    <input 
                      className="form-input" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={form.email} 
                      onChange={e => setForm({ ...form, email: e.target.value })} 
                    />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Phone</label>
                    <input 
                      className="form-input" 
                      placeholder="+91 XXXXXXXXXX" 
                      value={form.phone} 
                      onChange={e => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>
                  <div>
                    <label className="form-label">Service</label>
                    <select 
                      className="form-select" 
                      value={form.service} 
                      onChange={e => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Message *</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="Tell us about your project..." 
                    value={form.message} 
                    onChange={e => setForm({ ...form, message: e.target.value })} 
                  />
                </div>
                
                {status === 'error' && errorMsg && (
                  <div style={{ color: '#e63946', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;