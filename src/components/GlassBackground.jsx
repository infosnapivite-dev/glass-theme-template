import React from 'react';

/**
 * GlassBackground Component (Ultra High-Performance 90+ FPS)
 * Offloads all ambient moving pink/rose quartz lighting to pure GPU-composited CSS animations.
 * Eliminates CPU/JS thread stalls during Lenis smooth scrolling.
 */
export default function GlassBackground() {
  return (
    <div
      className="fixed sm:absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#FAF7F2]"
      style={{
        transform: 'translate3d(0,0,0)',
        willChange: 'transform',
        contain: 'paint layout size',
      }}
    >
      {/* 1. Base Warm Ivory Ambient Canvas */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#F6EFE8] to-[#FAF6F1]" />

      {/* 2. VIBRANT CONTINUOUS MOVING PINK LIGHT ORBS (GPU-COMPOSITED CSS KEYFRAMES) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pink Light 1: Top Hero & Welcome Area */}
        <div
          className="anim-orb-1 absolute top-[3%] -left-12 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 105, 148, 0.72) 0%, rgba(255, 155, 185, 0.45) 40%, rgba(255, 205, 222, 0.18) 65%, transparent 78%)',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 2: Schedule & Timeline Area */}
        <div
          className="anim-orb-2 absolute top-[28%] -right-12 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 95, 140, 0.70) 0%, rgba(255, 150, 180, 0.42) 42%, rgba(255, 200, 220, 0.16) 68%, transparent 80%)',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 3: Dress Code Area */}
        <div
          className="anim-orb-3 absolute top-[55%] -left-12 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 110, 155, 0.68) 0%, rgba(255, 160, 188, 0.40) 42%, rgba(255, 210, 225, 0.16) 68%, transparent 80%)',
            transform: 'translate3d(0,0,0)',
          }}
        />

        {/* Pink Light 4: Countdown & Monogram Area */}
        <div
          className="anim-orb-4 absolute bottom-8 -right-12 w-[390px] h-[390px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 100, 145, 0.72) 0%, rgba(255, 155, 185, 0.44) 42%, rgba(255, 205, 222, 0.18) 68%, transparent 80%)',
            transform: 'translate3d(0,0,0)',
          }}
        />
      </div>

      {/* 3. OPTICAL TRANSLUCENT FROSTED GLASS SHEEN */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(253, 249, 244, 0.48) 0%, rgba(247, 242, 236, 0.38) 50%, rgba(253, 249, 244, 0.52) 100%)',
        }}
      />

      {/* 4. SPECULAR GLASS HIGHLIGHT & INNER SHEEN */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/25 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
    </div>
  );
}
