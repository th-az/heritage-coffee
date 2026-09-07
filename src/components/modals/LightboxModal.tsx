'use client';

import React, { useState } from 'react';
import { GalleryItem } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface LightboxModalProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function LightboxModal({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Top bar controls */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white z-20">
        <div className="text-xs">
          <span className="font-semibold">{currentItem.title}</span>
          <span className="text-white/60 ml-2">({currentIndex + 1} / {items.length})</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Phóng to / thu nhỏ"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20 transition-colors"
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white z-20 transition-colors"
        aria-label="Ảnh kế tiếp"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Image View */}
      <div
        className={`relative w-full max-w-5xl h-[80vh] flex items-center justify-center p-4 transition-transform duration-300 ${
          isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <SafeImage
          src={currentItem.image}
          alt={currentItem.alt}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}