import { useEffect } from 'react';

export function CursorGlow() {
  useEffect(() => {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    const style = document.createElement('style');
    style.textContent = `
      .cursor-glow {
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(16,185,129,0.05) 40%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        mix-blend-mode: screen;
      }
      @media (max-width: 768px) { .cursor-glow { display: none; } }
    `;
    document.head.appendChild(style);

    const move = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      glow.remove();
      style.remove();
    };
  }, []);

  return null;
}
