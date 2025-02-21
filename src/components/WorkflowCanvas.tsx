import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  OnConnectStartParams,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { NodeType, Workflow } from '../types/workflow';
import { ConfigPanel } from './ConfigPanel';
import { availableNodes } from './NodePanel';
import CustomNode from './CustomNode';
import { FlowControls } from './workflow/FlowControls';
import { EdgePanel } from './workflow/EdgePanel';
import { validateWorkflow } from './workflow/FlowValidation';
import { useFlowHandlers } from './workflow/useFlowHandlers';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface WorkflowCanvasProps {
  workflow?: Workflow;
  onSave: (workflow: Workflow) => void;
}

const nodeTypes = {
  custom: CustomNode,
};

function Flow({ workflow, onSave }: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [edgeCondition, setEdgeCondition] = useState('');
  const [connectionStartParams, setConnectionStartParams] = useState<OnConnectStartParams | null>(null);
  const { highContrast } = useAccessibility();
  const [isInitialized, setIsInitialized] = useState(false);

  // Store workflow data in state to persist it
  const [workflowData, setWorkflowData] = useState<Workflow | undefined>(workflow);

  // Initialize with workflow data if provided
  useEffect(() => {
    if (workflowData && !isInitialized) {
      // Initialize nodes with positions and data
      const initialNodes = workflowData.nodes.map(node => ({
        ...node,
        type: 'custom',
        data: {
          ...node.data,
          config: node.data.config || {}
        }
      }));

      // Initialize edges with their data and styling
      const initialEdges = workflowData.edges.map(edge => ({
        ...edge,
        animated: edge.data?.condition !== undefined,
        style: {
          stroke: highContrast ? '#ffffff' : (edge.data?.condition !== undefined ? '#6366f1' : '#64748b'),
          strokeWidth: highContrast ? 3 : 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: highContrast ? '#ffffff' : (edge.data?.condition !== undefined ? '#6366f1' : '#64748b'),
        },
      }));

      setNodes(initialNodes);
      setEdges(initialEdges);
      setIsInitialized(true);
    }
  }, [workflowData, setNodes, setEdges, highContrast, isInitialized]);

  // Update workflow data when nodes or edges change
  useEffect(() => {
    if (isInitialized) {
      setWorkflowData(prev => ({
        ...prev!,
        nodes: nodes,
        edges: edges,
      }));
    }
  }, [nodes, edges, isInitialized]);

  const {
    onConnect,
    onDrop,
    onNodeClick,
    onEdgeClick,
    onDragOver,
  } = useFlowHandlers(nodes, setNodes, setEdges, setSelectedNode, setSelectedEdge, setEdgeCondition, highContrast);

  const onConnectStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent, params: OnConnectStartParams) => {
      setConnectionStartParams(params);
    },
    [],
  );

  const onConnectEnd = useCallback(() => {
    setConnectionStartParams(null);
  }, []);

  const handleConfigChange = useCallback((nodeId: string, config: Record<string, any>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              config: config
            }
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const handleEdgeConditionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCondition = e.target.value;
    setEdgeCondition(newCondition);
    
    if (selectedEdge) {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id === selectedEdge.id) {
            return {
              ...edge,
              data: { ...edge.data, condition: newCondition },
              style: {
                stroke: highContrast ? '#ffffff' : (newCondition ? '#6366f1' : '#64748b'),
                strokeWidth: highContrast ? 3 : 2,
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: highContrast ? '#ffffff' : (newCondition ? '#6366f1' : '#64748b'),
              },
            };
          }
          return edge;
        })
      );
    }
  }, [selectedEdge, setEdges, highContrast]);

  const getNodeType = (nodeName: string): NodeType | null => {
    return availableNodes.find((node) => node.name === nodeName) || null;
  };

  const handleSaveClick = useCallback(() => {
    const validation = validateWorkflow(nodes, edges);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const workflow: Workflow = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        data: edge.data
      }))
    };
    onSave(workflow);
  }, [nodes, edges, onSave]);

  // Update edge styles when high contrast mode changes
  useEffect(() => {
    if (isInitialized) {
      setEdges(eds => 
        eds.map(edge => ({
          ...edge,
          style: {
            stroke: highContrast ? '#ffffff' : (edge.data?.condition ? '#6366f1' : '#64748b'),
            strokeWidth: highContrast ? 3 : 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: highContrast ? '#ffffff' : (edge.data?.condition ? '#6366f1' : '#64748b'),
          },
        }))
      );
    }
  }, [highContrast, setEdges, isInitialized]);

  return (
    <div className="flex flex-1 h-full">
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            type: 'default',
            style: { 
              stroke: highContrast ? '#ffffff' : '#64748b', 
              strokeWidth: highContrast ? 3 : 2 
            },
            animated: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: highContrast ? '#ffffff' : '#64748b',
            },
          }}
        >
          <FlowControls />
        </ReactFlow>
      </div>
      <button
        id="save-workflow-btn"
        onClick={handleSaveClick}
        className="hidden"
      />
      {selectedNode && (
        <ConfigPanel
          node={selectedNode}
          nodeType={getNodeType(selectedNode.data.label)}
          onClose={() => setSelectedNode(null)}
          onConfigChange={handleConfigChange}
        />
      )}
      {selectedEdge && (
        <EdgePanel
          edge={selectedEdge}
          condition={edgeCondition}
          onClose={() => {
            setSelectedEdge(null);
            setEdgeCondition('');
          }}
          onConditionChange={handleEdgeConditionChange}
        />
      )}
    </div>
  );
}

export function WorkflowCanvas({ workflow, onSave }: WorkflowCanvasProps) {
  return (
    <ReactFlowProvider>
      <Flow workflow={workflow} onSave={onSave} />
    </ReactFlowProvider>
  );
}