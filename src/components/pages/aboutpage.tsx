'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <>
    <NavigationBar/>
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&h=800&fit=crop&crop=center")'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              {t('about.title')}
              <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Avatar Section */}
            <div className="lg:w-1/3 flex justify-center">
              <div className="relative">
                <Avatar className="w-64 h-64 border-4 border-orange-500 shadow-2xl">
                  <AvatarImage src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop&crop=center" />
                  <AvatarFallback className="text-4xl font-bold bg-orange-500 text-white">TL</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-2/3">
              <div className="space-y-8">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                    {t('about.mission.title')}
                  </h2>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    {t('about.description')}
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {t('about.mission.description')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('about.features.ai.title')}</h3>
                    <p className="text-gray-400">{t('about.features.ai.description')}</p>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('about.features.expertise.title')}</h3>
                    <p className="text-gray-400">{t('about.features.expertise.description')}</p>
                  </div>

                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{t('about.features.endToEnd.title')}</h3>
                    <p className="text-gray-400">{t('about.features.endToEnd.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
