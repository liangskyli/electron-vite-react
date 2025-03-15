export type IpcResponse<T = unknown> = {
  /** 0:正常响应，其他失败 */
  code: number;
  /** 响应数据 */
  data?: T;
  /** 错误信息 */
  msg?: string;
};
