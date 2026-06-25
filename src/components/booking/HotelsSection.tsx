import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hotels } from '../../data/hotels';
import './HotelsSection.css';

gsap.registerPlugin(ScrollTrigger);

export function HotelsSection() {
  const [selected, setSelected] = useState(hotels[0]);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hotel-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0, y: 50, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hotels-section section-padding">
      <p className="section-eyebrow">Konaklama</p>
      <h2 className="section-title">Lüks <span className="gradient-text">Oteller</span></h2>
      <p className="section-subtitle">20 seçkin butik otel ve resort ile unutulmaz konaklama deneyimi.</p>

      <div className="hotels-layout">
        <div className="hotels-grid">
          {hotels.map((hotel) => (
            <motion.article
              key={hotel.id}
              className={`hotel-card ${selected.id === hotel.id ? 'active' : ''}`}
              onClick={() => { setSelected(hotel); setGalleryIdx(0); }}
              whileHover={{ rotateY: 3, rotateX: -2 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <div className="hotel-card-img">
                <img src={hotel.image} alt={hotel.name} loading="lazy" />
                <span className="hotel-stars">{'★'.repeat(hotel.stars)}</span>
              </div>
              <div className="hotel-card-body">
                <h3>{hotel.name}</h3>
                <p className="hotel-dest">{hotel.destination}</p>
                <div className="hotel-card-meta">
                  <span>★ {hotel.rating}</span>
                  <strong>€{hotel.pricePerNight}/gece</strong>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="hotel-detail glass">
          <div className="hotel-gallery">
            <motion.img
              key={galleryIdx}
              src={selected.gallery[galleryIdx]}
              alt={selected.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />
            <div className="gallery-thumbs">
              {selected.gallery.map((img, i) => (
                <button key={i} className={galleryIdx === i ? 'active' : ''} onClick={() => setGalleryIdx(i)}>
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
          <div className="hotel-detail-body">
            <h3>{selected.name}</h3>
            <p className="hotel-detail-desc">{selected.description}</p>
            <div className="hotel-amenities">
              {selected.amenities.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <div className="hotel-room-preview">
              <img src={selected.roomImage} alt={selected.roomType} loading="lazy" />
              <div>
                <strong>{selected.roomType}</strong>
                <span>€{selected.pricePerNight}/gece · {selected.reviewCount} yorum</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
