import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full bg-transparent pb-8 overflow-visible">
      {/* 1. TOP HERO PHOTO WITH DIRECT ALPHA MASK BLEND (NO CLIPPING SEAM) */}
      <div className="relative w-full h-[450px]">
        {/* Grayscale Romantic Couple Photo with Smooth Alpha Mask Dissolve */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.3) 82%, transparent 96%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.3) 82%, transparent 96%)',
          }}
        >
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src="/assets/hero_couple.jpg"
            alt="Ivan & Anna"
            className="h-full w-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98]"
          />

          {/* Top Sky Vignette for Tagline Contrast */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent pointer-events-none" />
        </div>

        {/* Top Tagline: "WEDDING INVITATION" */}
        <div className="absolute top-8 inset-x-0 text-center pointer-events-none z-10 px-4">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-tagline text-[12.5px] tracking-[0.28em] font-medium text-white/95 uppercase drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.6)]"
          >
            Wedding Invitation
          </motion.p>
        </div>

        {/* Couple Names Lockup: "IVAN & ANNA" */}
        <div className="absolute top-[20%] inset-x-0 text-center px-4 z-10 pointer-events-none">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.35 },
              },
            }}
            className="inline-flex items-center justify-center gap-3 sm:gap-4 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -14, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mobile-names-serif font-cormorant text-[32px] sm:text-[36px] font-light tracking-[0.24em] uppercase text-white"
            >
              IVAN
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] },
                },
              }}
              className="mobile-names-amp font-alex text-[42px] sm:text-[48px] text-[#F4D8D8] font-normal italic -mt-1 drop-shadow-md"
            >
              &amp;
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, x: 14, filter: 'blur(4px)' },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mobile-names-serif font-cormorant text-[32px] sm:text-[36px] font-light tracking-[0.24em] uppercase text-white"
            >
              ANNA
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* 2. SIGNATURE WATERCOLOR BLUSH PEONY FLOWER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20, rotate: -3 }}
        animate={{
          opacity: 1,
          scale: [1, 1.018, 1],
          y: [0, -6, 0],
          rotate: [-3, -1.8, -4.2, -3],
        }}
        transition={{
          opacity: { duration: 1.2, delay: 0.45, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
          rotate: { duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
        }}
        className="absolute right-[-8px] top-[340px] w-[214px] pointer-events-none z-20"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/assets/flower.webp"
          alt="Watercolor Blush Peony"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(207,164,164,0.35)]"
        />
      </motion.div>

      {/* 3. LOWER INVITATION WELCOME MODULE */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        className="relative z-10 px-8 pt-0 -mt-6"
      >
        {/* "Dear GUESTS!" Header Lockup */}
        <motion.div variants={itemVariants} className="mb-4 text-left">
          {/* Script "Dear" */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, x: -15 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="mobile-header-script font-pinyon text-[62px] text-[#2C2724] font-normal leading-[1.05] tracking-wide"
          >
            Dear
          </motion.h2>
          {/* Uppercase "GUESTS!" */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } },
            }}
            className="mobile-header-caps font-sans text-[30px] font-semibold tracking-[0.14em] text-[#2C2724] -mt-1 leading-none"
          >
            GUESTS!
          </motion.p>
        </motion.div>

        {/* Welcome Body Copy */}
        <motion.div variants={itemVariants} className="mobile-body-box max-w-[255px] text-left">
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.2 } },
            }}
            className="mobile-body-p1 text-[14px] leading-[1.65] text-[#554C46] font-normal"
          >
            We are overjoyed to share our greatest happiness — we are getting married!
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
