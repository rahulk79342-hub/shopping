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
        className="fixed bottom-6 right-6 z-[1000] w-14 h-14 rounded-full bg-black text-white shadow-2xl flex items-center justify-center border border-white/10 glass-ultra-dark hover:scale-105 transition-transform"
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
            className="fixed bottom-24 right-6 w-[350px] max-h-[600px] h-[70vh] bg-white z-[1001] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C2B280] flex items-center justify-center">
                  <Bot size={18} className="text-black" />
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
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-50 hide-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-sm' 
                      : 'bg-white text-black border border-gray-100 rounded-tl-sm'
                  }`}>
                    <p>{msg.content}</p>
                    
                    {msg.suggestion && (
                      <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-100 flex gap-2 cursor-pointer hover:border-black transition-colors">
                        <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                          {/* Placeholder for product suggestion image */}
                          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                        </div>
                        <div>
                          <p className="text-xs font-bold">The Vault Collection</p>
                          <p className="text-[10px] text-gray-500">View latest exclusive drops</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 border border-gray-200 focus-within:border-black transition-colors">
                <button className="p-2 text-gray-400 hover:text-black transition-colors" title="Upload Image for Visual Search">
                  <ImageIcon size={18} />
                </button>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Aura..."
                  className="flex-1 bg-transparent text-sm outline-none px-2"
                />
                <button 
                  onClick={handleSend}
                  className={`p-2 rounded-full transition-colors ${input.trim() ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'}`}
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
