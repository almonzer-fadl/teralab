'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 uppercase">
            {t('nav.contact')}
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">{t('contact.infoTitle')}</h3>
            <p className="text-white/80 mb-4">{t('contact.infoDescription')}</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                {t('contact.email')}
              </p>
              <p className="flex items-center">
                <svg className="w-6 h-6 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.76a11.034 11.034 0 006.364 6.364l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                {t('contact.phone')}
              </p>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80">{t('contact.form.name')}</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 bg-gray-800/20 border border-gray-700 rounded-md text-white focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80">{t('contact.form.email')}</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 bg-gray-800/20 border border-gray-700 rounded-md text-white focus:ring-orange-500 focus:border-orange-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-4 py-2 bg-gray-800/20 border border-gray-700 rounded-md text-white focus:ring-orange-500 focus:border-orange-500"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full py-3 px-4 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">{t('contact.form.submit')}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;