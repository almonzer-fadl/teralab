'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useServices } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';

const SolutionsPage = () => {
  const { t } = useLanguage();
  const services = useServices();

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
              {t('solutions.title')}
              <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('solutions.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-orange-500 transition-all duration-300 group">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                        </svg>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {service.type}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-serif text-white group-hover:text-orange-400 transition-colors duration-200">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-gray-300 leading-relaxed">
                      {service.intro}
                    </p>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                      <span className="text-sm font-medium text-gray-400">
                        {service.priceModel}
                      </span>
                      <button className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200">
                        {t('solutions.learnMore')} →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                {t('solutions.features.title')}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {t('solutions.features.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('solutions.features.ai.title')}
                </h3>
                <p className="text-gray-400">
                  {t('solutions.features.ai.description')}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('solutions.features.expertise.title')}
                </h3>
                <p className="text-gray-400">
                  {t('solutions.features.expertise.description')}
                </p>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {t('solutions.features.integration.title')}
                </h3>
                <p className="text-gray-400">
                  {t('solutions.features.integration.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight mb-8">
                {t('solutions.cta.title')}
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-8">
                {t('solutions.cta.description')}
              </p>
              <button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-colors duration-200">
                {t('solutions.cta.button')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default SolutionsPage;
