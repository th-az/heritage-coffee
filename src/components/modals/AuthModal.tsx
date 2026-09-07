'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      showToast('success', 'Đăng nhập thành công', `Chào mừng bạn quay trở lại với Heritage Coffee!`);
    } else {
      showToast('success', 'Đăng ký thành công', `Chào mừng thành viên mới ${name}! Bạn nhận được voucher giảm 20%.`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 z-10 border border-stone-200 dark:border-stone-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex border-b border-stone-200 dark:border-stone-700 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`pb-3 text-sm font-bold flex-1 text-center transition-colors border-b-2 ${
              tab === 'login'
                ? 'border-coffee text-coffee dark:text-amberGold'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setTab('register')}
            className={`pb-3 text-sm font-bold flex-1 text-center transition-colors border-b-2 ${
              tab === 'register'
                ? 'border-coffee text-coffee dark:text-amberGold'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            Tạo Tài Khoản
          </button>
        </div>

        {/* Benefits banner */}
        <div className="p-3.5 rounded-2xl bg-cream-100 dark:bg-stone-800/80 border border-coffee/20 mb-5 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-coffee shrink-0 mt-0.5" />
          <div className="text-xs text-stone-600 dark:text-stone-300">
            <span className="font-semibold text-coffee-dark dark:text-cream-100">Đặc quyền hội viên: </span>
            Tích điểm 10% mỗi hóa đơn, ưu đãi sinh nhật &amp; món mới trước công chúng!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'register' && (
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                placeholder="Họ và tên *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="email"
              required
              placeholder="Địa chỉ Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
            />
          </div>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="password"
              required
              placeholder="Mật khẩu *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
            />
          </div>

          {tab === 'login' && (
            <div className="flex justify-between items-center text-[11px] text-stone-500">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-coffee focus:ring-coffee" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-coffee hover:underline">
                Quên mật khẩu?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-xs shadow-lg shadow-coffee/20 transition-all active:scale-[0.99] mt-2"
          >
            {tab === 'login' ? 'Đăng Nhập Ngay' : 'Đăng Ký Thành Viên'}
          </button>
        </form>
      </div>
    </div>
  );
}