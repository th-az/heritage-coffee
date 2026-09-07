'use client';

import React, { useState } from 'react';
import { Product, ProductSize, ProductTopping } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { X, Star, Clock, Coffee, ShieldCheck, Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import Badge from '@/components/common/Badge';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<ProductTopping[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>('');

  // Reset state when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || null);
      setSelectedToppings([]);
      setQuantity(1);
      setNote('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const currentSize = selectedSize || product.sizes[0];
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = product.price + (currentSize?.extraPrice || 0) + toppingsTotal;
  const totalPrice = unitPrice * quantity;

  const handleToggleTopping = (topping: ProductTopping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    if (!currentSize) return;
    addToCart(product, currentSize, selectedToppings, quantity, note);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col md:flex-row border border-stone-200 dark:border-stone-800 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-stone-800/80 hover:bg-white text-stone-600 dark:text-stone-300 hover:text-stone-900 shadow-md backdrop-blur-md transition-transform hover:scale-105"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image with Badges */}
        <div className="md:w-1/2 relative bg-stone-100 dark:bg-stone-800 min-h-[300px] md:min-h-full">
          <SafeImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {product.badges?.map((badge) => (
              <Badge key={badge} type={badge} />
            ))}
          </div>

          <button
            onClick={() => toggleWishlist(product.id, product.name)}
            aria-label="Yêu thích món này"
            className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-md transition-transform active:scale-90 ${
              isInWishlist(product.id)
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-stone-700 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right: Product Customization Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
            <span className="uppercase tracking-wider font-semibold text-coffee">
              {product.categoryName}
            </span>
            <span className="font-mono">SKU: {product.sku}</span>
          </div>

          {/* Name */}
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100">
            {product.name}
          </h3>

          {/* Rating & Sales */}
          <div className="flex items-center gap-4 my-2 text-sm">
            <div className="flex items-center text-amber-500 gap-1 font-semibold">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount} đánh giá)</span>
            </div>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600 dark:text-stone-400 text-xs">
              Đã bán {product.salesCount.toLocaleString('vi-VN')}+
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 my-3">
            <span className="text-2xl sm:text-3xl font-bold text-coffee-dark dark:text-amberGold">
              {unitPrice.toLocaleString('vi-VN')}₫
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm line-through text-stone-400">
                {(product.originalPrice + (currentSize?.extraPrice || 0)).toLocaleString('vi-VN')}₫
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 dark:text-stone-300 mb-5 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-700/60">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-coffee" />
              <span>Chuẩn bị: {product.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{product.status}</span>
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Chọn Kích Thước
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = currentSize?.name === size.name;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                        isSelected
                          ? 'border-coffee bg-coffee/10 text-coffee-dark dark:text-cream-100 dark:border-amberGold font-medium ring-1 ring-coffee'
                          : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span className="font-bold">{size.name}</span>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                        {size.label}
                      </span>
                      <span className="text-[11px] font-semibold text-coffee mt-1">
                        {size.extraPrice > 0 ? `+${size.extraPrice.toLocaleString('vi-VN')}₫` : 'Giá chuẩn'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Toppings Selection */}
          {product.toppings && product.toppings.length > 0 && (
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Thêm Topping / Tùy Biến
              </label>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {product.toppings.map((topping) => {
                  const isChecked = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <label
                      key={topping.id}
                      className={`flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-coffee/60 bg-coffee/5 text-stone-900 dark:text-cream-100 font-medium'
                          : 'border-stone-200 dark:border-stone-700/60 hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleTopping(topping)}
                          className="rounded text-coffee focus:ring-coffee h-4 w-4"
                        />
                        <span>{topping.name}</span>
                      </div>
                      <span className="font-semibold text-coffee">
                        +{topping.price.toLocaleString('vi-VN')}₫
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Ingredients list */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-4 text-xs">
              <span className="font-bold text-stone-700 dark:text-stone-300">Thành phần: </span>
              <span className="text-stone-500 dark:text-stone-400">
                {product.ingredients.join(', ')}.
              </span>
            </div>
          )}

          {/* Special Notes */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Ghi chú thêm cho quán (ít đường, nhiều đá, tách đá...)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-coffee"
            />
          </div>

          {/* Quantity & CTA */}
          <div className="mt-auto pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3">
            {/* Quantity Controller */}
            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-xl overflow-hidden shrink-0 bg-stone-50 dark:bg-stone-800">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-stone-800 dark:text-stone-200">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-coffee/20 transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Thêm vào giỏ • {totalPrice.toLocaleString('vi-VN')}₫</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}