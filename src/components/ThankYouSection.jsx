import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function ThankYouSection() {
  return (
    <section className="relative w-full bg-transparent px-6 pt-6 pb-16 border-t border-[#EAE2D8]/40 overflow-hidden text-center">
      {/* Soft Ambient Radial Glow (Seamless, no card borders) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4D8D8]/15 to-transparent pointer-events-none"
      />

      {/* Main Thank You Heading */}
      <div className="relative z-10 mb-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.14 },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mobile-section-title font-pinyon text-[48px] sm:text-[52px] text-[#2C2724] leading-tight mb-1.5 filter drop-shadow-sm whitespace-nowrap"
          >
            Thank You
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
            className="mobile-section-subtitle text-[11.5px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            For Being Part of Our Story &amp; Blessings
          </motion.p>
        </motion.div>
      </div>

      {/* Heartfelt Gratitude Paragraph */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-[310px] sm:max-w-[330px] mx-auto mb-8"
      >
        <p className="mobile-body-p1 text-[14px] leading-relaxed text-[#5A514B] font-light">
          We are deeply grateful for your love, presence, and heartfelt blessings as we step into this sacred new chapter. Having you celebrate our union means the world to our hearts.
        </p>
      </motion.div>

      {/* Delicate Ornamental Line with Soft Heart Node */}
      <div className="relative z-10 flex items-center justify-center gap-3 max-w-[200px] mx-auto mb-7">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 1 }}
          className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D8C7B5] to-[#CFA4A4]/60"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.28, type: 'spring', stiffness: 300, damping: 20 }}
          className="w-6 h-6 rounded-full vision-glass-circle flex items-center justify-center"
        >
          <Heart className="w-2.5 h-2.5 text-[#CFA4A4] fill-[#CFA4A4]/40" />
        </motion.div>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 0 }}
          className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D8C7B5] to-[#CFA4A4]/60"
        />
      </div>

      {/* Couple Signature Lockup */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.25 },
          },
        }}
        className="relative z-10 mb-6"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="font-pinyon text-[26px] sm:text-[28px] text-[#A87B7B] leading-none mb-1"
        >
          With all our love &amp; gratitude,
        </motion.p>
        <div className="flex items-center justify-center gap-2">
          <motion.span
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="font-serif text-[24px] sm:text-[26px] font-medium tracking-[0.15em] uppercase text-[#2C2724]"
          >
            Aarav
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: 'spring' } },
            }}
            className="font-alex text-[30px] sm:text-[32px] text-[#CFA4A4] -mt-1 font-normal"
          >
            &amp;
          </motion.span>
          <motion.span
            variants={{
              hidden: { opacity: 0, x: 10 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="font-serif text-[24px] sm:text-[26px] font-medium tracking-[0.15em] uppercase text-[#2C2724]"
          >
            Ananya
          </motion.span>
        </div>
      </motion.div>

      {/* Bottom Date & Location Watermark */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.45 }}
        className="relative z-10 text-center pt-2 text-[10.5px] text-[#A6998E] uppercase tracking-[0.22em] font-light"
      >
        November 28, 2025 • Udaipur, Rajasthan
      </motion.div>
    </section>
  );
}
