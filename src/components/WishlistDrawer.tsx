import React from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  wishlistIds: string[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  wishlistIds,
  onRemoveWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="text-lg font-bold text-slate-900">قائمة المفضلة</h2>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold tabular-nums">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-200 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 py-12">
                <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-4 text-rose-400">
                  <Heart className="w-9 h-9" />
                </div>
                <p className="text-base font-semibold text-slate-700 mb-1">لا توجد منتجات في المفضلة</p>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  اضغط على أيقونة القلب على أي منتج لحفظه والرجوع إليه لاحقاً
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                >
                  استكشاف المنتجات
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      onClose();
                      onQuickView(product);
                    }}
                    className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-stone-200/60 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        onClose();
                        onQuickView(product);
                      }}
                      className="text-xs font-bold text-slate-900 truncate hover:text-sky-600 cursor-pointer"
                    >
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-1">
                      {product.category}
                    </p>
                    <div className="text-xs font-bold text-slate-900 tabular-nums">
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                      title="إزالة من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-sky-400" />
                      <span>للسلة</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-sky-400" />
                <span>إضافة جميع العناصر المفضلة للسلة</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
