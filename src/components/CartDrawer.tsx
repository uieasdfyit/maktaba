import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';
import { FREE_DELIVERY_THRESHOLD } from '../data/products';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Tag 
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  discountRate: number;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  discountRate,
  onApplyCoupon,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const finalSubtotal = subtotal - discountAmount;
  const isFreeDelivery = finalSubtotal >= FREE_DELIVERY_THRESHOLD;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - finalSubtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((finalSubtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = onApplyCoupon(couponCode);
    setCouponMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-bold text-slate-900">سلة المشتريات</h2>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold tabular-nums">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-200 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3 bg-sky-50 border-b border-sky-100 text-xs">
            {isFreeDelivery ? (
              <div className="flex items-center gap-1.5 text-sky-900 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>مبروك! لقد حصلت على توصيل مجاني لكافة المحافظات</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-slate-700">
                  <span>أضف بـ <strong className="text-sky-700 tabular-nums">{formatCurrency(amountToFreeDelivery)}</strong> إضافية للتوصيل المجاني</span>
                  <span className="tabular-nums font-bold text-sky-800">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-sky-200/60 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-9 h-9" />
                </div>
                <p className="text-base font-semibold text-slate-700 mb-1">سلتك فارغة حالياً</p>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  تصفح تشكيلتنا من الدفاتر والأقلام ومستلزمات المكاتب وأضف ما تحتاجه
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-stone-200/60"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      {item.product.category}
                    </p>
                    <div className="text-xs font-bold text-sky-700 tabular-nums">
                      {formatCurrency(item.product.price * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="حذف المنتج"
                      aria-label="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-stone-100 text-slate-600"
                        aria-label="إنقاص"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-stone-100 text-slate-600"
                        aria-label="زيادة"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Totals & Checkout */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 p-6 bg-stone-50 space-y-4">
              
              {/* Coupon input */}
              <form onSubmit={handleCouponSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="كوبون الخصم (جرب MAKTABATI10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs pr-8 pl-3 py-2 bg-white border border-stone-300 rounded-lg outline-none uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    تطبيق
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[11px] font-medium ${couponMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="tabular-nums font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>خصم الكوبون ({discountRate * 100}%):</span>
                    <span className="tabular-nums">- {formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>أجور التوصيل:</span>
                  <span className="tabular-nums font-semibold text-slate-800">
                    {isFreeDelivery ? (
                      <span className="text-emerald-600 font-bold">مجاني</span>
                    ) : (
                      'تحدد عند الدفع (4,000 د.ع)'
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-stone-300">
                  <span>الإجمالي التقريبي:</span>
                  <span className="tabular-nums text-base">{formatCurrency(finalSubtotal)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>متابعة الطلب والدفع</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="flex justify-between items-center text-[11px] text-slate-500 px-1">
                  <button
                    onClick={onClearCart}
                    className="hover:text-rose-600 transition-colors"
                  >
                    تفريغ السلة بالكامل
                  </button>
                  <span>الدفع عند الاستلام متاح</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
