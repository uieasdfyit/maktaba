import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-600 tracking-wider block mb-2">
              تقييمات موثقة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              تجارب حقيقية من عملائنا
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-sm tabular-nums">4.9 / 5</span>
            <span>بناءً على أكثر من 1,200 طلب تم تسليمه في العراق</span>
          </div>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <span title="مشتري مؤكد" className="inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    </span>
                  </h4>
                  <div className="text-[11px] text-slate-500">
                    {item.role} · {item.city}
                  </div>
                </div>

                <span className="text-[10px] text-slate-400">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
