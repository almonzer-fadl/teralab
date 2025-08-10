'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalendlyConnectProps {
  onConnect?: (connected: boolean) => void;
  className?: string;
}

export default function CalendlyConnect({ onConnect, className = '' }: CalendlyConnectProps) {
  const { t } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user is already connected to Calendly
    checkCalendlyConnection();
  }, []);

  const checkCalendlyConnection = async () => {
    try {
      // Check if we have a Calendly access token
      const response = await fetch('/api/calendly/status');
      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.connected);
        if (data.connected && data.profile) {
          setUserProfile(data.profile);
        }
      }
    } catch (error) {
      console.error('Error checking Calendly connection:', error);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Redirect to Calendly OAuth
      window.location.href = '/api/auth/calendly';
    } catch (error) {
      console.error('Error connecting to Calendly:', error);
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/calendly/disconnect', {
        method: 'POST',
      });

      if (response.ok) {
        setIsConnected(false);
        setUserProfile(null);
        onConnect?.(false);
      }
    } catch (error) {
      console.error('Error disconnecting from Calendly:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Calendly Integration</h3>
            <p className="text-sm text-gray-400">Connect your calendar for seamless scheduling</p>
          </div>
        </div>
        
        {isConnected && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-400">Connected</span>
          </div>
        )}
      </div>

      {isConnected && userProfile ? (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">{userProfile.name}</p>
                <p className="text-sm text-gray-400">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Slug</p>
                <p className="text-white">{userProfile.slug}</p>
              </div>
              <div>
                <p className="text-gray-400">Timezone</p>
                <p className="text-white">{userProfile.timezone}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg transition-colors duration-200"
            >
              {isLoading ? 'Disconnecting...' : 'Disconnect Calendly'}
            </button>
            
            <a
              href="https://calendly.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-center"
            >
              Open Calendly
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-white mb-2">Connect Your Calendly</h4>
            <p className="text-gray-400 text-sm">
              Link your Calendly account to automatically sync meetings and manage your schedule
            </p>
          </div>

          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-800 disabled:to-purple-800 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              'Connect Calendly Account'
            )}
          </button>

          <div className="text-xs text-gray-500 text-center">
            By connecting, you authorize TeraLab to access your Calendly account
          </div>
        </div>
      )}
    </div>
  );
}
