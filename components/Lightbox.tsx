"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
        if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm p-4 md:p-10"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[2001]"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          {/* Navigation - Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-[2001] p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Main Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            
            {/* Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/60 font-body text-sm tracking-widest uppercase">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>

          {/* Navigation - Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-[2001] p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Next image"
          >
            <ChevronRight size={40} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
