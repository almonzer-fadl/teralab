'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="relative lg:min-h-screen bg-black text-white overflow-hidden mb-0 pb-0">
      {/* Background Image - Train tracks at sunset */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
      />
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 mb-0 pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:min-h-screen gap-8">
          
          {/* Left Content - Text */}
          <div className="lg:w-1/2 lg:pr-12 w-full">
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6 md:mb-8">
              {t('about.title')}
              <div className="w-24 h-1 bg-orange-500 mt-4"></div>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8">
              {t('about.description')}
            </p>
            
            <a 
              href="/solutions" 
              className="inline-flex items-center gap-2 text-white hover:text-orange-300 transition-colors duration-200 text-lg"
            >
              {t('about.seeStory')}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
            </a>
          </div>
          
          {/* Right Content - Background Image (Hidden on mobile) */}
          <div className="lg:w-1/2 hidden lg:block">
            <div className="relative">
              <div 
                className="w-full h-96 lg:h-[600px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center")'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom padding for better spacing */}
      <div className="pb-8 md:pb-16 lg:pb-16"></div>
    </section>
  );
};

export default About;
