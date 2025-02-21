export type NodeCategory = 'trigger' | 'connector' | 'transformation' | 'choice';

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    icon: string;
    category: NodeCategory;
    config: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  data?: {
    condition?: string;
  };
}

export interface Workflow {
  id: string;
  name?: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  modifiedAt: string;
  isActive?: boolean;
  version?: number;
}