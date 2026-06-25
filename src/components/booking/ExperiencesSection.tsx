import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/experiences';
import './ExperiencesSection.css';

const categoryLabels: Record<string, string> = {
  yacht: 'Yat Turları', helicopter: 'Helikopter', diving: 'Dalış',
  adventure: 'Macera', dining: 'Gastronomi', spa: 'Spa',
};

export function ExperiencesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handleHover = (id: string, enter: boolean) => {
    setHoveredId(enter ? id : null);
    const vid = videoRefs.current[id];
    if (vid) {
      if (enter) { vid.play().catch(() => {}); }
      else { vid.pause(); vid.currentTime = 0; }
    }
  };

  return (
    <section id="deneyimler" className="experiences-section section-padding">
      <p className="section-eyebrow">Deneyimler</p>
      <h2 className="section-title">Özel <span className="gradient-text">Aktiviteler</span></h2>
      <p className="section-subtitle">Yat turlarından helikopter gezilerine, her anı unutulmaz kılacak premium deneyimler.</p>

      <div className="exp-grid">
        {experiences.map((exp) => (
          <motion.article
            key={exp.id}
            className="exp-card"
            onMouseEnter={() => handleHover(exp.id, true)}
            onMouseLeave={() => handleHover(exp.id, false)}
            whileHover={{ y: -6 }}
          >
            <div className="exp-media">
              <img src={exp.image} alt={exp.title} loading="lazy" className={hoveredId === exp.id ? 'hidden' : ''} />
              <video
                ref={(el) => { videoRefs.current[exp.id] = el; }}
                src={exp.videoPreview}
                muted loop playsInline
                className={hoveredId === exp.id ? 'visible' : ''}
              />
              <span className="exp-category">{categoryLabels[exp.category]}</span>
              <span className="exp-duration">{exp.duration}</span>
            </div>
            <div className="exp-body">
              <h3>{exp.title}</h3>
              <p>{exp.description}</p>
              <div className="exp-highlights">
                {exp.highlights.map((h) => <span key={h}>{h}</span>)}
              </div>
              <div className="exp-footer">
                <span className="exp-rating">★ {exp.rating}</span>
                <motion.strong
                  key={exp.price}
                  animate={hoveredId === exp.id ? { color: '#10b981' } : { color: '#0c4a6e' }}
                >
                  €{exp.price.toLocaleString()}
                </motion.strong>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
