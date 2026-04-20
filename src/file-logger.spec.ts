import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { fileLogger } from './file-logger';

const tmpDir = join(import.meta.dirname, '..', '.tmp-test');

beforeAll(() => {
  if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true });
});

afterAll(() => {
  if (existsSync(tmpDir)) rmSync(tmpDir, { recursive: true });
});

describe('fileLogger', () => {
  it('should create directory if it does not exist', () => {
    const logPath = join(tmpDir, 'nested', 'test.log');

    fileLogger({ path: logPath });

    expect(existsSync(join(tmpDir, 'nested'))).toBe(true);
  });

  it('should not throw if directory already exists', () => {
    mkdirSync(join(tmpDir, 'existing'), { recursive: true });
    const logPath = join(tmpDir, 'existing', 'test.log');

    expect(() => fileLogger({ path: logPath })).not.toThrow();
  });

  it('should write log entry to file', async () => {
    const logPath = join(tmpDir, 'write-test.log');
    const logger = fileLogger({ path: logPath });

    logger.log({ level: 'info', event: 'user.created', payload: { userId: '123' } });

    // pino writes asynchronously via transport, wait for flush
    await new Promise((resolve) => setTimeout(resolve, 500));

    const content = readFileSync(logPath, 'utf-8').trim();
    const entry = JSON.parse(content);
    expect(entry).toMatchObject({ event: 'user.created', userId: '123' });
  });

  it('should add pino-pretty transport when console is enabled', async () => {
    const logPath = join(tmpDir, 'console-test.log');
    const logger = fileLogger({ path: logPath, console: true });

    logger.log({ level: 'info', event: 'with.console' });

    await new Promise((resolve) => setTimeout(resolve, 500));

    const content = readFileSync(logPath, 'utf-8').trim();
    const entry = JSON.parse(content);
    expect(entry).toMatchObject({ event: 'with.console' });
  });

  it('should return a logger with a log method', () => {
    const logPath = join(tmpDir, 'api-test.log');
    const logger = fileLogger({ path: logPath });

    expect(logger).toHaveProperty('log');
    expect(typeof logger.log).toBe('function');
  });
});
