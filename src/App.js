import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import { api } from './services/api';

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    // Check backend connection
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch (error) {
        setBackendStatus('error');
      }
    };
    checkBackend();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'Home': return <Home setActivePage={setActivePage} />;
      case 'About': return <About />;
      case 'Services': return <Services setActivePage={setActivePage} />;
      case 'Portfolio': return <Portfolio />;
      case 'Contact': return <Contact />;
      default: return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <div>
      {backendStatus === 'error' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#e63946',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'var(--font-display)'
        }}>
          ⚠️ Backend Not Connected
        </div>
      )}
      {backendStatus === 'connected' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#2ecc71',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '12px',
          zIndex: 1000,
          fontFamily: 'var(--font-display)'
        }}>
          ✅ Backend Connected
        </div>
      )}
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main>{renderPage()}</main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;