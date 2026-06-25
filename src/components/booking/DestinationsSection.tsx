import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { destinations } from '../../data/destinations';
import './DestinationsSection.css';

gsap.registerPlugin(ScrollTrigger);

export function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dest-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 60, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="destinasyonlar" className="destinations-section section-padding">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="section-eyebrow">Keşfedin</p>
        <h2 className="section-title">Premium <span className="gradient-text">Destinasyonlar</span></h2>
        <p className="section-subtitle">Dünyanın en seçkin 12 destinasyonunda size özel lüks paketler.</p>
      </motion.div>

      <div className="dest-grid">
        {destinations.map((dest, i) => (
          <motion.article
            key={dest.id}
            className="dest-card"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <div className="dest-image-wrap">
              <img src={dest.image} alt={dest.name} loading="lazy" />
              <div className="dest-image-overlay" />
              <span className="dest-duration">{dest.duration}</span>
            </div>
            <div className="dest-body">
              <div className="dest-meta">
                <h3>{dest.name}</h3>
                <span className="dest-rating">★ {dest.rating}</span>
              </div>
              <p className="dest-desc">{dest.description}</p>
              <div className="dest-activities">
                {dest.activities.slice(0, 3).map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
              <div className="dest-footer">
                <div>
                  <span className="dest-from">Başlangıç</span>
                  <strong>€{dest.startingPrice.toLocaleString()}</strong>
                </div>
                <span className="dest-reviews">{dest.reviewCount.toLocaleString()} yorum</span>
              </div>
            </div>
            <div className="dest-index">{(i + 1).toString().padStart(2, '0')}</div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
