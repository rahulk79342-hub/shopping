"use client";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const HOTSPOTS = [
  { id: 1, top: '40%', left: '30%', title: 'Premium Leather Upper', desc: 'Full-grain Italian leather selected for maximum durability and a butter-soft feel.' },
  { id: 2, top: '60%', left: '70%', title: 'Air-Cushioned Sole', desc: 'State-of-the-art shock absorption technology designed to provide all-day comfort.' },
  { id: 3, top: '45%', left: '55%', title: 'Meticulous Stitching', desc: 'Hand-finished double stitching ensures structural integrity and a bespoke aesthetic.' },
];

export default function Craftsmanship() {
  const containerRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apple-style scroll animations: Scale the image up, then move it around to focus on parts
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9, 1], [1, 2.2, 2.2, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9, 1], ["0%", "25%", "-25%", "0%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9, 1], ["0%", "15%", "15%", "0%", "0%"]);

  // Opacity for the three textual narrative stages
  const opacityStage1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
  const opacityStage2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.6], [0, 1, 1, 0]);
  const opacityStage3 = useTransform(scrollYProgress, [0.65, 0.75, 0.85, 1], [0, 1, 1, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
        
        {/* Background Sneaker Image */}
        <motion.div 
          style={{ scale, x, y }}
          className="absolute inset-0 w-full h-full origin-center flex items-center justify-center"
        >
          <div className="relative w-full max-w-6xl aspect-video md:aspect-auto md:h-[80vh]">
            <Image 
              src="/images/premium_sneaker_hotspot.png"
              alt="Premium Sneaker Details"
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
            
            {/* Interactive Hotspots (Only fully visible at the end of the scroll narrative) */}
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}
              className="absolute inset-0 z-50 pointer-events-none"
            >
              {HOTSPOTS.map((spot) => (
                <div 
                  key={spot.id} 
                  className="absolute pointer-events-auto"
                  style={{ top: spot.top, left: spot.left }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative group cursor-pointer flex items-center justify-center">
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    {/* Core button */}
                    <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                      <FiPlus className={`text-white text-lg transition-transform duration-300 ${activeHotspot === spot.id ? 'rotate-45' : ''}`} />
                    </div>
                    
                    {/* Glassmorphic Tooltip */}
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-full mb-4 md:mb-6 left-1/2 -translate-x-1/2 w-64 p-5 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-50"
                        >
                          <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-widest">{spot.title}</h4>
                          <p className="text-white/70 text-xs md:text-sm leading-relaxed">{spot.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>

        {/* Narrative Overlays */}
        <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-center px-6 sm:px-12 md:px-24">
          
          <motion.div style={{ opacity: opacityStage1 }} className="absolute max-w-xl left-6 sm:left-12 md:left-24">
            <span className="text-white/50 tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block">01 / The Materials</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
              Flawless<br/>Foundation.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacityStage2 }} className="absolute right-6 sm:right-12 md:right-24 max-w-xl text-right">
            <span className="text-white/50 tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block">02 / The Construction</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
              Precision<br/>Engineering.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: opacityStage3 }} className="absolute max-w-xl bottom-12 md:bottom-24 left-6 sm:left-12 md:left-24">
            <span className="text-white/50 tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block">03 / The Legacy</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              The Art of<br/>Sneaker Culture.
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
              Explore the interactive points on the silhouette above to discover the details that define greatness.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
