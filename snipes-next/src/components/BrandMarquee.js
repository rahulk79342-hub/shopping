"use client";
import { motion } from 'framer-motion';

const BRANDS = [
  "NIKE", "JORDAN", "ADIDAS", "NEW BALANCE", 
  "PUMA", "CONVERSE", "VANS", "ASICS", 
  "REEBOK", "TIMBERLAND"
];

// Duplicate the array to ensure seamless infinite scrolling
const MARQUEE_ITEMS = [...BRANDS, ...BRANDS, ...BRANDS];

export default function BrandMarquee() {
  return (
    <div className="w-full bg-black py-6 sm:py-8 overflow-hidden border-y border-white/10 relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex w-[200%] sm:w-[150%] md:w-[100%]">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25 // adjust for speed
          }}
        >
          {MARQUEE_ITEMS.map((brand, index) => (
            <div key={index} className="flex items-center mx-8 sm:mx-12 lg:mx-16">
              <span className="text-white/80 font-black tracking-widest text-xl sm:text-2xl md:text-3xl uppercase hover:text-white transition-colors duration-300 cursor-default">
                {brand}
              </span>
              <span className="text-white/20 ml-8 sm:ml-12 lg:ml-16 text-xl">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
