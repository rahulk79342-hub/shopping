"use client";
import { motion } from 'framer-motion';

export default function EliteVIP() {
  return (
    <section className="w-full py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden bg-[#0a0a0a]">
      {/* Animated Ambient Background Blobs */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-2xl p-8 md:p-16 lg:p-24 overflow-hidden relative"
        >
          {/* Subtle noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Invitation Only
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter mb-6">
                Join The Elite.
              </h2>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-8 max-w-md">
                Gain unprecedented access to archive releases, limited edition drops, and private VIP events. The culture is exclusive.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['Early access to drops', 'Free premium shipping', 'Exclusive community access'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-5 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors"
              />
              <button className="w-full bg-white text-black font-bold uppercase tracking-wider py-5 rounded-xl hover:bg-gray-200 transition-colors transform active:scale-[0.98]">
                Request Access
              </button>
              <p className="text-white/40 text-xs text-center mt-2">By requesting access, you agree to our terms of service.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
