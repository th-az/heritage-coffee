'use client';

import React, { useState } from 'react';
import { Coffee, MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, Check } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast('success', 'Đăng ký thành công', 'Bạn đã nhận được mã ưu đãi HERITAGE20 giảm 20% cho đơn đầu tiên!');
      setEmail('');
    }
  };

  return (
    <footer id="lien-he" className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-coffee text-cream-100 flex items-center justify-center shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest text-cream-100 leading-none">
                  HERITAGE
                </span>
                <span className="text-[10px] tracking-[0.25em] text-amberGold uppercase font-semibold mt-0.5">
                  Coffee &amp; Roastery
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-stone-400">
              Nơi gìn giữ linh hồn hạt cà phê cao nguyên Việt Nam. Chúng tôi tỉ mỉ trong từng mẻ rang mộc, trân trọng từng giọt chiết xuất và kiến tạo không gian thư giãn tinh tế cho tâm hồn bạn.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.46V12.9a8.16 8.16 0 0 0 5.73 2.31V11.7a4.85 4.85 0 0 1-3.77-1.74v-3.27h3.77z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-cream-100 tracking-wider uppercase">
              Liên Hệ &amp; Địa Chỉ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amberGold shrink-0 mt-0.5" />
                <span>Chi nhánh 1: 68 Nam Kỳ Khởi Nghĩa, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amberGold shrink-0 mt-0.5" />
                <span>Chi nhánh 2: 12 Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amberGold shrink-0" />
                <span>Hotline: 1900 6868 - 028 3822 9999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amberGold shrink-0" />
                <span>contact@heritagecoffee.vn</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amberGold shrink-0" />
                <span>Mở cửa: 07:00 - 22:30 (Cả ngày lễ)</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-cream-100 tracking-wider uppercase">
              Thông Tin Hữu Ích
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#gioi-thieu" className="hover:text-amberGold transition-colors">Về Heritage Coffee</a></li>
              <li><a href="#thuc-don" className="hover:text-amberGold transition-colors">Thực Đơn Cà Phê &amp; Bánh</a></li>
              <li><a href="#khuyen-mai" className="hover:text-amberGold transition-colors">Chính Sách Hội Viên VIP</a></li>
              <li><a href="#dat-ban" className="hover:text-amberGold transition-colors">Đặt Bàn Tiệc &amp; Họp Mặt</a></li>
              <li><a href="#tin-tuc" className="hover:text-amberGold transition-colors">Văn Hóa &amp; Nghệ Thuật Cà Phê</a></li>
              <li><a href="#lien-he" className="hover:text-amberGold transition-colors">Chính Sách Đổi Trả &amp; Bảo Mật</a></li>
            </ul>
          </div>

          {/* Newsletter & Map */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-cream-100 tracking-wider uppercase">
              Bản Tin Ưu Đãi
            </h4>
            <p className="text-xs text-stone-400">
              Đăng ký để nhận voucher giảm 20% và thư mời nếm thử các mẻ hạt Specialty giới hạn.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                required
                placeholder="Nhập email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-3.5 pr-10 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amberGold"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-coffee hover:bg-amberGold text-white transition-colors"
                aria-label="Gửi email đăng ký"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>

            {/* Google Maps Embed & Link */}
            <div className="pt-2 space-y-2">
              <div className="rounded-xl overflow-hidden border border-stone-800 h-24 w-full relative shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.497914841968!2d106.69752531533418!3d10.773121392323674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x17874917372365a9!2zNjggTmFtIEvhu7MgS2jhu59pIE5naMSpYSwgQuG6v24gTmdow6ksIFF14bqtbiAxLCBI4buTIENow60gTWluaA!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí Heritage Coffee Flagship"
                  className="grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <a
                href="https://maps.google.com/?q=68+Nam+K%E1%BB%B3+Kh%E1%BB%9Fi+Ngh%C4%A9a,+B%E1%BA%BFn+Ngh%C3%A9,+Qu%E1%BA%ADn+1,+TP.HCM"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amberGold hover:underline"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Mở chỉ đường trên Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Heritage Coffee &amp; Roastery. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <span>Thanh toán an toàn: MoMo • VNPAY • Visa • MasterCard • Tiền mặt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}