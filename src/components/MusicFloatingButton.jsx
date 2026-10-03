import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { ambientMusic } from '../utils/audio';

export default function MusicFloatingButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const state = ambientMusic.toggle();
    setIsPlaying(state);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 right-5 z-40"
    >
      <button
        onClick={toggleAudio}
        className={`group flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full transition-all duration-300 active:scale-90 ${
          isPlaying
            ? 'vision-glass-pill-dark text-white ring-2 ring-[#FF9EAF]/40'
            : 'vision-glass-pill text-[#2C2724] hover:brightness-105'
        }`}
        title={isPlaying ? 'Mute Background Music' : 'Play Romantic Music'}
      >
        {/* Apple-style circular glass icon knob */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
            isPlaying ? 'bg-white/20' : 'vision-glass-knob'
          }`}
        >
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 text-[#FF9EAF] animate-pulse" />
          ) : (
            <Music className="w-3.5 h-3.5 text-[#A86F6F] group-hover:scale-110 transition-transform" />
          )}
        </div>

        {/* Status Text / Waveform */}
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-[#FF9EAF] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-2 bg-[#FF9EAF] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-3.5 bg-[#FF9EAF] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[10.5px] font-medium tracking-wider uppercase text-white/95">
              Playing
            </span>
          </div>
        ) : (
          <span className="text-[10.5px] font-medium tracking-wider uppercase text-[#423C38]">
            Music
          </span>
        )}
      </button>
    </motion.div>
  );
}
