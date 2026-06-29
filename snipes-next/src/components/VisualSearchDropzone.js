"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuUpload as Upload, LuX as X, LuSearch as Search, LuSparkles as Sparkles } from 'react-icons/lu';
import Image from 'next/image';

export default function VisualSearchDropzone() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsHovered(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsHovered(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Read the file as a data URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      startSearch();
    };
    reader.readAsDataURL(file);
  };

  const startSearch = () => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSearching(false);
      // In a real app, this would route to a search results page or open a modal
    }, 2500);
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setIsSearching(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-[#C2B280]" />
        <h3 className="font-bold text-sm tracking-widest uppercase">Visual Search</h3>
      </div>
      
      <div 
        className={`relative w-full h-32 rounded-xl border-2 border-dashed transition-colors duration-300 flex items-center justify-center overflow-hidden ${
          isHovered ? 'border-black bg-gray-50' : 'border-gray-300 bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedImage && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />

        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div 
              key="upload-prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-gray-500 cursor-pointer"
            >
              <Upload size={24} className="mb-2" />
              <p className="text-sm font-medium">Drop an image to find similar items</p>
              <p className="text-xs text-gray-400 mt-1">or click to browse</p>
            </motion.div>
          ) : (
            <motion.div 
              key="image-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={selectedImage} 
                alt="Search query" 
                fill 
                className="object-cover opacity-50"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40">
                {isSearching ? (
                  <>
                    <div className="w-10 h-10 border-4 border-white border-t-[#C2B280] rounded-full animate-spin mb-2"></div>
                    <p className="text-white text-sm font-medium flex items-center gap-2">
                      <Search size={14} /> Aura is scanning...
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white text-sm font-medium mb-2 flex items-center gap-2">
                      <Sparkles size={14} className="text-[#C2B280]" /> 4 Similar items found
                    </p>
                    <button 
                      className="text-xs bg-white text-black px-4 py-1.5 rounded-full uppercase tracking-wider font-bold hover:bg-[#C2B280] hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); /* Logic to view results */ }}
                    >
                      View Results
                    </button>
                  </>
                )}
              </div>
              
              {!isSearching && (
                <button 
                  onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black transition-colors z-20"
                >
                  <X size={16} />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
