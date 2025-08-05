'use client'
import React from 'react'
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

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <NavigationBar />
      <HeroSlider />
      <MotionSection />
      <SliderOne />
      <SliderTwo />
      <About/>
      <Solutions/>
      <Brands/>
      <Footer/>
      <AIPopupWrapper />
    </main>
  );
} 
