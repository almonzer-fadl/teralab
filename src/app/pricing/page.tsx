'use client'
import React from 'react'
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import Pricing from '@/components/sections/pricing';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <NavigationBar />
      <Pricing />
      <Footer />
    </main>
  );
}