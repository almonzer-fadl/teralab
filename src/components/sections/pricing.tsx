'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const Pricing = () => {
  const { t } = useLanguage();

  const getFeatures = (key: string): string[] => {
    const features = t(key, { returnObjects: true });
    return Array.isArray(features) ? features : [];
  };

  const tiers = [
    {
      title: t('pricing.basic.title'),
      price: t('pricing.basic.price'),
      description: t('pricing.basic.description'),
      features: getFeatures('pricing.basic.features')
    },
    {
      title: t('pricing.pro.title'),
      price: t('pricing.pro.price'),
      description: t('pricing.pro.description'),
      features: getFeatures('pricing.pro.features')
    },
    {
      title: t('pricing.enterprise.title'),
      price: t('pricing.enterprise.price'),
      description: t('pricing.enterprise.description'),
      features: getFeatures('pricing.enterprise.features')
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 uppercase">
            {t('nav.pricing')}
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div key={index} className="flex flex-col items-center text-center p-8 bg-gray-800/20 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">{tier.title}</h3>
              <p className="text-4xl font-bold text-orange-500 mb-4">{tier.price}</p>
              <p className="text-white/80 mb-6">{tier.description}</p>
              <ul className="text-white/80 space-y-4">
                {Array.isArray(tier.features) && tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-6 h-6 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;