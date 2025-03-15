import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 公共样式
import '@/styles/less/global.less';
import {
  getRenderLogger,
  initRenderLogger,
} from '../electron/common/logger/renderer.ts';
import App from './app.tsx';

initRenderLogger();

const userLog = getRenderLogger().scope('main.tsx');
userLog.info('react setupApp begin');

function setupApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

setupApp();
