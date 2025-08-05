'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const Brands = () => {
  const { t } = useLanguage();

  const brands = [
    {
      name: 'TeraLab',
      logo: (
        <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
          TL
        </div>
      ),
      description: 'AI-Powered Workshop Solutions'
    },
    {
      name: 'Tera Motors',
      logo: (
        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-orange-500 font-bold text-xl">
          TM
        </div>
      ),
      description: 'Automotive Excellence'
    },
    {
      name: 'Workshop AI',
      logo: (
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          AI
        </div>
      ),
      description: 'Smart Workshop Planning'
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden mb-0 pb-0">
      {/* Background Circular Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            {t('brands.title')}
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {t('brands.subtitle')}
          </p>
        </div>
        
        {/* Brand Cards */}
        <div className="flex justify-center max-w-4xl mx-auto px-4">
            <div className="bg-black rounded-lg px-4 md:px-6 py-6 shadow-lg flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <Image src="/brands/teraWood.png" alt="TeraWood Logo" width={100} height={100} className="w-20 h-20 md:w-32 md:h-32" />
            <Image src="/brands/daqaiq.png" alt="Daqaiq Logo" width={100} height={100} className="w-20 h-20 md:w-32 md:h-32" />
            <Image src="/brands/daqaiqPlus.png" alt="Daqaiq Plus Logo" width={150} height={100} className="w-20 h-20 md:w-32 md:h-32" />
            <Image src="/brands/tera.png" alt="Tera Logo" width={100} height={100} className="w-20 h-20 md:w-32 md:h-32" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;