"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuSparkles as Sparkles, LuThumbsUp as ThumbsUp, LuRuler as Ruler, LuDroplets as Droplets } from 'react-icons/lu';

export default function AIReviewSummary({ productName }) {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGenerating(false);
    }, 2000); // Simulate AI thinking
    return () => clearTimeout(timer);
  }, [productName]);

  return (
    <div className="bg-gray-50 rounded-2xl p-6 my-8 border border-gray-100 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C2B280]/20 to-transparent blur-2xl" />

      <div className="flex items-center gap-2 mb-4">
        <div className="bg-black p-1.5 rounded-full">
          <Sparkles size={16} className="text-[#C2B280]" />
        </div>
        <h3 className="font-bold text-sm tracking-widest uppercase">Aura AI Summary</h3>
      </div>

      {isGenerating ? (
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
          <p className="text-xs text-gray-400 mt-4 animate-pulse">Aura is reading 142 reviews...</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-700 leading-relaxed text-sm md:text-base font-[var(--font-family-body-md)]">
            Based on <span className="font-bold text-black">142 reviews</span>, customers highly recommend this item for its premium feel and durability. The material is consistently praised as high-quality. However, multiple buyers suggest <span className="font-bold text-black">sizing down</span> if you prefer a more fitted look, as it runs intentionally oversized.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 p-2 rounded-full">
                <ThumbsUp size={16} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Quality</p>
                <p className="text-xs text-gray-500">Exceptional rating</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <Ruler size={16} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Fit</p>
                <p className="text-xs text-gray-500">Runs Oversized</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                <Droplets size={16} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider">Material</p>
                <p className="text-xs text-gray-500">Heavyweight Cotton</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
