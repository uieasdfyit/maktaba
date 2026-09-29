import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  Check, 
  Truck, 
  ShieldCheck, 
  Share2, 
  MessageCircle,
  Plus,
  Minus
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'shipping'>('details');

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `مرحباً مكتبتي 📚، أود الاستفسار وطلب المنتج التالي:\n` +
      `المنتج: ${product.title}\n` +
      `السعر: ${formatCurrency(product.price)}\n` +
      `الكمية: ${quantity}\n` +
      `الإجمالي: ${formatCurrency(product.price * quantity)}`
    );
    window.open(`https://wa.me/9647800000000?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden transform transition-all my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 border border-stone-200 shadow-xs transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Gallery / Image Column */}
            <div className="p-6 bg-stone-50 flex flex-col justify-center items-center relative border-b md:border-b-0 md:border-l border-stone-200">
              <div className="relative w-full aspect-square max-h-[380px] rounded-xl overflow-hidden shadow-inner bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.tag && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded">
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Trust Badges */}
              <div className="w-full mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-stone-200/60">
                  <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>توصيل سريع لكافة المحافظات</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-white rounded-lg border border-stone-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>ضمان جودة واستبدال</span>
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Module (Section 2.A) */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-sky-700">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="tabular-nums font-bold text-slate-800">{product.rating}</span>
                    <span>({product.reviewsCount} تقييم حقيقي)</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
                  {product.title}
                </h2>

                {/* Price block */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    متوفر في المستودع ({product.stockCount} قطعة)
                  </span>
                </div>

                {/* Tab Navigation for Detailed Info */}
                <div className="border-b border-stone-200 mb-4 flex gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors border-b-2 ${
                      activeTab === 'details'
                        ? 'border-slate-900 text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    الوصف والمميزات
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 transition-colors border-b-2 ${
                      activeTab === 'specs'
                        ? 'border-slate-900 text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    المواصفات الفنية
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 transition-colors border-b-2 ${
                      activeTab === 'shipping'
                        ? 'border-slate-900 text-slate-900'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    الشحن والاسترجاع
                  </button>
                </div>

                {/* Tab Content */}
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 min-h-[110px]">
                  {activeTab === 'details' && (
                    <div className="space-y-3">
                      <p>{product.detailedDescription}</p>
                      <ul className="space-y-1 text-slate-700">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="divide-y divide-stone-100 border border-stone-100 rounded-lg overflow-hidden">
                      {product.specs.map((spec, idx) => (
                        <div key={idx} className="grid grid-cols-2 p-2 bg-white even:bg-stone-50 text-xs">
                          <span className="font-semibold text-slate-500">{spec.label}</span>
                          <span className="text-slate-800 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2 text-xs">
                      <p className="font-medium text-slate-800">سياسة الشحن والتوصيل:</p>
                      <p>• التوصيل داخل بغداد خلال 24 ساعة، والمحافظات الأخرى خلال 48 ساعة كحد أقصى.</p>
                      <p>• التوصيل مجاني للطلبات الإجمالية التي تزيد قيمتها عن 50,000 د.ع.</p>
                      <p>• يمكنك معاينة المنتج والتأكد من مطابقته قبل سداد المبلغ للمندوب.</p>
                      <p>• إمكانية الاستبدال أو الإرجاع خلال 7 أيام من تاريخ الاستلام.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Purchase Controls Row */}
              <div className="space-y-3 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-stone-200 text-slate-700 transition-colors"
                      aria-label="إنقاص الكمية"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-slate-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="p-2.5 hover:bg-stone-200 text-slate-700 transition-colors"
                      aria-label="زيادة الكمية"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت الإضافة بنجاح!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-sky-400" />
                        <span>إضافة للسلة ({formatCurrency(product.price * quantity)})</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className={`p-3 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-stone-300 hover:bg-stone-100 text-slate-600'
                    }`}
                    title={isWishlisted ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                {/* WhatsApp Quick Order Direct Action */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-2.5 px-4 rounded-xl border border-emerald-500/40 text-emerald-700 hover:bg-emerald-50 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>طلب مباشر وسريع عبر واتساب (07800000000)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
