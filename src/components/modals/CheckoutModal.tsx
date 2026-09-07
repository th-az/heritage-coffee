'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { X, CheckCircle, CreditCard, Banknote, QrCode, ShieldCheck, MapPin, Phone, User, FileText } from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, items, finalTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vnpay' | 'momo' | 'bank'>('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      showToast('error', 'Thiếu thông tin', 'Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const code = 'HC-' + Math.floor(100000 + Math.random() * 900000);
      setOrderCode(code);
      setIsSubmitting(false);
      setOrderSuccess(true);
      clearCart();
      showToast('success', 'Đặt hàng thành công!', `Mã đơn hàng: ${code}. Barista đang chuẩn bị cà phê cho bạn!`);
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={handleClose} />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-stone-900 rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 border border-stone-200 dark:border-stone-800 my-8">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-cream-100">
              Cảm Ơn Quý Khách!
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
              Đơn hàng của bạn đã được tiếp nhận. Đội ngũ Barista Heritage Coffee đang tiến hành pha chế và giao đến bạn trong vòng 20-35 phút.
            </p>
            <div className="inline-block p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm">
              <span className="text-stone-500">Mã đơn hàng: </span>
              <span className="font-mono font-bold text-coffee text-base">{orderCode}</span>
            </div>
            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-sm shadow-md transition-colors"
              >
                Tiếp Tục Mua Sắm
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-100">
                Thanh Toán Đơn Hàng
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Giao hàng nhanh trong 30 phút • Cà phê giữ nhiệt nguyên bản
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping info */}
              <div className="space-y-3">
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="Họ và tên người nhận *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại liên hệ *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
                  />
                </div>

                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    required
                    placeholder="Địa chỉ giao hàng chi tiết (Số nhà, đường, phường, quận) *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee"
                  />
                </div>

                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
                  <textarea
                    rows={2}
                    placeholder="Ghi chú giao hàng (Ví dụ: Giao lên lầu 3, gọi trước khi đến...)"
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-coffee resize-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Phương Thức Thanh Toán
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-coffee bg-coffee/10 text-coffee-dark dark:text-cream-100 font-bold ring-1 ring-coffee'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-coffee" />
                    <span className="text-xs">Tiền mặt (COD)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                      paymentMethod === 'vnpay'
                        ? 'border-coffee bg-coffee/10 text-coffee-dark dark:text-cream-100 font-bold ring-1 ring-coffee'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-blue-600" />
                    <span className="text-xs">VNPAY QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                      paymentMethod === 'momo'
                        ? 'border-coffee bg-coffee/10 text-coffee-dark dark:text-cream-100 font-bold ring-1 ring-coffee'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-pink-600" />
                    <span className="text-xs">Ví MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center text-center gap-1.5 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-coffee bg-coffee/10 text-coffee-dark dark:text-cream-100 font-bold ring-1 ring-coffee'
                        : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs">Chuyển khoản</span>
                  </button>
                </div>
              </div>

              {/* Order total info */}
              <div className="p-3.5 rounded-2xl bg-cream-100 dark:bg-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500">Tổng cộng ({items.length} món):</span>
                  <p className="text-xs text-stone-400">Đã bao gồm thuế &amp; phí vận chuyển</p>
                </div>
                <span className="text-xl font-bold text-coffee-dark dark:text-amberGold">
                  {finalTotal.toLocaleString('vi-VN')}₫
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-coffee-dark hover:bg-coffee text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-coffee/20 transition-all active:scale-[0.99] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Đang xử lý đơn hàng...</span>
                ) : (
                  <span>Xác Nhận Đặt Hàng ({finalTotal.toLocaleString('vi-VN')}₫)</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}