'use client'
import React from 'react'
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import Contact from '@/components/sections/contact';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <NavigationBar />
      <Contact />
      <Footer />
    </main>
  );
}