"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSend as Send, LuX as X, LuSparkles as Sparkles, LuBot as Bot, LuImage as ImageIcon } from 'react-icons/lu';
import Image from 'next/image';

export default function AuraCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hi! I'm Aura, your personal stylist. Looking for something specific or need some inspiration?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI typing and response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          role: 'ai', 
          content: "I'm looking into that for you. Based on current streetwear trends, I think you'd love our new Vault drops.",
          suggestion: true
        }
      ]);
    }, 1500);
  };

  return (
    <>
      {/* Floating Orb Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 rounded-full bg-black text-white shadow-[0_0_20px_rgba(194,178,128,0.3)] flex items-center justify-center border border-white/20 glass-ultra-dark hover:scale-105 transition-transform"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Open Aura AI Stylist"
      >
        <Sparkles size={24} className="text-[#C2B280]" />
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-[#C2B280] opacity-20 animate-ping"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[350px] max-h-[600px] h-[70vh] bg-black/90 backdrop-blur-xl z-[1001] rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-transparent border-b border-white/10 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide flex items-center gap-1">AURA <Sparkles size={12} className="text-[#C2B280]" /></h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">AI Stylist & Concierge</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-transparent hide-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-[#1A1A1A] text-white border border-white/10 rounded-tl-sm'
                  }`}>
                    <p>{msg.content}</p>
                    
                    {msg.suggestion && (
                      <div className="mt-3 p-2 bg-black/50 rounded-lg border border-white/10 flex gap-2 cursor-pointer hover:border-white/30 transition-colors">
                        <div className="w-12 h-12 bg-zinc-800 rounded-md overflow-hidden relative flex-shrink-0">
                          {/* Placeholder for product suggestion image */}
                          <div className="w-full h-full bg-zinc-700 animate-pulse"></div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">The Vault Collection</p>
                          <p className="text-[10px] text-gray-400">View latest exclusive drops</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-transparent border-t border-white/10">
              <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full p-1 border border-white/10 focus-within:border-white/30 transition-colors">
                <button className="p-2 text-gray-400 hover:text-white transition-colors" title="Upload Image for Visual Search">
                  <ImageIcon size={18} />
                </button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Aura..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none px-2"
                />
                <button 
                  onClick={handleSend}
                  className={`p-2 rounded-full transition-colors ${input.trim() ? 'bg-white text-black' : 'bg-zinc-800 text-gray-500'}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
