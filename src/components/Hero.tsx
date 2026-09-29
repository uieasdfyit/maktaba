import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onBrowseClick: () => void;
  onOpenTracking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBrowseClick, onOpenTracking }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="مكتبتي للأدوات والقرطاسية المكتبية"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-36 text-center">
        
        {/* Subtle Editorial Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-300 font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>المتجر المفضل لطلاب الجامعات والمكاتب الاحترافية في العراق</span>
        </div>

        {/* Main Headline */}
        <h1 
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight lg:leading-tight mb-6 text-white"
          style={{ textWrap: 'balance' }}
        >
          أفضل الأدوات المكتبية <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-amber-200">
            لعملك ودراستك وإبداعك
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          style={{ textWrap: 'balance' }}
        >
          تشكيلة واسعة ومختارة بعناية من أرقى الدفاتر، أطقم الأقلام، منظمات المكاتب العصرية وحقائب الظهر بأفضل الأسعار مع توصيل سريع لجميع المحافظات.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            onClick={onBrowseClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold text-base rounded-xl shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            <span>تصفح المنتجات</span>
            <ArrowLeft className="w-5 h-5" />
          </a>

          <button
            onClick={onOpenTracking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 active:bg-white/20 text-white font-semibold text-base rounded-xl backdrop-blur-md border border-white/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>تتبع شحنتك الحالية</span>
          </button>
        </div>

      </div>

      {/* Trust Highlights Strip */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center justify-center gap-2.5 py-1">
              <Truck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>توصيل سريع لبغداد وكافة المحافظات خلال 24 - 48 ساعة</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 py-1 border-t sm:border-t-0 sm:border-r sm:border-l border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>الدفع عند الاستلام مع إمكانية الفحص قبل الدفع</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 py-1 border-t sm:border-t-0 border-white/10">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ضمان استبدال فوري خلال 7 أيام لجميع المشتريات</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
