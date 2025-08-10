import { Suspense } from 'react';
import ContactPage from '@/components/pages/contactpage';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Contact() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ContactPage />
    </Suspense>
  );
}