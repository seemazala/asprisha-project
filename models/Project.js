const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  category: { type: String, enum: ['MERN Stack', 'React.js', 'Client Work'], required: true },
  liveUrl: { type: String, required: true },
  githubUrl: { type: String, default: '' },
  icon: { type: String, default: '🚀' },
  color: { type: String, default: '#0dcfcf' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);