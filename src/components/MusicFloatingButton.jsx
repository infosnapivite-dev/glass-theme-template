import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientMusic } from '../utils/audio';

export default function MusicFloatingButton() {
  const [isPlaying, setIsPlaying] = useState(() => ambientMusic.isPlaying);

  useEffect(() => {
    setIsPlaying(ambientMusic.isPlaying);
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const state = ambientMusic.toggle();
    setIsPlaying(state);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 right-4 sm:top-6 sm:right-5 z-50"
    >
      <button
        onClick={toggleAudio}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-lg cursor-pointer backdrop-blur-xl border border-white/20 bg-black/80 hover:bg-black/90 text-white ${
          isPlaying ? 'ring-2 ring-white/40 shadow-[0_0_15px_rgba(0,0,0,0.5)]' : 'opacity-85 hover:opacity-100'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.7)] animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-white/90" />
        )}
      </button>
    </motion.div>
  );
}
