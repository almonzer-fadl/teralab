'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types
interface TranslationData {
  [key: string]: string | TranslationData;
}

interface LanguageContextType {
  locale: string;
  direction: 'ltr' | 'rtl';
  t: (key: string, options?: { returnObjects?: boolean }) => string;
  toggleLanguage: () => void;
  setLocale: (locale: string) => void;
}

// Import translation files
import enTranslations from '../../messages/en.json';
import arTranslations from '../../messages/ar.json';

const translations: Record<string, TranslationData> = {
  en: enTranslations,
  ar: arTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocale] = useState<string>('en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  // Update document direction and language when locale changes
  useEffect(() => {
    const newDirection: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    
    if (typeof window !== 'undefined') {
      try {
        document.documentElement.dir = newDirection;
        document.documentElement.lang = locale;
        
        // Save preference to localStorage
        if (window.localStorage) {
          localStorage.setItem('preferred-language', locale);
        }
      } catch (error) {
        console.error('Error updating document or localStorage:', error);
      }
    }
  }, [locale]);

  // Load saved language preference on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (window.localStorage) {
          const savedLanguage = localStorage.getItem('preferred-language');
          if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
            setLocale(savedLanguage);
          }
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    }
  }, []);

  const t = (key: string, options?: { returnObjects?: boolean }): string => {
    const keys = key.split('.');
    let value: string | TranslationData = translations[locale];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    // Always return as string for JSX compatibility
    return typeof value === 'string' ? value : String(value || key);
  };

  const toggleLanguage = (): void => {
    setLocale(prev => prev === 'en' ? 'ar' : 'en');
  };

  const value: LanguageContextType = {
    locale,
    direction,
    t,
    toggleLanguage,
    setLocale
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 