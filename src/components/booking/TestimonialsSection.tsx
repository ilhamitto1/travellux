import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviews } from '../../data/reviews';
import './TestimonialsSection.css';

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
  };

  const visible = [
    reviews[current % reviews.length],
    reviews[(current + 1) % reviews.length],
    reviews[(current + 2) % reviews.length],
  ];

  return (
    <section className="testimonials-section section-padding">
      <p className="section-eyebrow">Yorumlar</p>
      <h2 className="section-title">Gezginlerimiz <span className="gradient-text">Ne Diyor?</span></h2>
      <p className="section-subtitle">50 gerçek müşteri yorumu — ortalama 4.9/5 memnuniyet puanı.</p>

      <div className="testimonial-carousel">
        <AnimatePresence mode="popLayout" custom={direction}>
          {visible.map((review, i) => (
            <motion.div
              key={`${review.id}-${current}-${i}`}
              className="testimonial-card glass"
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1 - i * 0.15, x: 0, scale: 1 - i * 0.04 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 3 - i }}
            >
              <div className="testimonial-header">
                <img src={review.avatar} alt={review.name} loading="lazy" />
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.destination} · {review.date}</span>
                </div>
                <div className="testimonial-rating">
                  {'★'.repeat(Math.round(review.rating))}
                  <span>{review.rating}</span>
                </div>
              </div>
              <p className="testimonial-text">"{review.text}"</p>
              {review.verified && <span className="verified-badge">✓ Doğrulanmış Rezervasyon</span>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="testimonial-dots">
        {reviews.slice(0, 10).map((_, i) => (
          <button
            key={i}
            className={current % 10 === i ? 'active' : ''}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="testimonial-marquee">
        <div className="marquee-track">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={`${r.id}-m${i}`} className="marquee-item">
              <img src={r.avatar} alt="" loading="lazy" />
              <span>"{r.text.slice(0, 60)}..."</span>
              <strong>— {r.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
