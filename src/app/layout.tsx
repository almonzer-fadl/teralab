import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TeraLab - Auto Repair Shop Consulting | Tera Motors",
  description: "TeraLab provides comprehensive consulting services for auto repair shop development, training, and optimization. Transform your workshop with expert guidance from Tera Motors.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance optimizations */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global error handler to prevent ethereum and other errors
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.includes('ethereum') || e.message.includes('selectedAdress'))) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Prevent page reload on scroll issues
              let scrollTimeout;
              let isScrolling = false;
              
              window.addEventListener('scroll', function() {
                if (!isScrolling) {
                  isScrolling = true;
                  clearTimeout(scrollTimeout);
                  scrollTimeout = setTimeout(function() {
                    isScrolling = false;
                  }, 150);
                }
              }, { passive: true });
              
              // Prevent touch events from causing issues
              document.addEventListener('touchstart', function(e) {
                // Allow normal touch behavior
              }, { passive: true });
              
              document.addEventListener('touchmove', function(e) {
                // Allow normal touch behavior
              }, { passive: true });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
        }}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}