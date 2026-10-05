import React from 'react';
import { motion } from 'framer-motion';

export default function RsvpSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      <section
        id="rsvp"
        className="relative w-full bg-transparent px-4 py-12 border-t border-[#EAE2D8]/40 overflow-hidden"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {/* Section Header */}
        <div className="text-center mb-8 px-4">
          <h2 className="mobile-section-title font-pinyon text-[54px] text-[#2C2724] leading-none mb-1.5">
            RSVP
          </h2>
          <p className="mobile-section-subtitle text-[12px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium">
            Kindly Respond • Celebrate With Us
          </p>
        </div>

        {/* Glassmorphism Container with full height for all form pages */}
        <div
          className="relative w-full max-w-[393px] mx-auto rounded-3xl backdrop-blur-xl bg-white/40 border border-white/20 shadow-lg overflow-hidden p-2 min-h-[880px]"
          style={{
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity',
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfAjMGr5hVZ9jrDawzeKBc30pLjCQGQwAu3Uc1O1oQurg-BVw/viewform?embedded=true"
            width="100%"
            height="880"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            title="RSVP Form"
            className="w-full h-[880px] rounded-2xl border-0 block"
          />
        </div>
      </section>
    </motion.div>
  );
}
