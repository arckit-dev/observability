import { describe, expect, it, vi } from 'vitest';
import { consoleLogger } from './console-logger';

describe('consoleLogger', () => {
  it('should log info event as JSON to console.info', () => {
    const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const logger = consoleLogger();

    logger.log({ level: 'info', event: 'user.created' });

    expect(spy).toHaveBeenCalledWith(JSON.stringify({ event: 'user.created' }));
    spy.mockRestore();
  });

  it('should log error event with payload to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const logger = consoleLogger();

    logger.log({ level: 'error', event: 'user.failed', payload: { reason: 'duplicate' } });

    expect(spy).toHaveBeenCalledWith(JSON.stringify({ event: 'user.failed', reason: 'duplicate' }));
    spy.mockRestore();
  });

  it('should log warn event to console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const logger = consoleLogger();

    logger.log({ level: 'warn', event: 'rate.limit' });

    expect(spy).toHaveBeenCalledWith(JSON.stringify({ event: 'rate.limit' }));
    spy.mockRestore();
  });

  it('should log debug event to console.debug', () => {
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const logger = consoleLogger();

    logger.log({ level: 'debug', event: 'cache.hit', payload: { key: 'users:1' } });

    expect(spy).toHaveBeenCalledWith(JSON.stringify({ event: 'cache.hit', key: 'users:1' }));
    spy.mockRestore();
  });
});
