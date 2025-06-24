import React, { useState } from 'react';
import useStore from '../store/useStore';
import '../styles/SessionList.css';

const SessionList: React.FC = () => {
  const [newSessionName, setNewSessionName] = useState('');
  const sessions = useStore((state) => state.sessions);
  const addSession = useStore((state) => state.addSession);
  const setCurrentSession = useStore((state) => state.setCurrentSession);
  const currentSessionId = useStore((state) => state.currentSessionId);

  const handleAddSession = () => {
    if (newSessionName.trim()) {
      addSession(newSessionName);
      setNewSessionName('');
    }
  };

  return (
    <div className="session-list">
      <div className="session-list-header">
        <h3>会话列表</h3>
        <div className="session-list-controls">
          <input
            type="text"
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            placeholder="新会话名称"
          />
          <button onClick={handleAddSession}>创建会话</button>
        </div>
      </div>
      <ul className="session-items">
        {sessions.length === 0 ? (
          <li>暂无会话</li>
        ) : (
          sessions.map((session) => (
            <li
              key={session.id}
              className={session.id === currentSessionId ? 'active' : ''}
              onClick={() => setCurrentSession(session.id)}
            >
              {session.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SessionList;