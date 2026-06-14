"use client";
import React from 'react';
import { motion } from 'framer-motion';

const PUBLICATIONS = [
  { name: "VOGUE", style: { fontFamily: "Georgia, serif", letterSpacing: "0.1em", fontWeight: "400" } },
  { name: "ELLE", style: { fontFamily: "Arial, sans-serif", letterSpacing: "-0.05em", fontWeight: "900" } },
  { name: "GQ", style: { fontFamily: "Arial, sans-serif", letterSpacing: "0em", fontWeight: "900" } },
  { name: "Esquire", style: { fontFamily: "Georgia, serif", fontStyle: "italic", letterSpacing: "0.05em", fontWeight: "400" } },
  { name: "Harper's BAZAAR", style: { fontFamily: "Georgia, serif", letterSpacing: "0.2em", fontWeight: "400" } },
  { name: "HYPEBEAST", style: { fontFamily: "Arial, sans-serif", letterSpacing: "0em", fontWeight: "800", fontStyle: "italic" } },
];

export default function PressMentions() {
  // Duplicate array to ensure smooth infinite scrolling
  const duplicatedPublications = [...PUBLICATIONS, ...PUBLICATIONS, ...PUBLICATIONS];

  return (
    <section className="w-full py-12 md:py-16 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 mb-10 flex flex-col items-center text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-4">As Featured In</span>
        <h3 className="text-[20px] md:text-[28px] text-black max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          "The brand redefining everyday basics with an uncompromising approach to premium menswear."
        </h3>
        <span className="text-[12px] font-bold uppercase tracking-widest text-black mt-4">— Vogue India</span>
      </div>

      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden group">
         {/* Gradient masks for smooth fade in/out at edges */}
         <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
         <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
         
         <motion.div
           className="flex gap-16 md:gap-32 items-center whitespace-nowrap py-4"
           animate={{
             x: ["0%", "-33.33%"],
           }}
           transition={{
             ease: "linear",
             duration: 20,
             repeat: Infinity,
           }}
         >
           {duplicatedPublications.map((pub, i) => (
             <div 
               key={i} 
               className="text-[24px] md:text-[32px] text-gray-300 opacity-60 hover:opacity-100 hover:text-black transition-all duration-300 cursor-default select-none"
               style={pub.style}
             >
               {pub.name}
             </div>
           ))}
         </motion.div>
      </div>
    </section>
  );
}
