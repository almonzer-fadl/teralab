import { Suspense } from 'react';
import SuccessPageClient from './SuccessPageClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">جاري التحميل...</p>
        </div>
      </div>
    }>
      <SuccessPageClient />
    </Suspense>
  );
}