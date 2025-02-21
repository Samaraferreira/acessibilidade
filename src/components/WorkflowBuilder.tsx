import React, { useState, useCallback } from 'react';
import { Play, Save, ArrowLeft, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NodePanel } from './NodePanel';
import { WorkflowCanvas } from './WorkflowCanvas';
import { WorkflowList } from './WorkflowList';
import { Workflow as WorkflowType } from '../types/workflow';
import { useLanguage } from '../contexts/LanguageContext';

export function WorkflowBuilder() {
  const [currentWorkflow, setCurrentWorkflow] = useState<WorkflowType | null>(null);
  const { t } = useLanguage();

  const handleDragStart = (node: any) => {
    console.log('Dragging node:', node);
  };

  const handleSaveWorkflow = useCallback(async (workflow: WorkflowType) => {
    try {
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workflow,
          id: currentWorkflow?.id,
          createdAt: currentWorkflow?.createdAt || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save workflow');
      }

      const data = await response.json();
      console.log('Workflow saved:', data);
      
      alert('Workflow saved successfully!');
      setCurrentWorkflow(null); // Return to workflow list after saving
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Failed to save workflow. Please try again.');
    }
  }, [currentWorkflow]);

  const handleCreateNew = useCallback(() => {
    const now = new Date().toISOString();
    setCurrentWorkflow({
      id: `workflow-${Date.now()}`,
      nodes: [],
      edges: [],
      createdAt: now,
      modifiedAt: now,
    });
  }, []);

  const handleEdit = useCallback((workflow: WorkflowType) => {
    setCurrentWorkflow(workflow);
  }, []);

  if (!currentWorkflow) {
    return <WorkflowList onCreateNew={handleCreateNew} onEdit={handleEdit} />;
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50" role="application" aria-label="Workflow Builder">
      <header className="bg-white border-b border-gray-200 px-4 py-3" role="banner">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setCurrentWorkflow(null)}
              aria-label={t('workflow.back')}
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              <Workflow className="w-6 h-6 text-blue-600" aria-hidden="true" />
              <span className="text-lg font-bold text-gray-900">{t('workflow.title')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 text-right">
              <div>{t('workflow.created')}: {formatDate(currentWorkflow.createdAt)}</div>
              <div>{t('workflow.modified')}: {formatDate(currentWorkflow.modifiedAt || currentWorkflow.createdAt)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
                onClick={() => document.getElementById('save-workflow-btn')?.click()}
                aria-label={t('workflow.save')}
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                {t('workflow.save')}
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
                aria-label={t('workflow.execute')}
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                {t('workflow.execute')}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <NodePanel onDragStart={handleDragStart} />
        <WorkflowCanvas workflow={currentWorkflow} onSave={handleSaveWorkflow} />
      </div>
    </div>
  );
}