import { useState } from 'react';
import VersionUpdate from '@/components/version-update';
import { useRouter } from '@/hooks/use-router.ts';
import reactLogo from '@/assets/react.svg';
import './index.css';
import viteLogo from '/vite.svg';

const Index = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();
  return (
    <div className="pg-home">
      <VersionUpdate />
      <br />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          className="bg-gray-300 p-[5px]"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <br />
      <button
        className="text-red bg-gray-300 p-[5px] text-[20px]"
        onClick={() => router.push('/test/test1')}
      >
        跳转测试页面
      </button>
    </div>
  );
};

export default Index;
