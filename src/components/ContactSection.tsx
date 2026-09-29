import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, ChevronDown } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSentSuccess(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `مرحباً مكتبتي 📚، لدي استفسار:\nالاسم: ${name || 'زبون'}\nالرسالة: ${message || 'استفسار عن المنتجات والتوصيل'}`
    );
    window.open(`https://wa.me/9647800000000?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'كم تستغرق مدة توصيل الطلبات في العراق؟',
      a: 'يتم التوصيل داخل العاصمة بغداد خلال أقل من 24 ساعة، وإلى كافة المحافظات الأخرى (البصرة، أربيل، النجف، نينوى، وبقية المحافظات) خلال 24 إلى 48 ساعة كحد أقصى مع الاتصال الهاتفي المسبق من قبل المندوب.'
    },
    {
      q: 'هل يمكنني فحص الطلب والتأكد من الأدوات قبل الدفع؟',
      a: 'نعم بالتأكيد! سياستنا تتيح لك فتح الطرد ومعاينة المنتجات ومطابقتها والتأكد من سلامتها التامة قبل دفع المبلغ للمندوب.'
    },
    {
      q: 'هل توفرون أسعاراً خاصة لطلبات الجملة والمكاتب والمدارس؟',
      a: 'نعم، نقدم خصومات استثنائية وعروض تسعير رسمية للمؤسسات والشركات والمدارس والمراكز التدريبية. يرجى التواصل معنا عبر الواتساب أو البريد الإلكتروني لتزويدكم بقائمة أسعار الجملة.'
    },
    {
      q: 'ما هي طرق الدفع المتاحة في المتجر؟',
      a: 'نوفر الدفع النقدي عند الاستلام (COD)، محفظة زين كاش (ZainCash)، وبطاقات الماستركارد والكي كارد لتسهيل تجربة الشراء لجميع الزبائن.'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-stone-100/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 tracking-wider block mb-2">
            نحن هنا لمساعدتك دائماً
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
            اتصل بنا واستفسر عن أي منتج
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            فريق خدمة عملاء مكتبتي متاح طوال أيام الأسبوع للإجابة على استفساراتكم ومتابعة طلباتكم وتقديم الاستشارات في اختيار القرطاسية المناسبة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card (4 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-stone-100 pb-3">
                معلومات التواصل المباشر
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">الهاتف وخدمة الزبائن</span>
                    <a href="tel:07800000000" className="font-bold text-slate-900 hover:text-sky-600 dir-ltr text-base block">
                      07800000000
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">البريد الإلكتروني الرسمي</span>
                    <a href="mailto:info@maktabati.com" className="font-semibold text-slate-900 hover:text-sky-600 dir-ltr block">
                      info@maktabati.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">المعرض الرئيسي والمستودع</span>
                    <p className="font-medium text-slate-800">
                      بغداد - شارع المتنبي / فرع المنصور - العراق
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">ساعات العمل والرد</span>
                    <p className="font-medium text-slate-800">
                      السبت - الخميس: 9:00 ص إلى 10:00 م<br />
                      الجمعة: 2:00 م إلى 10:00 م
                    </p>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Action */}
              <div className="pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب فورية مباشرة</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form and FAQ (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Inquiry Form */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                أرسل لنا استفسارك أو طلبك الخاص
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                سنقوم بالرد عليك خلال أقل من 30 دقيقة خلال أوقات الدوام.
              </p>

              {sentSuccess ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-xs text-emerald-700">
                    شكراً لتواصلك مع مكتبتي. سيقوم فريق خدمة العملاء بالرد عليك هاتفياً أو عبر البريد.
                  </p>
                  <button
                    onClick={() => {
                      setSentSuccess(false);
                      setMessage('');
                    }}
                    className="text-xs text-emerald-800 font-bold hover:underline"
                  >
                    إرسال استفسار آخر
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكريم</label>
                      <input
                        type="text"
                        placeholder="اسمك الكامل"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف</label>
                      <input
                        type="tel"
                        placeholder="0780xxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 dir-ltr text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني (اختياري)</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 dir-ltr text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل الرسالة أو الطلب</label>
                    <textarea
                      rows={3}
                      placeholder="اكتب استفسارك عن منتج معين، أو تفاصيل كمية خاصة..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-sky-400" />
                    <span>إرسال الاستفسار الآن</span>
                  </button>
                </form>
              )}
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                الأسئلة الشائعة
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-stone-200/80 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-4 py-3 text-right flex items-center justify-between text-xs font-bold text-slate-800 hover:bg-stone-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 mr-2 ${
                          openFaq === idx ? 'rotate-180 text-sky-600' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
