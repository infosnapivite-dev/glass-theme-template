import React from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function RsvpSection({ onOpenForm }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      style={{
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      <section
        id="rsvp"
        className="relative w-full bg-transparent px-4 py-12 border-t border-[#EAE2D8]/40 overflow-hidden"
      >
        {/* Soft Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[280px] bg-radial-gradient from-rose-200/25 via-transparent to-transparent pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center mb-6 px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[11px] font-medium text-[#7A6A5E] mb-3 shadow-xs whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#CFA4A4] shrink-0" />
            <span>Join Our Celebration</span>
          </div>

          <h2 className="mobile-section-title font-cormorant text-[42px] sm:text-[46px] font-medium tracking-[0.22em] uppercase text-[#2C2724] leading-none mb-2 whitespace-nowrap">
            RSVP
          </h2>
          <p className="mobile-section-subtitle text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#9E8B7A] font-medium whitespace-nowrap">
            Kindly Respond • Celebrate With Us
          </p>
        </div>

        {/* Luxury Glass CTA Card */}
        <div className="relative z-10 max-w-[360px] mx-auto">
          <div className="vision-glass-card rounded-[30px] p-6 sm:p-7 text-center shadow-xl border border-white/80 overflow-hidden">
            {/* Ambient inner shine */}
            <div className="absolute inset-0 bg-radial-gradient from-[#F4D8D8]/20 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Center Badge */}
            <div className="relative mx-auto mb-4 w-14 h-14 rounded-full vision-glass-circle flex items-center justify-center shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#FAF5F0] border border-[#EAE2D8] flex items-center justify-center text-[#C5A880]">
                <Send className="w-5 h-5 ml-0.5 text-[#CFA4A4]" />
              </div>
            </div>

            {/* Title & Welcoming Message */}
            <h3 className="relative font-cormorant text-[20px] sm:text-[23px] font-medium text-[#1A1614] leading-snug mb-2 whitespace-nowrap">
              We Request The Honor of Your Presence
            </h3>

            <p className="relative text-[13px] sm:text-[13.5px] leading-relaxed text-[#5A514B] font-light mb-5 max-w-[290px] mx-auto">
              Please let us know whether you will be celebrating with us in Udaipur. Kindly respond by{' '}
              <span className="font-semibold text-[#8C6F4E] whitespace-nowrap">November 15, 2025</span>.
            </p>

            {/* Quick Details Pill Summary */}
            <div className="relative flex items-center justify-center gap-3 text-[11px] text-[#7A6E65] bg-white/50 rounded-2xl py-2 px-3 mb-6 border border-white/60 whitespace-nowrap">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#C5A880] shrink-0" />
                <span>Nov 28, 2025</span>
              </div>
              <span className="text-[#C5A880]">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#CFA4A4] shrink-0" />
                <span>Udaipur</span>
              </div>
            </div>

            {/* Main RSVP Button */}
            <button
              onClick={onOpenForm}
              className="vision-glass-pill-dark w-full py-3.5 px-6 rounded-full text-white text-[14px] font-medium tracking-wide flex items-center justify-center transition-all active:scale-[0.97] hover:brightness-110 shadow-xl cursor-pointer whitespace-nowrap text-center"
            >
              <span>Fill Out RSVP Form</span>
            </button>

            <p className="relative text-[10px] sm:text-[10.5px] text-[#9E8B7A] tracking-wider uppercase mt-3 font-medium whitespace-nowrap">
              Takes less than 1 minute • Opens in full page
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
