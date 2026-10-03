import React, { useEffect, useRef } from 'react';

export default function PetalsOverlay({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const updateDimensions = () => {
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Gently increased quantity to 34 for a richer, more noticeable heart shower
    const itemsCount = 34;
    const items = [];

    for (let i = 0; i < itemsCount; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 7 + Math.random() * 9,
        speedX: -0.4 + Math.random() * 0.8,
        speedY: 0.45 + Math.random() * 0.85,
        rotation: Math.random() * 360,
        rotationSpeed: -1.0 + Math.random() * 2.0,
        opacity: 0.32 + Math.random() * 0.48,
        isHeart: Math.random() > 0.25, // 75% romantic hearts, 25% delicate rose petals
        color:
          Math.random() > 0.55
            ? 'rgba(255, 175, 189, ' // Soft Rose Pink
            : Math.random() > 0.25
            ? 'rgba(244, 212, 212, ' // Warm Blush
            : 'rgba(214, 160, 160, ', // Vintage Dusty Rose
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      items.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 25) {
          p.y = -25;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 25) p.x = -25;
        if (p.x < -25) p.x = canvas.width + 25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = `${p.color}${p.opacity})`;

        if (p.isHeart) {
          // Romantic Floating Heart Shape
          const s = p.size * 0.75;
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.3);
          ctx.bezierCurveTo(-s * 0.6, -s * 0.95, -s * 1.1, -s * 0.2, 0, s * 0.9);
          ctx.bezierCurveTo(s * 1.1, -s * 0.2, s * 0.6, -s * 0.95, 0, -s * 0.3);
          ctx.fill();
        } else {
          // Soft Curved Rose Petal Shape
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, -p.size / 2, 0, p.size);
          ctx.bezierCurveTo(p.size, -p.size / 2, p.size / 2, -p.size, 0, 0);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-80"
      style={{ transform: 'translate3d(0,0,0)' }}
    />
  );
}
