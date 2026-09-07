import React from 'react';
import SafeImage from '@/components/common/SafeImage';
import { Award, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { value: '10+', label: 'Năm Cống Hiến & Phát Triển' },
    { value: '18+', label: 'Nông Trại Liên Kết Cầu Đất' },
    { value: '150K+', label: 'Tách Cà Phê Mỗi Năm' },
    { value: '12+', label: 'Giải Thưởng Barista Quốc Gia' },
  ];

  return (
    <section id="gioi-thieu" className="py-20 sm:py-28 bg-cream-100 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Collage Photos */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80"
                alt="Nghệ nhân Barista Heritage Coffee"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white dark:bg-stone-800 p-5 sm:p-6 rounded-3xl shadow-2xl border border-stone-200/80 dark:border-stone-700/80 max-w-xs backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-coffee text-white flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-cream-100">
                    Fine Robusta &amp; Arabica
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Chứng nhận Specialty SCA Quốc Tế</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & Mission */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
                Câu Chuyện Thương Hiệu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 leading-tight">
                Hành Trình Gìn Giữ Hạt Ngọc Nâu Cao Nguyên
              </h2>
            </div>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Khởi nguồn từ tình yêu sâu đậm với những đồi cà phê bạt ngàn tại Cầu Đất (Lâm Đồng) và đất đỏ bazan Buôn Ma Thuột, Heritage Coffee ra đời với một tôn chỉ duy nhất: <strong>Tôn vinh giá trị nguyên bản của cà phê Việt</strong>.
            </p>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Chúng tôi nói không với tẩm ướp hương liệu nhân tạo hay bơ hóa học. Từng quả cà phê được hái chín cây 100% bằng tay, phơi giàn trong nhà kính và rang mộc chuẩn xác theo từng đường cong nhiệt độ để đánh thức những nốt hương hoa quả tinh khôi nhất.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Kiểm soát trực tiếp từ nông trại hữu cơ đến tách cà phê cuối cùng.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Hệ thống máy pha Synesso &amp; máy xay Mazzer tiêu chuẩn vô địch thế giới.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-800 dark:text-stone-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Bánh nướng bơ Pháp cao cấp nướng mẻ mới mỗi sáng.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
              {stats.map((item) => (
                <div key={item.label}>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-coffee dark:text-amberGold">
                    {item.value}
                  </span>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 leading-snug">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}