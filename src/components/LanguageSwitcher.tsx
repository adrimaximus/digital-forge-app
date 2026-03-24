import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-block text-left z-50 group">
      <button className="flex items-center space-x-1 text-white hover:text-primary transition-colors text-sm px-2 py-1 rounded border border-white/20 hover:border-primary/50">
        <Globe size={14} />
        <span className="uppercase">{language}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-24 origin-top-right bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={() => setLanguage('id')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${language === 'id' ? 'text-primary font-medium' : 'text-foreground'}`}
            role="menuitem"
          >
            ID
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${language === 'en' ? 'text-primary font-medium' : 'text-foreground'}`}
            role="menuitem"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
