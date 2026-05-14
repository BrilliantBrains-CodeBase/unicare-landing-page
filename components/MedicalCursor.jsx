import { useEffect, useRef } from 'react';

const CLICKABLE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]:not([tabindex="-1"])';

export default function MedicalCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const style = document.createElement('style');
    style.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(style);

    const el = () => cursorRef.current;

    const move = ({ clientX, clientY, target }) => {
      const c = el();
      if (!c) return;
      const hover = !!target?.closest(CLICKABLE);
      c.style.transform = `translate(${clientX}px, ${clientY}px) scale(${hover ? 1.6 : 1})`;
      c.style.opacity = '1';
    };

    const leave  = () => { const c = el(); if (c) c.style.opacity = '0'; };
    const enter  = () => { const c = el(); if (c) c.style.opacity = '1'; };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 22,
        height: 22,
        marginLeft: -11,
        marginTop: -11,
        pointerEvents: 'none',
        zIndex: 999999,
        opacity: 0,
        transition: 'opacity 0.1s ease',
      }}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="9" y="1" width="4" height="20" fill="#2CAAA0" rx="2"/>
        <rect x="1" y="9" width="20" height="4" fill="#2CAAA0" rx="2"/>
      </svg>
    </div>
  );
}
