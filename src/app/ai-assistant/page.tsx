'use client';
import React from 'react';
import AiAssistant from '@/components/AIAssistant';

const AIAssistantPage = () => {
  return (
    <div className="h-screen">
      <AiAssistant isPopup={false} />
    </div>
  );
};

export default AIAssistantPage;