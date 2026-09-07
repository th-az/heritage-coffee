'use client';

import React, { useState } from 'react';
import SafeImage from '@/components/common/SafeImage';
import { Play, X, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-stone-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amberGold">
            Nghệ Thuật Thủ Công
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-cream-100 mt-2 mb-4">
            Thước Phim Về Nghệ Nhân Rang Cà Phê
          </h2>
          <p className="text-sm sm:text-base text-stone-400">
            Khám phá trọn vẹn hành trình từ những hạt quả chín mọng trên sườn đồi Cầu Đất đến giây phút chiết xuất giọt cà phê sánh đậm.
          </p>
        </div>

        {/* Video Thumbnail Box with Play Action */}
        <div className="relative aspect-video max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <SafeImage
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=85"
            alt="Thước phim nghệ thuật pha chế Heritage Coffee"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/30 transition-colors" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <button
              onClick={() => setIsPlaying(true)}
              aria-label="Phát video giới thiệu"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-coffee/90 hover:bg-coffee text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group-hover:ring-8 group-hover:ring-white/20"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-1" />
            </button>

            <span className="mt-4 font-serif text-sm sm:text-base font-semibold tracking-wider uppercase text-cream-100 drop-shadow">
              Xem Phim Giới Thiệu (02:45)
            </span>
          </div>
        </div>

        {/* Modal Player */}
        {isPlaying && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
            <div className="relative max-w-4xl w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white text-stone-900 transition-colors"
                aria-label="Đóng video"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/aZ8c71p6b6M?autoplay=1&rel=0"
                title="Heritage Coffee - Nghệ thuật rang cà phê mộc thủ công"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}