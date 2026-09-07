'use client';

import React from 'react';
import { INSTAGRAM_POSTS } from '@/data/gallery';
import SafeImage from '@/components/common/SafeImage';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

export default function InstagramFeed() {
  return (
    <section className="py-16 sm:py-24 bg-cream-50 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coffee/10 text-coffee dark:text-amberGold text-xs font-bold uppercase tracking-wider mb-2">
            <Instagram className="w-4 h-4" />
            <span>Theo Dõi @heritage.coffee.vn</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-cream-100">
            Khoảnh Khắc Cùng Tách Cà Phê
          </h2>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-stone-200/60 dark:border-stone-800 cursor-pointer block"
            >
              <SafeImage
                src={post.image}
                alt="Heritage Instagram Moment"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 p-3 text-center">
                <Instagram className="w-5 h-5 text-amberGold" />
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}