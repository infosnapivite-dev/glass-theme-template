import React, { useEffect, useRef, useState, useCallback } from 'react';
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
import RsvpPage from './components/RsvpPage';
import PetalsOverlay from './components/PetalsOverlay';
import MusicFloatingButton from './components/MusicFloatingButton';

export default function App() {
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const [petalsEnabled] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'rsvp'

  // Navigation controller with target section auto-scroll support
  const navigateTo = useCallback((view, targetSectionId = null) => {
    setCurrentView(view);
    if (view === 'home') {
      if (!targetSectionId && window.location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }

      if (targetSectionId) {
        // Scroll smoothly to the target section (e.g. 'thankyou' at bottom of home)
        setTimeout(() => {
          const targetEl = document.getElementById(targetSectionId);
          if (targetEl) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(targetEl, {
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }, 220);
      }
    } else {
      window.location.hash = view;
    }
  }, []);

  // Listen for hash changes (supporting browser back/forward and direct links)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'rsvp') {
        setCurrentView('rsvp');
      } else {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Initialize Lenis Smooth Scroll only when Home Page is open and active
  useEffect(() => {
    if (!isOpened || currentView !== 'home') {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    let lenis;
    let animId;
    const isDesktop = window.innerWidth > 600;

    if (isDesktop && scrollContainerRef.current) {
      // Smooth scroll inside constrained iPhone viewport on desktop
      lenis = new Lenis({
        wrapper: scrollContainerRef.current,
        content: scrollContainerRef.current.firstElementChild || scrollContainerRef.current,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      });
    } else {
      // Smooth scroll on mobile window (90+ / 120 FPS high-refresh rate optimized)
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.6,
        infinite: false,
      });
    }

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    // Trigger immediate resize recalculation after render
    const resizeTimer = setTimeout(() => {
      lenis.resize();
    }, 150);

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [isOpened, currentView]);

  // Keep body overflow locked on mobile when opening screen is active
  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add('opening-active');
    } else {
      // Delay unlocking body scroll slightly so the crossfade dissolve finishes seamlessly
      const timer = setTimeout(() => {
        document.body.classList.remove('opening-active');
        if (lenisRef.current) {
          lenisRef.current.resize();
        }
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
          {/* Animated Blurred Glass Pink Glow Background (GPU Accelerated) */}
          <GlassBackground />

          {/* Floating Rose Petals Animation */}
          <PetalsOverlay enabled={petalsEnabled} />

          {/* Dynamic Page Views (Home / RSVP Form Page) */}
          <div className="relative z-10 w-full h-full">
            <AnimatePresence mode="wait">
              {currentView === 'home' && (
                <motion.main
                  key="home-view"
                  ref={scrollContainerRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpened ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`inner-app-scroll relative z-10 w-full h-full transition-opacity duration-700 ease-out ${
                    isOpened ? 'pointer-events-auto' : 'pointer-events-none'
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

                    {/* Section 7: RSVP Button Module */}
                    <RsvpSection onOpenForm={() => navigateTo('rsvp')} />

                    {/* Section 8: Thank You Section (Bottom of Invitation) */}
                    <ThankYouSection />
                  </div>
                </motion.main>
              )}

              {currentView === 'rsvp' && (
                <motion.div
                  key="rsvp-view"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full h-full"
                >
                  <RsvpPage
                    onBack={() => navigateTo('home')}
                    onSuccess={() => navigateTo('home', 'thankyou')}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-app Audio Trigger */}
            <MusicFloatingButton />
          </div>

          {/* Opening Page Scratch Overlay (Cross-blend dissolves smoothly into Home Page) */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                key="opening-overlay"
                initial={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  filter: 'blur(8px)',
                  scale: 1.03,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                }}
                className="absolute inset-0 z-30 w-full h-full overflow-hidden"
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
