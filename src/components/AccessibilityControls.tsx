import React, { useState } from 'react';
import { Sun, Moon, Type, TextQuote } from 'lucide-react';
import { useAccessibility, MIN_FONT_SIZE, MAX_FONT_SIZE, DEFAULT_FONT_SIZE } from '../contexts/AccessibilityContext';
import { useLanguage } from '../contexts/LanguageContext';

function Tooltip({ children, content, visible }: { children: React.ReactNode; content: string; visible: boolean }) {
  return (
    <div className="relative">
      {children}
      {visible && (
        <div 
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap"
          role="tooltip"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}

export function AccessibilityControls() {
  const { 
    highContrast, 
    setHighContrast, 
    fontSize, 
    increaseFontSize, 
    decreaseFontSize,
    resetFontSize
  } = useAccessibility();

  const { language } = useLanguage();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const tooltips = {
    en: {
      contrast: {
        enable: 'Enable high contrast mode',
        disable: 'Disable high contrast mode'
      },
      fontSize: {
        decrease: 'Decrease text size',
        increase: 'Increase text size',
        reset: 'Reset text size'
      }
    },
    'pt-BR': {
      contrast: {
        enable: 'Ativar modo de alto contraste',
        disable: 'Desativar modo de alto contraste'
      },
      fontSize: {
        decrease: 'Diminuir tamanho do texto',
        increase: 'Aumentar tamanho do texto',
        reset: 'Redefinir tamanho do texto'
      }
    }
  };

  const getTooltip = (key: keyof typeof tooltips['en']['fontSize'] | 'contrast') => {
    if (key === 'contrast') {
      return tooltips[language as keyof typeof tooltips].contrast[highContrast ? 'disable' : 'enable'];
    }
    return tooltips[language as keyof typeof tooltips].fontSize[key];
  };

  return (
    <div 
      className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-2 flex gap-2 border border-gray-300"
      role="group"
      aria-label="Accessibility controls"
    >
      <Tooltip 
        content={getTooltip('contrast')}
        visible={activeTooltip === 'contrast'}
      >
        <button
          onClick={() => setHighContrast(!highContrast)}
          onMouseEnter={() => setActiveTooltip('contrast')}
          onMouseLeave={() => setActiveTooltip(null)}
          onFocus={() => setActiveTooltip('contrast')}
          onBlur={() => setActiveTooltip(null)}
          className={`p-2 rounded-lg flex items-center gap-2 border ${
            highContrast 
              ? 'bg-black text-white border-black' 
              : 'bg-gray-800 text-white border-gray-900 hover:bg-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          aria-pressed={highContrast}
          aria-label={getTooltip('contrast')}
        >
          {highContrast ? (
            <Sun className="w-5 h-5 text-blue-500" aria-hidden="true" />
          ) : (
            <Moon className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </Tooltip>

      <div className="flex items-center gap-1">
        <Tooltip 
          content={getTooltip('decrease')}
          visible={activeTooltip === 'decrease'}
        >
          <button
            onClick={decreaseFontSize}
            onMouseEnter={() => setActiveTooltip('decrease')}
            onMouseLeave={() => setActiveTooltip(null)}
            onFocus={() => setActiveTooltip('decrease')}
            onBlur={() => setActiveTooltip(null)}
            className={`p-2 rounded-lg border ${
              highContrast 
                ? 'bg-black text-white border-black' 
                : 'bg-gray-800 text-white border-gray-900 hover:bg-gray-900'
            } focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none transition-colors`}
            aria-label={getTooltip('decrease')}
            disabled={fontSize <= MIN_FONT_SIZE}
          >
            <Type className="w-4 h-4 text-blue-500" aria-hidden="true" />
          </button>
        </Tooltip>
        
        <Tooltip 
          content={getTooltip('increase')}
          visible={activeTooltip === 'increase'}
        >
          <button
            onClick={increaseFontSize}
            onMouseEnter={() => setActiveTooltip('increase')}
            onMouseLeave={() => setActiveTooltip(null)}
            onFocus={() => setActiveTooltip('increase')}
            onBlur={() => setActiveTooltip(null)}
            className={`p-2 rounded-lg border ${
              highContrast 
                ? 'bg-black text-white border-black' 
                : 'bg-gray-800 text-white border-gray-900 hover:bg-gray-900'
            } focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none transition-colors`}
            aria-label={getTooltip('increase')}
            disabled={fontSize >= MAX_FONT_SIZE}
          >
            <Type className="w-5 h-5 text-blue-500" aria-hidden="true" />
          </button>
        </Tooltip>
        
        <Tooltip 
          content={getTooltip('reset')}
          visible={activeTooltip === 'reset'}
        >
          <button
            onClick={resetFontSize}
            onMouseEnter={() => setActiveTooltip('reset')}
            onMouseLeave={() => setActiveTooltip(null)}
            onFocus={() => setActiveTooltip('reset')}
            onBlur={() => setActiveTooltip(null)}
            className={`p-2 rounded-lg border ${
              highContrast 
                ? 'bg-black text-white border-black' 
                : 'bg-gray-800 text-white border-gray-900 hover:bg-gray-900'
            } focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none transition-colors`}
            aria-label={getTooltip('reset')}
            disabled={fontSize === DEFAULT_FONT_SIZE}
          >
            <TextQuote className="w-5 h-5 text-blue-500" aria-hidden="true" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}