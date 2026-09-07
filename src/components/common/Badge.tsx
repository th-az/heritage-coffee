import React from 'react';
import { ProductBadge } from '@/types';
import { Sparkles, Flame, Percent } from 'lucide-react';

interface BadgeProps {
  type: ProductBadge;
  className?: string;
}

export default function Badge({ type, className = '' }: BadgeProps) {
  switch (type) {
    case 'Mới':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-emerald-700/90 text-white backdrop-blur-sm shadow-sm ${className}`}>
          <Sparkles className="w-3 h-3 text-emerald-200" />
          Mới
        </span>
      );
    case 'Bán chạy':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-amber-700/90 text-white backdrop-blur-sm shadow-sm ${className}`}>
          <Flame className="w-3 h-3 text-amber-200" />
          Bán chạy
        </span>
      );
    case 'Giảm giá':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-rose-700/90 text-white backdrop-blur-sm shadow-sm ${className}`}>
          <Percent className="w-3 h-3 text-rose-200" />
          Ưu đãi
        </span>
      );
    default:
      return null;
  }
}