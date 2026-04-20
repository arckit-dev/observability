# @arckit/observability

Structured observability toolkit with pluggable transports.

[![npm version](https://img.shields.io/npm/v/@arckit/observability)](https://www.npmjs.com/package/@arckit/observability)
[![npm downloads](https://img.shields.io/npm/dm/@arckit/observability)](https://www.npmjs.com/package/@arckit/observability)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@arckit/observability)](https://bundlephobia.com/package/@arckit/observability)
[![codecov](https://codecov.io/gh/arckit-dev/observability/graph/badge.svg)](https://codecov.io/gh/arckit-dev/observability)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

<h2 id="about">About</h2>

Lightweight logging abstraction with a `Logger` interface and two built-in transports:

- **Console** — structured JSON output via `console[level]`
- **File** — file-based logging via [pino](https://getpino.io/) (optional peer dependency)

<h2 id="installation">Installation</h2>

```bash
pnpm add @arckit/observability
```

For the file logger, also install pino:

```bash
pnpm add pino
```

<h2 id="usage">Usage</h2>

### Console logger

```typescript
import { consoleLogger } from '@arckit/observability';

const logger = consoleLogger();

logger.log({ level: 'info', event: 'user.created', payload: { userId: '123' } });
// console.info('{"event":"user.created","userId":"123"}')
```

### File logger

```typescript
import { fileLogger } from '@arckit/observability';

const logger = fileLogger({ path: './logs/app.log', console: true });

logger.log({ level: 'error', event: 'payment.failed', payload: { orderId: '456' } });
```

<h2 id="api">API</h2>

### `Logger`

```typescript
type Logger = {
  log: (entry: LogEntry) => void;
};
```

### `LogEntry`

```typescript
type LogEntry = {
  level: LogLevel;
  event: string;
  payload?: Record<string, unknown>;
};
```

### `LogLevel`

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';
```

### `consoleLogger() => Logger`

Creates a logger that outputs structured JSON to the console using `console[level]`.

### `fileLogger(config) => Logger`

| Parameter | Type | Description |
|-----------|------|-------------|
| `config.path` | `string` | File path for log output |
| `config.console` | `boolean?` | Also output to console with pino-pretty |

Creates a logger that writes structured logs to a file via pino. Automatically creates the directory if it doesn't exist.

<h2 id="contributing">Contributing</h2>

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

<h2 id="license">License</h2>

[MIT](LICENSE) &copy; Marc Gavanier
