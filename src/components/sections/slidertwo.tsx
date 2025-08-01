'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SliderTwo = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
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

    // Calculate scroll progress within this section
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - sectionTop) / (windowHeight + sectionHeight)
    ));

    // Apply horizontal scroll animation
    const translateX = scrollProgress * -250;
    animation.style.transform = `translate3d(${translateX}px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
  }, [scrollY]);

  return (
    <section 
      ref={sectionRef}
      className="section--horizontal-scroll wf-section relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg,#000,#000)',
        minHeight: '20vh',
        paddingBottom: '20px'
      }}
    >
      <div 
        ref={animationRef}
        className="horizontal-animation flex items-center gap-8"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&h=500&fit=crop&crop=center"
          loading="lazy"
          width="200"
          sizes="200px"
          alt="Auto repair workshop equipment"
          className="image-scroll w-36 h-36 object-cover rounded-lg shadow-2xl"
        />
        
        <h1 className="scroll-header text-6xl md:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheelsAlt')}
        </h1>
        
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=500&fit=crop&crop=center"
          loading="lazy"
          width="200"
          sizes="200px"
          alt="Auto repair workshop equipment"
          className="image-scroll w-36 h-36 object-cover rounded-lg shadow-2xl"
        />
        
        <h1 className="scroll-header text-6xl md:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheelsAlt')}
        </h1>
      </div>
    </section>
  );
};

export default SliderTwo;