import { Node, Edge } from 'reactflow';

export function validateWorkflow(nodes: Node[], edges: Edge[]): { isValid: boolean; message?: string } {
  // Check if there are any nodes
  if (nodes.length === 0) {
    return { isValid: false, message: 'Please add at least one node to the workflow.' };
  }

  // Check if there's exactly one trigger node
  const triggerNodes = nodes.filter(node => node.data.category === 'trigger');
  if (triggerNodes.length === 0) {
    return { isValid: false, message: 'Please add a trigger node to start the workflow.' };
  }
  if (triggerNodes.length > 1) {
    return { isValid: false, message: 'Only one trigger node is allowed per workflow.' };
  }

  // Check if all nodes (except the trigger) have incoming connections
  const connectedNodeIds = new Set(edges.map(edge => edge.target));
  const disconnectedNodes = nodes.filter(node => {
    return node.data.category !== 'trigger' && !connectedNodeIds.has(node.id);
  });

  if (disconnectedNodes.length > 0) {
    const nodeNames = disconnectedNodes.map(node => node.data.label).join(', ');
    return { isValid: false, message: `The following nodes are not connected: ${nodeNames}` };
  }

  // Check if all choice nodes have at least one outgoing connection
  const choiceNodes = nodes.filter(node => node.data.category === 'choice');
  for (const choiceNode of choiceNodes) {
    const outgoingEdges = edges.filter(edge => edge.source === choiceNode.id);
    if (outgoingEdges.length === 0) {
      return { 
        isValid: false, 
        message: `Choice node "${choiceNode.data.label}" must have at least one outgoing connection.` 
      };
    }
  }

  return { isValid: true };
}