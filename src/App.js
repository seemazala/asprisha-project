import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';

// Har page ka SEO data — baad me apni marzi se keywords change kar sakti ho
const seoData = {
  '/': {
    title: 'Asprisha Innovation Solutions | Full Stack Web Development Agency in Jamnagar, Gujarat',
    description: 'AISPL - Professional MERN stack web development agency based in Jamnagar, Gujarat. We build custom websites, web apps, and digital solutions for businesses across India.'
  },
  '/about': {
    title: 'About Us | Asprisha Innovation Solutions (AISPL)',
    description: 'Learn about Asprisha Innovation Solutions - a Jamnagar-based web development agency specializing in MERN stack solutions since 2017.'
  },
  '/services': {
    title: 'Web Development Services | React, Node.js, MongoDB Experts | AISPL',
    description: 'Custom web development services including full stack MERN applications, e-commerce platforms, admin dashboards, and business websites. Serving clients across Gujarat and India.'
  },
  '/portfolio': {
    title: 'Our Projects & Portfolio | Asprisha Innovation Solutions',
    description: 'Explore our web development portfolio - client projects including e-commerce platforms, business websites, and custom web applications built with MERN stack.'
  },
  '/contact': {
    title: 'Contact Us | Asprisha Innovation Solutions, Jamnagar Gujarat',
    description: 'Get in touch with AISPL for your web development needs. Based in Jamnagar, Gujarat - serving clients across India with custom digital solutions.'
  }
};

// Page name ko URL path me convert karta hai
const pageToPath = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Portfolio: '/portfolio',
  Contact: '/contact',
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState('checking');
  const currentSeo = seoData[location.pathname] || seoData['/'];

  // Purane setActivePage('Home') calls ke liye — ab ye URL navigate karega
  const setActivePage = (pageName) => {
    const path = pageToPath[pageName] || '/';
    navigate(path);
  };

  // Current URL se activePage nikal rahe hain (Navbar ko dikhane ke liye kaunsa active hai)
  const pathToPage = {
    '/': 'Home',
    '/about': 'About',
    '/services': 'Services',
    '/portfolio': 'Portfolio',
    '/contact': 'Contact',
  };
  const activePage = pathToPage[location.pathname] || 'Home';

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/health`);
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
  }, [location.pathname]);

  return (
    <div>
      <Helmet>
        <title>{currentSeo.title}</title>
        <meta name="description" content={currentSeo.description} />
        <link rel="canonical" href={`https://asprisha.com${location.pathname}`} />
        <meta property="og:title" content={currentSeo.title} />
        <meta property="og:description" content={currentSeo.description} />
        <meta property="og:url" content={`https://asprisha.com${location.pathname}`} />
        <meta property="og:type" content="website" />
      </Helmet>

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
      <main>
        <Routes>
          <Route path="/" element={<Home setActivePage={setActivePage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services setActivePage={setActivePage} />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer setActivePage={setActivePage} />
      <ChatWidget />
    </div>
  );
}

export default App;