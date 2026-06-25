import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './CinematicTransition.css';

interface CinematicTransitionProps {
  active: boolean;
  onComplete: () => void;
}

export function CinematicTransition({ active, onComplete }: CinematicTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 200);
      },
    });

    tl.set(overlayRef.current, { display: 'flex' })
      .fromTo(ringRef.current,
        { scale: 0, opacity: 1 },
        { scale: 30, opacity: 0, duration: 1.8, ease: 'power4.inOut' }
      )
      .fromTo('.transition-text',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
        '-=1.4'
      )
      .to('.transition-text', {
        opacity: 0, y: -20, filter: 'blur(10px)', duration: 0.6, ease: 'power3.in',
      }, '+=0.5')
      .to(overlayRef.current, {
        opacity: 0, duration: 0.8, ease: 'power2.inOut',
      }, '-=0.2');

    return () => { tl.kill(); };
  }, [active, onComplete]);

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
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="transition-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }} />
        ))}
      </div>
    </div>
  );
}
