'use client';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center">
          <XCircle className="h-24 w-24 text-red-500 mx-auto mb-8" />
          <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-xl text-gray-300 mb-12">
            No worries! Your payment was cancelled. You can try again anytime.
          </p>

          <div className="space-y-4">
            <button 
              onClick={() => window.history.back()}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center mx-auto"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <br />
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center mx-auto"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}