import type { LogFile } from 'electron-log';
import fs from 'node:fs';
import path from 'node:path';
import { LogCleaner } from './clean.ts';

let logCleaner: LogCleaner | undefined;

function formatNumber(number: number) {
  const n = number.toString();
  return n[1] ? n : `0${n}`;
}

const fileNameFormatTime = () => {
  // yyddmmHHMMSS+milliseconds
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  return (
    [year, month, day].map(formatNumber).join('') +
    [hour, minute, second].map(formatNumber).join('') +
    '.' +
    milliseconds
  );
};

const archiveLogFn = (file: LogFile) => {
  const oldPath = file.toString();
  const info = path.parse(oldPath);
  if (!logCleaner) {
    // 初始化日志清理器
    logCleaner = new LogCleaner({
      // 保留 50 * 2 = 100M 日志
      maxFiles: 50,
      logDir: info.dir,
      filePattern: /\.log$/, // 匹配所有.log文件
    });
  }
  try {
    fs.renameSync(
      oldPath,
      path.join(
        info.dir,
        `${info.name}.old.${fileNameFormatTime()}${info.ext}`,
      ),
    );
  } catch (e) {
    const data = ['electron-log.transports.file: Could not rotate log'];

    if (e) {
      data.push(e as string);
    }
    console.warn(data);
  }
  // 清理旧日志
  logCleaner.cleanupOldFiles();
};

export { archiveLogFn };
