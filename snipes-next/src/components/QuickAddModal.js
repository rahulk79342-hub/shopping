"use client";
import { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuickAddModal() {
  const { quickAddProduct, closeQuickAdd, openCartDrawer } = useUI();
  const addToCart = useCartStore(state => state.addToCart);
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState('Default');
  const [sizeError, setSizeError] = useState(false);
  
  // Fit Assistant States
  const [view, setView] = useState('details'); // 'details' | 'fit_quiz'
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [fitPreference, setFitPreference] = useState('Regular');
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (quickAddProduct) {
      setActiveSize(null);
      setActiveColor('Default');
      setSizeError(false);
      setView('details');
      setRecommendation(null);
    }
  }, [quickAddProduct]);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Default', hex: '#1b1b1b' },
    { name: 'Light', hex: '#f3f3f3' },
    { name: 'Accent', hex: '#735c00' }
  ];

  const handleAdd = () => {
    if (!activeSize) {
      setSizeError(true);
      return;
    }
    // Limit added items but store handles that. Let's just add it.
    addToCart({ ...quickAddProduct, size: activeSize, color: activeColor, image: quickAddProduct.image || quickAddProduct.img });
    closeQuickAdd();
    openCartDrawer();
  };

  const handleCalculateFit = () => {
    setIsCalculating(true);
    // Simulate AI calculation
    setTimeout(() => {
      let recSize = 'M';
      if (height > 182 || weight > 85) recSize = 'L';
      if (height > 190 || weight > 95) recSize = 'XL';
      if (height < 165 && weight < 65) recSize = 'S';
      
      if (fitPreference === 'Relaxed' && recSize !== 'XL') {
         // rough simulation: size up for relaxed if not already max
         recSize = sizes[Math.min(sizes.indexOf(recSize) + 1, sizes.length - 1)];
      } else if (fitPreference === 'Slim' && recSize !== 'S') {
         recSize = sizes[Math.max(sizes.indexOf(recSize) - 1, 0)];
      }

      setRecommendation({
        size: recSize,
        confidence: Math.floor(Math.random() * (98 - 88 + 1) + 88) // Random between 88-98%
      });
      setIsCalculating(false);
    }, 1500);
  };

  const applyRecommendation = () => {
    setActiveSize(recommendation.size);
    setView('details');
  };

  return (
    <AnimatePresence>
      {quickAddProduct && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={closeQuickAdd}
          />

          {/* Drawer Content */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[480px] bg-white h-full relative z-10 flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
              <span className="font-bold text-[14px] uppercase tracking-widest text-black">
                {view === 'details' ? 'Quick View' : 'Fit Assistant'}
              </span>
              <button 
                onClick={view === 'fit_quiz' ? () => setView('details') : closeQuickAdd} 
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {view === 'fit_quiz' ? 'arrow_back' : 'close'}
                </span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-32 hide-scrollbar relative">
              
              <AnimatePresence mode="wait">
                {view === 'details' ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Image Gallery */}
                    <div className="w-full bg-[#f8f8f8] rounded-[16px] overflow-hidden aspect-[3/4] relative mb-6">
                      <Image src={quickAddProduct.image || quickAddProduct.img || "https://i.imgur.com/NLn4e7S.jpeg"} alt={quickAddProduct.name} fill sizes="(max-width: 768px) 100vw, 480px" className="object-cover object-top" />
                    </div>

                    {/* Product Info */}
                    <h2 className="font-bold text-[24px] text-black leading-tight mb-2">
                      {quickAddProduct.name}
                    </h2>
                    
                    <div className="flex items-end gap-3 mb-3">
                      <span className={`font-bold text-[20px] ${quickAddProduct.sale ? 'text-red-600' : 'text-black'}`}>
                        {quickAddProduct.price}
                      </span>
                      {quickAddProduct.originalPrice && (
                        <span className="text-[14px] text-gray-500 line-through pb-0.5">
                          Rs. {quickAddProduct.originalPrice}.00
                        </span>
                      )}
                    </div>

                    {/* Model Reference - Reduces returns! */}
                    <div className="mb-6 flex items-start gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                       <span className="material-symbols-outlined text-gray-400 text-[18px]">straighten</span>
                       <p className="text-[13px] text-gray-600 leading-snug">
                         <span className="font-bold text-gray-800">Model is 6'1" (185cm)</span>, wearing size <span className="font-bold text-gray-800">L</span>. Fits true to size.
                       </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                         <span className="font-bold text-[12px] uppercase tracking-widest text-black block">Color: <span className="text-gray-500 font-medium ml-1">{activeColor}</span></span>
                      </div>
                      <div className="flex gap-4">
                        {colors.map(color => (
                          <button
                            key={color.name}
                            onClick={() => setActiveColor(color.name)}
                            className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${activeColor === color.name ? 'border-black scale-110 shadow-md' : 'border-transparent ring-1 ring-gray-200 hover:scale-105'}`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Select ${color.name} color`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`font-bold text-[12px] uppercase tracking-widest block ${sizeError ? 'text-red-500' : 'text-black'}`}>
                          {sizeError ? 'Please select a size' : 'Select Size'}
                        </span>
                        
                        {/* Fit Assistant Trigger */}
                        <button 
                          onClick={() => setView('fit_quiz')}
                          className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                          Find My Size
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        {sizes.map(size => (
                          <button 
                            key={size}
                            onClick={() => { setActiveSize(size); setSizeError(false); }}
                            className={`py-3 font-bold text-[14px] border rounded-[8px] transition-colors cursor-pointer ${activeSize === size ? 'bg-black text-white border-black' : sizeError ? 'border-red-300 text-red-500 hover:border-red-500' : 'border-gray-200 text-black hover:border-black'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="fit_quiz"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                     <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="material-symbols-outlined text-[24px]">straighten</span>
                        </div>
                        <h2 className="text-[24px] font-bold mb-2 text-black">AI Fit Assistant</h2>
                        <p className="text-gray-500 text-[14px]">Find your perfect size in 15 seconds. Reduces returns and guarantees comfort.</p>
                     </div>

                     {!recommendation ? (
                       <div className="flex-1 flex flex-col gap-6">
                         {/* Height Input */}
                         <div>
                            <div className="flex justify-between items-end mb-2">
                              <label className="font-bold text-[12px] uppercase tracking-widest text-black">Height (cm)</label>
                              <span className="text-indigo-600 font-bold text-[18px]">{height} cm</span>
                            </div>
                            <input 
                              type="range" 
                              min="150" max="210" 
                              value={height} 
                              onChange={(e) => setHeight(Number(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                         </div>

                         {/* Weight Input */}
                         <div>
                            <div className="flex justify-between items-end mb-2">
                              <label className="font-bold text-[12px] uppercase tracking-widest text-black">Weight (kg)</label>
                              <span className="text-indigo-600 font-bold text-[18px]">{weight} kg</span>
                            </div>
                            <input 
                              type="range" 
                              min="40" max="130" 
                              value={weight} 
                              onChange={(e) => setWeight(Number(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                         </div>

                         {/* Preference Toggle */}
                         <div>
                            <label className="font-bold text-[12px] uppercase tracking-widest text-black mb-3 block">Preferred Fit</label>
                            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl">
                               {['Slim', 'Regular', 'Relaxed'].map(pref => (
                                 <button
                                   key={pref}
                                   onClick={() => setFitPreference(pref)}
                                   className={`py-2 text-[13px] font-bold rounded-lg transition-all ${fitPreference === pref ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-black'}`}
                                 >
                                   {pref}
                                 </button>
                               ))}
                            </div>
                         </div>

                         <div className="mt-8">
                           <button 
                             onClick={handleCalculateFit}
                             disabled={isCalculating}
                             className="w-full py-4 bg-black text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-70 transition-all"
                           >
                             {isCalculating ? (
                               <>
                                 <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                 Calculating...
                               </>
                             ) : (
                               <>
                                 <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                                 Find My Fit
                               </>
                             )}
                           </button>
                         </div>
                       </div>
                     ) : (
                       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center text-center mt-8">
                          <div className="relative w-32 h-32 mb-6">
                            {/* Animated ring */}
                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                              <motion.circle 
                                cx="50" cy="50" r="45" 
                                fill="none" stroke="#4f46e5" strokeWidth="8"
                                strokeDasharray={283}
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * recommendation.confidence) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-[36px] font-bold text-black leading-none">{recommendation.size}</span>
                              <span className="text-[12px] text-gray-500 uppercase font-bold tracking-widest mt-1">Size</span>
                            </div>
                          </div>
                          
                          <h3 className="text-[20px] font-bold text-black mb-2">We recommend Size {recommendation.size}</h3>
                          <p className="text-gray-600 text-[14px] px-4">
                            Based on our algorithm, we are <span className="font-bold text-indigo-600">{recommendation.confidence}% confident</span> this will provide your preferred <span className="font-bold text-black lowercase">{fitPreference}</span> fit.
                          </p>

                          <button 
                            onClick={applyRecommendation}
                            className="w-full mt-10 py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
                          >
                            Apply Recommendation
                          </button>
                       </motion.div>
                     )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Add to Cart Footer (Only visible on Details view) */}
            {view === 'details' && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
                <button 
                  onClick={handleAdd}
                  className="w-full bg-black text-white font-bold text-[14px] py-4 rounded-full hover:bg-gray-800 transition-colors active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest shadow-lg"
                >
                  Add To Bag — {quickAddProduct.price}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
