import logger from 'electron-log/renderer';

let isInitialized = false;

const initRenderLogger = () => {
  if (!isInitialized) {
    Object.assign(console, logger.functions);
    isInitialized = true;
    console.log('initRenderLogger success');
  } else {
    console.log('initRenderLogger has initialized');
  }
  return logger;
};

const getRenderLogger = () => {
  if (!isInitialized) {
    throw Error('getRenderLogger err: no init');
  }
  return logger;
};

export { initRenderLogger, getRenderLogger };
