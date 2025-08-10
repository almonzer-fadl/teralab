'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import WhatsAppContact from '@/components/WhatsAppContact';

export default function ProtectedWhatsApp() {
  const searchParams = useSearchParams();
  const [isPayingCustomer, setIsPayingCustomer] = useState(false);

  useEffect(() => {
    // Check if user came from success page or has valid session
    const sessionId = searchParams.get('session_id');
    const fromSuccess = sessionId || localStorage.getItem('teralab_payment_success');
    
    if (fromSuccess) {
      setIsPayingCustomer(true);
      // Store in localStorage for persistence during session
      localStorage.setItem('teralab_payment_success', 'true');
    }
  }, [searchParams]);

  // Only show WhatsApp for paying customers
  if (!isPayingCustomer) {
    return null;
  }

  return (
    <WhatsAppContact 
      phoneNumber="+966501234567" 
      defaultMessage="مرحباً، أود الاستفسار عن خدمات تيرالاب بعد الدفع"
    />
  );
}