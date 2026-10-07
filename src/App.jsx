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
import { ArrowLeft, Calendar, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadIcsFile } from './utils/calendar';

export default function App() {
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const [petalsEnabled] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'rsvp' | 'thankyou'

  // Navigation controller
  const navigateTo = useCallback((view) => {
    setCurrentView(view);
    if (view === 'home') {
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        try {
          lenisRef.current.scrollTo(0, { immediate: true });
        } catch (e) {}
      }
    } else {
      window.location.hash = view;
    }
  }, []);

  // Handle scratch card open event -> ALWAYS redirect directly to top of Home Page
  const handleOpenCelebration = useCallback(() => {
    setCurrentView('home');
    if (window.location.hash) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      try {
        lenisRef.current.scrollTo(0, { immediate: true });
      } catch (e) {}
    }
    setIsOpened(true);
  }, []);

  // Fire celebratory confetti when thankyou view is opened
  useEffect(() => {
    if (currentView === 'thankyou') {
      try {
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.4 },
          colors: ['#CFA4A4', '#C5A880', '#F4D8D8', '#FAF5F0', '#E8B4B8'],
          zIndex: 9999,
        });
      } catch (e) {}
    }
  }, [currentView]);

  // Listen for hash changes (only when invitation is opened)
  useEffect(() => {
    if (!isOpened) return;

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'rsvp') {
        setCurrentView('rsvp');
      } else if (hash === 'thankyou' || hash === 'thank-you') {
        setCurrentView('thankyou');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isOpened]);

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

          {/* Dynamic Page Views (Home / RSVP Form Page / Thank You Section View) */}
          <div className="relative z-10 w-full h-full">
            <AnimatePresence mode="wait">
              {currentView === 'home' && (
                <motion.main
                  key="home-view"
                  ref={scrollContainerRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpened ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`inner-app-scroll relative z-10 w-full h-full transition-opacity duration-500 ease-out ${
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
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full h-full"
                >
                  <RsvpPage
                    onBack={() => navigateTo('home')}
                    onSuccess={() => navigateTo('thankyou')}
                  />
                </motion.div>
              )}

              {currentView === 'thankyou' && (
                <motion.div
                  key="thankyou-view"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full h-full min-h-full flex flex-col justify-between items-center py-3 px-3.5 sm:px-5 overflow-y-auto no-scrollbar select-none text-center"
                >
                  {/* Top Navigation Bar */}
                  <header className="w-full z-30 pt-1 pb-2 flex items-center justify-between border-b border-[#EAE2D8]/40">
                    <button
                      onClick={() => navigateTo('home')}
                      className="vision-glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-[#2C2724] tracking-wide transition-all active:scale-95 hover:bg-white/80 cursor-pointer shadow-2xs"
                    >
                      <ArrowLeft className="w-3 h-3 text-[#CFA4A4]" />
                      <span>Full Invitation</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-[10.5px] font-serif uppercase tracking-[0.2em] text-[#9E8B7A]">
                      <span>Aarav</span>
                      <span className="text-[#CFA4A4] font-alex text-[13px] lowercase">&amp;</span>
                      <span>Ananya</span>
                    </div>
                  </header>

                  {/* Centered Thank You Section Card */}
                  <div className="vision-glass-card rounded-[28px] p-5 sm:p-6 w-full max-w-[360px] mx-auto shadow-xl relative overflow-hidden my-auto border border-white/80">
                    <ThankYouSection />
                  </div>

                  {/* Single-Row Action Buttons */}
                  <div className="w-full max-w-[360px] mx-auto grid grid-cols-2 gap-2.5 pt-3 pb-2 relative z-10">
                    <button
                      onClick={() => {
                        confetti({
                          particleCount: 35,
                          spread: 55,
                          origin: { y: 0.8 },
                          colors: ['#F4D8D8', '#CFA4A4', '#C5A880'],
                        });
                        downloadIcsFile();
                      }}
                      className="vision-glass-pill-dark w-full py-2.5 px-3 rounded-full text-white text-[12px] font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:brightness-110 shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#F4D8D8]" />
                      <span>Save The Date</span>
                    </button>

                    <button
                      onClick={() => navigateTo('home')}
                      className="vision-glass-pill w-full py-2.5 px-3 rounded-full text-[#2C2724] text-[12px] font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:bg-white/80 shadow-2xs border border-white/80 cursor-pointer whitespace-nowrap"
                    >
                      <Home className="w-3.5 h-3.5 text-[#CFA4A4]" />
                      <span>Main Invitation</span>
                    </button>
                  </div>
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
                <OpeningPage onOpen={handleOpenCelebration} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </IPhoneFrame>
    </div>
  );
}
