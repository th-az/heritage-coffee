'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { X, Search, ArrowUpRight, Star } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.categoryName.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.ingredients.some((ing) => ing.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Search Dialog */}
      <div className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 z-10 border border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-700 pb-4">
          <Search className="w-5 h-5 text-coffee shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm món yêu thích (Espresso, Latte, Bạc xỉu, Croissant...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm sm:text-base bg-transparent text-stone-900 dark:text-cream-100 placeholder-stone-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 shrink-0"
          >
            Đóng ESC
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto space-y-2">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-stone-400 text-xs">
              <p>Gợi ý từ khóa phổ biến: <span className="text-coffee font-medium cursor-pointer" onClick={() => setSearchTerm('Latte')}>Latte</span>, <span className="text-coffee font-medium cursor-pointer" onClick={() => setSearchTerm('Cold Brew')}>Cold Brew</span>, <span className="text-coffee font-medium cursor-pointer" onClick={() => setSearchTerm('Tiramisu')}>Tiramisu</span>, <span className="text-coffee font-medium cursor-pointer" onClick={() => setSearchTerm('Bạc Xỉu')}>Bạc Xỉu</span></p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-stone-500 text-xs">
              Không tìm thấy món nào phù hợp với &quot;{searchTerm}&quot;.
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  onSelectProduct(prod);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-stone-50 dark:hover:bg-stone-800/80 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <SafeImage
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-stone-900 dark:text-cream-100 group-hover:text-coffee transition-colors">
                      {prod.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <span>{prod.categoryName}</span>
                      <span>•</span>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="ml-0.5">{prod.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-coffee-dark dark:text-amberGold">
                    Xem ghi chú
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-coffee transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}