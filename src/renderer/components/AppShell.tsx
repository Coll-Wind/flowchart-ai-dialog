import React from 'react';
import SessionList from './SessionList';
import FlowCanvas from './FlowCanvas';
import '../styles/AppShell.css';

const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <div className="app-header">
        <h1>流程图AI对话系统</h1>
      </div>
      <div className="app-content">
        <SessionList />
        <FlowCanvas />
      </div>
    </div>
  );
};

export default AppShell;