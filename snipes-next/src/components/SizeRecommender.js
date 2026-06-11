"use client";
import { useState } from 'react';
import { useUI } from '../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function SizeRecommender() {
  const { isSizeGuideOpen, closeSizeGuide } = useUI();
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  
  const [recommendation, setRecommendation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateSize = () => {
    setIsCalculating(true);
    setRecommendation(null);
    
    // Fake calculation delay for premium feel
    setTimeout(() => {
      let size = 'M';
      let fit = 'Slim Fit';
      
      if (height > 185 || weight > 85) size = 'XL';
      else if (height > 180 || weight > 78) size = 'L';
      else if (height < 165 || weight < 60) size = 'S';
      
      if (weight / (height/100 * height/100) > 25) fit = 'Regular Fit';
      else fit = 'Slim Fit';

      setRecommendation({ size, fit });
      setIsCalculating(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] cursor-pointer"
            onClick={closeSizeGuide}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full md:w-[450px] md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 bg-white rounded-t-2xl md:rounded-2xl z-[120] shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-[var(--color-outline-variant)] flex justify-between items-center">
              <h2 className="font-[var(--font-family-headline-md)] text-[20px] text-[var(--color-primary)]">Size Recommender</h2>
              <button onClick={closeSizeGuide} className="text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors cursor-pointer p-1">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] text-sm">
                Enter your measurements to get a personalized size and fit recommendation based on this garment's specific cut.
              </p>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <label className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)]">HEIGHT (CM)</label>
                  <span className="font-[var(--font-family-price-display)] text-[14px]">{height} cm</span>
                </div>
                <input 
                  type="range" min="150" max="210" value={height} onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--color-surface-container)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                />
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <div className="flex justify-between">
                  <label className="font-[var(--font-family-label-caps)] text-[12px] text-[var(--color-primary)]">WEIGHT (KG)</label>
                  <span className="font-[var(--font-family-price-display)] text-[14px]">{weight} kg</span>
                </div>
                <input 
                  type="range" min="45" max="130" value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--color-surface-container)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                />
              </div>

              <button 
                onClick={calculateSize}
                disabled={isCalculating}
                className="w-full bg-[var(--color-primary)] text-white py-4 font-[var(--font-family-label-caps)] text-[14px] uppercase hover:bg-[var(--color-surface-tint)] transition-colors tracking-widest disabled:opacity-70 flex justify-center items-center h-14"
              >
                {isCalculating ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Calculate My Size"}
              </button>

              <AnimatePresence>
                {recommendation && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)] rounded-lg p-5 flex items-center justify-between mt-2"
                  >
                    <div>
                      <p className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-outline)] uppercase tracking-widest mb-1">Recommended For You</p>
                      <p className="font-[var(--font-family-body-md)] text-[14px] text-[var(--color-primary)]">Based on our data, we suggest</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-[var(--font-family-headline-lg)] text-4xl text-[var(--color-primary)] leading-none">{recommendation.size}</span>
                      <span className="font-[var(--font-family-label-caps)] text-[10px] text-[var(--color-primary)] mt-1">{recommendation.fit}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
