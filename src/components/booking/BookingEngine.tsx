import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departures, flightClasses, hotelCategories, activityPreferences } from '../../data/flights';
import { MagneticButton } from '../effects/MagneticButton';
import './BookingEngine.css';

interface BookingEngineProps {
  onBook: () => void;
}

export function BookingEngine({ onBook }: BookingEngineProps) {
  const [departure, setDeparture] = useState(departures[0]);
  const [checkIn, setCheckIn] = useState('2026-07-15');
  const [checkOut, setCheckOut] = useState('2026-07-22');
  const [guests, setGuests] = useState(2);
  const [flightClass, setFlightClass] = useState(flightClasses[1].id);
  const [hotelCat, setHotelCat] = useState(hotelCategories[2].id);
  const [budget, setBudget] = useState(15000);
  const [activities, setActivities] = useState<string[]>(['Spa & Wellness', 'Gastronomi']);

  const toggleActivity = (a: string) => {
    setActivities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const fc = flightClasses.find((f) => f.id === flightClass)!;
  const hc = hotelCategories.find((h) => h.id === hotelCat)!;
  const estimated = Math.round(budget * fc.multiplier * hc.multiplier / 2.5);

  return (
    <section className="booking-engine section-padding">
      <div className="engine-header">
        <p className="section-eyebrow">Planlayın</p>
        <h2 className="section-title">Akıllı <span className="gradient-text">Rezervasyon Motoru</span></h2>
        <p className="section-subtitle">Tercihlerinizi belirleyin, size özel lüks paketinizi anında oluşturalım.</p>
      </div>

      <motion.div className="engine-panel glass" layout>
        <div className="engine-grid">
          <div className="engine-field">
            <label>Kalkış Noktası</label>
            <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
              {departures.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="engine-field">
            <label>Giriş Tarihi</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>

          <div className="engine-field">
            <label>Çıkış Tarihi</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>

          <div className="engine-field">
            <label>Misafir Sayısı</label>
            <div className="guest-selector">
              <button onClick={() => setGuests(Math.max(1, guests - 1))}>−</button>
              <AnimatePresence mode="popLayout">
                <motion.span key={guests} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                  {guests} Kişi
                </motion.span>
              </AnimatePresence>
              <button onClick={() => setGuests(Math.min(12, guests + 1))}>+</button>
            </div>
          </div>

          <div className="engine-field full">
            <label>Uçuş Sınıfı</label>
            <div className="pill-group">
              {flightClasses.map((fc) => (
                <motion.button
                  key={fc.id}
                  className={`pill ${flightClass === fc.id ? 'active' : ''}`}
                  onClick={() => setFlightClass(fc.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  {fc.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="engine-field full">
            <label>Otel Kategorisi</label>
            <div className="pill-group">
              {hotelCategories.map((hc) => (
                <motion.button
                  key={hc.id}
                  className={`pill ${hotelCat === hc.id ? 'active' : ''}`}
                  onClick={() => setHotelCat(hc.id)}
                  whileTap={{ scale: 0.95 }}
                >
                  {hc.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="engine-field full">
            <label>Bütçe: €{budget.toLocaleString()}</label>
            <input
              type="range" min={3000} max={50000} step={500}
              value={budget} onChange={(e) => setBudget(Number(e.target.value))}
              className="budget-slider"
            />
            <div className="budget-labels">
              <span>€3.000</span>
              <span>€50.000</span>
            </div>
          </div>

          <div className="engine-field full">
            <label>Aktivite Tercihleri</label>
            <div className="activity-grid">
              {activityPreferences.map((a) => (
                <motion.button
                  key={a}
                  className={`activity-chip ${activities.includes(a) ? 'active' : ''}`}
                  onClick={() => toggleActivity(a)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {a}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="engine-summary">
          <div className="summary-details">
            <span>{departure} → Premium Destinasyon</span>
            <span>{checkIn} — {checkOut} · {guests} misafir</span>
            <span>{fc.label} · {hc.label}</span>
          </div>
          <div className="summary-price">
            <span>Tahmini Paket</span>
            <motion.strong key={estimated} initial={{ scale: 1.1 }} animate={{ scale: 1 }}>
              €{estimated.toLocaleString()}
            </motion.strong>
          </div>
          <MagneticButton onClick={onBook} className="btn-primary">
            Book Now
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
