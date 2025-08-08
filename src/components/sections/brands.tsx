'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef, useCallback } from 'react';

const Brands = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Optimized intersection observer with better performance
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !isVisible) {
      // Use requestAnimationFrame for smoother state updates
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
      // Disconnect observer once visible to improve performance
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create observer with better options for performance
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '100px' // Increased margin for earlier detection
    });

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  const handleImageError = useCallback((imageName: string, element: HTMLImageElement) => {
    // Create fallback element
    const fallback = document.createElement('div');
    fallback.className = 'w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-500 font-bold text-lg';
    fallback.textContent = imageName.charAt(0);
    
    // Replace the image with fallback
    if (element.parentElement) {
      element.parentElement.replaceChild(fallback, element);
    }
  }, []);

  const brands = [
    {
      name: 'TeraWood',
      image: '/brands/teraWood.png',
      alt: 'TeraWood Logo'
    },
    {
      name: 'Daqaiq',
      image: '/brands/daqaiq.png',
      alt: 'Daqaiq Logo'
    },
    {
      name: 'Daqaiq Plus',
      image: '/brands/daqaiqPlus.png',
      alt: 'Daqaiq Plus Logo'
    },
    {
      name: 'Tera',
      image: '/brands/tera.png',
      alt: 'Tera Logo'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-black text-white overflow-hidden"
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent"></div>
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4 md:mb-6">
            {t('brands.title')}
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('brands.subtitle')}
          </p>
        </div>
        
        {/* Brand Logos - Optimized Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
            {brands.map((brand, index) => (
              <div
                key={brand.name}
                className={`group relative transition-all duration-300 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  transitionDelay: isVisible ? `${index * 75}ms` : '0ms',
                  willChange: isVisible ? 'transform, opacity' : 'auto'
                }}
              >
                <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-3 md:p-4 lg:p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20">
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                    onError={(e) => handleImageError(brand.name, e.target as HTMLImageElement)}
                    style={{
                      willChange: 'opacity'
                    }}
                  />
                  <div className="mt-2 text-center">
                    <p className="text-xs md:text-sm text-gray-300 font-medium">
                      {brand.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;