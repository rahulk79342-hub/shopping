"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClose, MdOutlineCheckCircle } from 'react-icons/md';


export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wantsWhatsApp, setWantsWhatsApp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if they already saw it this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenExitIntent");
    if (hasSeenPopup) return;

    const handleMouseLeave = (e) => {
      // If the mouse leaves from the top of the window
      if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
        setIsVisible(true);
        sessionStorage.setItem("hasSeenExitIntent", "true");
        // Remove listener after it triggers
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-[var(--color-background)] w-full max-w-md relative overflow-hidden shadow-2xl"
          >
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 z-10 text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            >
              <MdOutlineClose  />
            </button>

            <div className="p-10 text-center">
              {!submitted ? (
                <>
                  <span className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-[0.3em] text-[var(--color-outline)] block mb-4">
                    Wait Before You Go
                  </span>
                  <h2 className="font-[var(--font-family-headline-lg)] text-[32px] leading-tight text-[var(--color-primary)] mb-4">
                    Get 10% Off Your First Order
                  </h2>
                  <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-sm mb-6">
                    Join the Snipes Menswear community to receive exclusive drops, styling tips, and early access to sales.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col text-left">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[var(--color-surface-container)] text-[var(--color-primary)] font-[var(--font-family-body-md)] text-sm px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:text-[var(--color-outline-variant)] rounded-xl mb-3"
                    />

                    <AnimatePresence>
                      {wantsWhatsApp && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="WhatsApp Number" 
                            className="w-full bg-[var(--color-surface-container)] text-[var(--color-primary)] border border-[#25D366] font-[var(--font-family-body-md)] text-sm px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#25D366] transition-all placeholder:text-[var(--color-outline-variant)] rounded-xl mb-3"
                            required={wantsWhatsApp}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <label className="flex items-start gap-3 cursor-pointer group mb-6">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input 
                          type="checkbox" 
                          checked={wantsWhatsApp}
                          onChange={() => setWantsWhatsApp(!wantsWhatsApp)}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 rounded border border-gray-300 peer-checked:bg-[#25D366] peer-checked:border-[#25D366] transition-colors flex items-center justify-center">
                           <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all font-bold">check</span>
                        </div>
                      </div>
                      <span className="text-[13px] text-[var(--color-outline)] leading-snug">
                        Send my 10% code via <strong className="text-black">WhatsApp</strong> instead (5x faster delivery).
                      </span>
                    </label>

                    <button
                      type="submit"
                      className={`w-full text-white font-[var(--font-family-label-caps)] text-[12px] uppercase tracking-widest py-4 transition-colors duration-300 cursor-pointer rounded-xl font-bold ${wantsWhatsApp ? 'bg-[#25D366] hover:bg-[#1ebd59]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-secondary)]'}`}
                    >
                      Unlock My 10% Off
                    </button>
                  </form>
                  <button onClick={() => setIsVisible(false)} className="mt-6 text-[11px] font-[var(--font-family-body-md)] text-[var(--color-outline)] hover:text-[var(--color-primary)] underline-offset-4 hover:underline transition-all cursor-pointer">
                    No thanks, I prefer paying full price
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12"
                >
<<<<<<< HEAD
                  <MdOutlineCheckCircle className="text-[48px] text-[var(--color-secondary)] mb-4" />
=======
                  <span className={`material-symbols-outlined text-[48px] mb-4 ${wantsWhatsApp ? 'text-[#25D366]' : 'text-[var(--color-secondary)]'}`}>
                    {wantsWhatsApp ? 'chat' : 'check_circle'}
                  </span>
>>>>>>> c0a30dc4f1f78e9f3ff54d6758e50f169f82bd39
                  <h2 className="font-[var(--font-family-headline-md)] text-[24px] text-[var(--color-primary)] mb-2">You&apos;re on the list.</h2>
                  <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-sm">Check your {wantsWhatsApp ? 'WhatsApp' : 'inbox'} for your 10% off code.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
