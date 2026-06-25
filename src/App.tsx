import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TravelAd } from './components/landing/TravelAd';
import { CinematicTransition } from './components/transition/CinematicTransition';
import { BookingPage } from './components/booking/BookingPage';
import { CursorGlow } from './components/effects/CursorGlow';
import { ParticleBackground } from './components/effects/ParticleBackground';
import { useLenis } from './hooks/useLenis';
import './App.css';

type AppState = 'landing' | 'transitioning' | 'booking';

const bookingReveal = {
  initial: { opacity: 0, scale: 1.04, filter: 'blur(14px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] as const },
};

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [showBooking, setShowBooking] = useState(false);
  useLenis(state === 'booking');

  const handleReserve = useCallback(() => setState('transitioning'), []);
  const handleReveal = useCallback(() => setShowBooking(true), []);
  const handleTransitionComplete = useCallback(() => setState('booking'), []);

  const isLanding = state === 'landing' || state === 'transitioning';

  return (
    <>
      <CursorGlow />
      {state === 'booking' && <ParticleBackground />}

      {isLanding && (
        <TravelAd
          onReserve={handleReserve}
          exiting={state === 'transitioning'}
        />
      )}

      <AnimatePresence>
        {showBooking && (
          <motion.div
            key="booking"
            className="booking-shell"
            initial={bookingReveal.initial}
            animate={bookingReveal.animate}
            transition={bookingReveal.transition}
          >
            <BookingPage />
          </motion.div>
        )}
      </AnimatePresence>

      <CinematicTransition
        active={state === 'transitioning'}
        onReveal={handleReveal}
        onComplete={handleTransitionComplete}
      />
    </>
  );
}
