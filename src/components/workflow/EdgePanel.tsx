import React from 'react';
import { Edge } from 'reactflow';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface EdgePanelProps {
  edge: Edge | null;
  condition: string;
  onClose: () => void;
  onConditionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function EdgePanel({ edge, condition, onClose, onConditionChange }: EdgePanelProps) {
  const { t } = useLanguage();
  
  if (!edge) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{t('workflow.edgePanel.title')}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
            {t('workflow.edgePanel.condition')}
          </label>
          <textarea
            id="condition"
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            value={condition}
            onChange={onConditionChange}
            placeholder={t('workflow.edgePanel.placeholder')}
            rows={4}
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('workflow.edgePanel.example')}
          </p>
        </div>
      </div>
    </div>
  );
}