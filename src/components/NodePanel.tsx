import React from 'react';
import { Timer, Mail, Database, Webhook, GitBranch, Code, Braces } from 'lucide-react';
import { NodeType } from '../types/workflow';
import { useLanguage } from '../contexts/LanguageContext';

export const availableNodes: NodeType[] = [
  {
    name: 'Schedule',
    description: 'workflow.nodes.schedule.desc',
    icon: 'Timer',
    category: 'trigger',
    config: {
      fields: [
        {
          name: 'cron',
          type: 'text',
          label: 'Cron Expression',
          required: true
        }
      ]
    }
  },
  {
    name: 'Webhook',
    description: 'workflow.nodes.webhook.desc',
    icon: 'Webhook',
    category: 'trigger',
    config: {
      fields: [
        {
          name: 'method',
          type: 'select',
          label: 'HTTP Method',
          options: ['GET', 'POST'],
          required: true
        }
      ]
    }
  },
  {
    name: 'Database',
    description: 'workflow.nodes.database.desc',
    icon: 'Database',
    category: 'connector',
    config: {
      fields: [
        {
          name: 'operation',
          type: 'select',
          label: 'Operation',
          options: ['query', 'insert', 'update', 'delete'],
          required: true
        },
        {
          name: 'query',
          type: 'text',
          label: 'SQL Query',
          required: true
        }
      ]
    }
  },
  {
    name: 'REST API',
    description: 'workflow.nodes.restapi.desc',
    icon: 'Braces',
    category: 'connector',
    config: {
      fields: [
        {
          name: 'method',
          type: 'select',
          label: 'HTTP Method',
          options: ['GET', 'POST', 'PUT', 'DELETE'],
          required: true
        },
        {
          name: 'url',
          type: 'text',
          label: 'API URL',
          required: true
        }
      ]
    }
  },
  {
    name: 'Transform',
    description: 'workflow.nodes.transform.desc',
    icon: 'Code',
    category: 'transformation',
    config: {
      fields: [
        {
          name: 'transform',
          type: 'code',
          label: 'Transformation Code',
          required: true
        }
      ]
    }
  },
  {
    name: 'Choice',
    description: 'workflow.nodes.choice.desc',
    icon: 'GitBranch',
    category: 'choice',
    config: {
      fields: []
    }
  }
];

const iconMap = {
  Timer,
  Mail,
  Database,
  Webhook,
  Code,
  GitBranch,
  Braces
};

export function NodePanel({ onDragStart }: { onDragStart: (node: NodeType) => void }) {
  const { t } = useLanguage();
  
  const nodesByCategory = {
    trigger: availableNodes.filter(node => node.category === 'trigger'),
    connector: availableNodes.filter(node => node.category === 'connector'),
    transformation: availableNodes.filter(node => node.category === 'transformation'),
    choice: availableNodes.filter(node => node.category === 'choice')
  };

  const categoryTitles = {
    trigger: t('workflow.triggers'),
    connector: t('workflow.connectors'),
    transformation: t('workflow.transformations'),
    choice: t('workflow.choices')
  };

  return (
    <nav 
      className="w-64 bg-white border-r border-gray-200 h-full flex flex-col"
      aria-label={t('workflow.nodePanel')}
    >
      <div className="p-4 node-panel-scroll flex-1">
        <div className="space-y-6">
          {(Object.entries(nodesByCategory) as [NodeCategory, NodeType[]][]).map(([category, nodes]) => (
            <div key={category} role="region" aria-label={`${categoryTitles[category]} nodes`}>
              <h3 
                className="text-sm font-medium text-gray-500 uppercase mb-2"
                id={`${category}-heading`}
              >
                {categoryTitles[category]}
              </h3>
              <div 
                className="space-y-2"
                role="list"
                aria-labelledby={`${category}-heading`}
              >
                {nodes.map((node) => {
                  const Icon = iconMap[node.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={node.name}
                      className="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors focus-within:ring-2 focus-within:ring-blue-500"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/reactflow', node.name);
                        onDragStart(node);
                      }}
                      role="listitem"
                      aria-label={`${node.name} - ${t(node.description)}`}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          const event = new DragEvent('dragstart', {
                            bubbles: true,
                            cancelable: true,
                          });
                          e.currentTarget.dispatchEvent(event);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-gray-600" aria-hidden="true" />
                        <div>
                          <h4 className="font-medium text-sm">{node.name}</h4>
                          <p className="text-xs text-gray-500">{t(node.description)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}