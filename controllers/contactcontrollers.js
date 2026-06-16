const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// @desc    Submit contact form (public)
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required.',
      });
    }

    const contact = await Contact.create({ name, email, phone, service, message });

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `📩 New Contact: ${name} — AISPL Website`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #0dcfcf;">New Contact Form Submission</h2>
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:8px;color:#666;width:120px;"><b>Name</b></td><td style="padding:8px;">${name}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;color:#666;"><b>Email</b></td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px;color:#666;"><b>Phone</b></td><td style="padding:8px;">${phone || '—'}</td></tr>
              <tr style="background:#f9f9f9"><td style="padding:8px;color:#666;"><b>Service</b></td><td style="padding:8px;">${service || '—'}</td></tr>
              <tr><td style="padding:8px;color:#666;vertical-align:top;"><b>Message</b></td><td style="padding:8px;">${message}</td></tr>
            </table>
            <p style="color:#888;font-size:12px;">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn('Email notification failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      id: contact._id,
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// @desc    Get all contact messages (admin)
// @route   GET /api/contact
// @access  Private
const getContacts = async (req, res) => {
  try {
    // Fetch all contacts — handle both old schema (status) and new schema (isRead/isReplied)
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Normalize old documents that don't have isRead/isReplied
    const normalized = contacts.map(c => {
      const obj = c.toObject();
      // Old docs have 'status' field, new have isRead/isReplied
      if (obj.isRead === undefined) obj.isRead = obj.status === 'read' ? true : false;
      if (obj.isReplied === undefined) obj.isReplied = obj.status === 'replied' ? true : false;
      return obj;
    });

    const unreadCount = normalized.filter(c => !c.isRead).length;

    res.status(200).json({
      success: true,
      count: normalized.length,
      unreadCount,
      contacts: normalized,
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Mark contact as read
// @route   PATCH /api/contact/:id/read
// @access  Private
const markRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, status: 'read' },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Mark contact as replied
// @route   PATCH /api/contact/:id/replied
// @access  Private
const markReplied = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, isReplied: true, status: 'replied' },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found.' });
    res.status(200).json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { submitContact, getContacts, markRead, markReplied, deleteContact };