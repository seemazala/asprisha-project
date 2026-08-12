import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';

const initialMessage = {
  role: 'assistant',
  content: 'Hello! I am the AISPL assistant. Browse a topic below, or type your own question.',
};

// Category > sub-questions structure. Each question label is worded to match
// the keywords in the backend chatController, so clicking it gets the right reply.
const menu = [
  {
    category: 'Our Services',
    questions: [
      'What services do you offer?',
      'Website Development',
      'E-Commerce Development',
      'Custom Web Applications',
      'Custom Software Development',
      'Admin Panel & CRM Development',
      'Desktop Application Development',
      'AI Solutions & Automation',
      'API & Third-Party Integration',
      'Cloud Deployment & Hosting',
      'Website Maintenance & Support',
      'Bug Fixing & Performance Optimization',
      'UI/UX Design',
    ],
  },
  {
    category: 'Working With Us',
    questions: [
      'Which technologies do you use?',
      'Will I own the source code?',
      'How do you communicate during the project?',
    ],
  },
  {
    category: 'Pricing & Timeline',
    questions: [
      'What is your pricing?',
      'How long will my project take?',
    ],
  },
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null); // null = show category list
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isSending, menuOpen, activeCategory]);

  const sendMessage = async (messageText = draft) => {
    const content = messageText.trim();
    if (!content || isSending) return;

    setMessages((current) => [...current, { role: 'user', content }]);
    setDraft('');
    setMenuOpen(false);
    setIsSending(true);

    const result = await api.sendChatMessage(content, messages);
    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        content: result.success
          ? result.reply
          : result.message || 'I could not respond right now. Please try again shortly.',
      },
    ]);
    setIsSending(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleNotListed = () => {
    setMessages((current) => [
      ...current,
      {
        role: 'assistant',
        content:
          "No worries! For anything not listed here, please reach out to us directly through our Contact page and we'll get back to you as soon as possible.",
      },
    ]);
    setMenuOpen(false);
    setActiveCategory(null);
  };

  const openMenu = () => {
    setMenuOpen(true);
    setActiveCategory(null);
  };

  return (
    <aside className="chat-widget" aria-label="AISPL chat assistant">
      {isOpen && (
        <section className="chat-panel" aria-live="polite">
          <header className="chat-header">
            <div>
              <span className="chat-eyebrow">AISPL</span>
              <h2>Project Assistant</h2>
            </div>
            <button className="chat-icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">x</button>
          </header>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div className={`chat-message chat-message-${message.role}`} key={`${message.role}-${index}`}>
                {message.content}
              </div>
            ))}
            {isSending && <div className="chat-message chat-message-assistant chat-typing">Thinking<span>.</span><span>.</span><span>.</span></div>}
            <div ref={messagesEndRef} />
          </div>

          {!isSending && menuOpen && activeCategory === null && (
            <div className="chat-suggestions" aria-label="Choose a topic">
              {menu.map((group) => (
                <button key={group.category} type="button" onClick={() => setActiveCategory(group.category)}>
                  {group.category}
                </button>
              ))}
              <button type="button" onClick={handleNotListed}>Something else? / Not listed here</button>
            </div>
          )}

          {!isSending && menuOpen && activeCategory !== null && (
            <div className="chat-suggestions" aria-label="Choose a question">
              <button type="button" onClick={() => setActiveCategory(null)}>← Back</button>
              {menu
                .find((group) => group.category === activeCategory)
                ?.questions.map((q) => (
                  <button key={q} type="button" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              <button type="button" onClick={handleNotListed}>Something else? / Not listed here</button>
            </div>
          )}

          {!isSending && !menuOpen && (
            <div className="chat-suggestions" aria-label="Reopen topics">
              <button type="button" onClick={openMenu}>📋 Browse Topics</button>
            </div>
          )}

          <form className="chat-input-row" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="aispl-chat-input">Your message</label>
            <input ref={inputRef} id="aispl-chat-input" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ask about your project..." maxLength="2000" disabled={isSending} />
            <button type="submit" disabled={!draft.trim() || isSending} aria-label="Send message">&gt;</button>
          </form>
        </section>
      )}

      <button className="chat-launcher" type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen}>
        <span className="chat-launcher-mark">AI</span>
        <span>{isOpen ? 'Close chat' : 'Ask AISPL'}</span>
      </button>
    </aside>
  );
}

export default ChatWidget;