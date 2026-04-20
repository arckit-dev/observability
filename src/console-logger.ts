import type { Logger } from './logger.type';

export const consoleLogger = (): Logger => ({
  log: ({ level, event, payload }) => {
    console[level](JSON.stringify({ event, ...payload }));
  }
});
