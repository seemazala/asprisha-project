import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

// Backend server address — update this if your backend runs on a different port/domain
const BACKEND_URL = 'http://localhost:5000';

// Turns a relative path like "/uploads/xyz.png" into a full URL.
// If thumbnail already has http(s) in it, leave it as-is.
const getImageUrl = (thumbnail) => {
  if (!thumbnail) return null;
  return thumbnail.startsWith('http') ? thumbnail : `${BACKEND_URL}${thumbnail}`;
};

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // NEW: controls modal

  // Fetch all projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects('All');
      if (data.success) {
        setProjects(data.projects);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch projects');
      }
    } catch (err) {
      setError('Error connecting to server. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        <div style={{ color: 'var(--teal)', fontSize: '1.2rem' }}>
          Loading projects...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        <div style={{ color: '#e63946', fontSize: '1.1rem', marginBottom: '1rem' }}>
          ⚠️ {error}
        </div>
        <p style={{ color: 'var(--muted)' }}>
          Make sure backend server is running at http://localhost:5000
        </p>
        <button 
          onClick={() => fetchProjects()}
          className="btn-primary"
          style={{ marginTop: '1rem', padding: '8px 20px' }}
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredProjects = projects;

  return (
    <div style={{ paddingTop: '70px' }}>
      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)' }}>
        <div className="section-subtitle">Our Work</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>Portfolio</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Live projects built with modern technologies — each one solving a real problem.
        </p>
      </section>

      {/* Projects Grid — CLEAN VERSION: only thumbnail + title + tagline, click to see full details */}
      <section style={{ padding: '2.5rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
            No projects found in this category.
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <div 
                key={p._id || i} 
                className="card" 
                onClick={() => setSelectedProject(p)}
                style={{ overflow: 'hidden', padding: 0, cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Thumbnail area */}
                <div style={{ 
                  height: '160px', 
                  background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '3.5rem', 
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {p.thumbnail ? (
                    <img 
                      src={getImageUrl(p.thumbnail)} 
                      alt={p.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    p.icon
                  )}
                </div>

                {/* Only title + short tagline — no description, no tech tags, no live link */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: '4px' }}>
                    {p.title}
                  </h3>
                  <div style={{ color: p.color, fontSize: '0.8rem' }}>
                    {p.subtitle}
                  </div>
                </div>
              </div>
            ))}

            {/* Contact CTA card — stays last always since it's outside the projects map */}
            <a
              href="/contact"
              className="card"
              style={{
                overflow: 'hidden',
                padding: 0,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '100%',
                border: '1px dashed var(--border)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>💬</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '6px' }}>
                  Want More Project Details?
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  Get in touch to see live demos and discuss your project.
                </p>
                <span style={{ color: 'var(--teal)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem' }}>
                  Contact Us →
                </span>
              </div>
            </a>
          </div>
        )}
      </section>

      {/* Detail Modal — opens on click, shows full info + privacy-safe CTA */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(5,10,20,0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="card"
            style={{
              maxWidth: '520px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: 0,
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'var(--navy)',
                border: '1px solid var(--border)',
                color: 'var(--white)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                zIndex: 2
              }}
            >
              ✕
            </button>

            <div style={{ 
              height: '220px', 
              background: `linear-gradient(135deg, ${selectedProject.color}22, ${selectedProject.color}44)`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '4.5rem',
              overflow: 'hidden'
            }}>
              {selectedProject.thumbnail ? (
                <img 
                  src={getImageUrl(selectedProject.thumbnail)} 
                  alt={selectedProject.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                selectedProject.icon
              )}
            </div>

            <div style={{ padding: '1.75rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--white)', margin: '0 0 4px' }}>
                {selectedProject.title}
              </h2>
              <div style={{ color: selectedProject.color, fontSize: '0.85rem', marginBottom: '1rem' }}>
                {selectedProject.subtitle}
              </div>

              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {selectedProject.description}
              </p>

              {selectedProject.techStack?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                  {selectedProject.techStack.map(t => (
                    <span key={t} style={{ 
                      background: 'rgba(13,207,207,0.07)', 
                      border: '1px solid var(--border)', 
                      color: 'var(--white)', 
                      padding: '3px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.72rem' 
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Privacy-safe CTA — no direct live link, sends user to Contact */}
              <a
                href="/contact"
                style={{
                  display: 'inline-block',
                  background: 'var(--teal)',
                  color: 'var(--navy)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  padding: '10px 22px',
                  borderRadius: '6px',
                  textDecoration: 'none'
                }}
              >
                Contact for Live Demo →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;