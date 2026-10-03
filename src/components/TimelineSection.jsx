import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassWater, HeartHandshake, UtensilsCrossed, Moon, X, Clock, MapPin, Sparkles, Check } from 'lucide-react';

export default function TimelineSection() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scheduleEvents = [
    {
      time: '15:00',
      title: 'Guest Assembly',
      subtitle: 'Welcome champagne, live string acoustics & guest gathering',
      location: 'Welcome Lounge & Courtyard',
      description:
        'Join us as we gather for welcome champagne, passed canapés, and acoustic string quartet melodies while greeting fellow friends and family.',
      note: 'Please arrive by 15:15 to be comfortably seated.',
      icon: GlassWater,
      alignment: 'left',
    },
    {
      time: '16:00',
      title: 'Wedding Ceremony',
      subtitle: 'Exchange of vows, rings, and heartfelt blessings',
      location: 'Grand Marble Rotunda',
      description:
        'The sacred union of Ivan & Anna. Exchange of personalized vows, wedding rings, heartfelt family blessings, and the celebratory petal toss.',
      note: 'Photography is warmly welcomed after the processional.',
      icon: HeartHandshake,
      alignment: 'right',
    },
    {
      time: '17:00',
      title: 'Festive Banquet',
      subtitle: 'Dinner, speeches, wedding dance & live celebrations',
      location: 'Main Crystal Ballroom',
      description:
        'A curated multi-course culinary dinner with sommelier wine pairings, champagne toasts, emotional speeches, first wedding dance, and live music.',
      note: 'Special dietary preferences will be accommodated.',
      icon: UtensilsCrossed,
      alignment: 'left',
    },
    {
      time: '23:00',
      title: 'Evening Conclusion',
      subtitle: 'Wedding cake ceremony, sparklers & farewell',
      location: 'Garden Terrace & Grand Exit',
      description:
        'The ceremonial cutting of our artisan wedding cake, an illuminated sparkler farewell path, late-night dessert table, and bride & groom exit.',
      note: 'Chauffeur and valet departures available at the main gate.',
      icon: Moon,
      alignment: 'right',
    },
  ];

  return (
    <section className="relative w-full bg-transparent px-5 py-10 border-t border-[#EAE2D8]/40">
      {/* Section Title */}
      <div className="text-center mb-10">
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
            Events
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mobile-section-subtitle text-[12px] uppercase tracking-[0.25em] text-[#9E8B7A] font-medium"
          >
            Schedule &amp; Sequence
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } },
            }}
            className="text-[11px] text-[#9E8B7A]/90 font-light mt-1.5"
          >
            Tap any event to view schedule details ✨
          </motion.p>
        </motion.div>
      </div>

      {/* Minimalist Vertical Timeline */}
      <div className="relative max-w-[345px] mx-auto mb-12">
        {/* Center Line with Growing Animation */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute left-[50%] top-2 bottom-4 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#D8C7B5]/80 via-[#CFA4A4]/50 to-[#D8C7B5]/10"
        />

        <div className="space-y-8 relative">
          {scheduleEvents.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex items-center ${
                  isLeft ? 'justify-start text-right pr-[54%]' : 'justify-end text-left pl-[54%]'
                }`}
              >
                {/* Center Node / Dot with Liquid Vision Glass Circle */}
                <button
                  type="button"
                  onClick={() => setSelectedEvent(item)}
                  aria-label={`View details for ${item.title}`}
                  className="absolute left-1/2 top-1.5 -translate-x-1/2 z-10 cursor-pointer group focus:outline-none"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + index * 0.12,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="w-7 h-7 rounded-full vision-glass-circle flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 shadow-md"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-[#CFA4A4] to-[#FF9EAF] shadow-[0_0_8px_rgba(255,158,175,0.8)]" />
                  </motion.div>
                </button>

                {/* Event Card Content (Clickable) */}
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(item)}
                    className="w-full text-inherit p-1.5 -m-1.5 rounded-xl transition-all cursor-pointer group hover:bg-white/40 active:scale-[0.98] focus:outline-none text-left"
                    style={{ textAlign: isLeft ? 'right' : 'left' }}
                  >
                    {/* Timestamp */}
                    <motion.span
                      initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + index * 0.12 }}
                      className="mobile-timeline-time font-serif text-[22px] font-semibold tracking-wider text-[#2C2724] group-hover:text-[#8C5E5E] transition-colors block"
                    >
                      {item.time}
                    </motion.span>
                    {/* Event Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: 0.18 + index * 0.12 }}
                      className="mobile-timeline-title font-serif text-[17px] font-medium text-[#423C38] leading-tight mt-0.5 group-hover:text-[#2C2724] underline-offset-4 group-hover:underline"
                    >
                      {item.title}
                    </motion.h3>
                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.75, delay: 0.24 + index * 0.12 }}
                      className="mobile-timeline-subtitle text-[12.5px] text-[#786E68] font-light leading-snug mt-1"
                    >
                      {item.subtitle}
                    </motion.p>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Glass Popup Modal Card (Rendered at Top Level via Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedEvent && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                {/* Backdrop with Blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedEvent(null)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-[12px]"
                />

                {/* Glass Modal Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 12 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                  className="relative z-10 w-full max-w-[330px] rounded-[30px] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] border border-white/85 overflow-hidden text-center"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 245, 240, 0.82) 50%, rgba(255, 255, 255, 0.88) 100%)',
                    backdropFilter: 'blur(36px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(36px) saturate(200%)',
                  }}
                >
                  {/* Top Close Icon Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Close details"
                    className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full vision-glass-circle flex items-center justify-center text-[#554C46] hover:text-[#2C2724] active:scale-90 transition-all focus:outline-none shadow-sm cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Time Pill Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/70 shadow-sm text-[12px] font-semibold text-[#8C5E5E] mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedEvent.time}</span>
                  </div>

                  {/* Event Title */}
                  <h3 className="font-serif text-[24px] font-semibold text-[#2C2724] leading-tight mb-2">
                    {selectedEvent.title}
                  </h3>

                  {/* Location Badge */}
                  <div className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#7A6A5E] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#CFA4A4]" />
                    <span>{selectedEvent.location}</span>
                  </div>

                  {/* Full Description */}
                  <p className="text-[13.5px] leading-relaxed text-[#554B45] font-light mb-4 text-center px-1">
                    {selectedEvent.description}
                  </p>

                  {/* Helpful Note Pill */}
                  <div className="p-3 rounded-2xl bg-[#F8F3ED]/80 backdrop-blur-sm border border-[#E8DED3] mb-5 text-[11.5px] text-[#786E68] font-normal leading-snug">
                    {selectedEvent.note}
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="vision-glass-pill-dark w-full py-3 px-5 rounded-full text-white text-[13.5px] font-medium tracking-wide transition-all active:scale-95 hover:brightness-110 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4 text-[#F4D8D8]" />
                    <span>Got It</span>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}


