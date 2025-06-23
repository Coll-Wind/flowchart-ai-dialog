import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import useStore from '../store/useStore';
import SessionNode from './SessionNode';
import QuestionNode from './QuestionNode';

const nodeTypes: NodeTypes = {
  sessionNode: SessionNode,
  questionNode: QuestionNode,
};

const FlowCanvas: React.FC = () => {
  const currentSession = useStore((state) =>
    state.sessions.find((s) => s.id === state.currentSessionId)
  );
  const addNode = useStore((state) => state.addNode);
  const updateNode = useStore((state) => state.updateNode);
  const deleteNode = useStore((state) => state.deleteNode);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // 将store中的节点转换为ReactFlow节点
  useMemo(() => {
    if (!currentSession) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes: Node[] = currentSession.nodes.map((node) => ({
      id: node.id,
      type: node.isSessionNode ? 'sessionNode' : 'questionNode',
      data: {
        ...node,
        onUpdate: (updates: Partial<Node>) => {
          if (currentSession.id) {
            updateNode(currentSession.id, node.id, updates);
          }
        },
        onDelete: () => {
          if (currentSession.id) {
            deleteNode(currentSession.id, node.id);
          }
        },
      },
      position: { x: 0, y: 0 }, // 简化示例，实际应用中需要计算位置
    }));

    const newEdges: Edge[] = [];
    currentSession.nodes.forEach((node) => {
      if (node.parentId) {
        newEdges.push({
          id: `e${node.parentId}-${node.id}`,
          source: node.parentId,
          target: node.id,
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [currentSession, setNodes, setEdges, updateNode, deleteNode]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      if (currentSession?.id) {
        if (node.type === 'sessionNode') {
          // 显示会话节点右键菜单
          addNode(currentSession.id, node.id, false);
        } else {
          // 显示问题节点右键菜单
          addNode(currentSession.id, node.id, false);
        }
      }
    },
    [currentSession?.id, addNode]
  );

  if (!currentSession) {
    return <div className="flow-container empty">请选择或创建一个会话</div>;
  }

  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;