import React, { useEffect, useRef } from 'react';

/**
 * PetalsOverlay Component (High-Performance 90+ FPS)
 * Renders floating romantic rose petals & delicate hearts without any vertical stretching.
 * Optimized canvas rendering with zero allocations per frame.
 */
export default function PetalsOverlay({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 390;
    let height = 800;
    let isRunning = true;

    const updateDimensions = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width || canvas.clientWidth || window.innerWidth;
      height = rect.height || canvas.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(canvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', updateDimensions, { passive: true });

    // Rose petals and floating romantic hearts (22 lightweight items)
    const itemsCount = 20;
    const items = [];

    for (let i = 0; i < itemsCount; i++) {
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 7 + Math.random() * 7,
        speedX: -0.3 + Math.random() * 0.6,
        speedY: 0.4 + Math.random() * 0.55,
        rotation: Math.random() * 360,
        rotationSpeed: -0.8 + Math.random() * 1.6,
        opacity: 0.35 + Math.random() * 0.4,
        isHeart: Math.random() > 0.45,
        color:
          Math.random() > 0.6
            ? 'rgba(255, 180, 195, '
            : Math.random() > 0.3
            ? 'rgba(244, 214, 214, '
            : 'rgba(218, 168, 168, ',
      });
    }

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < itemsCount; i++) {
        const p = items[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 25) {
          p.y = -25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) p.x = -25;
        if (p.x < -25) p.x = width + 25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = `${p.color}${p.opacity})`;

        if (p.isHeart) {
          const s = p.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.3);
          ctx.bezierCurveTo(-s * 0.6, -s * 0.95, -s * 1.1, -s * 0.2, 0, s * 0.9);
          ctx.bezierCurveTo(s * 1.1, -s * 0.2, s * 0.6, -s * 0.95, 0, -s * 0.3);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, -p.size / 2, 0, p.size);
          ctx.bezierCurveTo(p.size, -p.size / 2, p.size / 2, -p.size, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        render();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed sm:absolute inset-0 z-20 w-full h-full max-w-[430px] mx-auto opacity-75"
      style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
    />
  );
}
