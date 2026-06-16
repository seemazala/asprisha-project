require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const seed = async () => {
  try {
    await connectDB();

    // Get collections directly
    const db = mongoose.connection.db;
    
    // 1. Clear existing data
    console.log('🗑️ Clearing existing data...');
    await db.collection('admins').deleteMany({});
    await db.collection('projects').deleteMany({});
    await db.collection('contacts').deleteMany({});
    console.log('✅ Collections cleared');

    // 2. Create Admin (direct insert with hashed password)
    console.log('👤 Creating admin...');
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    
    const adminResult = await db.collection('admins').insertOne({
      name: 'Seema Zala',
      email: 'seemazala0422@gmail.com',
      password: hashedPassword,
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Admin created:', 'seemazala0422@gmail.com');

    // 3. Create Projects
    console.log('📁 Creating projects...');
    const projects = [
      {
        title: 'Spot The Fake',
        subtitle: 'Fake News Detection Platform',
        description: 'A MERN stack web application that helps users identify fake news by analyzing submitted content. Includes secure authentication, news verification system, and database management.',
        techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
        category: 'MERN Stack',
        liveUrl: 'https://spot-the-fake-be-aware.netlify.app/',
        githubUrl: '',
        icon: '🔍',
        color: '#e63946',
        featured: true,
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cartify',
        subtitle: 'Full Stack E-Commerce Platform',
        description: 'Full-featured e-commerce platform with product listing, cart, wishlist, checkout, order management, user authentication, and Razorpay payment integration. Deployed on AWS S3 + CloudFront.',
        techStack: ['React.js', 'Node.js', 'MySQL', 'AWS S3', 'Razorpay', 'CloudFront'],
        category: 'MERN Stack',
        liveUrl: 'https://d168mf0ksurljv.cloudfront.net/',
        githubUrl: '',
        icon: '🛒',
        color: '#f4a261',
        featured: true,
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Live SkyWatch',
        subtitle: 'Weather Application',
        description: 'A responsive weather application built using React and OpenWeather API to display live weather updates with a clean, modern UI.',
        techStack: ['React.js', 'OpenWeather API', 'CSS3'],
        category: 'React.js',
        liveUrl: 'https://live-skywatch-weather-app.netlify.app/',
        githubUrl: '',
        icon: '🌤️',
        color: '#457b9d',
        featured: false,
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Seema Zala Portfolio',
        subtitle: 'Personal Portfolio Website',
        description: 'A fully responsive personal portfolio website built using React.js with MongoDB backend. Showcases projects, skills, and contact functionality with a modern UI.',
        techStack: ['React.js', 'MongoDB', 'CSS3', 'Netlify'],
        category: 'React.js',
        liveUrl: 'https://seema-zala-portfolio.netlify.app/',
        githubUrl: '',
        icon: '👩‍💻',
        color: '#0dcfcf',
        featured: false,
        order: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const projectsResult = await db.collection('projects').insertMany(projects);
    console.log(`✅ ${projectsResult.insertedCount} projects created`);

    // 4. Create sample contact
    console.log('📧 Creating sample contact...');
    await db.collection('contacts').insertOne({
      name: 'Test User',
      email: 'test@example.com',
      phone: '+91 9876543210',
      service: 'Web Development',
      message: 'This is a test message from seed script.',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('✅ Sample contact created');

    console.log('\n🎉 ========== SEED COMPLETE ==========');
    console.log(`📊 Summary:`);
    console.log(`   - Admin: 1 (seemazala0422@gmail.com)`);
    console.log(`   - Projects: ${projectsResult.insertedCount}`);
    console.log(`   - Contacts: 1`);
    console.log('\n🔐 Admin Login:');
    console.log(`   Email: seemazala0422@gmail.com`);
    console.log(`   Password: Admin@123456`);
    console.log('\n🚀 You can now start the server: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();