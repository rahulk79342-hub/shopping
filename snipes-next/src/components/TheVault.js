"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

const VAULT_ITEMS = [
  {
    id: 1,
    name: 'Apex Predator High',
    price: '$850',
    edition: 'Limited Edition 1/500',
    image: '/images/vault_sneaker_1.png',
  },
  {
    id: 2,
    name: 'Glacier Low',
    price: '$650',
    edition: 'Friends & Family',
    image: '/images/vault_sneaker_2.png',
  },
  {
    id: 3,
    name: 'Tech-Wear Utility 01',
    price: '$920',
    edition: 'Archive Collection',
    image: '/images/vault_sneaker_3.png',
  }
];

// 3D Tilt Card Component
function TiltCard({ item }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative group">
      {/* Glowing Pulsing Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C2B280] via-transparent to-[#d4af37] rounded-[20px] opacity-0 group-hover:opacity-100 blur-[8px] group-hover:animate-[pulse_2s_ease-in-out_infinite] transition-opacity duration-500 z-0"></div>
      
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/20 overflow-hidden group shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Glare Effect */}
        <motion.div 
          className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.4) 0%, transparent 60%)`
            )
          }}
        />
        
        {/* Sneaker Image (Pops out slightly due to translateZ) */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          style={{ transform: "translateZ(60px)" }}
        >
          <div className="relative w-full h-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            <Image 
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Content overlay */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end"
          style={{ transform: "translateZ(30px)" }}
        >
          <span className="text-[#C2B280] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 drop-shadow-md">{item.edition}</span>
          <h3 className="text-white text-xl font-black uppercase tracking-tight">{item.name}</h3>
          <div className="flex justify-between items-center mt-4">
            <span className="text-white/90 font-mono font-bold">{item.price}</span>
            <button className="text-xs bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 font-bold uppercase hover:bg-white hover:text-black transition-all">
              View Details
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function TheVault() {
  return (
    <section className="w-full bg-[#050505] py-24 lg:py-32 overflow-hidden relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/40 tracking-[0.3em] text-xs font-bold uppercase mb-4 block">Archive Collection</span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
              The Vault.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/collections/vault" className="text-white/70 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-1 text-sm tracking-wider uppercase">
              Enter The Vault
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {VAULT_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <TiltCard item={item} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
