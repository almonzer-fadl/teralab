'use client';
import { useState } from 'react';
import { MessageCircle, Send, Phone } from 'lucide-react';

interface WhatsAppContactProps {
  phoneNumber: string;
  defaultMessage?: string;
  className?: string;
}

export default function WhatsAppContact({ 
  phoneNumber, 
  defaultMessage = "مرحباً، أود الاستفسار عن خدمات تيرالاب",
  className = "" 
}: WhatsAppContactProps) {
  const [message, setMessage] = useState(defaultMessage);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsAppClick = () => {
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    const whatsappNumber = formattedPhone.startsWith('966') ? formattedPhone : `966${formattedPhone}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* WhatsApp Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open WhatsApp contact"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Expanded Contact Form */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">تواصل معنا عبر واتساب</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الرسالة
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="اكتب رسالتك هنا..."
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleWhatsAppClick}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Send className="h-4 w-4 mr-2" />
              إرسال
            </button>
            <button
              onClick={() => window.open(`tel:${phoneNumber}`, '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              اتصال
            </button>
          </div>
        </div>
      )}
    </div>
  );
}