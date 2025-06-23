import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // 这里可以添加需要暴露给渲染进程的API
});