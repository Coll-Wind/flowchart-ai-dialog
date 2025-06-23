import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface Node {
  id: string;
  parentId: string | null;
  question: string;
  answer: string;
  isSessionNode: boolean;
}

interface Session {
  id: string;
  name: string;
  nodes: Node[];
}

interface StoreState {
  sessions: Session[];
  currentSessionId: string | null;
  addSession: (name: string) => void;
  setCurrentSession: (id: string) => void;
  addNode: (sessionId: string, parentId: string | null, isSessionNode: boolean) => void;
  updateNode: (sessionId: string, nodeId: string, updates: Partial<Node>) => void;
  deleteNode: (sessionId: string, nodeId: string) => void;
}

const useStore = create<StoreState>((set) => ({
  sessions: [],
  currentSessionId: null,
  addSession: (name) =>
    set((state) => {
      const newSession: Session = {
        id: uuidv4(),
        name,
        nodes: [
          {
            id: '0',
            parentId: null,
            question: '',
            answer: '',
            isSessionNode: true,
          },
        ],
      };
      return {
        sessions: [...state.sessions, newSession],
        currentSessionId: newSession.id,
      };
    }),
  setCurrentSession: (id) => set({ currentSessionId: id }),
  addNode: (sessionId, parentId, isSessionNode) =>
    set((state) => {
      const sessionIndex = state.sessions.findIndex((s) => s.id === sessionId);
      if (sessionIndex === -1) return state;

      const session = state.sessions[sessionIndex];
      const newNodeId = parentId ? `${parentId}${session.nodes.filter(n => n.parentId === parentId).length}` : '0';

      const newNode: Node = {
        id: newNodeId,
        parentId,
        question: '',
        answer: '',
        isSessionNode,
      };

      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = {
        ...session,
        nodes: [...session.nodes, newNode],
      };

      return { sessions: newSessions };
    }),
  updateNode: (sessionId, nodeId, updates) =>
    set((state) => {
      const sessionIndex = state.sessions.findIndex((s) => s.id === sessionId);
      if (sessionIndex === -1) return state;

      const session = state.sessions[sessionIndex];
      const nodeIndex = session.nodes.findIndex((n) => n.id === nodeId);
      if (nodeIndex === -1) return state;

      const newNodes = [...session.nodes];
      newNodes[nodeIndex] = { ...newNodes[nodeIndex], ...updates };

      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = { ...session, nodes: newNodes };

      return { sessions: newSessions };
    }),
  deleteNode: (sessionId, nodeId) =>
    set((state) => {
      const sessionIndex = state.sessions.findIndex((s) => s.id === sessionId);
      if (sessionIndex === -1) return state;

      const session = state.sessions[sessionIndex];
      const nodeToDelete = session.nodes.find((n) => n.id === nodeId);
      if (!nodeToDelete) return state;

      // 删除节点及其所有子节点
      const nodesToDelete = new Set<string>();
      const queue = [nodeId];
      while (queue.length > 0) {
        const currentId = queue.pop()!;
        nodesToDelete.add(currentId);
        session.nodes.forEach((n) => {
          if (n.parentId === currentId) {
            queue.push(n.id);
          }
        });
      }

      const newNodes = session.nodes.filter((n) => !nodesToDelete.has(n.id));
      const newSessions = [...state.sessions];
      newSessions[sessionIndex] = { ...session, nodes: newNodes };

      return { sessions: newSessions };
    }),
}));

export default useStore;