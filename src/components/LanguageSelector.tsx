import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      role="group" 
      aria-label="Language selection"
      className="flex items-center gap-2"
    >
      <button
        className={`px-3 py-1 rounded-l-md border transition-colors ${
          language === 'en'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Select English language"
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded-r-md border transition-colors ${
          language === 'pt-BR'
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
        onClick={() => setLanguage('pt-BR')}
        aria-pressed={language === 'pt-BR'}
        aria-label="Select Portuguese language"
      >
        PT
      </button>
    </div>
  );
}