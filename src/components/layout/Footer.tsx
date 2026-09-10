'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="lien-he" className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="space-y-4">
            <Image
              src="/dat-coffee-logo.svg"
              alt="Đạt Coffee & Roastery"
              width={240}
              height={70}
              className="h-auto w-[210px]"
            />

            <p className="text-xs leading-relaxed text-stone-400">
              Nơi gìn giữ linh hồn hạt cà phê cao nguyên Việt Nam. Chúng tôi tỉ mỉ trong từng mẻ rang mộc, trân trọng từng giọt chiết xuất và kiến tạo không gian thư giãn tinh tế cho tâm hồn bạn.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1JtWvNay46/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cthanhdatnguyen?stkn=MXRhaHdmamFld284eQ=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-coffee flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@congdat28_09?_r=1&_t=ZS-99YDKVhIdmP"
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
                <span>Chi nhánh 1: số 1-ngõ 31-yên xá-tân triều-Thanh trì-Hà Nội</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amberGold shrink-0 mt-0.5" />
                <span>Chi nhánh 2: số 6-ngõ-87-yên xá-tân triều-Thanh trì-Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amberGold shrink-0" />
                <span>Hotline: 0335251326</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amberGold shrink-0" />
                <span>contact@dat.coffee.vn</span>
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
              <li><a href="#gioi-thieu" className="hover:text-amberGold transition-colors">Về T.ĐẠT Coffee</a></li>
              <li><a href="#thuc-don" className="hover:text-amberGold transition-colors">Thực Đơn Cà Phê &amp; Bánh</a></li>
              <li><a href="#khong-gian" className="hover:text-amberGold transition-colors">Không gian &amp; phương pháp</a></li>
              <li><a href="#tin-tuc" className="hover:text-amberGold transition-colors">Văn Hóa &amp; Nghệ Thuật Cà Phê</a></li>
              <li><a href="#lien-he" className="hover:text-amberGold transition-colors">Liên hệ cộng đồng</a></li>
            </ul>
          </div>

          {/* Public information & Map */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-cream-100 tracking-wider uppercase">
              Tài nguyên mở
            </h4>
            <p className="text-xs text-stone-400">
              Nội dung được chia sẻ vì mục đích tham khảo và trao đổi kiến thức về cà phê, không bán hàng hay thu phí thành viên.
            </p>

            {/* Google Maps Embed & Link */}
            <div className="pt-2 space-y-2">
              <div className="rounded-xl overflow-hidden border border-stone-800 h-24 w-full relative shadow-inner">
                <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.166675770068!2d105.79548289945149!3d20.96740062566516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acd86dd8ce35%3A0x7937b97073755f66!2zTmfDtSAzMSBZw6puIFjDoSwgWcOqbiBYw6EsIFRoYW5oIExp4buHdCwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1788806099777!5m2!1sen!2s"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen={false}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Vị trí Heritage Coffee"
  className="grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
/>
              </div>
              <a
                href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.166675770068!2d105.79548289945149!3d20.96740062566516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acd86dd8ce35%3A0x7937b97073755f66!2zTmfDtSAzMSBZw6puIFjDoSwgWcOqbiBYw6EsIFRoYW5oIExp4buHdCwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1788806099777!5m2!1sen!2s"
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
        </div>
      </div>
    </footer>
  );
}