import React, { useEffect, useState } from 'react';
import { Plus, RefreshCw, Pencil, Trash2, Workflow } from 'lucide-react';
import { Workflow as WorkflowType } from '../types/workflow';
import { useLanguage } from '../contexts/LanguageContext';

interface WorkflowListProps {
  onCreateNew: () => void;
  onEdit: (workflow: WorkflowType) => void;
}

export function WorkflowList({ onCreateNew, onEdit }: WorkflowListProps) {
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setError(null);
        const response = await fetch('/api/workflows', {
          signal: AbortSignal.timeout(25000)
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setWorkflows(data);
        setLoading(false);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Error fetching workflows:', message);
        
        if (message.includes('timeout') || message.includes('failed to fetch')) {
          setError('Unable to connect to server. Please ensure the server is running.');
        } else {
          setError('Failed to load workflows. Please try again.');
        }
        
        setLoading(false);
      }
    };

    if (retryCount < 3) {
      fetchWorkflows();
    }
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setRetryCount(count => count + 1);
  };

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

  const startEditing = (workflow: WorkflowType) => {
    setEditingId(workflow.id);
    setWorkflowName(workflow.name || `Workflow ${workflow.id.split('-')[1]}`);
  };

  const saveWorkflowName = async () => {
    if (!editingId) return;

    try {
      const workflow = workflows.find(w => w.id === editingId);
      if (!workflow) return;

      const updatedWorkflow = { ...workflow, name: workflowName };
      const response = await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWorkflow)
      });

      if (!response.ok) throw new Error('Failed to update workflow name');

      setWorkflows(workflows.map(w => 
        w.id === editingId ? { ...w, name: workflowName } : w
      ));
    } catch (error) {
      console.error('Error updating workflow name:', error);
      alert('Failed to update workflow name');
    }

    setEditingId(null);
    setWorkflowName('');
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/workflows/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete workflow');

      setWorkflows(workflows.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error deleting workflow:', error);
      alert('Failed to delete workflow');
    }

    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4" role="banner">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Workflow className="w-8 h-8 text-blue-600" aria-hidden="true" />
            <h1 className="text-2xl font-bold">{t('workflow.list.title')}</h1>
          </div>
          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            aria-label={t('workflow.list.newWorkflow')}
          >
            <Plus className="w-5 h-5" aria-hidden="true" />
            <span>{t('workflow.list.newWorkflow')}</span>
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6" role="main">
        {loading ? (
          <section 
            className="flex flex-col items-center justify-center py-16"
            role="status"
            aria-label="Loading workflows"
          >
            <div 
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"
              aria-hidden="true"
            ></div>
            <p className="text-gray-600">{t('workflow.list.loading')}</p>
          </section>
        ) : error ? (
          <section 
            className="flex flex-col items-center justify-center py-16"
            role="alert"
          >
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>{t('workflow.list.retry')}</span>
            </button>
          </section>
        ) : workflows.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{t('workflow.list.empty.title')}</h2>
              <p className="text-gray-600 mb-6">{t('workflow.list.empty.desc')}</p>
              <button
                onClick={onCreateNew}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                aria-label={t('workflow.list.empty.cta')}
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                <span>{t('workflow.list.empty.cta')}</span>
              </button>
            </div>
          </section>
        ) : (
          <section 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            aria-label="Workflow list"
          >
            {workflows.map((workflow) => (
              <article
                key={workflow.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {editingId === workflow.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={workflowName}
                          onChange={(e) => setWorkflowName(e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded"
                          aria-label={t('workflow.list.editName')}
                          autoFocus
                        />
                        <button
                          onClick={saveWorkflowName}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          {t('workflow.list.saveName')}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {workflow.name || `Workflow ${workflow.id.split('-')[1]}`}
                        </h3>
                        <button
                          onClick={() => startEditing(workflow)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label={t('workflow.list.editName')}
                        >
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                    <time className="text-sm text-gray-500 mt-1" dateTime={workflow.createdAt}>
                      {t('workflow.created')}: {formatDate(workflow.createdAt)}
                    </time>
                  </div>
                  {deletingId === workflow.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(workflow.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        {t('workflow.list.delete')}
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        {t('workflow.list.cancel')}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => confirmDelete(workflow.id)}
                      className="text-gray-400 hover:text-red-600"
                      aria-label={t('workflow.list.deleteConfirm')}
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <dl className="flex gap-4 text-sm text-gray-600">
                  <div>
                    <dt className="sr-only">{t('workflow.list.nodes')}</dt>
                    <dd>
                      <span className="font-medium">{workflow.nodes?.length || 0}</span>{' '}
                      {t('workflow.list.nodes')}
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">{t('workflow.list.connections')}</dt>
                    <dd>
                      <span className="font-medium">{workflow.edges?.length || 0}</span>{' '}
                      {t('workflow.list.connections')}
                    </dd>
                  </div>
                </dl>

                <button
                  onClick={() => onEdit(workflow)}
                  className="w-full mt-4 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  {t('workflow.list.openWorkflow')}
                </button>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}