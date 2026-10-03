import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * iPhone 15 Pro / 16 Pro Chassis Frame for Desktop Showcase
 * - Subtle 3D Gyroscope / Mouse Parallax on Desktop
 * - Brushed Titanium Hardware Buttons (Action, Vol+/-, Power, Camera Control)
 * - Dynamic Island Pill Notch
 */
export default function IPhoneFrame({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural motion
  const springX = useSpring(mouseX, { stiffness: 90, damping: 18, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 18, mass: 0.3 });

  // Subtle 3D tilt angles (±6.5 degrees)
  const rotateY = useTransform(springX, [-1, 1], [-6.5, 6.5]);
  const rotateX = useTransform(springY, [-1, 1], [6.5, -6.5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth <= 600) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / (centerX || 1);
      const normY = (e.clientY - centerY) / (centerY || 1);

      mouseX.set(normX);
      mouseY.set(normY);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="iphone-wrapper"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {/* Physical Hardware Buttons (Left Edge) */}
      <div className="btn-hardware btn-action" title="Action Button" />
      <div className="btn-hardware btn-vol-up" title="Volume Up" />
      <div className="btn-hardware btn-vol-down" title="Volume Down" />

      {/* Physical Hardware Buttons (Right Edge) */}
      <div className="btn-hardware btn-power" title="Side Power Button" />
      <div className="btn-hardware btn-camera-control" title="Camera Control" />

      {/* Main iPhone Device Chassis */}
      <div className="iphone-device-frame">
        {/* Dynamic Island (Pill Notch) */}
        <div className="iphone-notch">
          <div className="notch-lens" />
          <div className="notch-sensor" />
        </div>

        {/* Inner App Container Viewport */}
        <div className="inner-app-container">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
