require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Project = require('./models/Project');
const connectDB = require('./config/db');

const seed = async () => {
  try {
    await connectDB();

    // Create Admin
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Seema Zala',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'super_admin',
      });
      console.log('✅ Admin created:', process.env.ADMIN_EMAIL);
    } else {
      console.log('ℹ️ Admin already exists');
    }

    // Seed Projects
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany([
        {
          title: 'Spot The Fake',
          subtitle: 'Fake News Detection Platform',
          description: 'MERN stack application for fake news detection with authentication',
          techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
          category: 'MERN Stack',
          liveUrl: 'https://spot-the-fake-be-aware.netlify.app/',
          icon: '🔍',
          color: '#e63946',
          order: 1,
        },
        {
          title: 'Cartify',
          subtitle: 'E-Commerce Platform',
          description: 'Full-featured e-commerce with Razorpay payment integration',
          techStack: ['React.js', 'Node.js', 'MySQL', 'Razorpay', 'AWS'],
          category: 'MERN Stack',
          liveUrl: 'https://d168mf0ksurljv.cloudfront.net/',
          icon: '🛒',
          color: '#f4a261',
          order: 2,
        },
        {
          title: 'Live SkyWatch',
          subtitle: 'Weather App',
          description: 'Real-time weather application using OpenWeather API',
          techStack: ['React.js', 'OpenWeather API', 'CSS3'],
          category: 'React.js',
          liveUrl: 'https://live-skywatch-weather-app.netlify.app/',
          icon: '🌤️',
          color: '#457b9d',
          order: 3,
        },
        {
          title: 'Seema Zala Portfolio',
          subtitle: 'Personal Portfolio',
          description: 'Professional portfolio website showcasing projects and skills',
          techStack: ['React.js', 'MongoDB', 'CSS3', 'Netlify'],
          category: 'React.js',
          liveUrl: 'https://seema-zala-portfolio.netlify.app/',
          icon: '👩‍💻',
          color: '#0dcfcf',
          order: 4,
        },
      ]);
      console.log('✅ 4 projects seeded');
    } else {
      console.log(`ℹ️ ${count} projects already exist`);
    }

    console.log('\n🎉 Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();