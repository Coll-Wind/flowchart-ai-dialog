import React, { useState } from 'react';
import { NodeProps } from 'reactflow';

interface QuestionNodeData {
  id: string;
  question: string;
  answer: string;
  isSessionNode: boolean;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
}

const QuestionNode: React.FC<NodeProps<QuestionNodeData>> = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(data.question);
  const [localAnswer, setLocalAnswer] = useState(data.answer);

  const handleSave = () => {
    data.onUpdate({
      question: localQuestion,
      answer: localAnswer,
    });
    setIsEditing(false);
  };

  return (
    <div className="question-node">
      {isEditing ? (
        <>
          <div className="question-section">
            <textarea
              value={localQuestion}
              onChange={(e) => setLocalQuestion(e.target.value)}
              placeholder="输入问题..."
            />
          </div>
          <div className="answer-section">
            <textarea
              value={localAnswer}
              onChange={(e) => setLocalAnswer(e.target.value)}
              placeholder="AI回答将显示在这里..."
            />
          </div>
          <div className="node-actions">
            <button onClick={handleSave}>保存</button>
            <button onClick={() => setIsEditing(false)}>取消</button>
          </div>
        </>
      ) : (
        <>
          <div className="question-section">
            <h4>{data.question || '未命名问题'}</h4>
          </div>
          <div className="answer-section">
            <p>{data.answer || '暂无回答'}</p>
          </div>
          <div className="node-actions">
            <button onClick={() => setIsEditing(true)}>编辑</button>
            <button onClick={data.onDelete}>删除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionNode;