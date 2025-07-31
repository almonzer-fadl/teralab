'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MotionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress within this section
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - sectionTop) / (windowHeight + sectionHeight)
    ));

    // Apply motion effects to both elements
    if (leftElementRef.current) {
      const leftElement = leftElementRef.current;
      const rotateZ = scrollProgress * 100; // Gentle rotation for jar
      const translateY = scrollProgress * -100;
      const scale = 1 + scrollProgress * 0.25;
      leftElement.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateX(0deg) rotateY(0deg) rotateZ(${rotateZ}deg) skew(0deg, 0deg)`;
    }

    if (rightElementRef.current) {
      const rightElement = rightElementRef.current;
      const rotateZ = scrollProgress * -100; // Gentle counter-rotation for spice box
      const translateY = scrollProgress * 100;
      const scale = 1 + scrollProgress * 0.25;
      rightElement.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateX(0deg) rotateY(0deg) rotateZ(${rotateZ}deg) skew(0deg, 0deg)`;
    }
  }, [scrollY]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-row justify-center items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        backgroundImage: 'url("https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/61770ee54ad1f6a993615dcd_bg-2.png")',
        backgroundPosition: '40% 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'border-box'
      }}
    >
      {/* Left Element - Large Jar */}
      <div 
        ref={leftElementRef}
        className="absolute left-0 bottom-30"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/6157038e139ffa0c51f3901a_jar.png"
          alt="Professional auto repair tools"
          className="w-64 h-64 object-contain"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex items-center justify-center min-h-screen">

          {/* Center Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* Orange Badge */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-400">
                <div className="text-center text-white text-xs font-bold leading-tight">
                  <div className="mb-1 text-[10px] tracking-wider">{t('motion.badge.bornFrom')}</div>
                  <div className="mb-2 text-[10px] tracking-wider">{t('motion.badge.expertise')}</div>
                  {/* Wrench icon for auto repair */}
                  <div className="w-6 h-6 mx-auto mb-2">
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                    </svg>
                  </div>
                  <div className="border-t border-white/40 pt-1">
                    <div className="text-[10px] tracking-wider">{t('motion.badge.madeBy')}</div>
                    <div className="text-[10px] tracking-wider">{t('motion.badge.experience')}</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
              <span className="block font-bold">{t('motion.title.line1')}</span>
              <span className="block text-orange-500 relative">
                {t('motion.title.line2')}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-orange-500 rounded"></div>
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t('motion.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Element - Large Spice Box */}
      <div 
        ref={rightElementRef}
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        style={{
          willChange: 'transform',
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/6157038e139ffa0c51f3901a_jar.png"
          sizes="(max-width: 767px) 100vw, 500px"
          width="320"
          srcSet="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/6157038e139ffa0c51f3901a_jar-p-500.png 500w, https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/6157038e139ffa0c51f3901a_jar.png 553w"
          alt="Professional auto repair equipment"
          className="w-128 h-128 object-contain"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))'
          }}
        />
      </div>

    </section>
  );
};

export default MotionSection;