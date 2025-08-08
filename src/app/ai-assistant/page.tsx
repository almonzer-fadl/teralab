'use client';
import React from 'react';
import AiAssistant from '@/components/AIAssistant';
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import { Zap, Target, Clock, Brain, Download, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AIAssistantPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <NavigationBar />
      
      {/* Main Content with top padding for fixed nav */}
      <div className="pt-16">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Assistant - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-xl overflow-hidden">
                <AiAssistant isPopup={false} />
              </div>
            </div>

            {/* Right Section - Usage Info, Stats, and Features */}
            <div className="lg:col-span-1 space-y-8">
              {/* How to Use Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t('aiAssistant.usage.title')}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {t('aiAssistant.usage.description')}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="group relative">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-600/20 to-orange-400/20 rounded-2xl border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">
                          {t('aiAssistant.usage.step1.title')}
                        </h4>
                        <p className="text-gray-300 text-sm mt-1">
                          {t('aiAssistant.usage.step1.description')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="group relative">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">
                          {t('aiAssistant.usage.step2.title')}
                        </h4>
                        <p className="text-gray-300 text-sm mt-1">
                          {t('aiAssistant.usage.step2.description')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="group relative">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-600/20 to-green-400/20 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Download className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-lg">
                          {t('aiAssistant.usage.step3.title')}
                        </h4>
                        <p className="text-gray-300 text-sm mt-1">
                          {t('aiAssistant.usage.step3.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t('aiAssistant.stats.title')}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Accuracy */}
                  <div className="group relative">
                    <div className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-400/10 rounded-2xl border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-orange-400 group-hover:scale-110 transition-transform duration-300">
                            {t('aiAssistant.stats.accuracy.value')}
                          </div>
                          <div className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.stats.accuracy.label')}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-orange-600/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <TrendingUp className="w-6 h-6 text-orange-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Speed */}
                  <div className="group relative">
                    <div className="p-6 bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            {t('aiAssistant.stats.speed.value')}
                          </div>
                          <div className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.stats.speed.label')}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-600/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Zap className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Satisfaction */}
                  <div className="group relative">
                    <div className="p-6 bg-gradient-to-br from-green-600/20 to-green-400/10 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">
                            {t('aiAssistant.stats.satisfaction.value')}
                          </div>
                          <div className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.stats.satisfaction.label')}
                          </div>
                        </div>
                        <div className="w-12 h-12 bg-green-600/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Sparkles className="w-6 h-6 text-green-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t('aiAssistant.features.title')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {/* Intelligent Planning */}
                  <div className="group relative">
                    <div className="p-4 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {t('aiAssistant.features.intelligent.title')}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.features.intelligent.description')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comprehensive Analysis */}
                  <div className="group relative">
                    <div className="p-4 bg-gradient-to-r from-indigo-600/20 to-indigo-400/20 rounded-2xl border border-indigo-500/30 hover:border-indigo-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {t('aiAssistant.features.comprehensive.title')}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.features.comprehensive.description')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instant Results */}
                  <div className="group relative">
                    <div className="p-4 bg-gradient-to-r from-pink-600/20 to-pink-400/20 rounded-2xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {t('aiAssistant.features.instant.title')}
                          </h4>
                          <p className="text-gray-300 text-sm mt-1">
                            {t('aiAssistant.features.instant.description')}
                          </p>
                        </div>
                      </div>
                    </div>
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