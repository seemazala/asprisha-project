import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = ['All', 'MERN Stack', 'React.js', 'Client Work'];

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects(filter);
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

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div style={{ paddingTop: '70px' }}>
      <section style={{ padding: '5rem 2rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(13,207,207,0.07) 0%, transparent 70%)' }}>
        <div className="section-subtitle">Our Work</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--white)', marginBottom: '1rem' }}>Portfolio</h1>
        <p style={{ color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Live projects built with modern technologies — each one solving a real problem.
        </p>
      </section>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', padding: '2rem 2rem 0' }}>
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setFilter(c)} 
            style={{
              background: filter === c ? 'var(--teal)' : 'var(--navy-card)',
              color: filter === c ? 'var(--navy)' : 'var(--muted)',
              border: `1px solid ${filter === c ? 'var(--teal)' : 'var(--border)'}`,
              padding: '8px 18px', 
              borderRadius: '20px', 
              cursor: 'pointer',
              fontFamily: 'var(--font-display)', 
              fontWeight: 600, 
              fontSize: '0.8rem',
              transition: 'all 0.2s',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <section style={{ padding: '2.5rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)' }}>
            No projects found in this category.
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((p, i) => (
              <div key={p._id || i} className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ 
                  height: '120px', 
                  background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '3.5rem', 
                  position: 'relative' 
                }}>
                  {p.icon}
                  <span className="project-badge" style={{ 
                    position: 'absolute', 
                    top: '12px', 
                    right: '12px', 
                    background: 'var(--navy)', 
                    border: '1px solid var(--border)', 
                    color: 'var(--teal)', 
                    padding: '3px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 600 
                  }}>
                    {p.category}
                  </span>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--white)', marginBottom: '4px' }}>
                    {p.title}
                  </h3>
                  <div style={{ color: p.color, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                    {p.subtitle}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {p.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.25rem' }}>
                    {p.techStack?.map(t => (
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
                  <a 
                    href={p.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ 
                      color: 'var(--teal)', 
                      fontFamily: 'var(--font-display)', 
                      fontWeight: 600, 
                      fontSize: '0.85rem', 
                      textDecoration: 'none', 
                      borderBottom: '1px solid transparent' 
                    }}
                    onMouseEnter={e => e.target.style.borderBottomColor = 'var(--teal)'}
                    onMouseLeave={e => e.target.style.borderBottomColor = 'transparent'}
                  >
                    View Live Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;