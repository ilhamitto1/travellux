import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { Destination } from '../../data/destinations';
import type { Flight } from '../../data/flights';
import { MagneticButton } from '../effects/MagneticButton';
import './SuccessScreen.css';

interface SuccessScreenProps {
  code: string;
  destination: Destination;
  flight: Flight;
  onClose: () => void;
}

export function SuccessScreen({ code, destination, flight, onClose }: SuccessScreenProps) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#0ea5e9', '#10b981', '#fbbf24', '#ffffff'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });
  }, []);

  const downloadItinerary = () => {
    const content = `
TravelLux — Rezervasyon Onayı
═══════════════════════════════
Rezervasyon Kodu: ${code}
Destinasyon: ${destination.name}
Süre: ${destination.duration}
Uçuş: ${flight.airline} (${flight.from} → ${flight.to})
Kalkış: ${flight.departure} | Varış: ${flight.arrival}
Tahmini Fiyat: €${destination.startingPrice.toLocaleString()}

Teşekkür ederiz!
TravelLux Premium Concierge: +90 212 555 0100
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TravelLux-${code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareExperience = () => {
    const text = `TravelLux ile ${destination.name} macerama başlıyorum! Rezervasyon: ${code}`;
    if (navigator.share) {
      navigator.share({ title: 'TravelLux', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
      alert('Paylaşım metni panoya kopyalandı!');
    }
  };

  return (
    <motion.div
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="success-screen"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, delay: 0.2 }}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.5 }}
        >
          ✓
        </motion.div>

        <h2>Rezervasyonunuz Onaylandı!</h2>
        <p className="success-sub">Hayalinizdeki lüks seyahat sizi bekliyor.</p>

        <div className="ticket-card">
          <div className="ticket-header">
            <span className="ticket-logo">TravelLux</span>
            <span className="ticket-class">PREMIUM</span>
          </div>
          <div className="ticket-body">
            <div className="ticket-route">
              <div>
                <strong>{flight.from}</strong>
                <span>{flight.departure}</span>
              </div>
              <div className="ticket-plane">✈</div>
              <div>
                <strong>{destination.name}</strong>
                <span>{flight.arrival}</span>
              </div>
            </div>
            <div className="ticket-details">
              <div><label>Uçuş</label><span>{flight.airline}</span></div>
              <div><label>Süre</label><span>{destination.duration}</span></div>
              <div><label>Kod</label><span className="ticket-code">{code}</span></div>
            </div>
          </div>
          <div className="ticket-perforation" />
        </div>

        <div className="success-actions">
          <MagneticButton onClick={downloadItinerary} className="btn-primary">
            İtinerary İndir
          </MagneticButton>
          <button className="btn-outline" onClick={shareExperience}>
            Deneyimi Paylaş
          </button>
          <button className="success-close" onClick={onClose}>
            Kapat
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
