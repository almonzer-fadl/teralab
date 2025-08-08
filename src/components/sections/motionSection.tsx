'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MotionSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftElementRef = useRef<HTMLDivElement>(null);
  const rightElementRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      try {
        setIsMobile(window.innerWidth <= 768);
      } catch {}
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled scroll handler to prevent excessive calculations
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) return;
    
    scrollTimeoutRef.current = setTimeout(() => {
      try {
        setScrollY(window.scrollY);
      } catch (error) {
        console.error('Scroll error:', error);
      }
      scrollTimeoutRef.current = null;
    }, 16); // ~60fps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!sectionRef.current) return;

    try {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Only calculate if section is in view
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return;

      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));

      // Reduced intensity on mobile
      const rotateScale = isMobile ? 80 : 100;
      const translateScale = isMobile ? 80 : 100;
      const scaleDelta = isMobile ? 0.15 : 0.25;

      // Left element - hidden on mobile
      if (leftElementRef.current && !isMobile) {
        const el = leftElementRef.current;
        const rotateZ = scrollProgress * rotateScale;
        const translateY = scrollProgress * -translateScale;
        const scale = 1 + scrollProgress * scaleDelta;
        el.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateZ(${rotateZ}deg)`;
      }

      // Right element - shown on both mobile and desktop
      if (rightElementRef.current) {
        const el = rightElementRef.current;
        const rotateZ = scrollProgress * -rotateScale;
        const translateY = scrollProgress * translateScale;
        const scale = 1 + scrollProgress * scaleDelta;
        el.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateZ(${rotateZ}deg)`;
      }
    } catch (error) {
      console.error('Motion effect error:', error);
    }
  }, [scrollY, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex flex-row justify-center items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        backgroundImage:
          'url("https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/61770ee54ad1f6a993615dcd_bg-2.png")',
        backgroundPosition: '40% 40%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'border-box',
      }}
    >
      {/* Left Element - Original Jar (Hidden on mobile) */}
      <div
        ref={leftElementRef}
        className={`absolute -left-20 bottom-30 ${isMobile ? 'hidden' : ''}`}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <img
          src="https://uploads-ssl.webflow.com/6151b624205630b02dd2aa77/6157038e139ffa0c51f3901a_jar.png"
          alt="Professional auto repair tools"
          className="w-75 h-75 object-contain"
          style={{
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))',
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
              <div className="relative w-24 h-24 md:w-32 md:h-32 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-400">
                <div className="text-center text-white text-xs font-bold leading-tight">
                  <div className="mb-2 text-[8px] md:text-[10px] tracking-wider">{t('motion.badge.expertise')}</div>
                  <div className="w-5 h-5 md:w-7 md:h-7 mx-auto mb-2">
                    <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                    </svg>
                  </div>
                  <div className="border-t border-white/40 pt-1">
                    <div className="text-[8px] md:text-[10px] tracking-wider">{t('motion.badge.madeBy')}</div>
                    <div className="text-[8px] md:text-[10px] tracking-wider">{t('motion.badge.experience')}</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-5xl font-serif text-white leading-tight mb-8">
              <span className="block font-bold">{t('motion.title.line1')}</span>
              <span className="block text-orange-500 relative">
                {t('motion.title.line2')}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 md:w-32 h-1 bg-orange-500 rounded"></div>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {t('motion.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Element - Original Jar (Shown on both mobile and desktop) */}
      <div
        ref={rightElementRef}
        className="absolute -right-50 top-1/2 transform -translate-y-1/2"
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
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
            filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.5))',
          }}
        />
      </div>
    </section>
  );
};

export default MotionSection;