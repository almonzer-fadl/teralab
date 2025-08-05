import React, { useState, useEffect } from 'react';
import AiAssistant from '@/components/AIAssistant';
import { Bot } from 'lucide-react';

const AIPopupWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds on first visit
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('teralab-ai-seen');
      if (!hasSeenPopup) {
        setShowPopup(true);
        localStorage.setItem('teralab-ai-seen', 'true');
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowPopup(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowPopup(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={handleOpen}
            className="group bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          >
            <Bot className="h-6 w-6" />
            {showPopup && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-900 rounded-lg shadow-lg p-3 border border-gray-700">
                <div className="text-sm text-white font-medium">
                  💡 مرحباً! أحتاج مساعدة في تخطيط ورشتي؟
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  اضغط للبدء مع المساعد الذكي
                </div>
                <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 border-r border-b border-gray-700"></div>
              </div>
            )}
          </button>
        </div>  
      )}

      {/* AI Assistant Popup */}
      {isOpen && <AiAssistant isPopup={true} onClose={handleClose} />}
    </>
  );
};

export default AIPopupWrapper;