import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function VenueSection() {
  return (
    <section className="relative w-full bg-transparent px-5 py-10 border-t border-[#EAE2D8]/40 overflow-hidden">
      {/* Section Title */}
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
            Venue
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-subtitle text-[12px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Location &amp; Route
          </motion.p>
        </motion.div>
      </div>

      {/* Venue Card with Increased Height, Interactive Map, Address Text & Direction Button */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[348px] mx-auto rounded-[32px] vision-glass-card p-6 sm:p-7 pt-7 pb-7 overflow-hidden shadow-xl"
      >
        <div className="relative z-10 text-center">
          {/* Header Introduction */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mobile-venue-pre text-[14px] text-[#7A706A] font-light mb-1.5"
          >
            We will be thrilled to welcome you to
          </motion.p>

          {/* Venue Name */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-venue-title font-serif text-[26px] font-semibold tracking-wide text-[#2C2724] mb-2 leading-tight"
          >
            The Oberoi Udaivilas
          </motion.h3>

          {/* Address Text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="inline-flex items-center justify-center gap-1.5 text-[#5A514B] mb-4 px-2"
          >
            <MapPin className="w-4 h-4 text-[#B88585] flex-shrink-0" />
            <p className="mobile-venue-address text-[14.5px] font-normal leading-relaxed">
              Haridas Ji Ki Magri, Udaipur, Rajasthan 313001
            </p>
          </motion.div>

          {/* Embedded Interactive Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-60 rounded-2xl overflow-hidden border border-white/80 shadow-md mb-5 bg-[#EAE2D8]"
          >
            <iframe
              title="Venue Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.6600%2C24.5700%2C73.6900%2C24.5900&layer=mapnik&marker=24.5775%2C73.6738"
              className="w-full h-[calc(100%+48px)] -mb-[48px] border-0 filter saturate-[0.88] contrast-[1.05]"
              loading="lazy"
            />
            {/* Glass Overlay Location Tag */}
            <div className="absolute top-2.5 left-2.5 pointer-events-none">
              <div className="px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#CFA4A4] animate-pulse" />
                <span className="text-[11px] font-medium text-[#2C2724] tracking-wide">
                  Palace Location
                </span>
              </div>
            </div>
          </motion.div>

          {/* Single Prominent Direction Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.38 }}
          >
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=The+Oberoi+Udaivilas,+Udaipur,+Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="vision-glass-pill-dark w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full text-white text-[14.5px] font-medium tracking-wide transition-all active:scale-[0.98] hover:brightness-110 shadow-lg cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Navigation className="w-3.5 h-3.5 text-[#F4D8D8]" />
              </div>
              <span className="mobile-venue-btn">Get Directions</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
