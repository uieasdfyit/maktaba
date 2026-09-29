import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { formatCurrency } from '../utils/format';
import { GOVERNORATES, STANDARD_DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '../data/products';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Printer, 
  MessageCircle, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountRate: number;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountRate,
  onOrderPlaced,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState(GOVERNORATES[0]);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'zaincash' | 'qicard'>('cod');
  
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const finalSubtotal = subtotal - discountAmount;
  const deliveryFee = finalSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = finalSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('يرجى إدخال الاسم الكامل');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('يرجى إدخال رقم هاتف عراقي صالح (مثال: 07801234567)');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('يرجى كتابة عنوان التوصيل وأقرب نقطة دالة');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable order dispatch
    setTimeout(() => {
      const orderNumber = `MKT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: orderNumber,
        date: new Date().toLocaleDateString('ar-IQ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        governorate,
        address: address.trim(),
        notes: notes.trim(),
        items: [...items],
        subtotal,
        deliveryFee,
        discount: discountAmount,
        total: grandTotal,
        paymentMethod,
        status: 'received',
        estimatedDelivery: governorate.includes('بغداد') ? 'خلال 24 ساعة' : 'خلال 24 - 48 ساعة',
      };

      setSubmittedOrder(newOrder);
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  const handleCopyReceipt = () => {
    if (!submittedOrder) return;
    const text = 
      `📋 إيصال طلب من متجر مكتبتي\n` +
      `رقم الطلب: ${submittedOrder.id}\n` +
      `الاسم: ${submittedOrder.customerName}\n` +
      `الهاتف: ${submittedOrder.phone}\n` +
      `المحافظة: ${submittedOrder.governorate}\n` +
      `العنوان: ${submittedOrder.address}\n` +
      `طريقة الدفع: ${submittedOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : submittedOrder.paymentMethod === 'zaincash' ? 'زين كاش' : 'كي كارد'}\n` +
      `المنتجات:\n` +
      submittedOrder.items.map((i) => `- ${i.product.title} (الكمية: ${i.quantity}) - ${formatCurrency(i.product.price * i.quantity)}`).join('\n') +
      `\nالإجمالي المطلوب: ${formatCurrency(submittedOrder.total)}\n` +
      `موعد التوصيل المتوقع: ${submittedOrder.estimatedDelivery}`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handleSendWhatsAppOrder = () => {
    if (!submittedOrder) return;
    const text = encodeURIComponent(
      `مرحباً مكتبتي 📚، قمت بإنشاء الطلب رقم: ${submittedOrder.id}\n` +
      `الاسم: ${submittedOrder.customerName}\n` +
      `رقم الهاتف: ${submittedOrder.phone}\n` +
      `المحافظة: ${submittedOrder.governorate}\n` +
      `العنوان: ${submittedOrder.address}\n` +
      `المبلغ الإجمالي: ${formatCurrency(submittedOrder.total)}\n` +
      `يرجى تأكيد الطلب والبدء بالتجهيز والتوصيل. شكراً لكم!`
    );
    window.open(`https://wa.me/9647800000000?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={submittedOrder ? undefined : onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-base">
                {submittedOrder ? 'تم تأكيد طلبك بنجاح' : 'إتمام الطلب وبيانات التوصيل'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6">
            {!submittedOrder ? (
              /* Checkout Form */
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      الاسم الكامل <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: علي محمد حسن"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم الهاتف (للتواصل والتوصيل) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0780xxxxxxx أو 0770xxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 dir-ltr text-right"
                    />
                  </div>
                </div>

                {/* Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      المحافظة <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={governorate}
                      onChange={(e) => setGovernorate(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 bg-white"
                    >
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>{gov}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      العنوان التفصيلي وأقرب نقطة دالة <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="اسم الحي / الزقاق / المحلة / معلم معروف"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ملاحظات إضافية للمندوب (اختياري)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: يرجى التوصيل بعد الساعة 3 عصراً، أو الاتصال مسبقاً"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    طريقة الدفع المفضلة
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-slate-900 bg-slate-900/5 ring-1 ring-slate-900'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Banknote className="w-5 h-5 text-emerald-600" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-slate-900 bg-slate-900' : 'border-stone-400'}`}>
                          {paymentMethod === 'cod' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">الدفع عند الاستلام</div>
                      <div className="text-[11px] text-slate-500">ادفع نقداً للمندوب عند المعاينة</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('zaincash')}
                      className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'zaincash'
                          ? 'border-slate-900 bg-slate-900/5 ring-1 ring-slate-900'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Smartphone className="w-5 h-5 text-sky-600" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'zaincash' ? 'border-slate-900 bg-slate-900' : 'border-stone-400'}`}>
                          {paymentMethod === 'zaincash' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">محفظة زين كاش</div>
                      <div className="text-[11px] text-slate-500">تحويل إلكتروني فوري وسلس</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('qicard')}
                      className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                        paymentMethod === 'qicard'
                          ? 'border-slate-900 bg-slate-900/5 ring-1 ring-slate-900'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <CreditCard className="w-5 h-5 text-indigo-600" />
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${paymentMethod === 'qicard' ? 'border-slate-900 bg-slate-900' : 'border-stone-400'}`}>
                          {paymentMethod === 'qicard' && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">ماستركارد / كي كارد</div>
                      <div className="text-[11px] text-slate-500">بطاقات الدفع الإلكتروني</div>
                    </button>

                  </div>
                </div>

                {/* Order Summary Box */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>مجموع المنتجات ({items.reduce((s, i) => s + i.quantity, 0)} قطعة):</span>
                    <span className="tabular-nums font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>خصم الكوبون:</span>
                      <span className="tabular-nums">- {formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>أجور التوصيل إلى {governorate}:</span>
                    <span className="tabular-nums font-semibold">
                      {deliveryFee === 0 ? <strong className="text-emerald-600">مجاني</strong> : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-stone-200">
                    <span>المبلغ الإجمالي المستحق:</span>
                    <span className="tabular-nums text-base text-sky-700">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>جارٍ تأكيد الطلب...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>تأكيد الطلب الآن ({formatCurrency(grandTotal)})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  بالضغط على تأكيد الطلب، فإنك توافق على شروط الخدمة وسياسة الخصوصية لمتجر مكتبتي.
                </p>
              </form>
            ) : (
              /* Receipt & Confirmation View (Section 2.C Order Verification) */
              <div className="space-y-5 text-center">
                
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-1">
                    شكراً لك، تم استلام طلبك بنجاح!
                  </h4>
                  <p className="text-xs text-slate-500">
                    تم تسجيل طلبك وسيقوم فريق تجهيز الطلبات ببدء التغليف فوراً.
                  </p>
                </div>

                {/* Printable Order Receipt Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-right space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <div>
                      <span className="text-xs text-slate-500 block">رقم الطلب</span>
                      <strong className="text-base font-mono font-bold text-slate-900">{submittedOrder.id}</strong>
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-slate-500 block">تاريخ الطلب</span>
                      <span className="text-xs font-semibold text-slate-800">{submittedOrder.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-1">
                    <div>
                      <span className="text-slate-500">العميل:</span>{' '}
                      <strong className="text-slate-800">{submittedOrder.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">الهاتف:</span>{' '}
                      <strong className="text-slate-800 dir-ltr inline-block">{submittedOrder.phone}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500">عنوان التوصيل:</span>{' '}
                      <span className="text-slate-800">{submittedOrder.governorate} - {submittedOrder.address}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">طريقة الدفع:</span>{' '}
                      <span className="text-slate-800 font-semibold">
                        {submittedOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : submittedOrder.paymentMethod === 'zaincash' ? 'زين كاش' : 'ماستركارد / كي كارد'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">موعد الوصول:</span>{' '}
                      <span className="text-emerald-700 font-bold">{submittedOrder.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Itemized Table */}
                  <div className="border-t border-stone-200 pt-2 space-y-1">
                    <span className="text-xs font-bold text-slate-700 block mb-1">قائمة المنتجات:</span>
                    {submittedOrder.items.map((it) => (
                      <div key={it.product.id} className="flex justify-between text-xs text-slate-600">
                        <span>{it.product.title} × {it.quantity}</span>
                        <span className="tabular-nums font-semibold">{formatCurrency(it.product.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Final Total */}
                  <div className="border-t border-stone-200 pt-2 flex justify-between items-center text-sm font-black text-slate-900">
                    <span>المبلغ الإجمالي للدفع:</span>
                    <span className="text-base text-sky-700 tabular-nums">{formatCurrency(submittedOrder.total)}</span>
                  </div>
                </div>

                {/* Receipt Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleSendWhatsAppOrder}
                    className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>مراسلة واتساب للتأكيد الفوري</span>
                  </button>

                  <button
                    onClick={handleCopyReceipt}
                    className="py-3 px-4 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl border border-stone-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copiedReceipt ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>تم نسخ الإيصال!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>نسخ تفاصيل الإيصال</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePrint}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة الفاتورة</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1"
                  >
                    <span>العودة للتسوق</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
