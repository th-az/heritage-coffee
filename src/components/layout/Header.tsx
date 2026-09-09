'use client';

import React, { useState, useEffect } from 'react';
import { Coffee, Search, ShoppingBag, Heart, User, Menu, ChevronRight, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenMobileMenu: () => void;
  onScrollToMenu: () => void;
}

export default function Header({
  onOpenSearch,
  onOpenAuth,
  onOpenMobileMenu,
  onScrollToMenu,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Giới thiệu', href: '#gioi-thieu' },
    { label: 'Thực đơn', href: '#thuc-don' },
    { label: 'Khuyến mãi', href: '#khuyen-mai' },
    { label: 'Không gian', href: '#khong-gian' },
    { label: 'Tin tức', href: '#tin-tuc' },
    { label: 'Liên hệ', href: '#lien-he' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-100/95 dark:bg-stone-900/95 backdrop-blur-md shadow-md py-3.5 border-b border-stone-200/60 dark:border-stone-800'
          : 'bg-cream-50/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-coffee-dark group-hover:bg-coffee text-cream-100 flex items-center justify-center shadow-md transition-colors">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-coffee-dark dark:text-cream-100 leading-none">
              HERITAGE
            </span>
            <span className="text-[10px] tracking-[0.25em] text-coffee uppercase font-semibold mt-0.5">
              Coffee &amp; Roastery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-coffee dark:hover:text-amberGold transition-colors tracking-wide relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-coffee after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-stone-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tìm kiếm sản phẩm"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Xem món yêu thích"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Mở giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-coffee-dark text-white text-[10px] font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Login / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:flex p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tài khoản"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Order Now CTA button */}
          <button
            onClick={onScrollToMenu}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-coffee-dark hover:bg-coffee text-white text-xs font-semibold tracking-wide shadow-md hover:shadow-lg transition-all active:scale-95 ml-1"
          >
            <span>Liên Hệ Ngay</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2.5 rounded-full text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
            aria-label="Menu di động"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}