import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TravelAd } from './components/landing/TravelAd';
import { CinematicTransition } from './components/transition/CinematicTransition';
import { BookingPage } from './components/booking/BookingPage';
import { CursorGlow } from './components/effects/CursorGlow';
import { ParticleBackground } from './components/effects/ParticleBackground';
import { useLenis } from './hooks/useLenis';

type AppState = 'landing' | 'transitioning' | 'booking';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  useLenis(state === 'booking');

  const handleReserve = () => setState('transitioning');
  const handleTransitionComplete = () => setState('booking');

  return (
    <>
      <CursorGlow />
      {state === 'booking' && <ParticleBackground />}

      <AnimatePresence>
        {state === 'landing' && (
          <TravelAd onReserve={handleReserve} />
        )}
      </AnimatePresence>

      <CinematicTransition
        active={state === 'transitioning'}
        onComplete={handleTransitionComplete}
      />

      {state === 'booking' && <BookingPage />}
    </>
  );
}
