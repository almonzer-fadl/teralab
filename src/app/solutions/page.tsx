'use client'
import React from 'react'
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import SolutionsPage from '@/components/sections/solutionsPage';

export default function Solutions() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <NavigationBar />
      <SolutionsPage />
      <Footer />
    </main>
  );
}
