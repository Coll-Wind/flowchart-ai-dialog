import React from 'react';
import { NodeProps } from 'reactflow';

interface SessionNodeData {
  id: string;
  name: string;
  isSessionNode: boolean;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
}

const SessionNode: React.FC<NodeProps<SessionNodeData>> = ({ data }) => {
  return (
    <div className="session-node">
      <div className="session-node-header">
        <h4>{data.name || '新会话'}</h4>
      </div>
      <div className="session-node-content">
        <p>这是会话的根节点</p>
      </div>
    </div>
  );
};

export default SessionNode;