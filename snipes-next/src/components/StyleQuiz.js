"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const QUESTIONS = [
  {
    step: 1,
    title: "Where are you heading?",
    options: [
      { id: "work", label: "The Office", img: "https://loremflickr.com/800/800/menswear,clothing?random=92" },
      { id: "vacation", label: "Vacation", img: "https://loremflickr.com/800/800/menswear,clothing?random=91" },
      { id: "weekend", label: "Weekend Out", img: "https://loremflickr.com/800/800/menswear,clothing?random=90" }
    ]
  },
  {
    step: 2,
    title: "What's your vibe?",
    options: [
      { id: "minimal", label: "Minimalist", img: "https://loremflickr.com/800/800/menswear,clothing?random=89" },
      { id: "street", label: "Streetwear", img: "https://loremflickr.com/800/800/menswear,clothing?random=88" },
      { id: "oldmoney", label: "Old Money", img: "https://loremflickr.com/800/800/menswear,clothing?random=87" }
    ]
  },
  {
    step: 3,
    title: "What's your budget?",
    options: [
      { id: "essentials", label: "Essentials ($)", img: "https://loremflickr.com/800/800/menswear,clothing?random=86" },
      { id: "premium", label: "Premium ($$)", img: "https://loremflickr.com/800/800/menswear,clothing?random=85" },
      { id: "luxury", label: "Luxury ($$$)", img: "https://loremflickr.com/800/800/menswear,clothing?random=84" }
    ]
  }
];

// Mock Results
const MOCK_RESULTS = [
  { id: 201, name: "Signature Linen Shirt", price: 1499, img: "https://loremflickr.com/800/800/menswear,clothing?random=83" },
  { id: 202, name: "Pleated Trousers", price: 1899, img: "https://loremflickr.com/800/800/menswear,clothing?random=82" },
  { id: 203, name: "Knit Polo", price: 1299, img: "https://loremflickr.com/800/800/menswear,clothing?random=81" },
  { id: 204, name: "Boxy Heavy Tee", price: 899, img: "https://loremflickr.com/800/800/menswear,clothing?random=80" },
  { id: 205, name: "Everyday Shorts", price: 1199, img: "https://loremflickr.com/800/800/menswear,clothing?random=79" },
  { id: 206, name: "Cuban Collar Printed", price: 1599, img: "https://loremflickr.com/800/800/menswear,clothing?random=78" }
];

export default function StyleQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: intro, 1-3: questions, 4: loading, 5: results
  const [answers, setAnswers] = useState({ occasion: '', vibe: '', budget: '' });
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Reset quiz when opening
  const handleOpen = () => {
    setIsOpen(true);
    setStep(0);
    setAnswers({ occasion: '', vibe: '', budget: '' });
    setCurrentOptionIndex(0);
  };

  const startQuiz = () => setStep(1);

  // Handle answering via click (desktop) or swipe (mobile)
  const handleAnswer = (questionKey, optionId) => {
    setAnswers(prev => ({ ...prev, [questionKey]: optionId }));
    
    if (step < 3) {
      setStep(step + 1);
      setCurrentOptionIndex(0);
    } else {
      // Finished answering
      setStep(4);
      // Simulate AI loading
      setTimeout(() => setStep(5), 2500);
    }
  };

  const handleMobileSwipe = (direction) => {
    const currentQuestion = QUESTIONS[step - 1];
    const questionKey = step === 1 ? 'occasion' : step === 2 ? 'vibe' : 'budget';
    const currentOption = currentQuestion.options[currentOptionIndex];

    if (direction === 'right') {
      // YES! Select this option
      handleAnswer(questionKey, currentOption.id);
    } else {
      // NO! Next option
      if (currentOptionIndex < currentQuestion.options.length - 1) {
        setCurrentOptionIndex(currentOptionIndex + 1);
      } else {
        // Passed all, loop to 0
        setCurrentOptionIndex(0);
      }
    }
  };

  const copyShareLink = async () => {
    const link = `https://snipes.com/quiz/result?id=${Math.random().toString(36).substring(7)}`;
    try {
      await navigator.clipboard.writeText(link);
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Drag mechanics for mobile Tinder-style cards
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Background color hints while dragging
  const yesBgOpacity = useTransform(x, [0, 100], [0, 0.8]);
  const noBgOpacity = useTransform(x, [0, -100], [0, 0.8]);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleMobileSwipe('right');
    } else if (info.offset.x < -threshold) {
      handleMobileSwipe('left');
    }
    // Reset position if dragged but not past threshold
  };

  return (
    <>
      {/* Homepage CTA Banner */}
      <section className="w-full px-4 py-8 md:py-12 max-w-screen-2xl mx-auto">
        <div className="relative w-full rounded-[24px] overflow-hidden bg-[#111] text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
           <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <Image src="https://i.imgur.com/mZ4rUjj.jpeg" fill className="object-cover" alt="Style background" />
           </div>
           
           <div className="relative z-10 max-w-xl text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">AI Stylist</span>
              <h2 className="text-[32px] md:text-[48px] font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Find Your Signature Style
              </h2>
              <p className="text-white/80 text-[14px] md:text-[16px]">
                Take our 3-question visual quiz and let our AI curate a highly personalised wardrobe edit just for you.
              </p>
           </div>
           
           <div className="relative z-10 w-full md:w-auto">
             <button 
               onClick={handleOpen}
               className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-[13px] rounded-full hover:scale-105 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
             >
               Take The Quiz
             </button>
           </div>
        </div>
      </section>

      {/* Full Screen Quiz Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 absolute top-0 w-full z-50">
               <span className="font-bold text-[18px] tracking-tighter uppercase" style={{ fontFamily: "Arial, sans-serif" }}>SNIPES</span>
               <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                 <span className="material-symbols-outlined">close</span>
               </button>
            </div>

            {/* Quiz Content Container */}
            <div className="flex-1 flex flex-col items-center justify-center pt-20 px-4 w-full max-w-6xl mx-auto relative h-full">
               
               {/* STEP 0: INTRO */}
               {step === 0 && (
                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
                   <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-[32px]">checkroom</span>
                   </div>
                   <h2 className="text-[32px] font-bold mb-4">Let's build your wardrobe.</h2>
                   <p className="text-gray-500 mb-8">We'll show you a few options. Tell us what you like, and we'll curate the perfect edit.</p>
                   <button onClick={startQuiz} className="w-full py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                     Get Started
                   </button>
                 </motion.div>
               )}

               {/* STEPS 1-3: QUESTIONS */}
               {[1, 2, 3].includes(step) && (
                 <div className="w-full h-full flex flex-col items-center max-w-4xl mx-auto pb-10">
                   {/* Progress Bar */}
                   <div className="w-full max-w-xs flex gap-2 mb-8 mt-4">
                     {[1, 2, 3].map(s => (
                       <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-black' : 'bg-gray-200'} transition-colors duration-500`}></div>
                     ))}
                   </div>

                   <h2 className="text-[28px] md:text-[40px] font-bold mb-8 text-center" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                     {QUESTIONS[step-1].title}
                   </h2>

                   {/* DESKTOP: Grid Selection */}
                   <div className="hidden md:grid grid-cols-3 gap-6 w-full">
                     {QUESTIONS[step-1].options.map(option => (
                       <motion.button 
                         key={option.id}
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => handleAnswer(step === 1 ? 'occasion' : step === 2 ? 'vibe' : 'budget', option.id)}
                         className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
                       >
                         <Image src={option.img} fill className="object-cover transition-transform duration-700 group-hover:scale-110" alt={option.label} />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-[24px] font-bold tracking-tight px-4 text-center">{option.label}</span>
                         </div>
                       </motion.button>
                     ))}
                   </div>

                   {/* MOBILE: Tinder-Style Swiping */}
                   <div className="md:hidden w-full h-[60vh] relative flex items-center justify-center">
                     <AnimatePresence>
                       <motion.div
                         key={currentOptionIndex}
                         style={{ x, rotate, opacity }}
                         drag="x"
                         dragConstraints={{ left: 0, right: 0 }}
                         dragElastic={1}
                         onDragEnd={handleDragEnd}
                         initial={{ scale: 0.95, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
                         exit={{ scale: 0.95, opacity: 0 }}
                         transition={{ type: "spring", stiffness: 300, damping: 20 }}
                         className="absolute w-[85%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white touch-none"
                       >
                         <Image src={QUESTIONS[step-1].options[currentOptionIndex].img} fill className="object-cover" alt="Option" priority />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 pointer-events-none"></div>
                         
                         {/* Swiping Feedback Overlays */}
                         <motion.div style={{ opacity: yesBgOpacity }} className="absolute inset-0 bg-green-500/30 pointer-events-none flex items-center justify-center">
                            <div className="border-4 border-green-500 text-green-500 font-bold text-4xl px-6 py-2 rounded-xl rotate-12">YES</div>
                         </motion.div>
                         <motion.div style={{ opacity: noBgOpacity }} className="absolute inset-0 bg-red-500/30 pointer-events-none flex items-center justify-center">
                            <div className="border-4 border-red-500 text-red-500 font-bold text-4xl px-6 py-2 rounded-xl -rotate-12">NO</div>
                         </motion.div>

                         <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
                            <h3 className="text-white text-[32px] font-bold">{QUESTIONS[step-1].options[currentOptionIndex].label}</h3>
                         </div>
                       </motion.div>
                     </AnimatePresence>

                     {/* Swipe Instructions */}
                     <div className="absolute bottom-4 flex justify-between w-[85%] text-gray-400 text-[12px] font-bold uppercase tracking-widest">
                       <span>&larr; Pass</span>
                       <span>Select &rarr;</span>
                     </div>
                   </div>
                 </div>
               )}

               {/* STEP 4: LOADING (AI SIMULATION) */}
               {step === 4 && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center">
                   <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-8"></div>
                   <h2 className="text-[24px] font-bold mb-2">Analyzing your style...</h2>
                   <p className="text-gray-500">Curating the perfect pieces from our collection.</p>
                 </motion.div>
               )}

               {/* STEP 5: RESULTS */}
               {step === 5 && (
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full h-full flex flex-col pt-6 pb-20 overflow-y-auto hide-scrollbar">
                   <div className="text-center mb-10">
                     <span className="inline-block px-3 py-1 bg-gray-100 text-black rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">Your Edit</span>
                     <h2 className="text-[32px] md:text-[48px] font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                       The Perfect Match
                     </h2>
                     <p className="text-gray-500 max-w-md mx-auto mb-6">Based on your selections, we've curated these 6 essential pieces for your wardrobe.</p>
                     
                     <button onClick={copyShareLink} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-full text-[12px] font-bold uppercase tracking-widest transition-colors relative">
                       <span className="material-symbols-outlined text-[16px]">share</span>
                       Share Your Edit
                       {toastMessage && (
                         <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded text-[10px] whitespace-nowrap">
                           {toastMessage}
                         </span>
                       )}
                     </button>
                   </div>

                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto w-full">
                     {MOCK_RESULTS.map((product) => (
                       <ProductCard key={product.id} product={product} />
                     ))}
                   </div>
                 </motion.div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
