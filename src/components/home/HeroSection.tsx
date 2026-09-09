'use client';

import React from 'react';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import SafeImage from '@/components/common/SafeImage';

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export default function HeroSection({ onExploreMenu }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900 pt-20 pb-16">
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=85"
          alt="Heritage Luxury Coffee Ambiance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coffee-dark/80 border border-amber-900/40 text-cream-100 text-xs tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amberGold" />
          <span>Heritage Coffee &amp; Artisan Roastery</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-cream-100 tracking-tight leading-[1.15] mb-6">
          Thưởng Thức Cà Phê
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amberGold via-amber-200 to-amberGold mt-1">
            Đậm Đà Hương Vị
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-10">
          Một không gian phi thương mại để cùng tìm hiểu hạt cà phê Việt Nam, phương pháp pha chế và những câu chuyện phía sau mỗi hương vị.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-coffee hover:bg-coffee-light text-white font-semibold text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Xem thực đơn</span>
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-white/10 max-w-2xl w-full text-cream-100">
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">100%</span>
            <p className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Hạt Mộc Nguyên Chất</p>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">24H</span>
            <p className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Cold Brew Ngâm Chậm</p>
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">5.0★</span>
            <p className="text-[11px] sm:text-xs text-stone-400 mt-1 uppercase tracking-wider">Trải Nghiệm Đẳng Cấp</p>
          </div>
        </div>
      </div>

      <a
        href="#ly-do"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-stone-400 hover:text-white transition-colors animate-bounce p-2"
        aria-label="Cuộn xuống"
      >
        <ArrowDown className="w-5 h-5" />
      </a>
    </section>
  );
}