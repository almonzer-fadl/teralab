'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const AnimatedBackground = ({ className = '' }: { className?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCircleRef = useRef<HTMLDivElement>(null);
  const rightCircleRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const checkMobile = () => {
      try {
        setIsMobile(window.innerWidth <= 768);
      } catch {}
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isClient]);

  // Mouse tracking for spotlight effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Throttled scroll handler
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
    if (!isClient) return;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleMouseMove, isClient]);

  // Circle animation effects
  useEffect(() => {
    if (!isClient || !sectionRef.current) return;

    try {
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Only calculate if section is in view
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return;

      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));

      // Reduced intensity on mobile
      const rotateScale = isMobile ? 80 : 120;
      const translateScale = isMobile ? 40 : 60;
      const scaleDelta = isMobile ? 0.15 : 0.25;

      // Left circle - hidden on mobile
      if (leftCircleRef.current && !isMobile) {
        const el = leftCircleRef.current;
        const rotateZ = scrollProgress * rotateScale;
        const translateY = scrollProgress * -translateScale;
        const scale = 1 + scrollProgress * scaleDelta;
        el.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateZ(${rotateZ}deg)`;
      }

      // Right circle - shown on both mobile and desktop
      if (rightCircleRef.current) {
        const el = rightCircleRef.current;
        const rotateZ = scrollProgress * -rotateScale;
        const translateY = scrollProgress * translateScale;
        const scale = 1 + scrollProgress * scaleDelta;
        el.style.transform = `translate3d(0px, ${translateY}px, 0px) scale3d(${scale}, ${scale}, 1) rotateZ(${rotateZ}deg)`;
      }
    } catch (error) {
      console.error('Motion effect error:', error);
    }
  }, [scrollY, isMobile, isClient]);

  // Generate bubble data - using deterministic values to prevent hydration issues
  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: ((i * 7) % 80) + 30, // 30-110px - deterministic
    left: ((i * 13) % 100), // 0-100% - deterministic
    delay: ((i * 3) % 8), // 0-8s delay - deterministic
    duration: ((i * 5) % 15) + 20, // 20-35s duration - deterministic
    opacity: (((i * 11) % 30) / 100) + 0.1, // 0.1-0.4 opacity - deterministic
  }));

  return (
    <div
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Background with spotlight effect - always render, but dynamic only when isClient */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isClient ? `
            radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(251, 146, 60, 0.12) 0%,
              rgba(251, 146, 60, 0.06) 25%,
              rgba(251, 146, 60, 0.02) 50%,
              transparent 70%
            )
          ` : `
            radial-gradient(
              circle at 50% 50%,
              rgba(251, 146, 60, 0.12) 0%,
              rgba(251, 146, 60, 0.06) 25%,
              rgba(251, 146, 60, 0.02) 50%,
              transparent 70%
            )
          `
        }}
      />

      {/* Moving bubbles - always visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full border border-orange-500/20 bg-gradient-to-br from-orange-500/15 to-orange-600/8 backdrop-blur-sm"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              bottom: '-120px',
              opacity: bubble.opacity,
              animation: `bubble-float ${bubble.duration}s linear infinite`,
              animationDelay: `${bubble.delay}s`,
              filter: 'blur(0.5px)',
              boxShadow: `
                inset 0 0 30px rgba(251, 146, 60, 0.15),
                0 0 20px rgba(251, 146, 60, 0.08)
              `
            }}
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-3 rounded-full bg-gradient-to-br from-orange-400/25 to-transparent"
              style={{
                animation: `bubble-pulse ${bubble.duration * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${bubble.delay * 0.6}s`
              }}
            />
            {/* Highlight spot */}
            <div 
              className="absolute top-2 left-2 w-4 h-4 rounded-full bg-orange-300/30 blur-sm"
              style={{
                animation: `bubble-shimmer ${bubble.duration * 0.2}s ease-in-out infinite alternate`,
                animationDelay: `${bubble.delay * 0.3}s`
              }}
            />
          </div>
        ))}
      </div>

      {/* Left Circle - Hidden on mobile, but always rendered */}
      <div
        ref={leftCircleRef}
        className={`absolute -left-32 top-1/4 pointer-events-none z-0 ${isMobile ? 'hidden' : ''}`}
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          {/* Main circle */}
          <div 
            className="w-64 h-64 rounded-full bg-gradient-to-br from-orange-500/15 via-orange-600/20 to-orange-700/10 border border-orange-500/25 backdrop-blur-sm"
            style={{
              boxShadow: `
                inset 0 0 60px rgba(251, 146, 60, 0.2),
                0 0 80px rgba(251, 146, 60, 0.12),
                0 0 120px rgba(251, 146, 60, 0.06)
              `
            }}
          >
            {/* Inner circles */}
            <div className="absolute top-8 left-8 w-48 h-48 rounded-full border border-orange-400/20 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute top-16 left-16 w-32 h-32 rounded-full border border-orange-300/25 animate-spin" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />
            <div className="absolute top-24 left-24 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400/40 to-orange-600/20 animate-pulse" />
            
            {/* Rotating dots */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-orange-500/60 rounded-full animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-90px)`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Circle - Shown on both mobile and desktop, always rendered */}
      <div
        ref={rightCircleRef}
        className="absolute -right-32 bottom-1/4 pointer-events-none z-0"
        style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
      >
        <div className="relative">
          {/* Main circle */}
          <div 
            className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-orange-600/15 via-orange-500/20 to-orange-400/10 border border-orange-500/25 backdrop-blur-sm"
            style={{
              boxShadow: `
                inset 0 0 80px rgba(251, 146, 60, 0.2),
                0 0 100px rgba(251, 146, 60, 0.12),
                0 0 160px rgba(251, 146, 60, 0.06)
              `
            }}
          >
            {/* Multiple rotating rings */}
            <div className="absolute top-4 left-4 w-72 h-72 md:w-88 md:h-88 rounded-full border border-orange-400/15 animate-spin" style={{ animationDuration: '35s' }} />
            <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 rounded-full border border-orange-300/20 animate-spin" style={{ animationDuration: '28s', animationDirection: 'reverse' }} />
            <div className="absolute top-12 left-12 w-56 h-56 md:w-72 md:h-72 rounded-full border border-orange-500/18 animate-spin" style={{ animationDuration: '22s' }} />
            <div className="absolute top-20 left-20 w-40 h-40 md:w-56 md:h-56 rounded-full border border-orange-400/25 animate-spin" style={{ animationDuration: '16s', animationDirection: 'reverse' }} />
            
            {/* Center core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-orange-400/50 to-orange-600/30 animate-pulse">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-300/30 to-transparent animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            
            {/* Orbiting elements */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-orange-500/70 rounded-full animate-pulse"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-120px)`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes bubble-float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: var(--bubble-opacity, 0.3);
          }
          95% {
            opacity: var(--bubble-opacity, 0.3);
          }
          100% {
            transform: translateY(-120vh) translateX(80px) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes bubble-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.2);
          }
        }
        
        @keyframes bubble-shimmer {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;