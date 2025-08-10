'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, Download, Calendar, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import WhatsAppContact from '@/components/WhatsAppContact';

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setIsLoading(false);
    }
  }, [sessionId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-4">Payment Successful! 🎉</h1>
          <p className="text-xl text-gray-300 mb-12">
            Thank you for choosing TeraLab! Your workshop plan is being prepared.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <Download className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Download Plan</h3>
              <p className="text-gray-400">Your detailed workshop plan will be sent to your email shortly.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book Consultation</h3>
              <p className="text-gray-400">Schedule a free consultation to discuss implementation.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <MessageCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Get Support</h3>
              <p className="text-gray-400">Our team is here to help you succeed.</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Book Free Consultation
            </button>
            <br />
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Contact - Only for paying customers */}
      <WhatsAppContact 
        phoneNumber="+966501234567" 
        defaultMessage="مرحباً، أود الاستفسار عن خدمات تيرالاب بعد الدفع"
        className="fixed bottom-6 right-6 z-50"
      />
    </div>
  );
}
