import { ipcRenderer } from 'electron';
import { TEST_HANDLE1 } from '../../common/ipc/test.ts';
import type { TEST_HANDLE1Response } from '../../common/ipc/test.ts';

const getTestHandle1 = async () => {
  const result: TEST_HANDLE1Response = await ipcRenderer.invoke(TEST_HANDLE1);
  return result;
};

export { getTestHandle1 };
