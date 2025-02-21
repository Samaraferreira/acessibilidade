import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Timer, Mail, Database, Webhook, GitBranch, Code, Braces } from 'lucide-react';
import { useAccessibility } from '../contexts/AccessibilityContext';

const iconMap = {
  Timer,
  Mail,
  Database,
  Webhook,
  GitBranch,
  Code,
  Braces
};

const CustomNode = ({ data, isConnectable }: { data: any; isConnectable: boolean }) => {
  const Icon = iconMap[data.icon as keyof typeof iconMap];
  const { highContrast } = useAccessibility();

  return (
    <div className={`px-4 py-2 shadow-md rounded-md ${highContrast ? 'bg-black border-white' : 'bg-white border-gray-200'} border`}>
      {data.category !== 'trigger' && (
        <Handle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          className={`w-3 h-3 ${highContrast ? '!bg-white' : '!bg-gray-500'}`}
        />
      )}
      
      <div className="flex items-center">
        {Icon && <Icon className={`w-5 h-5 ${highContrast ? 'text-white' : 'text-gray-600'} mr-2`} />}
        <div className={`text-sm font-medium ${highContrast ? 'text-white' : 'text-gray-900'}`}>{data.label}</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className={`w-3 h-3 ${highContrast ? '!bg-white' : '!bg-gray-500'}`}
      />
    </div>
  );
};

export default memo(CustomNode);