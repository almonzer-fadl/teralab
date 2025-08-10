'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      // Fetch payment details and plan
      fetch(`/api/payment/verify?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setPlanData(data);
          setLoading(false);
        });
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">جاري التحقق من الدفع...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          تم الدفع بنجاح!
        </h1>
        <p className="text-gray-600 mb-6">
          Payment Successful!
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700">
            تحميل الخطة الكاملة
          </button>
          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700">
            احجز استشارة مجانية
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          تم إرسال الخطة إلى بريدك الإلكتروني
        </p>
      </div>
    </div>
  );
}
