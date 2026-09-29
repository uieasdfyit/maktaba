import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, BookOpen, Truck, Phone } from 'lucide-react';
import { formatCurrency } from '../utils/format';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracking: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracking,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Slim Top Notice Bar */}
      {showBanner && (
        <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 text-center relative border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <span className="hidden sm:inline-block text-slate-400">
              خدمة العملاء: <span className="text-white font-medium">07800000000</span>
            </span>
            <div className="mx-auto flex items-center gap-2">
              <span className="font-semibold text-amber-300">توصيل مجاني</span>
              <span className="text-slate-400">·</span>
              <span>للطلبات بقيمة 50,000 د.ع أو أكثر لجميع المحافظات</span>
              <span className="text-slate-400 hidden md:inline">·</span>
              <span className="hidden md:inline text-sky-300 font-mono">كود: MAKTABATI10 (خصم 10%)</span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-slate-400 hover:text-white p-0.5 transition-colors"
              aria-label="إغلاق الإشعار"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation: Strict 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 text-slate-700 hover:text-slate-950 md:hidden transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center shadow-sm group-hover:bg-slate-800 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                مكتبتي
              </span>
            </a>
          </div>

          {/* Zone 2: Navigation Links (Clean unboxed text links) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">الرئيسية</a>
            <a href="#products" className="hover:text-slate-900 transition-colors">المنتجات</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">لماذا مكتبتي</a>
            <a href="#reviews" className="hover:text-slate-900 transition-colors">آراء العملاء</a>
            <button
              onClick={onOpenTracking}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="w-4 h-4 text-sky-600" />
              <span>تتبع طلبك</span>
            </button>
            <a href="#contact" className="hover:text-slate-900 transition-colors">اتصل بنا</a>
          </nav>

          {/* Zone 3: Primary Actions (Search, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input / Trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="absolute left-0 -top-4 w-64 sm:w-80 bg-white rounded-lg shadow-lg border border-stone-200 p-1 flex items-center z-50">
                  <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="ابحث عن قلم، دفتر، حقيبة..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-full text-sm bg-transparent outline-none px-2 py-1 text-slate-800"
                  />
                  <button
                    onClick={() => setShowSearchInput(false)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                  title="البحث"
                  aria-label="البحث"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-600 hover:text-rose-600 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="المفضلة"
              aria-label="قائمة المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all shadow-sm cursor-pointer"
              aria-label="سلة المشتريات"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-sky-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-sky-500 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center tabular-nums">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tabular-nums">
                {cartTotal > 0 ? formatCurrency(cartTotal) : 'السلة'}
              </span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full text-sm bg-stone-100 rounded-lg pr-9 pl-3 py-2 outline-none focus:ring-1 focus:ring-slate-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          </div>

          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-800">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              الرئيسية
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              تصفح المنتجات
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              مميزات الشراء
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              آراء العملاء
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracking();
              }}
              className="w-full text-right px-3 py-2 rounded-md hover:bg-stone-100 flex items-center justify-between"
            >
              <span>تتبع شحنة طلبك</span>
              <Truck className="w-4 h-4 text-sky-600" />
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-stone-100"
            >
              اتصل بنا
            </a>
          </nav>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
            <span>هاتف الاستفسار والواتساب:</span>
            <a href="tel:07800000000" className="text-slate-900 font-bold dir-ltr flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              07800000000
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
