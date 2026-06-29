"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LuSparkles as Sparkles, LuArrowRight as ArrowRight, LuBot as Bot } from 'react-icons/lu';
import Link from 'next/link';

// Mock data for the AI feed
const curatedItems = [
  {
    id: 1,
    title: "Essential Oversized Hoodie",
    category: "Streetwear Staple",
    price: "$89",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop", // placeholder
    colSpan: "col-span-12 md:col-span-8",
    rowSpan: "row-span-2",
    reason: "Because you viewed neutral tones."
  },
  {
    id: 2,
    title: "Cargo Parachute Pants",
    category: "Trending Now",
    price: "$110",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop", // placeholder
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    reason: "High demand in Berlin."
  },
  {
    id: 3,
    title: "Aura's Pick: Chunky Sneakers",
    category: "Perfect Match",
    price: "$145",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop", // placeholder
    colSpan: "col-span-12 md:col-span-4",
    rowSpan: "row-span-1",
    reason: "Completes the look."
  }
];

export default function AIPersonalizedFeed() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative bg-[var(--color-background)]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[var(--color-secondary)]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-end mb-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-[var(--color-secondary)]" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Curated by Aura</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase mb-4 text-stroke hover:text-black transition-colors duration-500">
            Your Personal <br/>Drop Zone
          </h2>
          <p className="text-gray-600 font-[var(--font-family-body-md)] text-lg">
            Based on your unique style DNA, Aura has compiled a hyper-personalized selection of pieces that belong in your rotation.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-0"
        >
          <Link href="/discover" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[var(--color-secondary)] transition-colors">
            Refine Profile
            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center group-hover:border-[var(--color-secondary)] transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-[250px] relative z-10">
        {curatedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`${item.colSpan} ${item.rowSpan} group relative rounded-2xl overflow-hidden bg-gray-100 cursor-none hover-expand block`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 duration-500" />
            
            <Image 
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Glassmorphic Info Panel */}
            <div className="absolute bottom-4 left-4 right-4 p-4 md:p-6 rounded-xl glass-ultra-dark text-white z-20 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#C2B280] mb-1 font-bold">{item.category}</p>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-300">
                    <Bot size={12} />
                    <span>{item.reason}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">{item.price}</p>
                  <button className="mt-2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#C2B280] transition-colors">
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
