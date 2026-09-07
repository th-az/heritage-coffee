'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Copy, Check, Clock, Gift } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function PromoBanner() {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Live Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast('success', 'Đã sao chép mã!', `Mã ${code} đã sẵn sàng dán vào giỏ hàng.`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="khuyen-mai" className="py-16 sm:py-20 bg-coffee-dark text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-coffee/30 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-amber-900/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-stone-900/90 via-coffee-deep to-stone-900/90 rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Info */}
          <div className="space-y-4 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amberGold/20 border border-amberGold/30 text-amber-200 text-xs font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>Ưu Đãi Đặc Biệt Trong Tuần</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 leading-tight">
              Giảm Ngay 20% Cho Toàn Bộ Thực Đơn Cà Phê Mộc
            </h3>

            <p className="text-stone-300 text-sm leading-relaxed">
              Nhập mã <strong>HERITAGE20</strong> khi thanh toán để nhận ưu đãi 20% cho đơn từ 100.000₫. Áp dụng cho cả dịch vụ tại quán và giao hàng tận nơi.
            </p>

            {/* Voucher copy bar */}
            <div className="pt-2 flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-950 border border-amber-900/60 font-mono font-bold tracking-wider text-amberGold text-sm">
                <span>HERITAGE20</span>
              </div>
              <button
                onClick={() => handleCopy('HERITAGE20')}
                className="px-4 py-2.5 rounded-xl bg-amberGold hover:bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Đã chép' : 'Sao chép mã'}</span>
              </button>
            </div>
          </div>

          {/* Right Live Countdown Timer */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-stone-950/60 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">
              <Clock className="w-4 h-4 text-amberGold animate-spin-slow" />
              <span>Thời Gian Ưu Đãi Còn Lại</span>
            </div>

            <div className="flex items-center gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-stone-400 mt-1 uppercase">Giờ</span>
              </div>

              <span className="text-2xl font-bold text-stone-500 mb-5">:</span>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-stone-400 mt-1 uppercase">Phút</span>
              </div>

              <span className="text-2xl font-bold text-stone-500 mb-5">:</span>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-stone-900 border border-white/10 flex items-center justify-center shadow-inner">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-amberGold">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-stone-400 mt-1 uppercase">Giây</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}