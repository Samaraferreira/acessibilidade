export function validateWorkflow(workflow) {
  if (!workflow) {
    return { isValid: false, error: 'Workflow data is required' };
  }

  // Check required fields
  if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
    return { isValid: false, error: 'Workflow must contain nodes array' };
  }

  if (!workflow.edges || !Array.isArray(workflow.edges)) {
    return { isValid: false, error: 'Workflow must contain edges array' };
  }

  // Validate nodes
  for (const node of workflow.nodes) {
    if (!node.id || !node.type || !node.position || !node.data) {
      return { isValid: false, error: 'Invalid node structure' };
    }

    if (!node.data.label || !node.data.icon || !node.data.category) {
      return { isValid: false, error: 'Invalid node data structure' };
    }
  }

  // Validate edges
  for (const edge of workflow.edges) {
    if (!edge.id || !edge.source || !edge.target) {
      return { isValid: false, error: 'Invalid edge structure' };
    }
  }

  // Validate workflow has exactly one trigger node
  const triggerNodes = workflow.nodes.filter(node => node.data.category === 'trigger');
  if (triggerNodes.length === 0) {
    return { isValid: false, error: 'Workflow must have at least one trigger node' };
  }
  if (triggerNodes.length > 1) {
    return { isValid: false, error: 'Workflow cannot have multiple trigger nodes' };
  }

  return { isValid: true };
}