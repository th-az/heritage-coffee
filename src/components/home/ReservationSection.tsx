'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, User, Phone, Mail, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ReservationSection() {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '09:00',
    guests: 2,
    area: 'Trong nhà',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<{
    code: string;
    name: string;
    guests: number;
    date: string;
    time: string;
    area: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.date) {
      showToast('error', 'Chưa đủ thông tin', 'Vui lòng điền Họ tên, Số điện thoại và Ngày đến.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const bookingCode = 'BK-' + Math.floor(10000 + Math.random() * 90000);
      setConfirmedBooking({
        code: bookingCode,
        name: formData.fullName,
        guests: formData.guests,
        date: formData.date,
        time: formData.time,
        area: formData.area,
      });

      setIsSubmitting(false);
      showToast('success', 'Đặt bàn thành công!', `Mã đặt bàn: ${bookingCode}. Quản lý quán sẽ gọi xác nhận trong 5 phút.`);
    }, 1000);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      date: '',
      time: '09:00',
      guests: 2,
      area: 'Trong nhà',
      note: '',
    });
  };

  return (
    <section id="dat-ban" className="py-20 sm:py-28 bg-cream-100 dark:bg-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-800 rounded-3xl shadow-luxury border border-stone-200/80 dark:border-stone-700/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual & Intro (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-coffee-dark via-coffee to-stone-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-cream-100 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amberGold" />
                <span>Trải Nghiệm Riêng Biệt</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Đặt Bàn Thưởng Thức Tại Heritage
              </h2>

              <p className="text-stone-300 text-sm leading-relaxed">
                Dù là buổi gặp gỡ đối tác trang trọng, buổi hẹn hò lãng mạn hay tiệc họp mặt gia đình, chúng tôi luôn chuẩn bị không gian chu đáo và tách cà phê thơm ngát nhất đón chào bạn.
              </p>

              <div className="space-y-3 pt-4 text-xs text-stone-300">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amberGold shrink-0" />
                  <span>Giữ bàn tối đa 15 phút sau giờ hẹn</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amberGold shrink-0" />
                  <span>Hỗ trợ đặt tiệc nhóm &gt; 10 người: 1900 6868</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amberGold shrink-0" />
                  <span>Bãi đỗ xe ô tô &amp; xe máy rộng rãi miễn phí</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 mt-8 text-xs text-stone-400">
              Heritage Coffee &amp; Roastery • Since 2016
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12">
            {confirmedBooking ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100">
                  Xác Nhận Đặt Bàn Thành Công!
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
                  Cảm ơn bạn <strong>{confirmedBooking.name}</strong>. Chúng tôi đã chuẩn bị chỗ ngồi cho <strong>{confirmedBooking.guests} người</strong> vào lúc <strong>{confirmedBooking.time}</strong> ngày <strong>{confirmedBooking.date}</strong> tại khu vực <strong>{confirmedBooking.area}</strong>.
                </p>

                <div className="inline-block p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs">
                  <span className="text-stone-500">Mã đặt bàn: </span>
                  <span className="font-mono font-bold text-coffee text-base">{confirmedBooking.code}</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-coffee hover:bg-coffee-dark text-white font-medium text-xs shadow-md transition-colors"
                  >
                    Đặt Thêm Bàn Khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Họ tên */}
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn *"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee"
                    />
                  </div>

                  {/* SĐT */}
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại nhận tin nhắn *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      placeholder="Địa chỉ Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee"
                    />
                  </div>

                  {/* Ngày */}
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Giờ */}
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee cursor-pointer"
                    >
                      <option value="07:30">07:30 Sáng</option>
                      <option value="09:00">09:00 Sáng</option>
                      <option value="10:30">10:30 Trưa</option>
                      <option value="14:00">14:00 Chiều</option>
                      <option value="16:00">16:00 Chiều</option>
                      <option value="18:30">18:30 Tối</option>
                      <option value="20:00">20:00 Tối</option>
                    </select>
                  </div>

                  {/* Số người */}
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee cursor-pointer"
                    >
                      <option value={1}>1 người (Bàn đơn)</option>
                      <option value={2}>2 người (Bàn đôi)</option>
                      <option value={4}>4 người (Bàn nhóm)</option>
                      <option value={6}>6 người (Bàn lớn)</option>
                      <option value={8}>8 - 12 người (Nhóm họp)</option>
                    </select>
                  </div>

                  {/* Khu vực */}
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value as any })}
                      className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee cursor-pointer"
                    >
                      <option value="Trong nhà">Khu Trong Nhà</option>
                      <option value="Ban công / Ngoài trời">Ban Công Ngoài Trời</option>
                      <option value="Phòng VIP Riêng tư">Phòng VIP Riêng Tư</option>
                    </select>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <textarea
                    rows={3}
                    placeholder="Ghi chú đặc biệt (ví dụ: cần ổ cắm sạc laptop, chuẩn bị hoa sinh nhật, vị trí cạnh cửa sổ...)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-cream-100 focus:outline-none focus:border-coffee resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-coffee/20 transition-all active:scale-[0.99] disabled:opacity-70"
                >
                  {isSubmitting ? 'Đang gửi thông tin...' : 'Xác Nhận Đặt Bàn Ngay'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}