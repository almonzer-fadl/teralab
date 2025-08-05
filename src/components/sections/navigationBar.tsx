'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './languageSwitcher';
import Image from 'next/image'; 
const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: t('nav.home'), isActive: pathname === '/' },
    { href: '/solutions', label: t('nav.solutions'), isActive: pathname === '/solutions' },
    { href: '/about', label: t('nav.about'), isActive: pathname === '/about' },
    { href: '/contact', label: t('nav.contact'), isActive: pathname === '/contact' },
    { href: '/pricing', label: t('nav.pricing'), isActive: pathname === '/pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/0 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <div className="flex items-center">
          <Image src="/logo.png" alt="TeraLab Logo" width={90} height={90} />
          </div>
            <div className="text-white ml-0">
              <div className="text-m font-light">Tera</div>
              <div className="text-2xl font-serif italic">Lab</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  item.isActive
                    ? 'text-orange-400 font-medium'
                    : 'text-white hover:text-orange-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              className="text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 text-sm transition-colors duration-200 ${
                    item.isActive
                      ? 'text-orange-400 font-medium'
                      : 'text-white hover:text-orange-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;