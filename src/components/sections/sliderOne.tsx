'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const SliderOne = () => {
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
    const translateX = scrollProgress * 300;
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
        <h1 className="scroll-header text-6xl md:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheels')}
        </h1>
        
        <img 
          src="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/616d2e8a5779dd38a044a7cc_girl%20on%20train.png"
          loading="lazy"
          width="250"
          sizes="250px"
          srcSet="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/616d2e8a5779dd38a044a7cc_girl%20on%20train-p-500.png 500w, https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/616d2e8a5779dd38a044a7cc_girl%20on%20train.png 785w"
          alt="Professional auto repair consulting"
          className="girl-train w-64 h-64 object-cover rounded-lg shadow-2xl"
        />
        
        <h1 className="scroll-header text-6xl md:text-8xl font-serif text-white whitespace-nowrap">
          {t('slider.storyOnWheels')}
        </h1>
      </div>
    </section>
  );
};

export default SliderOne;