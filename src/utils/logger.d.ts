/**
 * TypeScript definitions for logger.js
 */

export interface Logger {
  log(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

export function createLogger(namespace?: string): Logger;

export const logger: Logger;
export const canvasLogger: Logger;
export const segmentationLogger: Logger;
export const hooksLogger: Logger;
