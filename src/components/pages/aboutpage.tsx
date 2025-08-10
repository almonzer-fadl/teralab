'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import AnimatedBackground from '@/components/ui/motionBubbles';
import { useEffect, useState, useRef } from 'react';

const AboutPage = () => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
    <NavigationBar/>
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Motion Bubbles */}
      <AnimatedBackground className="absolute inset-0 z-0" />
      {/* Hero Section with Motion Background */}
      <section className="relative py-20 overflow-hidden z-10">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
                {t('about.title')}
                <div className="w-32 h-1 bg-orange-500 mx-auto mt-4 animate-pulse"></div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content - Fluid Design */}
        <section className="py-20 relative z-10" ref={sectionRef}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              {/* Content Section - Fluid Design */}
              <div className="space-y-12 w-full">
                {/* Mission Section - Fluid Design */}
                <div className="relative group">
                  <div className="text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-white group-hover:text-orange-400 transition-colors duration-300">
                      {t('about.mission.title')}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                      {t('about.mission.description')}
                    </p>
                  </div>
                </div>

                {/* Features Grid - Centered Floating Elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    {
                      id: 'ai',
                      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                      title: t('about.features.ai.title'),
                      description: t('about.features.ai.description')
                    },
                    {
                      id: 'expertise',
                      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                      title: t('about.features.expertise.title'),
                      description: t('about.features.expertise.description')
                    },
                    {
                      id: 'endToEnd',
                      icon: "M13 10V3L4 14h7v7l9-11h-7z",
                      title: t('about.features.endToEnd.title'),
                      description: t('about.features.endToEnd.description')
                    }
                  ].map((feature) => (
                    <div 
                      key={feature.id}
                      className="group relative text-center"
                      style={{
                        transform: isClient ? `translateY(${scrollY * 0.02 * (feature.id === 'ai' ? 1 : feature.id === 'expertise' ? 2 : 3)}px)` : 'translateY(0px)',
                        transition: 'transform 0.1s ease-out'
                      }}
                    >
                      {/* Feature icon with floating animation */}
                      <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/25">
                          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d={feature.icon}/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Feature content */}
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
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
