'use client';

import React, { useState } from 'react';
import { BlogPost } from '@/types';
import SafeImage from '@/components/common/SafeImage';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section id="tin-tuc" className="py-20 sm:py-28 bg-cream-100 dark:bg-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
            Nhật Ký &amp; Kiến Thức
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-4">
            Góc Văn Hóa Cà Phê
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            Khám phá những câu chuyện thú vị về nguồn gốc nông trại, kỹ thuật pha chế đỉnh cao và phong cách thưởng thức cà phê hiện đại.
          </p>
        </div>

        {/* 6 Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white dark:bg-stone-800 rounded-3xl overflow-hidden shadow-luxury hover:shadow-luxury-hover border border-stone-200/70 dark:border-stone-700/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-700">
                  <SafeImage
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-coffee-dark/90 text-white backdrop-blur-md">
                    {blog.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  <h3
                    onClick={() => setSelectedBlog(blog)}
                    className="font-serif text-lg font-bold text-stone-900 dark:text-cream-100 group-hover:text-coffee dark:group-hover:text-amberGold cursor-pointer transition-colors line-clamp-2 leading-snug"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-2.5 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-coffee dark:text-amberGold group-hover:underline"
                >
                  <span>Đọc tiếp bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Detail Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold uppercase tracking-widest text-coffee dark:text-amberGold">
                {selectedBlog.tag}
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-3">
                {selectedBlog.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-stone-400 mb-6 pb-4 border-b border-stone-200 dark:border-stone-800">
                <span>Tác giả: {selectedBlog.author}</span>
                <span>•</span>
                <span>Ngày đăng: {selectedBlog.date}</span>
                <span>•</span>
                <span>{selectedBlog.readTime}</span>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                <SafeImage
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-sm text-stone-700 dark:text-stone-300 space-y-4 leading-relaxed">
                <p className="font-semibold text-base text-stone-900 dark:text-cream-100">
                  {selectedBlog.summary}
                </p>
                <p>
                  Tại Heritage Coffee, mỗi quy trình từ khâu chọn lọc hạt giống, chăm sóc tại nông trại Cầu Đất đến khâu rang xay mộc đều được giám sát nghiêm ngặt bởi các chuyên gia Q Grader được chứng nhận quốc tế.
                </p>
                <p>
                  Cà phê không đơn giản là thức uống tiếp thêm năng lượng; đó là nét văn hóa thưởng thức của con người đương đại. Khi bạn nâng tách cà phê lên mũi để hít trọn hương thơm thanh khiết của hoa quả quả mọng, bạn đang thưởng thức tinh túy của cả một dải đất màu mỡ Việt Nam.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}