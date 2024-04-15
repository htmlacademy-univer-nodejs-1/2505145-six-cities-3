import { Logger } from './logger.interface.js';
import { getErrorMessage } from '../../helpers/index.js';

export class ConsoleLogger implements Logger {
  info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, ...args);
    console.error(`Error massage: ${getErrorMessage(error)}`);
  }

  warn(message: string, ...args: unknown[]): void {
    console.warn(message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

}
