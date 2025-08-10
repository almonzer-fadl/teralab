'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }

    // Track custom events
    const trackEvent = (eventName: string, parameters?: any) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
      }
    };

    // Track AI Assistant usage
    if (pathname === '/ai-assistant') {
      trackEvent('ai_assistant_opened');
    }

    // Track payment success
    if (pathname === '/success') {
      trackEvent('payment_successful');
    }

  }, [pathname]);

  return null;
}

// Add gtag types
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
