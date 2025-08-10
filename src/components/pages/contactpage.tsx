'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NavigationBar from '@/components/sections/navigationBar';
import Footer from '@/components/sections/footer';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from 'react';
import AnimatedBackground from '@/components/ui/motionBubbles';

const ContactPage = () => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Only add event listener on client side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
    <NavigationBar/>
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Motion Bubbles */}
      <AnimatedBackground className="absolute inset-0 z-0" />
      
      {/* Hero Section with Motion Background */}
      <section className="relative py-20 overflow-hidden z-10">
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
                {t('contact.title')}
                <div className="w-32 h-1 bg-orange-500 mx-auto mt-4 animate-pulse"></div>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {t('contact.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section - Fluid Design */}
        <section className="py-20 relative z-10" ref={sectionRef}>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="What is this about?"
                      className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={6}
                      placeholder="Tell us more about your inquiry..."
                      className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <div className="text-center">
                    <Button 
                      type="submit"
                      className="px-10 py-4 text-lg font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/25 transform hover:-translate-y-1"
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>

              {/* Contact Information - Below the form */}
              <div className="pt-8 mt-16">
                <div className="text-center">
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                    <div className="text-center">
                      
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-white mb-2">Email</h4>
                      <p className="text-gray-400">info@teralab.com</p>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    <Footer />
    </>
  );
};

export default ContactPage;
