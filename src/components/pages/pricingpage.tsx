'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import AnimatedBackground from '@/components/ui/motionBubbles';
import { useEffect, useState, useRef } from 'react';

const PricingPage = () => {
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

  const pricingPlans = [
    {
      id: 1,
      title: t('pricing.aiServices.title'),
      subtitle: "Smart Automation",
      price: '$49',
      period: t('pricing.aiServices.period'),
      description: t('pricing.aiServices.description'),
      features: [
        t('pricing.aiServices.features.planning'),
        t('pricing.aiServices.features.booking'),
        t('pricing.aiServices.features.payment'),
        t('pricing.aiServices.features.more')
      ],
      buttonText: t('pricing.aiServices.button'),
      popular: false,
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: t('pricing.consulting.title'),
      subtitle: "Expert Guidance",
      price: t('pricing.consulting.price'),
      period: t('pricing.consulting.period'),
      description: t('pricing.consulting.description'),
      features: [
        t('pricing.consulting.features.consulting'),
        t('pricing.consulting.features.coaching'),
        t('pricing.consulting.features.more')
      ],
      buttonText: t('pricing.consulting.button'),
      popular: true,
      icon: "M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z",
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 3,
      title: t('pricing.fieldServices.title'),
      subtitle: "On-Site Support",
      price: t('pricing.fieldServices.price'),
      period: t('pricing.fieldServices.period'),
      description: t('pricing.fieldServices.description'),
      features: [
        t('pricing.fieldServices.features.execution'),
        t('pricing.fieldServices.features.audit'),
        t('pricing.fieldServices.features.more')
      ],
      buttonText: t('pricing.fieldServices.button'),
      popular: false,
      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <>
    <NavigationBar/>
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Motion Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Large circular spotlight effects */}
          <div 
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full pointer-events-none animate-pulse"
            style={{ 
              transform: isClient ? `translate(-50%, -50%) translateY(${scrollY * 0.1}px)` : 'translate(-50%, -50%) translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/8 rounded-full pointer-events-none animate-pulse"
            style={{ 
              transform: isClient ? `translate(50%, 50%) translateY(${-scrollY * 0.05}px)` : 'translate(50%, 50%) translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-orange-500/3 rounded-full pointer-events-none animate-pulse"
            style={{ 
              transform: isClient ? `translate(-50%, -50%) translateY(${scrollY * 0.08}px)` : 'translate(-50%, -50%) translateY(0px)',
              transition: 'transform 0.1s ease-out'
            }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              {t('pricing.title')}
              <div className="w-32 h-1 bg-orange-500 mx-auto mt-4 animate-pulse"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('pricing.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section - Fluid Design */}
      <section className="py-20 relative z-10" ref={sectionRef}>
        {/* Animated background bubbles */}
        <AnimatedBackground className="absolute inset-0 z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Pricing Explanation */}
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                Choose Your Path to Success
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                From AI-powered automation to hands-on expert guidance, we offer flexible solutions 
                that grow with your business. Start small with our AI services or go all-in with 
                comprehensive consulting.
              </p>
            </div>

            {/* Pricing Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={plan.id} 
                  className="relative group"
                  style={{
                    transform: isClient ? `translateY(${scrollY * 0.02 * (index + 1)}px)` : 'translateY(0px)',
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-500/25">
                        {t('pricing.popular')}
                      </span>
                    </div>
                  )}
                  
                  {/* Plan Card */}
                  <div className={`relative h-full text-center p-8 rounded-3xl transition-all duration-500 group-hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-gray-900/60 to-gray-800/40 ring-2 ring-orange-500/50' 
                      : 'bg-gradient-to-br from-gray-900/40 to-gray-800/20'
                  } backdrop-blur-xl border border-gray-700/30 hover:border-orange-500/50`}>
                    
                    {/* Plan Icon */}
                    <div className="mb-6 flex justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d={plan.icon}/>
                        </svg>
                      </div>
                    </div>

                    {/* Plan Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                        {plan.title}
                      </h3>
                      <p className="text-orange-400 font-medium mb-4">
                        {plan.subtitle}
                      </p>
                      <div className="mb-4">
                        <span className="text-4xl md:text-5xl font-bold text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-400 ml-2 text-lg">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                    
                    {/* Plan Features */}
                    <div className="mb-8 space-y-4">
                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <div className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            </div>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Plan Button */}
                    <Button 
                      className={`w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 shadow-lg ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/25' 
                          : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-orange-500'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Comparison */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-8">
                Still Not Sure? Here&apos;s How to Choose:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Start with AI Services</h4>
                  <p className="text-gray-400 text-sm">
                    Perfect if you want to automate specific tasks and see immediate results. 
                    Great for testing our solutions before committing to larger projects.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Choose Consulting</h4>
                  <p className="text-gray-400 text-sm">
                    Ideal for serious business transformation. Get expert guidance, 
                    custom strategies, and ongoing support to build a thriving workshop.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white">Go Full Service</h4>
                  <p className="text-gray-400 text-sm">
                    For complete workshop development. We handle everything from 
                    planning to execution, ensuring your success every step of the way.
                  </p>
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

export default PricingPage;
