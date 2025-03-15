import { app } from 'electron';
import type { LogMessage, PathVariables } from 'electron-log';
import path from 'node:path';
import { archiveLogFn } from './common';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const logger = require('electron-log/main');
let isInitialized = false;

const initMainLogger = () => {
  if (!isInitialized) {
    logger.initialize({ preload: true });
    Object.assign(console, logger.functions);
    const version = app.getVersion();

    logger.errorHandler.startCatching({});
    logger.scope.defaultLabel = 'default';
    logger.transports.console.level = false;
    logger.transports.file.maxSize = 1024 * 1024 * 2;
    logger.transports.file.archiveLogFn = archiveLogFn;
    logger.variables.version = version;
    logger.transports.file.resolvePathFn = (
      variables: PathVariables,
      message?: LogMessage,
    ) => {
      const isRenderer = message?.variables?.processType === 'renderer';
      const fileName = isRenderer ? 'renderer.log' : 'main.log';
      return path.join(variables.libraryDefaultDir, fileName);
    };
    logger.transports.file.format =
      '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [v{version}] [{processType}] [{level}]{scope} {text}';

    app.on('ready', () => {
      console.info(
        'app ready,platform:',
        `${process.platform}@${process.getSystemVersion()}`,
        'process.versions:',
        process.versions,
      );
    });
    isInitialized = true;
    console.log('initMainLogger success');
  } else {
    console.log('initMainLogger has initialized');
  }
  return logger;
};

const getMainLogger = () => {
  if (!isInitialized) {
    throw Error('getMainLogger err: no init');
  }
  return logger;
};

export { initMainLogger, getMainLogger };
