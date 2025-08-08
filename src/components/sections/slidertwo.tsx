'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SliderTwo = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !animationRef.current) return;

    const section = sectionRef.current;
    const animation = animationRef.current;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    // For mobile, start animation immediately when section enters viewport
    let scrollProgress;
    if (isMobile) {
      // Mobile: Start from 0 when section enters viewport
      scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (windowHeight + sectionHeight)
      ));
    } else {
      // Desktop: Original calculation
      scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (windowHeight + sectionHeight)
      ));
    }

    // Apply horizontal scroll animation with mobile optimization
    const translateX = scrollProgress * (isMobile ? -150 : -250); // Reduced movement on mobile
    animation.style.transform = `translate3d(${translateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
  }, [scrollY, isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="section--horizontal-scroll wf-section relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg,#000,#000)',
        minHeight: isMobile ? '15vh' : '20vh',
        paddingBottom: '20px'
      }}
    >
      <div 
        ref={animationRef}
        className="horizontal-animation flex items-center gap-4 md:gap-8"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&h=500&fit=crop&crop=center"
          loading="lazy"
          width="200"
          sizes="(max-width: 768px) 144px, 200px"
          alt="Auto repair workshop equipment"
          className="image-scroll w-24 h-24 md:w-36 md:h-36 object-cover rounded-lg shadow-2xl"
        />
        
        <h1 className="scroll-header text-3xl md:text-6xl lg:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheelsAlt')}
        </h1>
        
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop&crop=center"
          loading="lazy"
          width="200"
          sizes="(max-width: 768px) 144px, 200px"
          alt="Auto repair workshop equipment"
          className="image-scroll w-24 h-24 md:w-36 md:h-36 object-cover rounded-lg shadow-2xl"
        />
        
        <h1 className="scroll-header text-3xl md:text-6xl lg:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheelsAlt')}
        </h1>
      </div>
    </section>
  );
};

export default SliderTwo;