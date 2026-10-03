import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    image: '/assets/gallery_1.jpg',
    tag: 'Ceremony',
    title: 'Everlasting Vow',
    subtitle: 'The beginning of forever',
  },
  {
    id: 2,
    image: '/assets/gallery_2.jpg',
    tag: 'Grandeur',
    title: 'Palace Romance',
    subtitle: 'Timeless architectural grace',
  },
  {
    id: 3,
    image: '/assets/gallery_3.jpg',
    tag: 'Golden Hour',
    title: 'Sunset Whispers',
    subtitle: 'Under the Tuscan evening glow',
  },
  {
    id: 4,
    image: '/assets/gallery_4.jpg',
    tag: 'Celebration',
    title: 'Joyful Walk',
    subtitle: 'Surrounded by love and laughter',
  },
  {
    id: 5,
    image: '/assets/footer_couple.jpg',
    tag: 'Portraits',
    title: 'Tender Embrace',
    subtitle: 'A quiet stolen moment together',
  },
];

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  // Helper to calculate circular distance
  const getCardTransform = (index) => {
    const total = galleryItems.length;
    let diff = (index - activeIndex) % total;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;

    switch (diff) {
      case 0:
        return {
          x: 0,
          scale: 1,
          rotateY: 0,
          zIndex: 30,
          opacity: 1,
          brightness: 1,
          display: 'block',
        };
      case -1:
        return {
          x: -88,
          scale: 0.85,
          rotateY: 26,
          zIndex: 20,
          opacity: 0.72,
          brightness: 0.8,
          display: 'block',
        };
      case 1:
        return {
          x: 88,
          scale: 0.85,
          rotateY: -26,
          zIndex: 20,
          opacity: 0.72,
          brightness: 0.8,
          display: 'block',
        };
      case -2:
        return {
          x: -155,
          scale: 0.7,
          rotateY: 38,
          zIndex: 10,
          opacity: 0.4,
          brightness: 0.6,
          display: 'block',
        };
      case 2:
        return {
          x: 155,
          scale: 0.7,
          rotateY: -38,
          zIndex: 10,
          opacity: 0.4,
          brightness: 0.6,
          display: 'block',
        };
      default:
        return {
          x: diff > 0 ? 200 : -200,
          scale: 0.5,
          rotateY: diff > 0 ? -45 : 45,
          zIndex: 0,
          opacity: 0,
          brightness: 0.4,
          display: 'none',
        };
    }
  };

  return (
    <section className="relative w-full bg-transparent px-3 py-10 border-t border-[#EAE2D8]/40 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-8 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-title font-pinyon text-[54px] text-[#2C2724] leading-none mb-1.5"
          >
            Gallery
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-subtitle text-[12px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Our Cherished Moments
          </motion.p>
        </motion.div>
      </div>

      {/* 3D Perspective Curved Coverflow Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[360px] mx-auto min-h-[340px] flex items-center justify-center select-none"
      >
        <div
          className="relative w-full h-[320px] flex items-center justify-center"
          style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
        >
          {galleryItems.map((item, index) => {
            const transform = getCardTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: transform.x,
                  scale: transform.scale,
                  rotateY: transform.rotateY,
                  zIndex: transform.zIndex,
                  opacity: transform.opacity,
                  filter: `brightness(${transform.brightness})`,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.25, 1, 0.5, 1],
                }}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-[184px] h-[276px] rounded-[26px] overflow-hidden cursor-pointer shadow-2xl transition-shadow ${
                  isActive ? 'shadow-[0_20px_45px_rgba(0,0,0,0.35)] ring-1 ring-white/60' : ''
                }`}
                style={{
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Image Background */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* Top Category Tag Pill (Matching Reference Design) */}
                <div className="absolute top-3 left-3 pointer-events-none z-10">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md text-[10px] font-medium text-white tracking-wide border border-white/20">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Shadow Gradient & Embedded Label */}
                <div className="absolute inset-x-0 bottom-0 pt-12 pb-3 px-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10">
                  <p className="font-serif text-[13.5px] font-medium text-white/95 leading-tight tracking-wide drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Left / Right Chevrons */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={prevSlide}
          aria-label="Previous Moment"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full vision-glass-circle flex items-center justify-center text-[#3D342E] hover:text-[#1F1916] active:scale-90 transition-all shadow-md focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5 -ml-0.5" />
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={nextSlide}
          aria-label="Next Moment"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full vision-glass-circle flex items-center justify-center text-[#3D342E] hover:text-[#1F1916] active:scale-90 transition-all shadow-md focus:outline-none"
        >
          <ChevronRight className="w-5 h-5 -mr-0.5" />
        </motion.button>
      </motion.div>

      {/* Pagination Dots */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex items-center justify-center gap-2 pt-3 pb-2"
      >
        {galleryItems.map((_, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                isActive
                  ? 'w-6 h-2 bg-gradient-to-r from-[#CFA4A4] to-[#B88585] shadow-[0_0_8px_rgba(207,164,164,0.6)]'
                  : 'w-2 h-2 bg-[#D8C7B5]/70 hover:bg-[#BFAEA2]'
              }`}
            />
          );
        })}
      </motion.div>
    </section>
  );
}
