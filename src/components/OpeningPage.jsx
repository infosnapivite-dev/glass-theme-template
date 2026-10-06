import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ambientMusic } from '../utils/audio';

/**
 * Realistic Scratch Card System
 * Features:
 * - Ultra-realistic metallic latex foil coating with micro-stipple noise & security guilloche patterns.
 * - Organic ragged latex peeling brush physics (jagged, flaky scratch strokes).
 * - Physical fluttering scratch dust / latex flakes that scatter realistically on each stroke.
 * - Subtle synthesized physical scratching sound via Web Audio API.
 * - Clean revealed wedding invitation card.
 * - Automatically opens the Home Page 3 seconds after scratching without needing any button!
 */
export default function OpeningPage({ onOpen }) {
  const [isScratched, setIsScratched] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [flakes, setFlakes] = useState([]);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const audioCtxRef = useRef(null);
  const lastAudioTimeRef = useRef(0);
  const hasTriggeredOpenRef = useRef(false);

  // Synthesize realistic scratching friction sound
  const playScratchAudio = useCallback(() => {
    const now = Date.now();
    if (now - lastAudioTimeRef.current < 45) return; // Throttle sound playback
    lastAudioTimeRef.current = now;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate brief paper/foil friction noise burst (30ms)
      const bufferSize = Math.floor(ctx.sampleRate * 0.035);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.5));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 3200 + (Math.random() * 800 - 400);
      filter.Q.value = 1.6;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // Audio fallback
    }
  }, []);

  // Initialize and paint the realistic metallic latex scratch foil
  const initScratchFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    // 1. Base Metallic Brushed Foil Gradient (Silver-Rose-Champagne)
    const foilGrad = ctx.createLinearGradient(0, 0, w, h);
    foilGrad.addColorStop(0, '#C9B5B5');
    foilGrad.addColorStop(0.18, '#E6D3CB');
    foilGrad.addColorStop(0.38, '#D8C2A7');
    foilGrad.addColorStop(0.55, '#F0DED8');
    foilGrad.addColorStop(0.78, '#C5A982');
    foilGrad.addColorStop(1, '#BF9E9E');

    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Realistic Micro-Stipple Noise (Latex Grain)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 450; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const rsize = Math.random() * 1.8 + 0.5;
      ctx.beginPath();
      ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(60, 40, 40, 0.06)';
    for (let i = 0; i < 350; i++) {
      const rx = Math.random() * w;
      const ry = Math.random() * h;
      const rsize = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.arc(rx, ry, rsize, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Security Guilloche Wavy Lines (Like genuine lottery/gift scratch passes)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
    ctx.lineWidth = 1;
    for (let y = 20; y < h; y += 18) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 12) {
        const wave = Math.sin(x * 0.06 + y * 0.1) * 3;
        if (x === 0) ctx.moveTo(x, y + wave);
        else ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }

    // 4. Physical Border Emboss
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    ctx.strokeStyle = 'rgba(160, 130, 90, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, w - 24, h - 24);

    // 5. Center Coin Stamp (Embossed Scratch Seal)
    const cx = w / 2;
    const cy = h / 2 - 6;

    // Outer coin rim
    ctx.beginPath();
    ctx.arc(cx, cy, 48, 0, Math.PI * 2);
    const coinGrad = ctx.createRadialGradient(cx - 10, cy - 10, 5, cx, cy, 48);
    coinGrad.addColorStop(0, '#FFFDF8');
    coinGrad.addColorStop(0.5, '#E8D4BE');
    coinGrad.addColorStop(0.85, '#B89B72');
    coinGrad.addColorStop(1, '#8C724E');
    ctx.fillStyle = coinGrad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner milled ring
    ctx.beginPath();
    ctx.arc(cx, cy, 42, 0, Math.PI * 2);
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = '#7A6242';
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.setLineDash([]);

    // Stamped Coin Label
    ctx.fillStyle = '#C5A880';
    ctx.font = 'bold 19px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪙', cx, cy - 14);

    ctx.fillStyle = '#3A2E26';
    ctx.font = '700 11.5px Montserrat, sans-serif';
    ctx.fillText('SCRATCH', cx, cy + 8);
    ctx.font = '600 8.5px Montserrat, sans-serif';
    ctx.fillStyle = '#6E5642';
    ctx.fillText('TO REVEAL', cx, cy + 22);
  }, []);

  useEffect(() => {
    initScratchFoil();
    const handleResize = () => {
      if (!isScratched) {
        initScratchFoil();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initScratchFoil, isScratched]);

  // Scratch progress calculation & 3-second auto-open trigger
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched || hasTriggeredOpenRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      const step = 48;
      const totalSampled = pixels.length / step;

      for (let i = 3; i < pixels.length; i += step) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const percentage = (transparentPixels / totalSampled) * 100;
      if (percentage > 38 && !isScratched && !hasTriggeredOpenRef.current) {
        hasTriggeredOpenRef.current = true;
        setIsScratched(true);

        // 1. Celebratory Confetti Burst
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.55 },
            colors: ['#CFA4A4', '#C5A880', '#F4D8D8', '#FFFFFF', '#E8C5A5'],
            disableForReducedMotion: true,
            zIndex: 9999,
          });
        } catch (e) {}

        // 2. Start romantic ambient music
        try {
          ambientMusic.start();
        } catch (e) {
          console.warn('Audio start hindered by browser policy', e);
        }

        // 3. Open Home Page automatically after 3 seconds
        setTimeout(() => {
          onOpen();
        }, 3000);
      }
    } catch (e) {}
  }, [isScratched, onOpen]);

  // Spawn realistic falling latex flakes
  const spawnFlakes = (point) => {
    const flakeCount = Math.floor(Math.random() * 3) + 2;
    const newFlakes = [];
    for (let i = 0; i < flakeCount; i++) {
      newFlakes.push({
        id: Math.random(),
        x: point.x + (Math.random() * 20 - 10),
        y: point.y + (Math.random() * 20 - 10),
        vx: (Math.random() * 4 - 2),
        vy: Math.random() * 3 + 2,
        size: Math.random() * 3.5 + 2,
        color: ['#D4BABA', '#C5A880', '#EAE0D5', '#9E8B7D'][Math.floor(Math.random() * 4)],
        rotation: Math.random() * 360,
      });
    }

    setFlakes((prev) => [...prev.slice(-25), ...newFlakes]);
  };

  // Flake physics tick
  useEffect(() => {
    if (flakes.length === 0) return;
    const interval = setInterval(() => {
      setFlakes((prev) =>
        prev
          .map((f) => ({
            ...f,
            x: f.x + f.vx,
            y: f.y + f.vy,
            vy: f.vy + 0.35,
            rotation: f.rotation + 6,
          }))
          .filter((f) => f.y < 450)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [flakes]);

  // Calculate coordinates
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Realistic Ragged Brush: draws jagged multi-point scratches
  const drawRealisticScratch = (from, to) => {
    const canvas = canvasRef.current;
    if (!canvas || !to) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';

    const dx = from ? to.x - from.x : 0;
    const dy = from ? to.y - from.y : 0;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(1, Math.floor(distance / 3));

    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const curX = from ? from.x + dx * t : to.x;
      const curY = from ? from.y + dy * t : to.y;

      // Main latex peel core
      ctx.beginPath();
      ctx.arc(curX, curY, 22, 0, Math.PI * 2);
      ctx.fill();

      // Ragged flaky edge jitter
      for (let j = 0; j < 3; j++) {
        const jx = curX + (Math.random() * 14 - 7);
        const jy = curY + (Math.random() * 14 - 7);
        const jRadius = Math.random() * 9 + 4;
        ctx.beginPath();
        ctx.arc(jx, jy, jRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    playScratchAudio();
    spawnFlakes(to);
  };

  const startScratching = (e) => {
    if (isScratched) return;
    isDrawingRef.current = true;
    setHasStartedScratching(true);
    const point = getCanvasCoords(e);
    lastPointRef.current = point;
    drawRealisticScratch(null, point);
  };

  const moveScratching = (e) => {
    if (!isDrawingRef.current || isScratched) return;
    const point = getCanvasCoords(e);
    if (!point) return;
    drawRealisticScratch(lastPointRef.current, point);
    lastPointRef.current = point;
    checkScratchPercentage();
  };

  const stopScratching = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    checkScratchPercentage();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(8px)',
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative w-full h-full min-h-full flex flex-col justify-between items-center px-4 py-6 sm:px-6 sm:py-8 overflow-hidden select-none bg-transparent"
      style={{ touchAction: 'none' }}
    >
      {/* 1. Clean Top Spacer */}
      <div className="w-full pt-1" />

      {/* 2. Centerpiece: Realistic Scratch Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[340px] my-auto"
      >
        {/* Decorative Floating Floral Accent over Top Right */}
        <motion.div
          animate={{
            rotate: [-2, 3, -2],
            y: [0, -6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-10 -right-7 w-28 sm:w-32 pointer-events-none z-30"
        >
          <img
            src="/assets/flower.webp"
            alt="Watercolor Blush Peony"
            className="w-full h-auto object-contain filter drop-shadow-[0_12px_24px_rgba(207,164,164,0.45)]"
          />
        </motion.div>

        {/* Scratch Card Outer Frame with Realistic Raised Edge Bevel */}
        <div
          ref={containerRef}
          className="relative rounded-[28px] overflow-hidden shadow-[0_22px_55px_-10px_rgba(180,130,130,0.38),0_4px_16px_rgba(0,0,0,0.06)] border border-white/85"
        >
          {/* A. REVEALED WEDDING INVITATION CARD */}
          <div className="vision-glass-card p-7 sm:p-8 text-center relative overflow-hidden bg-gradient-to-b from-white/95 via-white/85 to-[#FAF5F0]/95 min-h-[300px] flex flex-col justify-center items-center">
            {/* Soft Ambient Inner Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#F4D8D8]/25 via-transparent to-transparent pointer-events-none" />

            {/* Intro Tag */}
            <p className="font-sans text-[10px] sm:text-[10.5px] uppercase tracking-[0.26em] text-[#7C6F67] mb-3 font-medium">
              Together with their families
            </p>

            {/* Couple Names Lockup (Clean, Regal Typography) */}
            <div className="my-1 text-center w-full">
              <h1 className="font-cormorant text-[32px] sm:text-[36px] font-medium tracking-[0.14em] uppercase text-[#1A1614] leading-tight">
                AARAV
              </h1>
              <span className="font-alex text-[36px] sm:text-[40px] text-[#CFA4A4] italic block -my-3">
                &amp;
              </span>
              <h1 className="font-cormorant text-[32px] sm:text-[36px] font-medium tracking-[0.14em] uppercase text-[#1A1614] leading-tight">
                ANANYA
              </h1>
            </div>

            {/* Delicate Heart Divider */}
            <div className="flex items-center justify-center gap-2.5 max-w-[140px] mx-auto my-3 w-full">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A880]/70" />
              <Heart className="w-3 h-3 text-[#CFA4A4] fill-[#CFA4A4]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A880]/70" />
            </div>

            {/* Date & Location Pill Summary */}
            <div className="space-y-1.5 pt-1 text-[#5A4F48] w-full">
              <div className="flex items-center justify-center gap-1.5 text-[12.5px] sm:text-[13px] font-serif font-medium tracking-wide">
                <Calendar className="w-3.5 h-3.5 text-[#A8895E]" />
                <span>Friday, November 28, 2025</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-[11.5px] text-[#7E7168] font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#CFA4A4]" />
                <span>The Oberoi Udaivilas • Udaipur</span>
              </div>
            </div>
          </div>

          {/* B. TOP REALISTIC LATEX SCRATCH FOIL CANVAS */}
          <canvas
            ref={canvasRef}
            onMouseDown={startScratching}
            onMouseMove={moveScratching}
            onMouseUp={stopScratching}
            onMouseLeave={stopScratching}
            onTouchStart={startScratching}
            onTouchMove={moveScratching}
            onTouchEnd={stopScratching}
            onTouchCancel={stopScratching}
            className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-700 z-20 ${
              isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ touchAction: 'none' }}
          />

          {/* C. Physical Latex Dust & Flakes Layer */}
          <div className="absolute inset-0 pointer-events-none z-25 overflow-hidden">
            {flakes.map((f) => (
              <div
                key={f.id}
                className="absolute rounded-sm shadow-sm"
                style={{
                  left: `${f.x}px`,
                  top: `${f.y}px`,
                  width: `${f.size}px`,
                  height: `${f.size}px`,
                  backgroundColor: f.color,
                  transform: `rotate(${f.rotation}deg)`,
                  opacity: Math.max(0, 1 - f.y / 400),
                }}
              />
            ))}
          </div>

          {/* D. Animated Pointing Finger Guide (Fades out when scratching begins) */}
          <AnimatePresence>
            {!hasStartedScratching && !isScratched && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
                className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    x: [-45, 45, -45],
                    y: [-10, 10, -10],
                    rotate: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="relative flex flex-col items-center mt-12"
                >
                  {/* Glowing touch contact ripple at the fingertip */}
                  <div className="absolute -top-1 left-2.5 -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute -inset-1.5 rounded-full bg-white/70 animate-ping" />
                    <span className="block w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                  </div>

                  {/* Realistic Pointing Finger Hand SVG */}
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.45)] -rotate-12"
                  >
                    {/* Realistic Hand Silhouette with extending pointing index finger */}
                    <path
                      d="M10 2C9.45 2 9 2.45 9 3V11.5L8.2 10.3C7.6 9.4 6.35 9.15 5.45 9.75C4.55 10.35 4.3 11.6 4.9 12.5L9.2 18.95C10.1 20.3 11.65 21.1 13.3 21.1H16C18.76 21.1 21 18.86 21 16.1V10.5C21 9.67 20.33 9 19.5 9C19.35 9 19.2 9.02 19.07 9.07C18.85 8.15 18.02 7.5 17 7.5C16.8 7.5 16.6 7.54 16.42 7.61C16.14 6.96 15.49 6.5 14.75 6.5C14.53 6.5 14.33 6.55 14.14 6.63C13.85 5.97 13.2 5.5 12.45 5.5C12.3 5.5 12.14 5.53 12 5.58V3C12 2.45 11.55 2 11 2H10Z"
                      fill="#FFFFFF"
                      stroke="#2C2724"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Subtle finger knuckle detail lines */}
                    <path
                      d="M12 9.5V13.5M14.5 10.5V14M17 11.5V14.5"
                      stroke="#C5A880"
                      strokeWidth="0.9"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* 3. Bottom Auto-Open Status & Progress Bar (No button) */}
      <div className="relative z-10 w-full max-w-[320px] text-center pb-2 min-h-[38px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isScratched && (
            <motion.div
              key="auto-opening"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="flex items-center gap-2 text-[#8C6F4E] text-[11px] font-medium tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping" />
                <span>Opening celebration...</span>
              </div>
              {/* 3-Second Golden Progress Indicator */}
              <div className="w-36 h-[2.5px] bg-[#E8DFD6] rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-[#CFA4A4] via-[#C5A880] to-[#CFA4A4]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
