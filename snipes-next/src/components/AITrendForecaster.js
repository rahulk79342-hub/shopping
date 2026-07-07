"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LuTrendingUp as TrendingUp, LuGlobe as Globe, LuActivity as Activity, LuZap as Zap } from 'react-icons/lu';
import Image from 'next/image';

const trends = [
  {
    id: 1,
    name: "Neo-Utility",
    growth: "+145%",
    region: "Tokyo / Berlin",
    description: "Technical fabrics meeting oversized silhouettes. Lots of tactical hardware.",
    image: "https://images.unsplash.com/photo-1550614000-4b95d4ed798a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Washed Vintage",
    growth: "+89%",
    region: "Los Angeles",
    description: "Sun-faded washes, distressing, and heavy cotton weights.",
    image: "https://images.unsplash.com/photo-1523398002811-999aa8e9dd20?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Gorpcore Revival",
    growth: "+210%",
    region: "London / NYC",
    description: "Outerwear as daily wear. Gore-Tex, nylon, and technical footwear.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  }
];

export default function AITrendForecaster() {
  const [activeTrend, setActiveTrend] = useState(0);

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity size={20} className="text-[#C2B280]" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Aura Analytics</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase mb-4">
            Global Trend <br/><span className="text-stroke hover:text-black transition-colors duration-500 text-shimmer">Forecast</span>
          </h2>
          <p className="text-gray-600 font-[var(--font-family-body-md)] text-lg">
            Real-time data from global fashion capitals, analyzed by Aura to bring you tomorrow&apos;s rotation today.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
        {/* Analytics Panel */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          {trends.map((trend, idx) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setActiveTrend(idx)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                activeTrend === idx 
                  ? 'bg-black text-white border-black scale-[1.02] shadow-xl' 
                  : 'bg-white text-black border-gray-200 hover:border-black/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl uppercase tracking-tight">{trend.name}</h3>
                <div className={`flex items-center gap-1 font-bold ${activeTrend === idx ? 'text-[#C2B280]' : 'text-green-600'}`}>
                  <TrendingUp size={16} />
                  <span>{trend.growth}</span>
                </div>
              </div>
              
              <div className={`flex items-center gap-2 text-xs uppercase tracking-widest mb-3 ${activeTrend === idx ? 'text-gray-400' : 'text-gray-500'}`}>
                <Globe size={14} />
                <span>Surging in: {trend.region}</span>
              </div>
              
              <p className={`text-sm leading-relaxed ${activeTrend === idx ? 'text-gray-300' : 'text-gray-600'}`}>
                {trend.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visualizer Panel */}
        <div className="lg:w-2/3 relative rounded-3xl overflow-hidden bg-gray-100 min-h-[400px] group">
          <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
          
          <motion.div
            key={activeTrend}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={trends[activeTrend].image}
              alt={trends[activeTrend].name}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="absolute top-6 left-6 z-20 glass-ultra-dark px-4 py-2 rounded-full flex items-center gap-2 text-white">
            <Zap size={16} className="text-[#C2B280]" />
            <span className="text-xs font-bold uppercase tracking-widest">Live Feed</span>
          </div>

          <div className="absolute bottom-6 right-6 z-20">
            <button className="glass-ultra text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors flex items-center gap-2">
              Shop The Trend
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
