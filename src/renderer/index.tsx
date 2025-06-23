import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('⚛️ React开始初始化');

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('找不到 #root 元素');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('✅ React应用已挂载');