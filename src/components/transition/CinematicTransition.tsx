import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './CinematicTransition.css';

interface CinematicTransitionProps {
  active: boolean;
  onReveal: () => void;
  onComplete: () => void;
}

export function CinematicTransition({ active, onReveal, onComplete }: CinematicTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      revealedRef.current = false;
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' });
        onComplete();
      },
    });

    const revealTimer = gsap.delayedCall(1.4, () => {
      if (!revealedRef.current) {
        revealedRef.current = true;
        onReveal();
      }
    });

    tl.set(overlayRef.current, { display: 'flex', opacity: 1 })
      .fromTo(
        overlayRef.current,
        { backdropFilter: 'blur(0px)' },
        { backdropFilter: 'blur(20px)', duration: 0.6, ease: 'power2.inOut' },
      )
      .fromTo(
        ringRef.current,
        { scale: 0.2, opacity: 0.9 },
        { scale: 28, opacity: 0, duration: 2, ease: 'expo.inOut' },
        0,
      )
      .fromTo(
        '.transition-text',
        { opacity: 0, y: 24, filter: 'blur(12px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
        0.3,
      )
      .to(
        '.transition-text',
        { opacity: 0, y: -16, filter: 'blur(8px)', duration: 0.7, ease: 'power3.in' },
        1.6,
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          backdropFilter: 'blur(0px)',
          duration: 1,
          ease: 'power2.inOut',
        },
        2.1,
      );

    return () => {
      tl.kill();
      revealTimer.kill();
    };
  }, [active, onReveal, onComplete]);

  if (!active) return null;

  return (
    <div ref={overlayRef} className="cinematic-transition">
      <div ref={ringRef} className="transition-ring" />
      <div className="transition-text">
        <span className="transition-eyebrow">TravelLux</span>
        <h2>Rezervasyon Deneyiminiz Hazırlanıyor</h2>
        <div className="transition-loader">
          <div className="transition-loader-bar" />
        </div>
      </div>
      <div className="transition-particles">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="transition-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
