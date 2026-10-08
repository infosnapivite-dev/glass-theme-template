import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Sparkles, Heart, Calendar, MapPin, User, Users, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpPage({ onBack, onSuccess }) {
  const [name, setName] = useState('');
  const [additionalNames, setAdditionalNames] = useState('');
  const [attendance, setAttendance] = useState('Joyfully Accepts');
  const [guestCount, setGuestCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGoogleIframe, setShowGoogleIframe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const hiddenFormRef = useRef(null);

  // Trigger celebratory confetti burst
  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.4 },
        colors: ['#CFA4A4', '#C5A880', '#F4D8D8', '#FAF5F0', '#E8B4B8'],
        zIndex: 9999,
      });
    } catch (e) {}
  }, []);

  // Update guest count safely (clamped between 1 and 5)
  const updateGuestCount = (val) => {
    const num = typeof val === 'number' ? val : parseInt(val, 10);
    if (isNaN(num)) {
      setGuestCount(1);
    } else {
      setGuestCount(Math.min(5, Math.max(1, num)));
    }
  };

  // Handle Form Submission -> Submit to Google Form Backend -> Auto-redirect to Thank You
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Submit form exactly once to Google Form in hidden iframe
    try {
      if (hiddenFormRef.current) {
        hiddenFormRef.current.submit();
      }
    } catch (err) {
      console.log('Hidden form submit error:', err);
    }

    // Trigger celebration confetti
    triggerCelebration();

    // Auto redirect to Thank You section at bottom of main invitation
    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      }
    }, 700);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full min-h-full overflow-y-auto overflow-x-hidden pb-16 pt-3 px-3 sm:px-4 no-scrollbar select-none"
    >
      {/* Hidden Google Form with pageHistory parameter for multi-page section support */}
      <form
        ref={hiddenFormRef}
        action="https://docs.google.com/forms/d/e/1FAIpQLSfAjMGr5hVZ9jrDawzeKBc30pLjCQGQwAu3Uc1O1oQurg-BVw/formResponse"
        method="POST"
        target="hidden_rsvp_iframe"
        className="hidden"
      >
        <input type="hidden" name="entry.710851809" value={name.trim()} />
        <input type="hidden" name="entry.2134027306" value={additionalNames.trim()} />
        <input type="hidden" name="entry.534031491" value={attendance} />
        {attendance === 'Joyfully Accepts' && (
          <>
            <input type="hidden" name="entry.780662720" value={String(guestCount)} />
            <input type="hidden" name="pageHistory" value="0,1" />
          </>
        )}
        {attendance === 'Regretfully Declines' && (
          <input type="hidden" name="pageHistory" value="0" />
        )}
      </form>
      <iframe name="hidden_rsvp_iframe" id="hidden_rsvp_iframe" className="hidden" title="RSVP Submission" />

      {/* Top Glass Navigation Bar */}
      <header className="sticky top-0 z-30 pt-2 pb-3 mb-3 backdrop-blur-md bg-[#FAF8F5]/85 -mx-3 px-4 border-b border-[#EAE2D8]/50 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="vision-glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium text-[#2C2724] tracking-wide transition-all active:scale-95 hover:bg-white/80 cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="w-3 h-3 text-[#CFA4A4]" />
          <span>Back to Invitation</span>
        </button>

        <div className="flex items-center gap-1.5 text-[10.5px] font-serif uppercase tracking-[0.2em] text-[#9E8B7A]">
          <span>Aarav</span>
          <span className="text-[#CFA4A4] font-alex text-[13px] lowercase">&amp;</span>
          <span>Ananya</span>
        </div>
      </header>

      {/* Section Header */}
      <div className="text-center mt-1 mb-3.5 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-[10.5px] font-medium text-[#7A6A5E] mb-2 shadow-2xs whitespace-nowrap">
          <Sparkles className="w-2.5 h-2.5 text-[#CFA4A4] shrink-0" />
          <span>Celebrate With Us • Shubh Vivah</span>
        </div>

        <h1 className="font-cormorant text-[32px] sm:text-[36px] font-medium tracking-[0.14em] uppercase text-[#2C2724] leading-tight whitespace-nowrap">
          RSVP Form
        </h1>
        <p className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.12em] text-[#9E8B7A] font-medium mt-0.5 whitespace-nowrap">
          Kindly Respond By November 15, 2025
        </p>
      </div>

      {/* Wedding Key Details Pill (Icons Only) */}
      <div className="vision-glass-card rounded-2xl py-2 px-4 mb-4 max-w-[370px] mx-auto flex items-center justify-center gap-4 text-center text-[#5A4F48]">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <Calendar className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span className="text-[11.5px] font-medium text-[#3A322D]">Nov 28, 2025</span>
        </div>
        <span className="text-[#C5A880] font-bold">•</span>
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <MapPin className="w-3.5 h-3.5 text-[#CFA4A4] shrink-0" />
          <span className="text-[11.5px] font-medium text-[#3A322D]">Oberoi Udaivilas, Udaipur</span>
        </div>
      </div>

      {!showGoogleIframe ? (
        /* BESPOKE VISIONOS LIQUID GLASS RSVP FORM */
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="vision-glass-card rounded-[26px] p-4 sm:p-5 max-w-[370px] mx-auto shadow-xl border border-white/80 relative overflow-hidden"
        >
          {/* Ambient Inner Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-[#F4D8D8]/20 via-transparent to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-3.5">
            {/* Field 1: Full Name */}
            <div>
              <label className="block text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6E6157] mb-1.5 flex items-center gap-1.5 whitespace-nowrap">
                <User className="w-3.5 h-3.5 text-[#CFA4A4] shrink-0" />
                <span>Your Full Name *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/90 text-[#2C2724] placeholder-[#A6998E] text-[13px] outline-none focus:ring-2 focus:ring-[#CFA4A4]/60 focus:bg-white/90 transition-all shadow-inner"
              />
              {errorMsg && (
                <p className="text-left text-[10.5px] text-rose-500 mt-1 font-medium whitespace-nowrap">{errorMsg}</p>
              )}
            </div>

            {/* Field 2: Additional Guest Names */}
            <div>
              <label className="block text-left text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#6E6157] mb-1.5 flex items-center gap-1.5 whitespace-nowrap">
                <Users className="w-3.5 h-3.5 text-[#CFA4A4] shrink-0" />
                <span>Additional Guest Names (Optional)</span>
              </label>
              <input
                type="text"
                value={additionalNames}
                onChange={(e) => setAdditionalNames(e.target.value)}
                placeholder="e.g. Priya Sharma, Rohan Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/90 text-[#2C2724] placeholder-[#A6998E] text-[13px] outline-none focus:ring-2 focus:ring-[#CFA4A4]/60 focus:bg-white/90 transition-all shadow-inner"
              />
            </div>

            {/* Field 3: Attendance Choice */}
            <div>
              <label className="block text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6E6157] mb-1.5 flex items-center gap-1.5 whitespace-nowrap">
                <Heart className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span>Will You Be Joining Us? *</span>
              </label>

              <div className="grid grid-cols-2 gap-2 mt-1">
                {/* Option 1: Joyfully Accepts */}
                <button
                  type="button"
                  onClick={() => setAttendance('Joyfully Accepts')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                    attendance === 'Joyfully Accepts'
                      ? 'bg-white/90 border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/50'
                      : 'bg-white/40 border-white/60 hover:bg-white/60 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[14px]">💍</span>
                    {attendance === 'Joyfully Accepts' && (
                      <div className="w-4 h-4 rounded-full bg-[#C5A880] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-[#2C2724] leading-snug">
                      Joyfully Accepts
                    </div>
                    <div className="text-[9.5px] text-[#8C7D73] mt-0.5 leading-tight">
                      Can't wait to celebrate!
                    </div>
                  </div>
                </button>

                {/* Option 2: Regretfully Declines */}
                <button
                  type="button"
                  onClick={() => setAttendance('Regretfully Declines')}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[92px] ${
                    attendance === 'Regretfully Declines'
                      ? 'bg-white/90 border-[#CFA4A4] shadow-md ring-1 ring-[#CFA4A4]/50'
                      : 'bg-white/40 border-white/60 hover:bg-white/60 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-[14px]">💌</span>
                    {attendance === 'Regretfully Declines' && (
                      <div className="w-4 h-4 rounded-full bg-[#CFA4A4] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-[#2C2724] leading-snug">
                      Regretfully Declines
                    </div>
                    <div className="text-[9.5px] text-[#8C7D73] mt-0.5 leading-tight">
                      Celebrating in spirit
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Field 4: Number of Guests (Only if Joyfully Accepts) */}
            <AnimatePresence>
              {attendance === 'Joyfully Accepts' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1.5 pt-1"
                >
                  <label className="block text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6E6157] flex items-center gap-1.5 whitespace-nowrap">
                    <Users className="w-3.5 h-3.5 text-[#CFA4A4] shrink-0" />
                    <span>Number of Guests Attending *</span>
                  </label>

                  {/* 1 to 5 Guest Selection Buttons */}
                  <div className="grid grid-cols-5 gap-2 pt-0.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => updateGuestCount(num)}
                        className={`py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center ${
                          guestCount === num
                            ? 'bg-[#C5A880] text-white shadow-md ring-1 ring-[#C5A880]/50 scale-[1.02]'
                            : 'bg-white/60 text-[#5A4F48] hover:bg-white/90 border border-white/80 shadow-2xs'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Submit RSVP Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="vision-glass-pill-dark w-full py-3.5 px-6 rounded-full text-white text-[13.5px] font-medium tracking-wide flex items-center justify-center transition-all active:scale-[0.97] hover:brightness-110 shadow-lg cursor-pointer whitespace-nowrap text-center disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2 whitespace-nowrap">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                    <span>Submitting &amp; Redirecting...</span>
                  </span>
                ) : (
                  <span className="whitespace-nowrap">Submit RSVP</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        /* FALLBACK EMBEDDED GOOGLE FORM IFRAME */
        <div className="relative w-full max-w-[393px] mx-auto rounded-3xl backdrop-blur-xl bg-white/70 border border-white/80 shadow-xl overflow-hidden p-2 min-h-[920px]">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfAjMGr5hVZ9jrDawzeKBc30pLjCQGQwAu3Uc1O1oQurg-BVw/viewform?embedded=true"
            width="100%"
            height="960"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="yes"
            title="Google RSVP Form"
            className="w-full h-[960px] rounded-2xl border-0 block bg-transparent"
            style={{ pointerEvents: 'auto', WebkitOverflowScrolling: 'touch' }}
          />
        </div>
      )}

      {/* Alternative View Toggle & Footer */}
      <div className="mt-4 text-center max-w-[340px] mx-auto space-y-2">
        <button
          type="button"
          onClick={() => setShowGoogleIframe((prev) => !prev)}
          className="text-[10.5px] text-[#8C7D73] hover:text-[#2C2724] underline transition-colors cursor-pointer"
        >
          {showGoogleIframe ? '← Switch to Fast Glass Form' : 'Need the original Google Form? Click here'}
        </button>

        <div>
          <button
            onClick={onBack}
            className="text-[11px] uppercase tracking-[0.2em] text-[#9E8B7A] hover:text-[#2C2724] transition-colors font-medium underline underline-offset-4 cursor-pointer"
          >
            ← Return to Main Invitation
          </button>
        </div>
      </div>
    </motion.div>
  );
}
