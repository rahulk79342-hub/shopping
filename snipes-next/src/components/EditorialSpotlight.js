"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function EditorialSpotlight() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kinetic typography moving in opposite directions
  const textX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);
  
  // Parallax for the main image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#f4f4f4] text-black overflow-hidden relative py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side: Content & Small Image */}
        <div className="w-full md:w-5/12 flex flex-col gap-8 md:pl-12 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-black/50 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Editorial Feature</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tighter mb-6 uppercase">
              Streetwear<br/>Refined.
            </h2>
            <p className="text-black/70 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
              Discover the intersection of high-fashion and urban utility. Our latest collection bridges the gap between performance architecture and runway aesthetics.
            </p>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold uppercase tracking-wider text-sm overflow-hidden">
              <span className="relative z-10 transition-colors group-hover:text-black">Read The Editorial</span>
              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out z-0"></div>
            </button>
          </motion.div>
        </div>

        {/* Right Side: Massive Parallax Image */}
        <div className="w-full md:w-6/12 relative order-1 md:order-2">
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
            <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image 
                src="/images/editorial_spotlight.png"
                alt="Editorial Fashion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          
          {/* Floating Element over Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 shadow-2xl max-w-[200px]"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-2">Issue 04</p>
            <p className="text-sm font-medium leading-tight">The new silhouette shaping modern culture.</p>
          </motion.div>
        </div>

      </div>

      {/* Background Kinetic Typography */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-center opacity-[0.03] overflow-hidden z-0 font-black text-[15vw] leading-none whitespace-nowrap uppercase select-none">
        <motion.div style={{ x: textX1 }} className="flex">
          <span className="pr-8">Modern Culture Modern Culture Modern Culture</span>
        </motion.div>
        <motion.div style={{ x: textX2 }} className="flex -ml-[20vw]">
          <span className="pr-8 text-transparent" style={{ WebkitTextStroke: '2px black' }}>Elevated Style Elevated Style Elevated Style</span>
        </motion.div>
      </div>
    </section>
  );
}
