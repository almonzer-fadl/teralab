'use client'
import React, { Suspense } from 'react'
import HeroSlider from '@/components/sections/heroSlider';
import NavigationBar from '@/components/sections/navigationBar';
import MotionSection from '@/components/sections/motionSection';
import SliderOne from '@/components/sections/sliderOne';
import SliderTwo from '@/components/sections/slidertwo';
import About from '@/components/sections/about';
import Solutions from '@/components/sections/solutions';
import Brands from '@/components/sections/brands';
import Footer from '@/components/sections/footer';
import AIPopupWrapper from '@/components/AIPopupWrapper';

// Loading component for sections
const SectionLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
  </div>
);

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black overflow-hidden">
        <NavigationBar />
        
        {/* Hero Slider - Critical section, load immediately */}
        <HeroSlider />
        
        {/* Other sections with Suspense for better performance */}
        <Suspense fallback={<SectionLoader />}>
          <MotionSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SliderOne />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <SliderTwo />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <About/>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Solutions/>
        </Suspense>
        
        {/* Optimized Brands section */}
        <Suspense fallback={<SectionLoader />}>
          <Brands/>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Footer/>
        </Suspense>
      </main>
      
      {/* AI Assistant - Floating outside main content */}
      <AIPopupWrapper />
    </>
  );
} 
