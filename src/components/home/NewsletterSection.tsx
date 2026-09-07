'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('success', 'Đăng ký thành công!', 'Heritage Coffee đã gửi mã ưu đãi HERITAGE20 vào email của bạn.');
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-cream-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coffee/10 text-coffee dark:text-amberGold text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Đặc Quyền Thành Viên</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-cream-100 mb-4">
          Nhận Bản Tin &amp; Ưu Đãi Độc Quyền
        </h2>

        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-lg mx-auto leading-relaxed mb-8">
          Đăng ký để nhận thông tin về các mẻ rang Specialty giới hạn, vé tham dự workshop cupping cuối tuần và voucher giảm 20% cho đơn hàng đầu tiên.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-sm font-semibold border border-emerald-300 dark:border-emerald-800 animate-scale-up">
            <CheckCircle2 className="w-5 h-5" />
            <span>Cảm ơn bạn! Mã voucher HERITAGE20 đã sẵn sàng sử dụng.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="email"
                required
                placeholder="Nhập địa chỉ email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>Đăng Ký</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}