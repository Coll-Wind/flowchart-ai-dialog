import { app, BrowserWindow } from 'electron';
import path from 'path';

// 调试强制日志
process.env.ELECTRON_ENABLE_LOGGING = 'true';
console.log('🚀 主进程启动');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  console.log('🛠️ 正在创建浏览器窗口...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      devTools: isDev
    }
  });

  const loadPath = isDev 
    ? 'http://localhost:3000' 
    : path.join(__dirname, '../renderer/index.html');
     console.log('📂 加载路径:', loadPath);

  await mainWindow.loadURL(loadPath);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  console.log('✅ Electron应用准备就绪');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});