import { existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import pino from 'pino';
import type { Logger } from './logger.type';

type FileLoggerConfig = {
  path: string;
  console?: boolean;
};

export const fileLogger = (config: FileLoggerConfig): Logger => {
  const dir = dirname(config.path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const targets: pino.TransportTargetOptions[] = [{ target: 'pino/file', options: { destination: config.path } }];

  if (config.console) {
    targets.push({ target: 'pino-pretty', options: { colorize: true, ignore: '' } });
  }

  const transport = pino.transport({ targets });
  const logger = pino(transport);

  return {
    log: ({ level, event, payload }) => {
      logger[level]({ event, ...payload });
    }
  };
};
