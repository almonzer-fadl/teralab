import { Suspense } from 'react';
import SuccessPageClient from './SuccessPageClient';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessPageClient />
    </Suspense>
  );
}