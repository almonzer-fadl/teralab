'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isNavigating, setIsNavigating] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
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

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-advance slides (pause during touch interaction and navigation)
  useEffect(() => {
    if (isDragging || isNavigating) return;
    
    // Slower timing for mobile devices
    const interval = isMobile ? 5000 : 3000;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, isDragging, isNavigating, isMobile]);

  // Pause auto-advance when user interacts with buttons
  const handleButtonClick = useCallback(() => {
    setIsNavigating(true);
    // Reset navigation state after a short delay
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setTranslateX(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTranslateX(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTranslateX(0);
  }, [slides.length]);

  // Touch event handlers with improved mobile handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    try {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setCurrentX(e.touches[0].clientX);
    } catch (error) {
      console.error('Error in touch start:', error);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    try {
      // Only prevent default if we're actually dragging
      if (Math.abs(e.touches[0].clientX - startX) > 10) {
        e.preventDefault();
      }
      const currentXPos = e.touches[0].clientX;
      setCurrentX(currentXPos);
      
      const diff = currentXPos - startX;
      // Reduce sensitivity on mobile
      setTranslateX(diff * (isMobile ? 0.5 : 1));
    } catch (error) {
      console.error('Error in touch move:', error);
    }
  }, [isDragging, startX, isMobile]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    try {
      setIsDragging(false);
      const diff = currentX - startX;
      // Higher threshold for mobile to prevent accidental swipes
      const threshold = isMobile ? 80 : 50;
      
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
    } catch (error) {
      console.error('Error in touch end:', error);
      setIsDragging(false);
      setTranslateX(0);
    }
  }, [isDragging, currentX, startX, isMobile, prevSlide, nextSlide]);

  // Mouse event handlers for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMobile) return; // Disable mouse events on mobile
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
  }, [isMobile]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || isMobile) return;
    
    const currentXPos = e.clientX;
    setCurrentX(currentXPos);
    
    const diff = currentXPos - startX;
    setTranslateX(diff);
  }, [isDragging, isMobile, startX]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging || isMobile) return;
    
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
  }, [isDragging, isMobile, currentX, startX, prevSlide, nextSlide]);

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

  // Cleanup effect to reset slider state
  useEffect(() => {
    return () => {
      setTranslateX(0);
      setIsDragging(false);
      setIsNavigating(false);
    };
  }, []);

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
            transition: isDragging ? 'none' : `transform ${isMobile ? '1.2s' : '0.8s'} ease-in-out`
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4"
      >
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-6">
            {slides[currentSlide].title}
          </h1>
          
          {slides[currentSlide].description && (
            <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90">
              {slides[currentSlide].description}
            </p>
          )}
          
          {/* Additional descriptive text based on slide */}
          {currentSlide === 0 && (
            <p className="text-base md:text-lg lg:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Get a complete workshop plan with AI-powered recommendations for equipment, layout, and financial projections
            </p>
          )}
          {currentSlide === 1 && (
            <p className="text-base md:text-lg lg:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Comprehensive training programs to develop skilled technicians and management teams for your workshop
            </p>
          )}
          {currentSlide === 2 && (
            <p className="text-base md:text-lg lg:text-xl mb-6 opacity-80 max-w-3xl mx-auto">
              Expert consulting services to optimize operations, increase efficiency, and maximize profitability
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentSlide === 0 ? (
              // Workshop Solutions slide - link to AI Assistant
              <Link
                href="/ai-assistant"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 rounded-full transition-colors duration-200 text-sm md:text-base"
                onClick={handleButtonClick}
              >
                <span>Start AI Planning</span>
                <ArrowRight size={20} />
              </Link>
            ) : (
              // Staff Development and Consulting slides - link to Solutions
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3 rounded-full transition-colors duration-200 text-sm md:text-base"
                onClick={handleButtonClick}
              >
                <span>{currentSlide === 1 ? 'Explore Staff Solutions' : 'View Consulting Services'}</span>
                <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </div>

        {/* Watch Story Button - Positioned left bottom */}
        <div className="absolute left-4 md:left-8 bottom-8">
          <button className="inline-flex items-center gap-2 text-white hover:text-orange-300 transition-colors duration-200">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Play size={16} className="ml-1" />
            </div>
            <span className="hidden md:block">{t('about.title')}</span>
          </button>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
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