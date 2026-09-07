'use client';

import React from 'react';
import { X, Coffee, Phone, MapPin, Clock, Calendar, ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenReservation }: MobileMenuProps) {
  const { isDark, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const navLinks = [
    { label: 'Trang chủ', href: '#hero' },
    { label: 'Giới thiệu', href: '#gioi-thieu' },
    { label: 'Thực đơn', href: '#thuc-don' },
    { label: 'Khuyến mãi', href: '#khuyen-mai' },
    { label: 'Không gian', href: '#khong-gian' },
    { label: 'Đánh giá', href: '#danh-gia' },
    { label: 'Tin tức', href: '#tin-tuc' },
    { label: 'Liên hệ', href: '#lien-he' },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-cream-100 dark:bg-stone-900 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-coffee-dark flex items-center justify-center text-cream-100">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-base tracking-widest text-coffee-dark dark:text-cream-100">
                HERITAGE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                aria-label="Chuyển chế độ giao diện"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-700" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Links */}
          <nav className="py-6 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="w-full text-left py-2 px-3 rounded-xl font-medium text-stone-800 dark:text-stone-200 hover:bg-coffee/10 hover:text-coffee transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom CTA & Info */}
        <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
          <button
            onClick={() => {
              onClose();
              onOpenReservation();
            }}
            className="w-full py-3 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Đặt Bàn Trực Tuyến</span>
          </button>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-coffee" />
              <span>Hotline: 1900 6868</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-coffee" />
              <span>07:00 - 22:30 hàng ngày</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-coffee" />
              <span>68 Nam Kỳ Khởi Nghĩa, Q.1, TP.HCM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}