'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useServices } from "@/lib/constants";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import AnimatedBackground from '@/components/ui/motionBubbles';
import { useEffect, useState, useCallback } from 'react';

const SolutionsPage = () => {
  const { t } = useLanguage();
  const services = useServices();
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <>
      <NavigationBar/>
      <div className="bg-black text-white relative overflow-hidden">
        {/* Background Motion Bubbles */}
        <AnimatedBackground className="absolute inset-0 z-0" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative z-10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div 
                  className="transition-all duration-1000"
                  style={{
                    transform: isClient ? `translateY(${Math.max(0, scrollY * 0.05)}px)` : 'translateY(0px)',
                    opacity: isClient ? Math.max(0.7, 1 - scrollY * 0.0005) : 1
                  }}
                >
                  <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight">
                    {t('solutions.title')}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                    {t('solutions.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 relative z-10">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto space-y-12">
                {services.map((service, index) => {
                  const scrollOffset = isClient ? scrollY - (index * 300) : 0;
                  const translateY = isClient ? Math.max(0, scrollOffset * 0.03) : 0;
                  const opacity = isClient ? Math.max(0.6, 1 - Math.max(0, scrollOffset * 0.0003)) : 1;
                  
                  return (
                    <div 
                      key={service.id} 
                      className="group"
                      style={{
                        transform: `translateY(${translateY}px)`,
                        opacity: opacity
                      }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Service Number */}
                        <div className="text-right lg:order-1 order-2">
                          <span 
                            className="text-8xl md:text-9xl font-extralight text-gray-800 leading-none block transition-all duration-700 group-hover:scale-110 group-hover:text-orange-500/20"
                          >
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                        
                        {/* Service Content */}
                        <div className="lg:col-span-2 lg:order-2 order-1">
                          <div className="space-y-6 transition-all duration-500 group-hover:scale-105">
                            {/* Service Type Badge */}
                            <div className="inline-block">
                              <span className="text-sm font-medium text-orange-400 uppercase tracking-wider group-hover:text-orange-300 transition-colors duration-300">
                                {service.type}
                              </span>
                            </div>
                            
                            {/* Service Title */}
                            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight group-hover:text-orange-100 transition-colors duration-300">
                              {service.title}
                            </h2>
                            
                            {/* Service Description */}
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl group-hover:text-gray-300 transition-colors duration-300">
                              {service.intro}
                            </p>
                            
                            {/* Service Details */}
                            <div className="flex items-center justify-between pt-8 border-t border-gray-800 group-hover:border-orange-500/30 transition-colors duration-300">
                              <span className="text-sm text-gray-500 uppercase tracking-wider group-hover:text-gray-400 transition-colors duration-300">
                                {service.priceModel}
                              </span>
                              <button className="group/btn flex items-center text-orange-400 hover:text-orange-300 transition-all duration-300 hover:scale-110 hover:translate-x-2">
                                <span className="mr-2">{t('solutions.learnMore')}</span>
                                <svg className="w-4 h-4 transform group-hover/btn:translate-x-2 group-hover/btn:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section - Moved directly after features */}
          <section className="py-16 relative z-10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-light text-white">
                    Ready to Transform Your Workshop?
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Join hundreds of workshops that have already revolutionized their operations with our AI-powered solutions.
                  </p>
                  
                  <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {/* Primary CTA Button */}
                    <button className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 transform hover:-translate-y-1">
                      <span>Start Now</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
                    </button>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="pt-6 text-center">
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                      Get personalized solutions tailored to your workshop&apos;s specific needs and challenges.
                    </p>
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

export default SolutionsPage;