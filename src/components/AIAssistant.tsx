'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Send, Bot, User, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
}

interface WorkshopData {
  businessType: string;
  location: string;
  budget: string;
  services: string[];
  timeline: string;
  experience: string;
  spaceSize: string;
  equipmentPreference: string;
}

const AIAssistant = ({ isPopup = true, onClose }: { isPopup?: boolean; onClose?: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [workshopData, setWorkshopData] = useState<Partial<WorkshopData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{ plan: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationFlow = useMemo(() => [
    {
      question: "مرحباً! أنا مساعد تيرالاب الذكي. سأساعدك في إنشاء خطة شاملة لورشة إصلاح السيارات. أولاً، ما نوع ورشة العمل التي تريد إقامتها؟",
      englishQuestion: "Hello! I'm TeraLab's AI assistant. I'll help you create a comprehensive auto repair workshop plan. First, what type of workshop do you want to establish?",
      options: [
        "ورشة إصلاح عامة / General Repair Shop",
        "ورشة متخصصة (كهرباء، ميكانيكا) / Specialized Workshop", 
        "مركز خدمة سريعة / Quick Service Center",
        "ورشة فاخرة / Premium Workshop"
      ],
      key: 'businessType'
    },
    {
      question: "ممتاز! الآن أخبرني عن الموقع المخطط له:",
      englishQuestion: "Excellent! Now tell me about your planned location:",
      options: [
        "السعودية - الرياض / Saudi Arabia - Riyadh",
        "السعودية - جدة / Saudi Arabia - Jeddah", 
        "الإمارات - دبي / UAE - Dubai",
        "الكويت / Kuwait",
        "موقع آخر / Other Location"
      ],
      key: 'location'
    },
    {
      question: "ما هو نطاق الميزانية المتاحة لديك؟",
      englishQuestion: "What's your available budget range?",
      options: [
        "أقل من 100,000 ريال / Less than 100K SAR",
        "100,000 - 300,000 ريال / 100K - 300K SAR",
        "300,000 - 500,000 ريال / 300K - 500K SAR", 
        "أكثر من 500,000 ريال / More than 500K SAR"
      ],
      key: 'budget'
    },
    {
      question: "ما الخدمات التي تود تقديمها؟ (يمكنك اختيار أكثر من خيار)",
      englishQuestion: "What services would you like to offer? (You can select multiple)",
      options: [
        "صيانة دورية / Regular Maintenance",
        "إصلاح المحركات / Engine Repair",
        "خدمات الكهرباء / Electrical Services",
        "إصلاح الهيكل والدهان / Body & Paint",
        "فحص شامل / Comprehensive Inspection"
      ],
      key: 'services',
      multiple: true
    },
    {
      question: "متى تخطط لافتتاح الورشة؟",
      englishQuestion: "When do you plan to open the workshop?",
      options: [
        "خلال شهر / Within 1 month",
        "خلال 3 أشهر / Within 3 months",
        "خلال 6 أشهر / Within 6 months",
        "خلال سنة / Within 1 year"
      ],
      key: 'timeline'
    },
    {
      question: "ما مستوى خبرتك في قطاع السيارات؟",
      englishQuestion: "What's your experience level in the automotive sector?",
      options: [
        "مبتدئ تماماً / Complete Beginner",
        "خبرة محدودة / Limited Experience", 
        "خبرة متوسطة / Moderate Experience",
        "خبرة واسعة / Extensive Experience"
      ],
      key: 'experience'
    },
    {
      question: "ما حجم المساحة المتاحة؟",
      englishQuestion: "What's the available space size?",
      options: [
        "أقل من 200 متر مربع / Less than 200 sqm",
        "200 - 400 متر مربع / 200 - 400 sqm",
        "400 - 600 متر مربع / 400 - 600 sqm",
        "أكثر من 600 متر مربع / More than 600 sqm"
      ],
      key: 'spaceSize'
    },
    {
      question: "ما تفضيلك لمعدات الورشة؟",
      englishQuestion: "What's your preference for workshop equipment?",
      options: [
        "معدات مستعملة موثوقة / Reliable Used Equipment",
        "معدات جديدة اقتصادية / New Budget Equipment",
        "معدات متطورة / Advanced Equipment",
        "أحدث التقنيات / Latest Technology"
      ],
      key: 'equipmentPreference'
    }
  ], []);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: conversationFlow[0].question,
        timestamp: new Date(),
        options: conversationFlow[0].options
      };
      setMessages([welcomeMessage]);
    }
  }, [conversationFlow, messages.length]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [messages]);

  const handleOptionSelect = (option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: option,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Update workshop data
    const currentQuestion = conversationFlow[currentStep];
    if (currentQuestion.multiple && currentQuestion.key === 'services') {
      setWorkshopData(prev => ({
        ...prev,
        [currentQuestion.key]: [...(prev.services || []), option]
      }));
    } else {
      setWorkshopData(prev => ({
        ...prev,
        [currentQuestion.key]: option
      }));
    }

    // Move to next question or generate plan
    setTimeout(() => {
      if (currentStep < conversationFlow.length - 1) {
        const nextStep = currentStep + 1;
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: conversationFlow[nextStep].question,
          timestamp: new Date(),
          options: conversationFlow[nextStep].options
        };
        setMessages(prev => [...prev, botMessage]);
        setCurrentStep(nextStep);
      } else {
        generateWorkshopPlan();
      }
    }, 1000);
  };

  const generateWorkshopPlan = async () => {
  setIsLoading(true);
  
  const loadingMessage: Message = {
    id: (Date.now() + 2).toString(),
    type: 'bot',
    content: "🤖 جاري إنشاء خطة الورشة المخصصة لك باستخدام الذكاء الاصطناعي...\n\n⏳ يرجى الانتظار، قد يستغرق هذا دقيقة...",
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, loadingMessage]);

  try {
    // Real API call instead of mock data
    const response = await fetch('/api/ai/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workshopData),
    });

    if (!response.ok) {
      throw new Error('Failed to generate plan');
    }

    const planData = await response.json();
    
    // Store the generated plan and image
    setGeneratedPlan(planData);
    setGeneratedImage(planData.imageUrl);
    
    const planMessage: Message = {
      id: (Date.now() + 3).toString(),
      type: 'bot',
      content: `🎯 **تم إنشاء خطة ورشة العمل المخصصة لك**

${planData.plan}

🎨 **تصميم الورشة المقترح:**
![Workshop Design](${planData.imageUrl})

**الخطوات التالية:**`,
      timestamp: new Date(),
      options: [
        "تحميل الخطة كاملة (PDF) / Download Full Plan (PDF)",
        "احجز استشارة مجانية / Book Free Consultation", 
        "ادفع وابدأ التنفيذ / Pay & Start Implementation"
      ]
    };
    
    setMessages(prev => [...prev.slice(0, -1), planMessage]);
    setIsLoading(false);
  } catch (error) {
    console.error('Error generating plan:', error);
    
    const errorMessage: Message = {
      id: (Date.now() + 4).toString(),
      type: 'bot',
      content: "عذراً، حدث خطأ في إنشاء الخطة. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.\n\nSorry, there was an error generating the plan. Please try again or contact us directly.",
      timestamp: new Date(),
      options: ["إعادة المحاولة / Try Again", "تواصل معنا / Contact Us"]
    };
    
    setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    setIsLoading(false);
  }
};

  const generatePlanSummary = () => {
    return `🎯 **خطة ورشة العمل المخصصة لك**

**نوع الورشة:** ${workshopData.businessType}
**الموقع:** ${workshopData.location}  
**الميزانية:** ${workshopData.budget}
**الخدمات:** ${workshopData.services?.join(', ')}
**الإطار الزمني:** ${workshopData.timeline}

**التقدير الأولي:**
• تكلفة الإعداد: ${calculateSetupCost()}
• العائد المتوقع: ${calculateROI()}
• مدة الاسترداد: ${calculatePaybackPeriod()}

**الخطوات التالية:**
1. خطة تفصيلية مع التصاميم
2. قائمة المعدات والأسعار  
3. خطة التسويق والإطلاق
4. برنامج التدريب والتشغيل

هل تود الحصول على الخطة الكاملة؟`;
  };

  const calculateSetupCost = () => {
    const budgetValue = workshopData.budget?.includes('100') ? 150000 : 
                       workshopData.budget?.includes('300') ? 400000 :
                       workshopData.budget?.includes('500') ? 650000 : 200000;
    return `${budgetValue.toLocaleString()} ريال`;
  };

  const calculateROI = () => {
    return "15-25% شهرياً";
  };

  const calculatePaybackPeriod = () => {
    return "18-24 شهر";
  };

  const handleActionSelect = async (action: string) => {
    if (action.includes('تصميم') || action.includes('Design')) {
      // Show workshop design image
      if (generatedImage) {
        const imageMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          content: `🎨 **تصميم الورشة المقترح:**\n\n![Workshop Design](${generatedImage})\n\nهذا تصميم مقترح لورشة العمل الخاصة بك بناءً على المتطلبات التي حددتها.`,
          timestamp: new Date(),
          options: [
            "تحميل الخطة كاملة (PDF) / Download Full Plan (PDF)",
            "احجز استشارة مجانية / Book Free Consultation", 
            "ادفع وابدأ التنفيذ / Pay & Start Implementation"
          ]
        };
        setMessages(prev => [...prev, imageMessage]);
      }
    }
    else if (action.includes('PDF') || action.includes('تحميل')) {
      // Generate and download PDF
      try {
        const response = await fetch('/api/ai/generate-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workshopData, plan: generatedPlan?.plan, imageUrl: generatedImage }),
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'teralab-workshop-plan.pdf';
          a.click();
        }
      } catch (error) {
        console.error('PDF generation error:', error);
      }
    } 
    else if (action.includes('استشارة') || action.includes('Consultation')) {
      // Open Calendly or booking
      window.open('https://calendly.com/teralab-consultation', '_blank');
    } 
    else if (action.includes('ادفع') || action.includes('Pay')) {
      // Create Stripe checkout
      try {
        const response = await fetch('/api/ai/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            serviceType: 'implementation',
            workshopData,
            userEmail: 'user@example.com' // You'll need to collect this
          }),
        });
        
        const { url } = await response.json();
        window.open(url, '_blank');
      } catch (error) {
        console.error('Payment error:', error);
      }
    }
  };

  const generatePDF = async () => {
    // Here you would integrate with your PDF generation service
    const pdfMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "تم إرسال الخطة الكاملة إلى بريدك الإلكتروني! / Full plan sent to your email!",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, pdfMessage]);
  };

  if (isPopup && isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all"
        >
          <Bot className="h-6 w-6" />
        </button>
      </div>
    );
  }

  const containerClass = isPopup 
    ? "fixed bottom-4 right-4 w-96 h-[600px] bg-black rounded-lg shadow-2xl border border-gray-800 z-50"
    : "w-full max-w-4xl mx-auto bg-black rounded-lg shadow-lg border border-gray-800";

  return (
    <div className={containerClass}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-white">TeraBot</span>
        </div>
        <div className="flex space-x-2">
          {isPopup && (
            <>
              <button 
                onClick={() => setIsMinimized(true)}
                className="hover:bg-gray-800 p-1 rounded text-gray-300 hover:text-white"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button 
                onClick={onClose}
                className="hover:bg-gray-800 p-1 rounded text-gray-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-black scroll-smooth">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-xs ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-orange-600' : 'bg-gray-700'
                }`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4 text-white" /> : 
                    <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-900 text-white '
                }`}>
                  <div className="text-sm whitespace-pre-wrap">
                    {message.content.includes('![') ? (
                      <div>
                        {message.content.split('\n').map((line, i) => {
                          if (line.includes('![') && line.includes('](')) {
                            const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
                            if (imageMatch) {
                              return (
                                <img
                                  key={i}
                                  src={imageMatch[1]}
                                  alt="Workshop Design"
                                  className="w-full h-48 object-cover rounded-lg my-3 border border-gray-600"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              );
                            }
                          }
                          return <div key={i}>{line}</div>;
                        })}
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                                                     onClick={() => {
                             if (message.options?.includes('PDF') || message.options?.includes('استشارة') || message.options?.includes('التنفيذ') || message.options?.includes('تصميم') || message.options?.includes('Design')) {
                               handleActionSelect(option);
                             } else {
                               handleOptionSelect(option);
                             }
                           }}
                          className="block w-full text-left p-2 bg-gray-800 rounded hover:bg-gray-700 text-white text-sm transition-colors"
                          disabled={isLoading}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className=" p-4 bg-black">
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="اكتب رسالتك هنا... / Type your message..."
            className="flex-1 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white placeholder-gray-400"
            onKeyPress={(e) => e.key === 'Enter' && currentInput.trim() && handleOptionSelect(currentInput)}
          />
          <button
            onClick={() => currentInput.trim() && handleOptionSelect(currentInput)}
            className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-colors"
            disabled={!currentInput.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;