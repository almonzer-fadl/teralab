'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const Solutions = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      title: t('solutions.feature1.title'),
      description: t('solutions.feature1.description')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      title: t('solutions.feature2.title'),
      description: t('solutions.feature2.description')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t('solutions.feature3.title'),
      description: t('solutions.feature3.description')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      title: t('solutions.feature4.title'),
      description: t('solutions.feature4.description')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: t('solutions.feature5.title'),
      description: t('solutions.feature5.description')
    },
    {
      icon: (
        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: t('solutions.feature6.title'),
      description: t('solutions.feature6.description')
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Circular Elements - Full circles like in the image */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 uppercase">
            {t('solutions.title')}
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
        </div>
        
        {/* Features Grid - Simple icons with text underneath */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
