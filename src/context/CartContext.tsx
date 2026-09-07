'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductSize, ProductTopping, CartItem } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: ProductSize, toppings: ProductTopping[], quantity: number, note?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  finalTotal: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const COUPONS: Record<string, { percent: number; minOrder: number; description: string }> = {
  'HERITAGE20': { percent: 0.2, minOrder: 100000, description: 'Giảm 20% đơn từ 100.000₫' },
  'CAFEDISAN': { percent: 0.15, minOrder: 80000, description: 'Giảm 15% mừng khai trương' },
  'FREESHIP': { percent: 0, minOrder: 0, description: 'Miễn phí vận chuyển' },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const { showToast } = useToast();

  // Load from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('heritage_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('heritage_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (
    product: Product,
    size: ProductSize,
    toppings: ProductTopping[],
    quantity: number,
    note?: string
  ) => {
    const toppingsTotal = toppings.reduce((sum, t) => sum + t.price, 0);
    const unitPrice = product.price + size.extraPrice + toppingsTotal;
    const itemTotalPrice = unitPrice * quantity;

    // Key to distinguish size + toppings
    const toppingIds = toppings.map((t) => t.id).sort().join('-');
    const itemId = `${product.id}-${size.name}-${toppingIds}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                itemTotalPrice: (item.quantity + quantity) * unitPrice,
                note: note || item.note,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedToppings: toppings,
            quantity,
            unitPrice,
            itemTotalPrice,
            note,
          },
        ];
      }
    });

    showToast('success', 'Đã thêm vào giỏ hàng', `${quantity}x ${product.name} (${size.label})`);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('info', 'Đã xóa món', 'Đã bỏ sản phẩm khỏi giỏ hàng.');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity,
              itemTotalPrice: quantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.itemTotalPrice, 0);

  let discountAmount = 0;
  let shippingFee = subtotal > 150000 || items.length === 0 ? 0 : 25000;

  if (couponCode && COUPONS[couponCode]) {
    const coupon = COUPONS[couponCode];
    if (couponCode === 'FREESHIP') {
      shippingFee = 0;
    } else if (subtotal >= coupon.minOrder) {
      discountAmount = Math.round(subtotal * coupon.percent);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + (items.length > 0 ? shippingFee : 0));

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (COUPONS[clean]) {
      const coupon = COUPONS[clean];
      if (clean !== 'FREESHIP' && subtotal < coupon.minOrder) {
        showToast(
          'error',
          'Chưa đủ điều kiện',
          `Mã ${clean} yêu cầu đơn tối thiểu ${coupon.minOrder.toLocaleString('vi-VN')}₫`
        );
        return false;
      }
      setCouponCode(clean);
      showToast('success', 'Áp dụng thành công', coupon.description);
      return true;
    } else {
      showToast('error', 'Mã không hợp lệ', 'Vui lòng kiểm tra lại mã ưu đãi.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    showToast('info', 'Đã hủy mã', 'Đã gỡ bỏ mã giảm giá khỏi đơn hàng.');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        shippingFee,
        finalTotal,
        couponCode,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}