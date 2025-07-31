'use client'
import React from 'react'
import HeroSlider from '@/components/sections/heroSlider';
import NavigationBar from '@/components/sections/navigationBar';
import MotionSection from '@/components/sections/motionSection';
import SliderOne from '@/components/sections/sliderOne';
import SliderTwo from '@/components/sections/slidertwo';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationBar />
      <HeroSlider />
      <MotionSection />
      <SliderOne />
      <SliderTwo />
    </main>
  );
} 
