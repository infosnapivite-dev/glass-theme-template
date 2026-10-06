import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import IPhoneFrame from './components/IPhoneFrame';
import './styles/iphone-mockup.css';
import GlassBackground from './components/GlassBackground';
import OpeningPage from './components/OpeningPage';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import VenueSection from './components/VenueSection';
import DressCodeSection from './components/DressCodeSection';
import CountdownSection from './components/CountdownSection';
import RsvpSection from './components/RsvpSection';
import ThankYouSection from './components/ThankYouSection';
import PetalsOverlay from './components/PetalsOverlay';
import MusicFloatingButton from './components/MusicFloatingButton';

export default function App() {
  const scrollContainerRef = useRef(null);
  const [petalsEnabled] = useState(true);
  const [isOpened, setIsOpened] = useState(false);

  // Initialize Lenis Smooth Scroll only when Home Page is opened
  useEffect(() => {
    if (!isOpened) return;

    let lenis;
    const isDesktop = window.innerWidth > 600;

    if (isDesktop && scrollContainerRef.current) {
      // Smooth scroll inside constrained iPhone viewport on desktop
      lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        content: scrollContainerRef.current.firstElementChild || scrollContainerRef.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
      });
    } else {
      // Smooth scroll on mobile window
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
      });
    }

    function raf(time) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      if (lenis) lenis.destroy();
    };
  }, [isOpened]);

  // Keep body overflow locked on mobile when opening screen is active
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('opening-active');
    } else {
      // Delay unlocking body scroll slightly so the crossfade dissolve finishes seamlessly
      const timer = setTimeout(() => {
        document.body.classList.remove('opening-active');
      }, 700);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.classList.remove('opening-active');
    };
  }, [isOpened]);

  return (
    <div className={`desktop-viewport-container ${!isOpened ? 'opening-active' : ''}`}>
      {/* Preserved Luxury Desktop Ambient Background */}
      <div
        className="fixed inset-0 bg-cover bg-center filter blur-xl scale-105 opacity-35 pointer-events-none transition-opacity duration-1000 z-0"
        style={{ backgroundImage: "url('/assets/ambient_backdrop.jpg')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80 pointer-events-none z-0" />

      {/* iPhone 15 Pro / 16 Pro 3D Parallax Chassis */}
      <IPhoneFrame>
        <div className="relative w-full h-full font-sans antialiased text-[#2C2724] select-none bg-[#FAF8F5] overflow-hidden">
          {/* Animated Blurred Glass Pink Glow Background */}
          <GlassBackground />

          {/* Floating Rose Petals Animation */}
          <PetalsOverlay enabled={petalsEnabled} />

          {/* Main Home Page Scroll View (Persistently present underneath for seamless cross-blend) */}
          <main
            ref={scrollContainerRef}
            className={`inner-app-scroll relative z-10 w-full h-full transition-opacity duration-700 ease-out ${
              isOpened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Invitation Content Sections */}
            <div className="relative z-10">
              {/* Section 1: Hero & Welcome */}
              <HeroSection />

              {/* Section 2: Events Timeline */}
              <TimelineSection />

              {/* Section 3: Gallery (3D Curved Perspective Carousel) */}
              <GallerySection />

              {/* Section 4: Venue Location & Map */}
              <VenueSection />

              {/* Section 5: Wardrobe / Dress Code */}
              <DressCodeSection />

              {/* Section 6: Live Countdown & Save The Date */}
              <CountdownSection />

              {/* Section 7: RSVP Form Module */}
              <RsvpSection />

              {/* Section 8: Thank You (Organic Non-Card Design) */}
              <ThankYouSection />
            </div>

            {/* In-app Audio Trigger */}
            <MusicFloatingButton />
          </main>

          {/* Opening Page Scratch Overlay (Cross-blend dissolves smoothly into Home Page) */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                key="opening-overlay"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  filter: 'blur(10px)',
                  scale: 1.04,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                }}
                className="absolute inset-0 z-30 w-full h-full bg-[#FAF8F5]/80 backdrop-blur-md overflow-hidden"
              >
                <OpeningPage onOpen={() => setIsOpened(true)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IPhoneFrame>
    </div>
  );
}

