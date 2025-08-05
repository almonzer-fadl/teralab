'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white mt-0 pt-0">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 mt-0 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Branding & Social Media */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="text-white">
                <div className="text-sm font-light">Tera</div>
                <div className="text-2xl font-serif italic">Lab</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/teralab" className="text-white hover:text-orange-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.x.com" className="text-white hover:text-orange-300 transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
            </div>
          </div>
          
          {/* Information Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">{t('footer.info')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/team" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.team')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.careers')}
                </a>
              </li>
              <li>
                <a href="/subscribe" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.subscribe')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/solutions" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.solutions')}
                </a>
              </li>
              <li>
                <a href="/consulting" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.consulting')}
                </a>
              </li>
              <li>
                <a href="/training" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.training')}
                </a>
              </li>
              <li>
                <a href="/marketing" className="text-gray-300 hover:text-orange-300 transition-colors">
                  {t('footer.marketing')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6">{t('footer.contactInfo')}</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Riyadh, Saudi Arabia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+966 50 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>info@teralab.io</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 TeraLab - {t('footer.rightsReserved')} | {t('footer.designedBy')} Tera Motors
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-orange-300 transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="/terms" className="text-gray-400 hover:text-orange-300 transition-colors">
                {t('footer.terms')}
              </a>
              <a href="/cookies" className="text-gray-400 hover:text-orange-300 transition-colors">
                {t('footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;