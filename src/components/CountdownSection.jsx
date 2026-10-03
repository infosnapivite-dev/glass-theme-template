import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

export default function CountdownSection() {
  const targetDate = new Date('2025-08-15T15:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
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
  }, []);

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
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <section className="relative w-full bg-transparent pt-20 pb-16 border-t border-[#EAE2D8]/40 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 px-4">
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
            className="mobile-section-title font-pinyon text-[56px] text-[#2C2724] leading-none mb-2"
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
            className="mobile-section-subtitle text-[12.5px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Counting Down Every Second
          </motion.p>
        </motion.div>
      </div>

      {/* VisionOS Segmented Glass Numerals Module */}
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
        className="max-w-[355px] mx-auto px-3 mb-12"
      >
        <div
          onClick={fireConfetti}
          className="vision-glass-card p-5 sm:p-6 rounded-[34px] cursor-pointer active:scale-[0.99] transition-transform shadow-2xl"
        >
          <div className="grid grid-cols-4 gap-2.5">
            {timerUnits.map((item, index) => (
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
                className="vision-glass-pill py-5 px-1.5 rounded-2xl flex flex-col items-center justify-center text-center overflow-hidden min-h-[92px] sm:min-h-[96px]"
              >
                <div
                  className="mobile-timer-numeral font-sans text-[24px] sm:text-[26px] font-medium text-[#2C2724] leading-none tabular-nums tracking-normal"
                  style={{
                    fontVariantNumeric: 'tabular-nums lining-nums',
                    fontFeatureSettings: '"lnum" 1, "tnum" 1',
                  }}
                >
                  {item.value}
                </div>
                <div className="mobile-timer-label text-[8px] sm:text-[8.5px] uppercase tracking-[0.1em] text-[#8C7D73] font-semibold mt-2.5 leading-none">
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
          className="mobile-timer-hint text-[12px] text-[#A89C93] text-center mt-4 font-light"
        >
          Tap the timer for a sprinkle of celebration ✨
        </motion.p>
      </motion.div>

      {/* Save Date Vision Glass Pill Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.75, delay: 0.25, type: 'spring', stiffness: 260, damping: 20 }}
        className="text-center mb-4 px-4"
      >
        <button
          onClick={downloadIcsFile}
          className="vision-glass-pill-dark inline-flex items-center gap-2.5 pl-3 pr-7 py-3.5 rounded-full text-white text-[14px] font-medium tracking-wide transition-all active:scale-95 hover:brightness-110 cursor-pointer shadow-xl"
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

