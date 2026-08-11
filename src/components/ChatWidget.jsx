import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';

const initialMessage = {
  role: 'assistant',
  content: 'Hello! I am the AISPL assistant. How can I help with your project today?',
};

const suggestions = ['Website development', 'AI solutions', 'Request a project quote'];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isSending]);

  const sendMessage = async (messageText = draft) => {
    const content = messageText.trim();
    if (!content || isSending) return;

    setMessages((current) => [...current, { role: 'user', content }]);
    setDraft('');
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

          {messages.length === 1 && (
            <div className="chat-suggestions" aria-label="Suggested questions">
              {suggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => sendMessage(suggestion)}>{suggestion}</button>
              ))}
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
