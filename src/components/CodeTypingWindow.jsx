import React, { useState, useEffect, useRef } from 'react';

// A fake "VS Code" style window that types out code line by line, then loops forever.
const codeLines = [
  { text: 'import React from "react";', color: '#c586c0' },
  { text: 'import { AISPL } from "./solutions";', color: '#c586c0' },
  { text: '', color: '#fff' },
  { text: 'function BuildProject() {', color: '#569cd6' },
  { text: '  const idea = "your vision";', color: '#9cdcfe' },
  { text: '  const stack = ["MERN", "Cloud"];', color: '#9cdcfe' },
  { text: '', color: '#fff' },
  { text: '  return (', color: '#c586c0' },
  { text: '    <Success', color: '#4ec9b0' },
  { text: '      client="you"', color: '#9cdcfe' },
  { text: '      quality="premium"', color: '#9cdcfe' },
  { text: '    />', color: '#4ec9b0' },
  { text: '  );', color: '#c586c0' },
  { text: '}', color: '#569cd6' },
];

const CodeTypingWindow = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Recursive setTimeout instead of setInterval — this never permanently
    // stops itself, so the animation keeps looping without needing a refresh.
    const tick = () => {
      // finished all lines -> pause, then wipe and restart from line 1
      if (lineIdx.current >= codeLines.length) {
        timeoutRef.current = setTimeout(() => {
          setVisibleLines([]);
          setCurrentText('');
          lineIdx.current = 0;
          charIdx.current = 0;
          timeoutRef.current = setTimeout(tick, 35);
        }, 2000);
        return;
      }

      const line = codeLines[lineIdx.current];

      if (charIdx.current <= line.text.length) {
        setCurrentText(line.text.slice(0, charIdx.current));
        charIdx.current++;
        timeoutRef.current = setTimeout(tick, 35);
      } else {
        setVisibleLines((prev) => [...prev, line]);
        setCurrentText('');
        charIdx.current = 0;
        lineIdx.current++;
        timeoutRef.current = setTimeout(tick, 35);
      }
    };

    timeoutRef.current = setTimeout(tick, 35);
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '460px',
        background: '#0d1424',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(13,207,207,0.08)',
        fontFamily: '"Fira Code", "Consolas", monospace',
        flexShrink: 0,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          background: '#151d33',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ marginLeft: '10px', color: 'var(--muted)', fontSize: '0.78rem' }}>project.jsx</div>
      </div>

      {/* Code body — fixed height so the box never resizes/jumps as lines are added */}
      <div style={{ padding: '18px 16px', height: '320px', overflow: 'hidden', fontSize: '0.82rem', lineHeight: 1.7 }}>
        {visibleLines.map((line, i) => (
          <div key={i} style={{ color: line.color, whiteSpace: 'pre' }}>
            <span style={{ color: 'var(--muted)', marginRight: '12px', userSelect: 'none' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            {line.text || '\u00A0'}
          </div>
        ))}
        <div style={{ color: '#fff', whiteSpace: 'pre' }}>
          <span style={{ color: 'var(--muted)', marginRight: '12px', userSelect: 'none' }}>
            {String(visibleLines.length + 1).padStart(2, '0')}
          </span>
          {currentText}
          <span style={{ animation: 'blink 1s infinite', borderLeft: '2px solid var(--teal)', marginLeft: '1px' }} />
        </div>
      </div>
    </div>
  );
};

export default CodeTypingWindow;