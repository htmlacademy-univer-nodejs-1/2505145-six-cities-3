import { Logger } from './logger.interface.js';
import { pino, Logger as PinoInstance, transport } from 'pino';
import { getCurrentModuleDirectoryPath } from '../../helpers/index.js';
import { resolve } from 'node:path';
import { injectable } from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = 'logs/rest.log';
    const destination = resolve(modulePath, '../../../', logFilePath);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        },
        {
          target: 'pino/file',
          options: {destination},
          level: 'debug'
        }
      ],
    });

    this.logger = pino({}, multiTransport);
    this.logger.info('Logger created');
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

}
