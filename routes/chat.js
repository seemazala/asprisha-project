const express = require('express');

const router = express.Router();

const SYSTEM_PROMPT = `You are AISPL's helpful website assistant. AISPL (Asprisha Innovation Solution Pvt. Ltd.) provides web development, mobile apps, software development, cloud services, AI solutions, API integration, e-commerce, desktop apps, maintenance, deployment, and admin panels. Answer visitors clearly and briefly. When pricing, delivery dates, or a project estimate is requested, explain that a team member will confirm the details and invite the visitor to use the Contact page. Do not invent company policies, prices, case studies, phone numbers, or guarantees.`;

router.post('/', async (req, res) => {
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
  const history = Array.isArray(req.body?.history) ? req.body.history : [];

  if (!message) {
    return res.status(400).json({ success: false, message: 'Please enter a message.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ success: false, message: 'Please keep your message under 2,000 characters.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({
      success: false,
      message: 'Chat assistant is not configured yet. Please add OPENAI_API_KEY to the backend environment.',
    });
  }

  const conversation = history
    .slice(-8)
    .filter((item) => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
    .map((item) => ({ role: item.role, content: item.content.slice(0, 2000) }));

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...conversation,
          { role: 'user', content: message },
        ],
        temperature: 0.5,
        max_tokens: 400,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI chat error:', data.error?.message || response.statusText);
      return res.status(502).json({ success: false, message: 'The chat assistant is temporarily unavailable.' });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(502).json({ success: false, message: 'The chat assistant did not return a response.' });
    }

    res.json({ success: true, reply });
  } catch (error) {
    console.error('Chat request error:', error.message);
    res.status(500).json({ success: false, message: 'Unable to reach the chat assistant. Please try again.' });
  }
});

module.exports = router;
