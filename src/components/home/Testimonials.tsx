'use client';

import React, { useState } from 'react';
import { CustomerReview } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsProps {
  reviews: CustomerReview[];
}

export default function Testimonials({ reviews }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const review = reviews[currentIndex];

  return (
    <section id="danh-gia" className="py-20 sm:py-28 bg-cream-50 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
            Cảm Nhận Khách Hàng
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-4">
            Những Tách Cà Phê Kết Nối
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Hơn 150.000 thực khách đã trao gửi niềm tin và tình yêu cho chất lượng mộc nguyên bản của Heritage Coffee.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-4xl mx-auto relative bg-white dark:bg-stone-800 rounded-3xl p-8 sm:p-14 shadow-luxury border border-stone-200/80 dark:border-stone-700/60">
          <Quote className="w-16 h-16 text-coffee/15 absolute top-6 right-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-coffee/20 shadow-lg">
              <SafeImage
                src={review.avatar}
                alt={review.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              {/* Stars */}
              <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif text-base sm:text-xl text-stone-800 dark:text-cream-100 leading-relaxed italic mb-6">
                &ldquo;{review.comment}&rdquo;
              </p>

              {/* Author & Favorite */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-stone-100 dark:border-stone-700">
                <div>
                  <h4 className="font-bold text-base text-stone-900 dark:text-cream-100">
                    {review.name}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {review.role}
                  </p>
                </div>

                <div className="text-xs font-medium text-coffee dark:text-amberGold bg-coffee/10 dark:bg-amberGold/10 px-3 py-1.5 rounded-full inline-block self-center sm:self-auto">
                  Món ruột: {review.favoriteDrink}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center sm:justify-end gap-3 mt-8 pt-4">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-coffee hover:text-white text-stone-600 dark:text-stone-300 transition-colors shadow-sm"
              aria-label="Đánh giá trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-stone-500">
              {currentIndex + 1} / {reviews.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-coffee hover:text-white text-stone-600 dark:text-stone-300 transition-colors shadow-sm"
              aria-label="Đánh giá kế tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}