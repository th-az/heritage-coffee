import React from 'react';
import { Coffee, Croissant, Armchair } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Coffee,
      title: 'Cà phê nguyên chất',
      description:
        'Hạt Arabica Cầu Đất & Fine Robusta Buôn Ma Thuột rang mộc từng mẻ nhỏ, chiết xuất áp suất 9 bar chuẩn Ý giữ trọn tinh túy hương hoa quả và socola đen nồng nàn.',
      tag: '100% Single Origin',
    },
    {
      icon: Croissant,
      title: 'Bánh tươi mỗi ngày',
      description:
        'Được các nghệ nhân làm bánh nướng thủ công vào mỗi 6:30 sáng từ bơ Pháp cao cấp AOP Lescure. Vỏ bánh giòn rụm, ruột thơm ngậy tan chảy trên đầu lưỡi.',
      tag: 'Freshly Baked Daily',
    },
    {
      icon: Armchair,
      title: 'Không gian ấm cúng',
      description:
        'Kiến trúc tối giản giao thoa chất liệu gỗ mộc ấm áp, ánh đèn vàng êm dịu và những giai điệu Smooth Jazz mượt mà, tạo nên chốn dừng chân bình yên giữa lòng phố thị.',
      tag: 'Ambiance & Peace',
    },
  ];

  return (
    <section id="ly-do" className="py-20 sm:py-28 bg-cream-100 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-coffee dark:text-amberGold">
            Giá Trị Cốt Lõi
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-cream-100 mt-2 mb-4">
            Vì Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Chúng tôi không chỉ phục vụ một ly cà phê, mà trao gửi cả niềm đam mê, sự tỉ mỉ và sự tôn trọng đối với nông sản Việt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-800 shadow-luxury hover:shadow-luxury-hover border border-stone-200/80 dark:border-stone-700/60 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-cream-100 dark:bg-stone-700 flex items-center justify-center text-coffee dark:text-amberGold mb-6 group-hover:scale-110 group-hover:bg-coffee group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-8 h-8" />
                  </div>

                  <span className="text-[11px] font-bold tracking-widest uppercase text-coffee dark:text-amberGold">
                    {card.tag}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100 mt-1 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-700/50 flex items-center text-xs font-semibold text-coffee dark:text-amberGold gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Khám phá quy chuẩn</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}