import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface WaveParallaxProps {
  className?: string;
}

export function WaveParallax({ className = '' }: WaveParallaxProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const paths = ref.current?.querySelectorAll('path');
    if (!paths) return;

    paths.forEach((path, i) => {
      gsap.to(path, {
        attr: { d: i % 2 === 0
          ? 'M0,80 Q360,40 720,80 T1440,80 L1440,200 L0,200 Z'
          : 'M0,100 Q360,60 720,100 T1440,100 L1440,200 L0,200 Z' },
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <svg ref={ref} className={className} viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width: '100%', height: '120px' }}>
      <path fill="rgba(14,165,233,0.08)" d="M0,60 Q360,100 720,60 T1440,60 L1440,200 L0,200 Z" />
      <path fill="rgba(16,185,129,0.06)" d="M0,90 Q360,50 720,90 T1440,90 L1440,200 L0,200 Z" />
      <path fill="rgba(14,165,233,0.04)" d="M0,110 Q360,70 720,110 T1440,110 L1440,200 L0,200 Z" />
    </svg>
  );
}
