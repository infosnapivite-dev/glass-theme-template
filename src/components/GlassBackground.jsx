import React from 'react';
import { motion } from 'framer-motion';

/**
 * GlassBackground Component
 * Renders an authentic translucent frosted glass canvas illuminated from behind
 * by continuous, vibrant moving pink/rose quartz light animations across all pages.
 */
export default function GlassBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#FAF7F2]">
      {/* 1. Base Warm Ivory Ambient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F6EFE8] to-[#FAF6F1]" />

      {/* 2. VIBRANT CONTINUOUS MOVING PINK LIGHT ORBS (BEHIND FROSTED GLASS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pink Light 1: Top Hero & Welcome Area (Vibrant Blush Rose Light) */}
        <motion.div
          animate={{
            x: [-30, 60, -15, -30],
            y: [-25, 45, -10, -25],
            scale: [1, 1.28, 0.92, 1],
            opacity: [0.75, 0.95, 0.68, 0.75],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[4%] -left-16 w-[380px] h-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 95, 140, 0.85) 0%, rgba(255, 145, 175, 0.55) 38%, rgba(255, 200, 218, 0.22) 65%, transparent 80%)',
            filter: 'blur(32px)',
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 2: Schedule & Timeline Area (Right-Side Moving Rose Aura) */}
        <motion.div
          animate={{
            x: [25, -70, 20, 25],
            y: [30, -50, 35, 30],
            scale: [0.92, 1.25, 0.88, 0.92],
            opacity: [0.7, 0.92, 0.65, 0.7],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8,
          }}
          className="absolute top-[28%] -right-16 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 80, 130, 0.82) 0%, rgba(255, 140, 170, 0.52) 40%, rgba(255, 195, 215, 0.2) 68%, transparent 82%)',
            filter: 'blur(34px)',
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 3: Dress Code Area (Left-Center Floating Pink Flare) */}
        <motion.div
          animate={{
            x: [-25, 55, -20, -25],
            y: [-20, 40, -30, -20],
            scale: [1, 1.22, 0.94, 1],
            opacity: [0.72, 0.95, 0.68, 0.72],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.6,
          }}
          className="absolute top-[54%] -left-16 w-[380px] h-[380px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 100, 145, 0.82) 0%, rgba(255, 155, 180, 0.52) 40%, rgba(255, 205, 222, 0.22) 68%, transparent 82%)',
            filter: 'blur(32px)',
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 4: Countdown & Monogram Area (Bottom-Right Floating Glow) */}
        <motion.div
          animate={{
            x: [30, -60, 20, 30],
            y: [35, -45, 25, 35],
            scale: [0.94, 1.26, 0.9, 0.94],
            opacity: [0.78, 0.98, 0.7, 0.78],
          }}
          transition={{
            duration: 9.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2.2,
          }}
          className="absolute bottom-10 -right-16 w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 90, 135, 0.85) 0%, rgba(255, 145, 175, 0.55) 40%, rgba(255, 200, 218, 0.25) 68%, transparent 82%)',
            filter: 'blur(34px)',
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 5: Ambient Traveling Vertical Light Stream */}
        <motion.div
          animate={{
            y: ['-10%', '110%'],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 120, 160, 0.6) 0%, rgba(255, 175, 195, 0.3) 48%, transparent 75%)',
            filter: 'blur(42px)',
            willChange: 'transform, opacity',
            transform: 'translate3d(-50%, 0, 0)',
          }}
        />
      </div>

      {/* 3. OPTICAL TRANSLUCENT FROSTED GLASS PANE */}
      <div
        className="absolute inset-0 backdrop-blur-[24px] pointer-events-none"
        style={{
          WebkitBackdropFilter: 'blur(24px)',
          background: 'linear-gradient(180deg, rgba(253, 249, 244, 0.46) 0%, rgba(247, 242, 236, 0.36) 50%, rgba(253, 249, 244, 0.5) 100%)',
        }}
      />

      {/* 4. SPECULAR GLASS HIGHLIGHT & INNER SHEEN */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/30 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
    </div>
  );
}



