'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(-50%, -50%)' }}></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8 uppercase">
            {t('nav.about')}
            <div className="w-32 h-1 bg-orange-500 mx-auto mt-4"></div>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('about.storyTitle')}</h3>
            <p className="text-white/80 leading-relaxed">{t('about.description')}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('about.missionTitle')}</h3>
            <p className="text-white/80 leading-relaxed">{t('about.missionDescription')}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">{t('about.visionTitle')}</h3>
            <p className="text-white/80 leading-relaxed">{t('about.visionDescription')}</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-4">{t('about.teamTitle')}</h3>
            <p className="text-white/80 leading-relaxed">{t('about.teamDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;