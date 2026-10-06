import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Calendar, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadIcsFile } from '../utils/calendar';

function DigitRoller({ char }) {
  return (
    <div className="relative w-[14px] sm:w-[15px] h-[30px] sm:h-[32px] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ y: -22, opacity: 0, scale: 0.85, filter: 'blur(1.5px)' }}
          animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ y: 22, opacity: 0, scale: 0.85, filter: 'blur(1.5px)' }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 26,
            mass: 0.45,
          }}
          className="inline-block font-sans text-[24px] sm:text-[26px] font-semibold text-[#2C2724] leading-none tabular-nums"
          style={{
            fontVariantNumeric: 'tabular-nums lining-nums',
            fontFeatureSettings: '"lnum" 1, "tnum" 1',
          }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function AnimatedTimerValue({ value, isLive }) {
  const digits = value.split('');
  return (
    <div className="relative flex items-center justify-center gap-[1px]">
      {digits.map((digit, idx) => (
        <DigitRoller key={idx} char={digit} />
      ))}
      {isLive && (
        <span className="absolute -top-1 -right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E88B97] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D97080]" />
        </span>
      )}
    </div>
  );
}

export default function CountdownSection() {
  // Target date set to 70 days from current date
  const [targetDate] = useState(() => {
    return new Date(Date.now() + 70 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000 + 30 * 60 * 1000);
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 70,
    hours: 8,
    minutes: 30,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        const diffAbs = Math.abs(difference);
        const days = Math.floor(diffAbs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffAbs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffAbs / 1000 / 60) % 60);
        const seconds = Math.floor((diffAbs / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.78 },
      colors: ['#F4D8D8', '#CFA4A4', '#FF9EAF', '#FAF7F2', '#E8B4B8'],
      scalar: 1.05,
    });
  };

  const timerUnits = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0'), isLive: false },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0'), isLive: false },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0'), isLive: false },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0'), isLive: true },
  ];

  return (
    <section className="relative w-full bg-transparent pt-16 pb-16 border-t border-[#EAE2D8]/40 overflow-hidden">
      {/* Subtle Ambient Radial Highlight behind Countdown */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[300px] bg-gradient-radial from-rose-200/25 via-[#F4D8D8]/10 to-transparent blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          {/* Top Live Badge */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[11px] font-medium text-[#7A6A5E] mb-3 shadow-xs"
          >
            <Clock className="w-3 h-3 text-[#CFA4A4]" />
            <span>Shubh Vivah • November 28, 2025</span>
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mobile-section-title font-pinyon text-[54px] sm:text-[58px] text-[#2C2724] leading-none mb-1.5"
          >
            See you in...
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mobile-section-subtitle text-[12px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Counting Down to the Big Day
          </motion.p>
        </motion.div>
      </div>

      {/* VisionOS Segmented Glass Numerals Module with independent digit roll */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              staggerChildren: 0.09,
              delayChildren: 0.1,
            },
          },
        }}
        className="relative z-10 max-w-[355px] mx-auto px-3 mb-8"
      >
        <div
          onClick={fireConfetti}
          className="vision-glass-card p-4 sm:p-5 rounded-[32px] cursor-pointer active:scale-[0.99] transition-all shadow-2xl hover:shadow-[0_20px_40px_rgba(207,164,164,0.22)]"
        >
          <div className="grid grid-cols-4 gap-2">
            {timerUnits.map((item) => (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 280,
                      damping: 22,
                    },
                  },
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                className={`vision-glass-pill py-4 sm:py-5 px-1 rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden min-h-[92px] sm:min-h-[96px] transition-all ${
                  item.isLive ? 'border-t border-rose-300/80 shadow-inner' : ''
                }`}
              >
                <AnimatedTimerValue value={item.value} isLive={item.isLive} />
                <div className="mobile-timer-label text-[8px] sm:text-[8.5px] uppercase tracking-[0.12em] text-[#8C7D73] font-semibold mt-2.5 leading-none">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.75, delay: 0.35 },
            },
          }}
          className="mobile-timer-hint text-[11.5px] text-[#A89C93] text-center mt-3 font-light flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3 h-3 text-[#CFA4A4]" />
          <span>Tap the timer for celebration sparkle</span>
          <Sparkles className="w-3 h-3 text-[#CFA4A4]" />
        </motion.p>
      </motion.div>

      {/* Save Date Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.75, delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
        className="relative z-10 text-center px-4"
      >
        <button
          onClick={() => {
            fireConfetti();
            downloadIcsFile();
          }}
          className="vision-glass-pill-dark inline-flex items-center gap-2.5 pl-3.5 pr-7 py-3.5 rounded-full text-white text-[14px] font-medium tracking-wide transition-all active:scale-95 hover:brightness-110 cursor-pointer shadow-xl"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 text-[#F4D8D8]" />
          </div>
          <span className="mobile-save-date-btn">Save The Date</span>
        </button>
      </motion.div>
    </section>
  );
}
