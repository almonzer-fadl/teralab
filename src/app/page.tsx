'use client'
import React from 'react'
import NavigationBar from '@/components/navigationBar';
import HeroSlider from '@/components/heroSlider';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <NavigationBar />
      <HeroSlider />
    </main>
  );
} 
