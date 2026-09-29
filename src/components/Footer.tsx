import React from 'react';
import { BookOpen, Phone, Mail, MapPin, Heart, Truck, ShieldCheck, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenTracking: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTracking, onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-sky-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white">مكتبتي</span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              المتجر الشامل للأدوات والقرطاسية المكتبية والمدرسية في العراق. نوفر أجود الدفاتر، أطقم الأقلام، منظمات المكاتب، وحقائب العمل مع التوصيل السريع والدفع عند الاستلام.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>هاتف المبيعات والاستفسار:</span>
                <a href="tel:07800000000" className="text-white font-bold dir-ltr hover:text-sky-300">
                  07800000000
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>البريد الإلكتروني:</span>
                <a href="mailto:info@maktabati.com" className="text-white font-medium hover:text-sky-300 dir-ltr">
                  info@maktabati.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">روابط سريعة</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">الرئيسية</a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">المنتجات المميزة</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">مميزات الخدمة</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">آراء وتقييمات العملاء</a>
              </li>
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  تتبع شحنة طلبك
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">اتصل بنا</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">الأقسام الرئيسية</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onSelectCategory('notebooks')}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  دفاتر ومفكرات فاخرة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('pens')}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  أطقم أقلام حبر وجل
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('desk')}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  منظمات مكاتب عصرية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bags')}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  حقائب ظهر ومقالم
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('art')}
                  className="hover:text-white transition-colors text-right cursor-pointer"
                >
                  أدوات فنية وألوان مائية
                </button>
              </li>
            </ul>
          </div>

          {/* Payment & Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">طرق الدفع والشحن</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              نوفر جميع وسائل الدفع المعتمدة في العراق بكل أمان وشفافية:
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الدفع نقداً عند استلام الشحنة</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>زين كاش & ماستركارد & كي كارد</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar matching user prompt text */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p className="text-center sm:text-right">
            جميع حقوق النشر محفوظة لموقع مكتبتي © 2026
          </p>

          <p className="text-center">
            للتواصل والاستفسار: <a href="mailto:info@maktabati.com" className="text-slate-300 underline dir-ltr">info@maktabati.com</a> | هاتف: <a href="tel:07800000000" className="text-slate-300 font-bold dir-ltr">07800000000</a>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors p-1"
          >
            <span>للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
