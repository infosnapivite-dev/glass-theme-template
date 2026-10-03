import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const outfits = [
  { id: 1, src: '/assets/w1.png', alt: 'Sky Blue & Silver Attire', label: 'Look 01' },
  { id: 2, src: '/assets/w2.png', alt: 'Royal Velvet & Gold Attire', label: 'Look 02' },
  { id: 3, src: '/assets/w3.png', alt: 'Midnight Sapphire Attire', label: 'Look 03' },
  { id: 4, src: '/assets/w4.png', alt: 'Regal Magenta & Royal Blue Attire', label: 'Look 04' },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 180 : -180,
    opacity: 0,
    scale: 0.94,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 32 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 180 : -180,
    opacity: 0,
    scale: 0.94,
    transition: {
      x: { type: 'spring', stiffness: 320, damping: 32 },
      opacity: { duration: 0.25 },
    },
  }),
};

export default function DressCodeSection() {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentIndex = ((page % outfits.length) + outfits.length) % outfits.length;

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const setSlide = (index) => {
    const diff = index - currentIndex;
    if (diff !== 0) {
      setPage([page + diff, diff > 0 ? 1 : -1]);
    }
  };

  return (
    <section className="relative w-full bg-transparent px-5 py-10 border-t border-[#EAE2D8]/40">
      {/* Header */}
      <div className="text-center mb-6">
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
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-title font-pinyon text-[52px] text-[#2C2724] leading-none mb-1"
          >
            Wardrobe
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-subtitle text-[11px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Style &amp; Inspiration
          </motion.p>
        </motion.div>
      </div>

      {/* Intro Subtext */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[310px] mx-auto text-center mb-6"
      >
        <p className="mobile-intro-text text-[13px] leading-relaxed text-[#6B615A] font-light">
          We have curated these attire inspirations to help you choose your look and celebrate with us in style.
        </p>
      </motion.div>

      {/* VisionOS Glass Carousel Container */}
      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[345px] mx-auto rounded-[32px] vision-glass-card p-4 pt-5 pb-5 overflow-hidden shadow-xl"
      >
        {/* Top Tag & Counter */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="flex items-center justify-between px-3 mb-2"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[11px] font-medium text-[#7A6A5E]">
            <Sparkles className="w-3 h-3 text-[#CFA4A4]" />
            <span>{outfits[currentIndex].label}</span>
          </div>
          <span className="text-[12px] font-serif font-medium text-[#9E8B7A] tracking-wider">
            {currentIndex + 1} / {outfits.length}
          </span>
        </motion.div>

        {/* Carousel Image Stage with Gestures */}
        <div className="relative w-full h-[380px] sm:h-[410px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white/40 via-white/20 to-white/40 border border-white/60">
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute inset-0 bg-gradient-radial from-rose-200/25 via-transparent to-transparent pointer-events-none" />

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -8000 || offset.x < -60) {
                  paginate(1);
                } else if (swipe > 8000 || offset.x > 60) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center p-2 cursor-grab active:cursor-grabbing select-none"
            >
              <img
                src={outfits[currentIndex].src}
                alt={outfits[currentIndex].alt}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] transition-transform duration-300 pointer-events-none"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => paginate(-1)}
            aria-label="Previous Outfit"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full vision-glass-circle flex items-center justify-center text-[#4A4039] hover:text-[#2C2724] active:scale-90 transition-all shadow-md focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 -ml-0.5" />
          </motion.button>

          {/* Right Arrow Button */}
          <motion.button
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onClick={() => paginate(1)}
            aria-label="Next Outfit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full vision-glass-circle flex items-center justify-center text-[#4A4039] hover:text-[#2C2724] active:scale-90 transition-all shadow-md focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 -mr-0.5" />
          </motion.button>
        </div>

        {/* Bottom Pagination Dots */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-2 pt-4 pb-1"
        >
          {outfits.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => setSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? 'w-6 h-2 bg-gradient-to-r from-[#CFA4A4] to-[#B88585] shadow-[0_0_8px_rgba(207,164,164,0.6)]'
                    : 'w-2 h-2 bg-[#D8C7B5]/70 hover:bg-[#BFAEA2]'
                }`}
              />
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
