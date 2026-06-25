import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroSection } from './HeroSection';
import { DestinationsSection } from './DestinationsSection';
import { BookingEngine } from './BookingEngine';
import { HotelsSection } from './HotelsSection';
import { ExperiencesSection } from './ExperiencesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { GlobeSection } from './GlobeSection';
import { WeatherWidget } from './WeatherWidget';
import { MarqueeSection } from './MarqueeSection';
import { BookingFlow } from './BookingFlow';
import { WaveParallax } from '../effects/WaveParallax';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import './BookingPage.css';

export function BookingPage() {
  const [flowOpen, setFlowOpen] = useState(false);

  return (
    <div className="booking-page">
      <Navigation onBook={() => setFlowOpen(true)} />
      <HeroSection onBookNow={() => setFlowOpen(true)} />
      <WaveParallax />
      <MarqueeSection />
      <DestinationsSection />
      <BookingEngine onBook={() => setFlowOpen(true)} />
      <WaveParallax />
      <HotelsSection />
      <ExperiencesSection />
      <GlobeSection />
      <WeatherWidget />
      <TestimonialsSection />
      <Footer />
      <AnimatePresence>
        {flowOpen && <BookingFlow open={flowOpen} onClose={() => setFlowOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
