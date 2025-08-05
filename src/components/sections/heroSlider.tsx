'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  description?: string;
}

const HeroSlider = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const slides: Slide[] = [
    {
      id: 1,
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      backgroundImage: "/images/hero-1.jpg",
      description: t('hero.slide1.description')
    },
    {
      id: 2,
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
        backgroundImage: "/images/hero-2.jpg",
        description: t('hero.slide2.description')
    },
    {
      id: 3,
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      backgroundImage: "/images/hero-3.png",
      description: t('hero.slide3.description')
    }
  ];

  // Auto-advance slides (pause during touch interaction)
  useEffect(() => {
    if (isDragging) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length, isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTranslateX(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTranslateX(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTranslateX(0);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentXPos = e.touches[0].clientX;
    setCurrentX(currentXPos);
    
    const diff = currentXPos - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = currentX - startX;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped right - go to previous slide
        prevSlide();
      } else {
        // Swiped left - go to next slide
        nextSlide();
      }
    } else {
      // Reset position if swipe wasn't strong enough
      setTranslateX(0);
    }
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentXPos = e.clientX;
    setCurrentX(currentXPos);
    
    const diff = currentXPos - startX;
    setTranslateX(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = currentX - startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      setTranslateX(0);
    }
  };

  // Prevent text selection during drag
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging]);

  return (
    <div 
      ref={sliderRef}
      className="relative h-screen overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translateX(0)' : 'translateX(100%)'
          }`}
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: isDragging ? `translateX(${translateX}px)` : 
              index === currentSlide ? 'translateX(0)' : 
              index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)',
            transition: isDragging ? 'none' : 'transform 0.8s ease-in-out'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center h-full text-white px-4 transition-transform duration-1000 ease-in-out"
          style={{
            transform: isDragging ? `translateX(${translateX * 0.1}px)` : 
              index === currentSlide ? 'translateX(0)' : 
              index < currentSlide ? 'translateX(-100%)' : 'translateX(100%)',
            transition: isDragging ? 'none' : 'transform 0.8s ease-in-out'
          }}
        >
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            {slide.title}
          </h1>
          
          {slide.description && (
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {slide.description}
            </p>
          )}
          
          {/* Additional descriptive text based on slide */}
          {index === 0 && (
            <p className="text-lg md:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Get a complete workshop plan with AI-powered recommendations for equipment, layout, and financial projections
            </p>
          )}
          {index === 1 && (
            <p className="text-lg md:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Comprehensive training programs to develop skilled technicians and management teams for your workshop
            </p>
          )}
          {index === 2 && (
            <p className="text-lg md:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Expert consulting services to optimize operations, increase efficiency, and maximize profitability
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {index === 0 ? (
              // Workshop Solutions slide - link to AI Assistant
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-colors duration-200"
              >
                <span>Start AI Planning</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              // Staff Development and Consulting slides - link to Solutions
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-colors duration-200"
              >
                <span>{index === 1 ? 'Explore Staff Solutions' : 'View Consulting Services'}</span>
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* Watch Story Button - Positioned left bottom */}
        <div className="absolute left-8 bottom-8">
          <button className="inline-flex items-center gap-2 text-white hover:text-orange-300 transition-colors duration-200">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Play size={16} className="ml-1" />
            </div>
            <span className="hidden md:block">{t('about.title')}</span>
          </button>
        </div>
      </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-orange-500 scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;