export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogEntry = {
  level: LogLevel;
  event: string;
  payload?: Record<string, unknown>;
};

export type Logger = {
  log: (entry: LogEntry) => void;
};
