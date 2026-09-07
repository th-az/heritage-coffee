'use client';

import React from 'react';
import { GalleryItem } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { ZoomIn } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
  onOpenLightbox: (index: number) => void;
}

export default function GallerySection({ items, onOpenLightbox }: GallerySectionProps) {
  return (
    <section id="khong-gian" className="py-20 sm:py-28 bg-cream-100 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
            Bộ Sưu Tập Hình Ảnh
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-4">
            Không Gian &amp; Nghệ Thuật
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Từng góc nhỏ tại Heritage được bài trí với sự tinh tế của ánh sáng, sắc gỗ và mùi hương cà phê rang mộc vấn vương.
          </p>
        </div>

        {/* Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            // Give some items taller aspect ratios for true masonry rhythm
            const isSpan = index === 0 || index === 5;
            return (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(index)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-luxury hover:shadow-luxury-hover border border-stone-200/60 dark:border-stone-800 ${
                  isSpan ? 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto sm:min-h-[420px]' : 'aspect-square'
                }`}
              >
                <SafeImage
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amberGold">
                    {item.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold mt-1">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-stone-300">
                    <ZoomIn className="w-4 h-4 text-amberGold" />
                    <span>Nhấn để xem phóng to</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}