import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../effects/MagneticButton';
import './Navigation.css';

interface NavigationProps {
  onBook: () => void;
}

export function Navigation({ onBook }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <span className="nav-logo-icon">T</span>
          TravelLux
        </a>
        <div className="nav-links">
          <a href="#destinasyonlar">Destinasyonlar</a>
          <a href="#deneyimler">Deneyimler</a>
          <a href="#iletisim">İletişim</a>
        </div>
        <MagneticButton onClick={onBook} className="btn-primary nav-cta">
          Book Now
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
