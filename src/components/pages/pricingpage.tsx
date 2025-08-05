'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';

const PricingPage = () => {
  const { t } = useLanguage();

  const pricingPlans = [
    {
      id: 1,
      title: t('pricing.aiServices.title'),
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
      popular: false
    },
    {
      id: 2,
      title: t('pricing.consulting.title'),
      price: t('pricing.consulting.price'),
      period: t('pricing.consulting.period'),
      description: t('pricing.consulting.description'),
      features: [
        t('pricing.consulting.features.consulting'),
        t('pricing.consulting.features.coaching'),
        t('pricing.consulting.features.more')
      ],
      buttonText: t('pricing.consulting.button'),
      popular: true
    },
    {
      id: 3,
      title: t('pricing.fieldServices.title'),
      price: t('pricing.fieldServices.price'),
      period: t('pricing.fieldServices.period'),
      description: t('pricing.fieldServices.description'),
      features: [
        t('pricing.fieldServices.features.execution'),
        t('pricing.fieldServices.features.audit'),
        t('pricing.fieldServices.features.more')
      ],
      buttonText: t('pricing.fieldServices.button'),
      popular: false
    }
  ];

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
            backgroundImage: 'url("https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop&crop=center")'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              {t('pricing.title')}
              <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('pricing.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                        {t('pricing.popular')}
                      </span>
                    </div>
                  )}
                  
                  <Card className={`h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-orange-500 transition-all duration-300 ${plan.popular ? 'ring-2 ring-orange-500' : ''}`}>
                    <CardHeader className="text-center pb-8">
                      <CardTitle className="text-2xl md:text-3xl font-serif text-white mb-4">
                        {plan.title}
                      </CardTitle>
                      <div className="mb-4">
                        <span className="text-4xl md:text-5xl font-bold text-orange-500">
                          {plan.price}
                        </span>
                        <span className="text-gray-400 ml-2">
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-gray-300 text-lg">
                        {plan.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <ul className="space-y-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full py-3 px-6 rounded-lg font-bold transition-colors duration-200 ${
                          plan.popular 
                            ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                            : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <h2 className="text-3xl md:text-4xl font-serif text-white text-center mb-8">
                {t('pricing.additional.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('pricing.additional.customization.title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('pricing.additional.customization.description')}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t('pricing.additional.support.title')}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t('pricing.additional.support.description')}
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
