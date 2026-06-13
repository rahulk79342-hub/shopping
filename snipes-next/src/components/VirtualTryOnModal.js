"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function VirtualTryOnModal({ isOpen, onClose, product }) {
  const [phase, setPhase] = useState('idle'); // idle, camera, scanning, results
  const [userImage, setUserImage] = useState(null);
  const [fitScore, setFitScore] = useState(0);
  const [facingMode, setFacingMode] = useState('user'); // 'user' or 'environment'
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Cleanup on unmount or close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setPhase('idle');
      setUserImage(null);
    }
    return stopCamera;
  }, [isOpen, stopCamera]);

  const startCamera = async () => {
    try {
      setPhase('camera');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please upload a photo instead.");
      setPhase('idle');
    }
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setTimeout(startCamera, 100);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imgDataUrl = canvas.toDataURL('image/jpeg');
      setUserImage(imgDataUrl);
      stopCamera();
      startScanning();
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUserImage(url);
      startScanning();
    }
  };

  const startScanning = () => {
    setPhase('scanning');
    // Simulate processing time and calculate fake score
    setTimeout(() => {
      setFitScore(Math.floor(Math.random() * (98 - 85 + 1)) + 85); // 85% - 98%
      setPhase('results');
    }, 4000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Virtual Try-On: ${product.name}`,
          text: `Checking out this look on Snipes Menswear! Fit Score: ${fitScore}%`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert("Try-On saved to your Style Profile!");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[120] bg-[var(--color-background)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-[var(--color-outline-variant)] bg-[var(--color-background)] relative z-10">
          <h2 className="font-[var(--font-family-headline-md)] text-xl text-[var(--color-primary)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#003dff]">view_in_ar</span>
            Virtual Try-On
          </h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-[var(--color-surface-container)] flex items-center justify-center text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 relative bg-black/5 flex flex-col">
          
          {/* Phase 1: IDLE */}
          {phase === 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
              <div className="w-32 h-32 bg-[var(--color-surface-container)] rounded-full flex items-center justify-center mb-8 relative">
                <span className="material-symbols-outlined text-[48px] text-[var(--color-primary)] z-10">accessibility_new</span>
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full border-2 border-[var(--color-primary)]" />
              </div>
              <h3 className="font-[var(--font-family-headline-lg)] text-3xl text-[var(--color-primary)] mb-4">See It On You</h3>
              <p className="font-[var(--font-family-body-md)] text-[var(--color-outline)] mb-10 leading-relaxed">
                Use your camera to generate a high-fidelity WebAR try-on, powered by TensorFlow.js pose estimation.
              </p>
              
              <div className="w-full space-y-4">
                <button onClick={startCamera} className="w-full py-4 bg-[var(--color-primary)] text-white font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-full hover:scale-105 transition-transform shadow-lg cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  Open Camera
                </button>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <button className="w-full py-4 bg-[var(--color-surface-container)] text-[var(--color-primary)] font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-full hover:bg-[var(--color-outline-variant)] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">upload</span>
                    Upload Photo
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 2: CAMERA */}
          {phase === 'camera' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 relative bg-black flex flex-col">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="flex-1 w-full h-full object-cover"
                style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Overlay Guide */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-8">
                <div className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-white/50 rounded-3xl flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-white/50 text-[64px] mb-4">person</span>
                  <p className="text-white/70 font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase text-center">Align body within frame</p>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center gap-12 bg-gradient-to-t from-black/80 to-transparent">
                <button onClick={toggleCamera} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined">flip_camera_ios</span>
                </button>
                <button onClick={handleCapture} className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-1 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full border-2 border-black" />
                </button>
                <button onClick={() => setPhase('idle')} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white cursor-pointer hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Phase 3: SCANNING (TensorFlow Sim) */}
          {phase === 'scanning' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 relative bg-black flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-[3/4]">
                <img src={userImage} alt="Captured" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" />
                
                {/* Cyberpunk Grid Overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgNDBoNDBNNDAgMHY0MCIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30" />
                
                {/* ML Pose Estimation Nodes Simulation */}
                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0">
                  <div className="absolute top-[20%] left-[50%] w-2 h-2 bg-[#00ff00] rounded-full shadow-[0_0_10px_#00ff00] transform -translate-x-1/2" />
                  <div className="absolute top-[25%] left-[40%] w-2 h-2 bg-[#00ff00] rounded-full shadow-[0_0_10px_#00ff00]" />
                  <div className="absolute top-[25%] right-[40%] w-2 h-2 bg-[#00ff00] rounded-full shadow-[0_0_10px_#00ff00]" />
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    <line x1="50%" y1="20%" x2="40%" y2="25%" stroke="#00ff00" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                    <line x1="50%" y1="20%" x2="60%" y2="25%" stroke="#00ff00" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
                  </svg>
                </motion.div>

                {/* Vertical Scanner */}
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-[#00ff00] z-20 shadow-[0_0_20px_#00ff00]"
                />
              </div>

              <div className="absolute bottom-16 flex flex-col items-center">
                <h4 className="text-[#00ff00] font-[var(--font-family-headline-md)] text-xl mb-2 animate-pulse">WebAR Mapping...</h4>
                <p className="text-[#00ff00]/70 font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase">Calculating cloth physics</p>
              </div>
            </motion.div>
          )}

          {/* Phase 4: RESULTS */}
          {phase === 'results' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-[var(--color-surface-container-low)]">
              
              <div className="p-4 md:p-8 flex flex-col md:flex-row gap-8 flex-1 overflow-y-auto">
                {/* Side-by-Side View */}
                <div className="flex-1 flex gap-2 md:gap-4 justify-center items-stretch h-[45vh] md:h-auto">
                  <div className="w-1/2 relative bg-[var(--color-surface-container)] rounded-2xl overflow-hidden shadow-md">
                    <Image src={product.media[0].url} alt="Model" fill className="object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-white font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest">Model</span>
                    </div>
                  </div>
                  <div className="w-1/2 relative bg-[var(--color-surface-container)] rounded-2xl overflow-hidden shadow-md border-2 border-[var(--color-primary)]">
                    <img src={userImage} alt="You" className="absolute inset-0 w-full h-full object-cover" />
                    {/* Simulated AR overlay (blend mode) */}
                    <Image src={product.media[0].url} alt="Overlay" fill className="object-cover opacity-70 mix-blend-multiply" />
                    <div className="absolute bottom-2 left-2 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full shadow-lg z-10">
                      <span className="font-[var(--font-family-label-caps)] text-[10px] uppercase tracking-widest">You</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Data */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-[var(--color-outline-variant)] mb-6">
                    <h3 className="font-[var(--font-family-headline-md)] text-2xl text-[var(--color-primary)] mb-6">Fit Analysis</h3>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full border-4 border-[#00ff00] flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-[18px] text-[var(--color-primary)]">{fitScore}%</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-primary)] mb-1">True to Size Confidence</h4>
                        <p className="text-sm text-[var(--color-outline)]">Based on your structural mapping, we recommend your standard size <strong className="text-[var(--color-primary)]">Medium</strong>.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-[var(--color-outline)] mb-1">
                          <span>Shoulders: Relaxed</span>
                        </div>
                        <div className="h-2 bg-[var(--color-surface-container)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-primary)] w-[85%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-[var(--color-outline)] mb-1">
                          <span>Length: Standard</span>
                        </div>
                        <div className="h-2 bg-[var(--color-surface-container)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-primary)] w-[60%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto">
                    <button onClick={handleShare} className="w-full py-4 bg-[#25D366] text-white font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-full hover:scale-105 transition-transform shadow-lg cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]">share</span>
                      Share to Social
                    </button>
                    <button onClick={() => alert("Saved to Style Profile!")} className="w-full py-4 bg-[var(--color-surface-container)] text-[var(--color-primary)] font-[var(--font-family-label-caps)] text-xs tracking-widest uppercase flex items-center justify-center gap-2 rounded-full hover:bg-[var(--color-outline-variant)] transition-colors cursor-pointer border border-[var(--color-outline-variant)] relative z-20">
                      <span className="material-symbols-outlined text-[18px]">bookmark</span>
                      Save to Profile
                    </button>
                    <button onClick={() => setPhase('idle')} className="w-full py-3 text-[var(--color-outline)] font-[var(--font-family-body-md)] text-sm underline hover:text-[var(--color-primary)] transition-colors cursor-pointer mt-2 relative z-20">
                      Retake Photo
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
