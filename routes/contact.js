const express = require('express');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public: Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Required fields missing' });
    }
    const contact = await Contact.create({ name, email, phone, service, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Get all messages
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    // Normalize old docs (status field) to new format (isRead/isReplied)
    const normalized = contacts.map(c => {
      const obj = c.toObject();
      if (obj.isRead === undefined) obj.isRead = false;
      if (obj.isReplied === undefined) obj.isReplied = false;
      return obj;
    });

    const unreadCount = normalized.filter(c => !c.isRead).length;

    res.json({
      success: true,
      count: normalized.length,
      unreadCount,
      contacts: normalized,   // ✅ 'contacts' key — admin panel yahi expect karta hai
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Mark as read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Mark as replied
router.patch('/:id/replied', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true, isReplied: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin: Delete message
router.delete('/:id', protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;