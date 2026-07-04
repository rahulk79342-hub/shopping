"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdOutlineChatBubbleOutline, MdOutlineShoppingBag, MdOutlinePlayArrow, MdOutlinePause, MdOutlineVolumeUp, MdOutlineVolumeOff, MdOutlineVisibility } from 'react-icons/md';

const streamProducts = [
  {
    id: 'p1',
    name: 'Tech-Fleece Zip Hoodie',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&auto=format&fit=crop',
    timeAppears: 2,
  },
  {
    id: 'p2',
    name: 'Cargo Parachute Pants',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop',
    timeAppears: 8,
  },
  {
    id: 'p3',
    name: 'Oversized Graphic Tee',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format&fit=crop',
    timeAppears: 15,
  }
];

const mockChat = [
  { user: 'alex_style', text: 'That hoodie is fire 🔥' },
  { user: 'hype_beast99', text: 'Need those pants rn' },
  { user: 'sarah.k', text: 'What size is the model wearing?' },
  { user: 'jordan_nyc', text: 'Insta cop 🛒' },
  { user: 'miami_drip', text: 'Quality looks insane' },
];

export default function ShoppableLiveStream() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeProduct, setActiveProduct] = useState(streamProducts[0]);
  const [chatMessages, setChatMessages] = useState([]);
  const [likes, setLikes] = useState(1243);
  const [isLiked, setIsLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [viewers, setViewers] = useState(3402);

  // Simulate viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live chat
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setChatMessages(prev => {
        const nextMsg = mockChat[index % mockChat.length];
        return [...prev, nextMsg].slice(-4);
      });
      index++;
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Cycle through products to simulate them appearing in the video
  useEffect(() => {
    let cycle = 0;
    const interval = setInterval(() => {
      cycle = (cycle + 1) % streamProducts.length;
      setActiveProduct(streamProducts[cycle]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleLike = () => {
    setIsLiked(true);
    setLikes(prev => prev + 1);
    const id = Date.now();
    setFloatingHearts(prev => [...prev, id]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heartId => heartId !== id));
    }, 2000);
  };

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <span className="text-sm font-bold uppercase tracking-widest text-red-500">Live Commerce</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter uppercase mb-4 text-white">
              Snipes <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Studio Live</span>
            </h2>
            <p className="text-gray-400 font-[var(--font-family-body-md)] text-lg">
              Shop the latest drops in real-time. Exclusive pieces, live styling, and instant checkout.
            </p>
          </div>
        </div>

        {/* Live Stream Container */}
        <div className="relative w-full aspect-[9/16] md:aspect-[21/9] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
          
          {/* Video element */}
          <video 
            src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-modeling-in-a-studio-5143-large.mp4"
            autoPlay={isPlaying}
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2000&auto=format&fit=crop"
          />

          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Top Bar: Live Badge & Viewers */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-sm flex items-center gap-2">
                LIVE
              </div>
              <div className="bg-black/40 backdrop-blur-md text-white font-bold text-xs px-3 py-1.5 rounded-sm flex items-center gap-2">
                <MdOutlineVisibility className="text-[14px]" />
                {viewers.toLocaleString()}
              </div>
            </div>
            
            <div className="flex gap-2 pointer-events-auto">
              <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                {isMuted ? <MdOutlineVolumeOff size={20} /> : <MdOutlineVolumeUp size={20} />}
              </button>
            </div>
          </div>

          {/* Featured Product Overlay (Desktop Side / Mobile Bottom) */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="absolute bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 right-4 md:right-8 bg-black/50 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-[calc(100%-2rem)] md:w-80 z-20"
            >
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={activeProduct.image} alt={activeProduct.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold mb-1">Featured Now</span>
                  <h4 className="text-sm font-bold text-white mb-1 line-clamp-1">{activeProduct.name}</h4>
                  <p className="text-[#C2B280] font-bold mb-3">{activeProduct.price}</p>
                  <button className="bg-white text-black text-xs font-bold uppercase tracking-widest py-2 px-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
                    <MdOutlineShoppingBag size={14} />
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Live Chat Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:w-1/3 flex justify-between items-end z-20 pointer-events-none">
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <AnimatePresence>
                {chatMessages.filter(Boolean).map((msg, i) => (
                  <motion.div 
                    key={i + msg.user}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-black/30 backdrop-blur-md rounded-xl p-3 border border-white/5 pointer-events-auto"
                  >
                    <span className="text-gray-400 text-xs font-bold mr-2">{msg.user}</span>
                    <span className="text-white text-sm">{msg.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col items-center gap-4 pointer-events-auto shrink-0 md:hidden ml-4">
              <div className="relative">
                <button onClick={handleLike} className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
                  {isLiked ? <MdOutlineFavorite className="text-red-500" size={24} /> : <MdOutlineFavoriteBorder size={24} />}
                </button>
                <span className="text-[10px] font-bold absolute -bottom-5 left-1/2 -translate-x-1/2 drop-shadow-md">{likes}</span>
                
                {/* Floating Hearts Animation */}
                <AnimatePresence>
                  {floatingHearts.map(id => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 1, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -100, scale: 1.5, x: (Math.random() - 0.5) * 40 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none text-red-500"
                    >
                      <MdOutlineFavorite size={24} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Desktop Like Button */}
          <div className="hidden md:flex absolute bottom-8 right-8 z-30 pointer-events-auto items-center gap-4">
             <div className="relative">
                <button onClick={handleLike} className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/20">
                  {isLiked ? <MdOutlineFavorite className="text-red-500" size={28} /> : <MdOutlineFavoriteBorder size={28} />}
                </button>
                <span className="text-xs font-bold absolute -bottom-6 left-1/2 -translate-x-1/2 drop-shadow-md">{likes}</span>
                
                <AnimatePresence>
                  {floatingHearts.map(id => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 1, y: 0, scale: 0.5 }}
                      animate={{ opacity: 0, y: -120, scale: 1.5, x: (Math.random() - 0.5) * 50 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none text-red-500"
                    >
                      <MdOutlineFavorite size={28} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
