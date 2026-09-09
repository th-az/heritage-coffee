'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { PRODUCTS } from '@/data/products';
import SafeImage from '@/components/common/SafeImage';
import { Product } from '@/types';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export default function WishlistDrawer({ onSelectProduct }: WishlistDrawerProps) {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();

  if (!isWishlistOpen) return null;

  const favoriteProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 dark:bg-stone-900 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                Món Yêu Thích ({favoriteProducts.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {favoriteProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-500 mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200 mb-1">
                  Chưa có món yêu thích
                </h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Bấm vào biểu tượng trái tim ở các món để lưu lại danh sách thưởng thức yêu thích của bạn!
                </p>
              </div>
            ) : (
              favoriteProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex gap-3.5 p-3.5 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200/70 dark:border-stone-700/60 shadow-sm items-center"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <SafeImage
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-stone-900 dark:text-cream-100 line-clamp-1">
                      {prod.name}
                    </h4>
                    <p className="font-semibold text-xs text-coffee-dark dark:text-amberGold mt-0.5">
                      Ghi chú hương vị
                    </p>
                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectProduct(prod);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-coffee hover:underline mt-1 font-medium"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(prod.id, prod.name)}
                    className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                    aria-label="Xóa khỏi yêu thích"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}