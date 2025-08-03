'use client'
import React from 'react'
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import AboutPage from '@/components/sections/aboutPage';

export default function About() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <NavigationBar />
      <AboutPage />
      <Footer />
    </main>
  );
}