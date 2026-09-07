'use client';

import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import Badge from '@/components/common/Badge';
import { Star, ShoppingBag, Eye, Heart, Search, SlidersHorizontal, Clock } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface MenuSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'tat-ca', label: 'Tất Cả' },
  { id: 'ca-phe-pha-may', label: 'Cà Phê Pha Máy' },
  { id: 'ca-phe-truyen-thong', label: 'Cà Phê Truyền Thống' },
  { id: 'cold-brew', label: 'Cold Brew & Nitro' },
  { id: 'tra-matcha', label: 'Trà & Matcha' },
  { id: 'banh-ngot', label: 'Bánh Nướng & Dessert' },
  { id: 'mon-an-nhe', label: 'Món Ăn Nhẹ' },
];

export default function MenuSection({ products, onSelectProduct }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('tat-ca');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating' | 'sales'>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { isInWishlist, toggleWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'tat-ca') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'sales':
        result = [...result].sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, searchKeyword, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <section id="thuc-don" className="py-20 sm:py-28 bg-cream-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
            Menu Thưởng Thức
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-4">
            Thực Đơn Đầy Đủ
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Khám phá trọn vẹn hơn 18 món thức uống specialty và bánh thủ công được pha chế tinh tế theo công thức độc bản của Heritage.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-coffee-dark text-white shadow-md'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-stone-900 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Tìm món theo tên hoặc hương vị..."
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-coffee"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <span className="text-xs text-stone-500 whitespace-nowrap">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-2 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-coffee cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="sales">Bán chạy nhất</option>
              </select>
            </div>
          </div>
        </div>

        {paginatedProducts.length === 0 ? (
          <div className="py-16 text-center text-stone-500">
            <p className="text-sm">Không có sản phẩm nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProducts.map((prod) => (
              <div
                key={prod.id}
                className="group bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-stone-200/70 dark:border-stone-700/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-700">
                  <SafeImage
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
                    {prod.badges?.map((badge) => (
                      <Badge key={badge} type={badge} />
                    ))}
                  </div>

                  <div className="absolute top-3.5 right-3.5 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => toggleWishlist(prod.id, prod.name)}
                      aria-label="Yêu thích món này"
                      className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all active:scale-90 ${
                        isInWishlist(prod.id)
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(prod.id) ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => onSelectProduct(prod)}
                      aria-label="Xem chi tiết"
                      className="p-2.5 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-200 hover:text-coffee shadow-md backdrop-blur-md transition-all active:scale-90"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                      <span className="font-semibold text-coffee uppercase tracking-wider">
                        {prod.categoryName}
                      </span>
                      <div className="flex items-center text-amber-500 font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="ml-1">{prod.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(prod)}
                      className="font-serif text-xl font-bold text-stone-900 dark:text-cream-100 hover:text-coffee dark:hover:text-amberGold cursor-pointer transition-colors line-clamp-1"
                    >
                      {prod.name}
                    </h3>

                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-coffee" />
                        <span>{prod.prepTime}</span>
                      </div>
                      <span>•</span>
                      <span>Dung tích: {prod.volume}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-700/60 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Giá bán</span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-lg text-coffee-dark dark:text-amberGold">
                          {prod.price.toLocaleString('vi-VN')}₫
                        </span>
                        {prod.originalPrice && prod.originalPrice > prod.price && (
                          <span className="text-xs text-stone-400 line-through">
                            {prod.originalPrice.toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="px-4 py-2.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Chọn Mua</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-coffee text-white shadow-md'
                      : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 border border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}