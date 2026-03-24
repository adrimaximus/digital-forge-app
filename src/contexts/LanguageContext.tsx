import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    'hero.title.1': 'Because Your Brand ',
    'hero.title.2': 'Deserves the Best',
    'hero.subtitle': 'Betterworks adalah portal aktivasi brand & tools berbasis AI yang powerful untuk startup, entrepreneur, dan brand. Layanan modern dan efisien untuk hasil kerja yang lebih baik.',
    'hero.cta.contact': 'Hubungi Kami',
    'hero.cta.services': 'Pelajari Layanan',
  },
  en: {
    'hero.title.1': 'Because Your Brand ',
    'hero.title.2': 'Deserves the Best',
    'hero.subtitle': 'Betterworks is a powerful AI-driven brand activation portal & tools for startups, entrepreneurs, and brands. Modern and efficient services for better work results.',
    'hero.cta.contact': 'Contact Us',
    'hero.cta.services': 'Explore Services',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['id']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
