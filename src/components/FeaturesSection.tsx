import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones, Award, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Truck,
      number: '01',
      title: 'شحن سريع وموثوق',
      description: 'شحن يومي لجميع مناطق بغداد والمحافظات من البصرة إلى أربيل خلال 24 - 48 ساعة فقط بعناية فائقة بالتغليف.',
    },
    {
      icon: ShieldCheck,
      number: '02',
      title: 'الدفع عند المعاينة',
      description: 'تسوق بأمان تام. يمكنك فحص المنتجات ومطابقتها والتأكد من سلامتها قبل دفع المبلغ للمندوب نقداً أو عبر زين كاش.',
    },
    {
      icon: Award,
      number: '03',
      title: 'أدوات أصلية ومختارة',
      description: 'نستورد مستلزماتنا من علامات يابانية وأوروبية رائدة لضمان جودة الورق وثبات حبر الأقلام ومقاومة الأدوات للزمن.',
    },
    {
      icon: RefreshCw,
      number: '04',
      title: 'استبدال واسترجاع ميسر',
      description: 'ضمان ذهبي لمدة 7 أيام للاستبدال أو الاسترجاع في حال وجود أي عيب مصنعي أو رغبة في استبدال المنتج دون أي تعقيد.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 tracking-wider block mb-2">
            معايير الجودة والخدمة
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
            لماذا يختار الآلاف متجر مكتبتي؟
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            نجمع بين أناقة التصميم وأعلى معايير الجودة العالمية لنقدم تجربة تسوق قرطاسية ومستلزمات مكتبية فريدة في العراق.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.number}
                className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-black text-stone-300 tabular-nums">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                  <span>معتمد ومضمون 100%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
