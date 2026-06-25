import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { destinations } from '../../data/destinations';
import { hotels } from '../../data/hotels';
import { experiences } from '../../data/experiences';
import { flights } from '../../data/flights';
import { MagneticButton } from '../effects/MagneticButton';
import { SuccessScreen } from './SuccessScreen';
import './BookingFlow.css';

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  'Kişisel Bilgiler',
  'Destinasyon',
  'Uçuş Seçimi',
  'Otel Seçimi',
  'Aktiviteler',
  'Ödeme',
];

export function BookingFlow({ open, onClose }: BookingFlowProps) {
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    destination: destinations[0].id,
    flight: flights[0].id,
    hotel: hotels[0].id,
    activities: [] as string[],
    cardNumber: '', cardExpiry: '', cardCvv: '',
  });

  const update = (key: string, value: string | string[]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const toggleActivity = (id: string) => {
    setForm((f) => ({
      ...f,
      activities: f.activities.includes(id)
        ? f.activities.filter((a) => a !== id)
        : [...f.activities, id],
    }));
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else setShowSuccess(true);
  };

  const prev = () => { if (step > 0) setStep(step - 1); };

  const reservationCode = `TLX-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  if (!open) return null;

  if (showSuccess) {
    return (
      <SuccessScreen
        code={reservationCode}
        destination={destinations.find((d) => d.id === form.destination)!}
        flight={flights.find((f) => f.id === form.flight)!}
        onClose={() => { setShowSuccess(false); setStep(0); onClose(); }}
      />
    );
  }

  return (
    <motion.div
      className="booking-flow-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="booking-flow glass"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <button className="flow-close" onClick={onClose}>✕</button>

        <div className="flow-progress">
          {steps.map((s, i) => (
            <div key={s} className={`flow-step-indicator ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`}>
              <span>{i + 1}</span>
              <label>{s}</label>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="flow-content"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div className="flow-form">
                <h2>Kişisel Bilgileriniz</h2>
                <div className="form-grid">
                  <input placeholder="Ad" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                  <input placeholder="Soyad" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                  <input placeholder="E-posta" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                  <input placeholder="Telefon" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flow-form">
                <h2>Destinasyon Seçin</h2>
                <div className="flow-cards">
                  {destinations.map((d) => (
                    <button
                      key={d.id}
                      className={`flow-card ${form.destination === d.id ? 'selected' : ''}`}
                      onClick={() => update('destination', d.id)}
                    >
                      <img src={d.image} alt={d.name} loading="lazy" />
                      <div>
                        <strong>{d.name}</strong>
                        <span>€{d.startingPrice.toLocaleString()} · {d.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flow-form">
                <h2>Uçuş Seçimi</h2>
                <div className="flow-list">
                  {flights.map((f) => (
                    <button
                      key={f.id}
                      className={`flow-list-item ${form.flight === f.id ? 'selected' : ''}`}
                      onClick={() => update('flight', f.id)}
                    >
                      <div>
                        <strong>{f.airline}</strong>
                        <span>{f.from} → {f.to} · {f.aircraft}</span>
                      </div>
                      <div className="flow-list-meta">
                        <span>{f.departure} - {f.arrival}</span>
                        <strong>€{f.price.toLocaleString()}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flow-form">
                <h2>Otel Seçimi</h2>
                <div className="flow-cards compact">
                  {hotels.slice(0, 8).map((h) => (
                    <button
                      key={h.id}
                      className={`flow-card ${form.hotel === h.id ? 'selected' : ''}`}
                      onClick={() => update('hotel', h.id)}
                    >
                      <img src={h.image} alt={h.name} loading="lazy" />
                      <div>
                        <strong>{h.name}</strong>
                        <span>€{h.pricePerNight}/gece · ★{h.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flow-form">
                <h2>Aktivite Seçimi</h2>
                <div className="flow-cards compact">
                  {experiences.map((e) => (
                    <button
                      key={e.id}
                      className={`flow-card ${form.activities.includes(e.id) ? 'selected' : ''}`}
                      onClick={() => toggleActivity(e.id)}
                    >
                      <img src={e.image} alt={e.title} loading="lazy" />
                      <div>
                        <strong>{e.title}</strong>
                        <span>€{e.price.toLocaleString()}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flow-form">
                <h2>Ödeme Bilgileri</h2>
                <div className="payment-summary glass-dark">
                  <p>Destinasyon: <strong>{destinations.find((d) => d.id === form.destination)?.name}</strong></p>
                  <p>Uçuş: <strong>{flights.find((f) => f.id === form.flight)?.airline}</strong></p>
                  <p>Otel: <strong>{hotels.find((h) => h.id === form.hotel)?.name}</strong></p>
                  <p>Aktiviteler: <strong>{form.activities.length} seçildi</strong></p>
                </div>
                <div className="form-grid">
                  <input placeholder="Kart Numarası" className="full" value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} />
                  <input placeholder="AA/YY" value={form.cardExpiry} onChange={(e) => update('cardExpiry', e.target.value)} />
                  <input placeholder="CVV" value={form.cardCvv} onChange={(e) => update('cardCvv', e.target.value)} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flow-actions">
          {step > 0 && <button className="btn-outline" onClick={prev}>Geri</button>}
          <MagneticButton onClick={next} className="btn-primary">
            {step === steps.length - 1 ? 'Ödemeyi Tamamla' : 'Devam Et'}
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
