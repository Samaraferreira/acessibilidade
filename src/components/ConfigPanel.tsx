import React from 'react';
import { X } from 'lucide-react';
import { NodeType } from '../types/workflow';
import { useLanguage } from '../contexts/LanguageContext';

interface ConfigPanelProps {
  node: {
    id: string;
    type: string;
    data: {
      label: string;
      config?: Record<string, any>;
    };
  } | null;
  nodeType: NodeType | null;
  onClose: () => void;
  onConfigChange: (nodeId: string, config: Record<string, any>) => void;
}

export function ConfigPanel({ node, nodeType, onClose, onConfigChange }: ConfigPanelProps) {
  const { t } = useLanguage();
  
  if (!node || !nodeType) return null;

  const handleConfigChange = (fieldName: string, value: string | number) => {
    const currentConfig = node.data.config || {};
    const newConfig = {
      ...currentConfig,
      [fieldName]: value,
    };
    onConfigChange(node.id, newConfig);
  };

  return (
    <aside 
      className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto"
      role="complementary"
      aria-label="Node configuration panel"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 
          className="text-lg font-semibold"
          id="config-panel-title"
        >
          {t('workflow.configPanel.title')} {node.data.label}
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
          aria-label={t('workflow.configPanel.close')}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
      
      <div className="space-y-4">
        {nodeType.config.fields.map((field) => {
          const currentValue = node.data.config?.[field.name] || '';
          const fieldId = `field-${field.name}`;
          
          return (
            <div key={field.name}>
              <label 
                htmlFor={fieldId} 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1" aria-label={t('workflow.configPanel.required')}>*</span>
                )}
              </label>
              
              {field.type === 'select' ? (
                <select
                  id={fieldId}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={currentValue}
                  onChange={(e) => handleConfigChange(field.name, e.target.value)}
                  required={field.required}
                  aria-required={field.required}
                >
                  <option value="">{t('workflow.configPanel.selectOption')}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'code' ? (
                <textarea
                  id={fieldId}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  value={currentValue}
                  onChange={(e) => handleConfigChange(field.name, e.target.value)}
                  rows={6}
                  placeholder={t('workflow.configPanel.enterCode')}
                  required={field.required}
                  aria-required={field.required}
                />
              ) : (
                <input
                  id={fieldId}
                  type={field.type}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={currentValue}
                  onChange={(e) => handleConfigChange(
                    field.name,
                    field.type === 'number' ? Number(e.target.value) : e.target.value
                  )}
                  required={field.required}
                  aria-required={field.required}
                  aria-invalid={field.required && !currentValue}
                />
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}