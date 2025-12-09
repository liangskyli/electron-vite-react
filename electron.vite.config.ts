import type { UserConfig } from 'electron-vite';
import { defineConfig, mergeConfig } from 'electron-vite';
import { resolve } from 'node:path';
import { getViteConfig } from './vite.config';

export default defineConfig((configEnv) => {
  const renderer: UserConfig['renderer'] = mergeConfig<
    Required<UserConfig>['renderer'],
    Required<UserConfig>['renderer']
  >(getViteConfig(configEnv), {
    root: '.',
    build: {
      target: undefined,
      outDir: 'dist-electron/renderer',
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html'),
        },
      },
    },
  });

  return {
    main: {
      build: {
        outDir: 'dist-electron/main',
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/main/index.ts'),
          },
          output: {
            format: 'cjs',
          },
        },
        bytecode: { transformArrowFunctions: false },
      },
    },
    preload: {
      build: {
        outDir: 'dist-electron/preload',
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'electron/preload/index.ts'),
          },
          output: {
            format: 'cjs',
          },
        },
      },
    },
    renderer: {
      root: '.',
      ...renderer,
    },
  };
});
