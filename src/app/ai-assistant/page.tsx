// app/ai-assistant/page.tsx
import React from 'react';
import AiAssistant from '@/components/AIAssistant';
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import { Bot, Zap, Target, Clock } from 'lucide-react';

const AIAssistantPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <NavigationBar />
      
      {/* Main Content with top padding for fixed nav */}
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-2 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    TeraBot
                  </h1>
                  <p className="text-gray-300">
                    مساعد تيرالاب الذكي
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-green-400" />
                  <span>متاح 24/7</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-400" />
                  <span>خطط مخصصة</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span>نتائج فورية</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* AI Assistant */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
                <AiAssistant isPopup={false} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Features */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  ✨ ما يقدمه المساعد الذكي
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-600 p-1 rounded">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">خطة مخصصة</div>
                      <div className="text-sm text-gray-300">خطة تفصيلية حسب احتياجاتك</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-600 p-1 rounded">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">تقدير دقيق</div>
                      <div className="text-sm text-gray-300">تكاليف وعوائد متوقعة</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-600 p-1 rounded">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-white">نتائج فورية</div>
                      <div className="text-sm text-gray-300">خطة جاهزة في دقائق</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl border border-orange-600 p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">إحصائيات النجاح</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>ورش منفذة</span>
                    <span className="font-bold">200+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل النجاح</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط العائد</span>
                    <span className="font-bold">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رضا العملاء</span>
                    <span className="font-bold">4.8/5</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AIAssistantPage;