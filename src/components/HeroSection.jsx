import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full bg-transparent pb-8 overflow-visible">
      {/* 1. TOP HERO PHOTO WITH DIRECT ALPHA MASK BLEND */}
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
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            src="/assets/hero_couple.jpg"
            alt="Aarav & Ananya"
            className="h-full w-full object-cover object-top filter grayscale contrast-[1.08] brightness-[0.98]"
            loading="eager"
          />
        </div>

        {/* Couple Names Lockup: "AARAV & ANANYA" */}
        <div className="absolute top-[20%] inset-x-0 text-center px-3 z-10 pointer-events-none">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.25 },
              },
            }}
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 max-w-full text-[#1A1614] drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mobile-names-serif font-cormorant text-[23px] sm:text-[26px] font-medium tracking-[0.14em] uppercase text-[#1A1614]"
            >
              AARAV
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, scale: 0.6 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] },
                },
              }}
              className="mobile-names-amp font-alex text-[32px] sm:text-[36px] text-[#A86F6F] font-normal italic -mt-1 drop-shadow-sm"
            >
              &amp;
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, x: 12 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mobile-names-serif font-cormorant text-[23px] sm:text-[26px] font-medium tracking-[0.14em] uppercase text-[#1A1614]"
            >
              ANANYA
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* 2. SIGNATURE WATERCOLOR BLUSH PEONY FLOWER (GPU-COMPOSITED CSS KEYFRAME ANIMATION) */}
      <div
        className="anim-flower-sway absolute right-[-8px] top-[340px] w-[214px] pointer-events-none z-20"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/assets/flower.webp"
          alt="Watercolor Blush Peony"
          className="w-full h-auto object-contain filter drop-shadow-[0_14px_28px_rgba(207,164,164,0.38)]"
          loading="eager"
        />
      </div>

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
          <motion.h2
            variants={{
              hidden: { opacity: 0, x: -12 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
            }}
            className="mobile-header-script font-pinyon text-[62px] text-[#2C2724] font-normal leading-[1.05] tracking-wide"
          >
            Dear
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.08 } },
            }}
            className="mobile-header-caps font-sans text-[28px] font-semibold tracking-[0.14em] text-[#2C2724] -mt-1 leading-none"
          >
            FAMILY &amp; FRIENDS
          </motion.p>
        </motion.div>

        {/* Welcome Body Copy */}
        <motion.div variants={itemVariants} className="mobile-body-box max-w-[265px] text-left">
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, delay: 0.15 } },
            }}
            className="mobile-body-p1 text-[14px] leading-[1.65] text-[#554C46] font-normal"
          >
            With the divine blessings of our families, we joyously invite you to celebrate our sacred wedding union &amp; festivities!
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
