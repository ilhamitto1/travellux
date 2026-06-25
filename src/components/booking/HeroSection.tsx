import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { destinations } from '../../data/destinations';
import { stats } from '../../data/flights';
import { MEDIA } from '../../config/media';
import { MagneticButton } from '../effects/MagneticButton';
import './HeroSection.css';

interface HeroSectionProps {
  onBookNow: () => void;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = value / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= value) { setCount(value); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function HeroSection({ onBookNow }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const dest = destinations[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', { opacity: 0, y: 80, duration: 1.4, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-widget', { opacity: 0, y: 40, scale: 0.95, duration: 1.2, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-stat', { opacity: 0, y: 30, stagger: 0.15, duration: 0.8, delay: 1.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <img
        className="hero-bg"
        src={MEDIA.bookingHeroImage}
        alt="Maldives luxury resort"
        loading="eager"
      />
      <div className="hero-overlay" />

      <div className="hero-content section-padding">
        <motion.p className="hero-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Premium Seyahat Platformu
        </motion.p>
        <h1 className="hero-title">
          Lüksün <em>Yeni Tanımı</em>
        </h1>
        <p className="hero-desc">
          12 seçkin destinasyon, 20 butik otel ve sınırsız premium deneyim.
          Seyahatinizi baştan sona biz planlayalım.
        </p>

        <div className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat glass-dark">
              <strong><AnimatedCounter value={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="hero-widget glass">
          <div className="widget-header">
            <img src={dest.image} alt={dest.name} loading="lazy" />
            <div>
              <h3>{dest.name}</h3>
              <p>{dest.duration} · ★ {dest.rating}</p>
            </div>
            <div className="widget-price">
              <span>Başlangıç</span>
              <strong>€{dest.startingPrice.toLocaleString()}</strong>
            </div>
          </div>
          <div className="widget-actions">
            <MagneticButton onClick={onBookNow} className="btn-primary">
              Book Now
            </MagneticButton>
            <button className="btn-outline">Detayları Gör</button>
          </div>
        </div>
      </div>
    </section>
  );
}
