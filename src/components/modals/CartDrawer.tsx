'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import SafeImage from '@/components/common/SafeImage';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 dark:bg-stone-900 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-coffee" />
              <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100">
                Giỏ Hàng Của Bạn ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-20 h-20 rounded-full bg-coffee/10 flex items-center justify-center text-coffee mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-800 dark:text-stone-200 mb-2">
                  Giỏ hàng còn trống
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Bạn chưa chọn món nào. Hãy khám phá thực đơn cà phê thơm lừng và bánh nướng hảo hạng của Heritage!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-coffee hover:bg-coffee-dark text-white font-medium text-xs shadow-md transition-colors"
                >
                  Khám Phá Thực Đơn
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 bg-white dark:bg-stone-800/80 rounded-2xl border border-stone-200/70 dark:border-stone-700/60 shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <SafeImage
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm text-stone-900 dark:text-cream-100 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                          Size {item.selectedSize.name} ({item.selectedSize.volume})
                        </p>
                        {item.selectedToppings.length > 0 && (
                          <p className="text-[11px] text-coffee mt-0.5 truncate">
                            +{item.selectedToppings.map((t) => t.name.split(' (')[0]).join(', ')}
                          </p>
                        )}
                        {item.note && (
                          <p className="text-[10px] text-stone-400 italic mt-0.5 truncate">
                            &quot;{item.note}&quot;
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                        aria-label="Xóa món"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="font-bold text-sm text-coffee-dark dark:text-amberGold">
                        {item.itemTotalPrice.toLocaleString('vi-VN')}₫
                      </span>

                      {/* Quantity buttons */}
                      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-800">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                          aria-label="Giảm"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-800 dark:text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                          aria-label="Tăng"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-3 shadow-inner">
              {/* Promo Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-coffee/10 border border-coffee/30 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-coffee" />
                      <span className="font-semibold text-coffee-dark dark:text-cream-100">
                        Mã {couponCode} đã kích hoạt!
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      Hủy mã
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Mã voucher (HERITAGE20)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 uppercase text-stone-800 dark:text-stone-200 focus:outline-none focus:border-coffee"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-white text-xs font-semibold transition-colors"
                    >
                      Áp dụng
                    </button>
                  </form>
                )}
              </div>

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 pt-1">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span className="font-medium text-stone-900 dark:text-stone-200">
                    {subtotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Giảm giá khuyến mãi:</span>
                    <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí giao hàng:</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-medium">Miễn phí (Đơn &gt; 150k)</span>
                    ) : (
                      `${shippingFee.toLocaleString('vi-VN')}₫`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-cream-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span>Tổng thanh toán:</span>
                  <span className="text-base text-coffee-dark dark:text-amberGold">
                    {finalTotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleOpenCheckout}
                className="w-full py-3.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-coffee/20 transition-all active:scale-[0.99]"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}