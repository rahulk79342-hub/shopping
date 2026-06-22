"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TheCulture() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const words = "More Than Shoes. It's Culture.".split(" ");

  return (
    <section 
      ref={containerRef}
      className="w-full bg-black text-white py-32 md:py-48 flex items-center justify-center overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.9] flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2">
          {words.map((word, i) => {
            // Calculate start and end points for this word's opacity animation
            const start = i * 0.15;
            const end = start + 0.2;
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(scrollYProgress, [start, end], [50, 0]);

            return (
              <motion.span 
                key={i} 
                style={{ opacity, y }}
                className={word === "Culture." ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600" : ""}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}
