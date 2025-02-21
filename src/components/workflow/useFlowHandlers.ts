import { useCallback } from 'react';
import { 
  Node, 
  Edge, 
  Connection, 
  OnConnectStartParams,
  MarkerType,
  useReactFlow,
  addEdge
} from 'reactflow';
import { NodeType } from '../../types/workflow';
import { availableNodes } from '../NodePanel';

export function useFlowHandlers(
  nodes: Node[],
  setNodes: (nodes: Node[]) => void,
  setEdges: (edges: Edge[]) => void,
  setSelectedNode: (node: Node | null) => void,
  setSelectedEdge: (edge: Edge | null) => void,
  setEdgeCondition: (condition: string) => void,
  highContrast: boolean
) {
  const { project } = useReactFlow();

  const isValidConnection = useCallback((connection: Connection) => {
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    const sourceCategory = sourceNode.data.category;
    const targetCategory = targetNode.data.category;

    switch (sourceCategory) {
      case 'trigger':
        return ['connector', 'transformation', 'choice'].includes(targetCategory);
      case 'connector':
        return ['choice', 'connector'].includes(targetCategory);
      case 'transformation':
        return ['choice', 'connector'].includes(targetCategory);
      case 'choice':
        return targetCategory === 'connector';
      default:
        return false;
    }
  }, [nodes]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target && isValidConnection(params)) {
        const sourceNode = nodes.find(n => n.id === params.source);
        const newEdge = {
          ...params,
          data: sourceNode?.data.category === 'choice' ? { condition: '' } : undefined,
          animated: sourceNode?.data.category === 'choice',
          style: {
            stroke: highContrast ? '#ffffff' : (sourceNode?.data.category === 'choice' ? '#6366f1' : '#64748b'),
            strokeWidth: highContrast ? 3 : 2,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: highContrast ? '#ffffff' : (sourceNode?.data.category === 'choice' ? '#6366f1' : '#64748b'),
          },
        };
        setEdges((eds) => addEdge(newEdge, eds));
      }
    },
    [nodes, setEdges, highContrast],
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const nodeType = availableNodes.find(node => node.name === type);
      if (!nodeType) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${nodes.length + 1}`,
        type: 'custom',
        position,
        data: { 
          label: type,
          icon: nodeType.icon,
          category: nodeType.category,
          config: {}
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, project],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, [setSelectedNode, setSelectedEdge]);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    if (edge.source) {
      const sourceNode = nodes.find(n => n.id === edge.source);
      if (sourceNode?.data.category === 'choice') {
        setSelectedEdge(edge);
        setEdgeCondition(edge.data?.condition || '');
        setSelectedNode(null);
      }
    }
  }, [nodes, setSelectedEdge, setEdgeCondition, setSelectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return {
    isValidConnection,
    onConnect,
    onDrop,
    onNodeClick,
    onEdgeClick,
    onDragOver,
  };
}