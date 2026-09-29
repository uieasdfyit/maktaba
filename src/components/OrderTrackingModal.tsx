import React, { useState } from 'react';
import { Order } from '../types';
import { formatCurrency } from '../utils/format';
import { 
  X, 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone,
  AlertCircle
} from 'lucide-react';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
}) => {
  const [query, setQuery] = useState(recentOrders[0]?.id || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(recentOrders[0] || null);
  const [hasSearched, setHasSearched] = useState(recentOrders.length > 0);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setHasSearched(true);
    
    // Look up in recent orders or provide realistic simulated status for demonstration
    const found = recentOrders.find(
      (o) => o.id.toLowerCase() === query.trim().toLowerCase()
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      // Simulate demo mock order for custom number input
      setSearchedOrder({
        id: query.trim().toUpperCase(),
        date: 'اليوم، 10:30 صباحاً',
        customerName: 'زبون محترم',
        phone: '0780xxxxxxx',
        governorate: 'بغداد',
        address: 'الكرخ - حي الجامعة',
        items: [],
        subtotal: 25000,
        deliveryFee: 0,
        discount: 0,
        total: 25000,
        paymentMethod: 'cod',
        status: 'out_for_delivery',
        estimatedDelivery: 'اليوم بين 2:00 م و 5:00 م',
      });
    }
  };

  const steps = [
    { key: 'received', title: 'تم استلام الطلب', desc: 'تم توثيق الطلب وإرساله للمستودع', icon: Clock },
    { key: 'processing', title: 'قيد التجهيز والتغليف', desc: 'تجهيز الأدوات وفحص الجودة', icon: Package },
    { key: 'out_for_delivery', title: 'مع مندوب التوصيل', desc: 'الشحنة في طريقها إلى عنوانك', icon: Truck },
    { key: 'delivered', title: 'تم التسليم بنجاح', desc: 'استلام الشحنة وإتمام المعاملة', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'received': return 0;
      case 'processing': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      default: return 1;
    }
  };

  const activeIndex = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-400" />
              <h3 className="font-bold text-base">تتبع حالة شحنتك</h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Search Input */}
            <form onSubmit={handleSearch} className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                أدخل رقم الطلب الخاص بك:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="مثال: MKT-8492"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full text-xs pr-9 pl-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                >
                  بحث
                </button>
              </div>

              {recentOrders.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <span>طلباتك الأخيرة:</span>
                  {recentOrders.slice(0, 3).map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => {
                        setQuery(o.id);
                        setSearchedOrder(o);
                        setHasSearched(true);
                      }}
                      className="text-sky-600 font-mono hover:underline font-bold"
                    >
                      {o.id}
                    </button>
                  ))}
                </div>
              )}
            </form>

            {/* Tracking Status Display */}
            {hasSearched && searchedOrder ? (
              <div className="space-y-6 border-t border-stone-200 pt-5">
                
                {/* Order Summary Strip */}
                <div className="p-4 rounded-xl bg-sky-50/50 border border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">رقم الشحنة</span>
                    <strong className="text-slate-900 font-mono text-sm">{searchedOrder.id}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">الوجهة</span>
                    <strong className="text-slate-900">{searchedOrder.governorate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">الموعد المتوقع</span>
                    <strong className="text-emerald-700">{searchedOrder.estimatedDelivery}</strong>
                  </div>
                </div>

                {/* Vertical Stepper */}
                <div className="space-y-6 relative pr-4">
                  {/* Vertical line indicator */}
                  <div className="absolute right-7 top-4 bottom-4 w-0.5 bg-stone-200 -z-0" />

                  {steps.map((step, idx) => {
                    const isDone = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;
                    const StepIcon = step.icon;

                    return (
                      <div key={step.key} className="flex items-start gap-3.5 relative z-10">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                            isDone
                              ? 'bg-slate-900 border-slate-900 text-sky-400'
                              : 'bg-white border-stone-300 text-stone-400'
                          }`}
                        >
                          <StepIcon className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className={`text-xs font-bold ${isCurrent ? 'text-sky-700 font-black' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                              {step.title}
                            </h5>
                            {isCurrent && (
                              <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                                الحالة الحالية
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Support callout */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-600 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>لأي استفسار بخصوص موقع المندوب اتصل بخدمة العملاء:</span>
                  </div>
                  <a href="tel:07800000000" className="font-bold text-slate-900 hover:text-sky-600 dir-ltr">
                    07800000000
                  </a>
                </div>

              </div>
            ) : hasSearched ? (
              <div className="text-center py-8 text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
                <p className="text-xs font-bold text-slate-800">لم يتم العثور على شحنة بهذا الرقم</p>
                <p className="text-[11px]">يرجى التأكد من الرقم والرمز التعريفي (مثال: MKT-1234)</p>
              </div>
            ) : null}

          </div>

        </div>
      </div>
    </div>
  );
};
