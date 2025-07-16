/**
 * Professional logging utility for react-bounding-box
 *
 * Features:
 * - Automatic NODE_ENV detection
 * - Zero runtime cost in production builds
 * - Consistent API across the library
 * - Tree-shakeable design
 * - TypeScript support
 */

export interface Logger {
  log(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

/**
 * Creates a logger instance with automatic NODE_ENV detection
 * @param namespace - Optional namespace for log messages
 * @returns Logger instance
 */
function createLogger(namespace?: string): Logger {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const prefix = namespace ? `[${namespace}]` : '[react-bounding-box]';

  return {
    log(message: string, ...args: any[]): void {
      if (isDevelopment) {
        console.log(`${prefix} ${message}`, ...args);
      }
    },

    info(message: string, ...args: any[]): void {
      if (isDevelopment) {
        console.info(`${prefix} ${message}`, ...args);
      }
    },

    warn(message: string, ...args: any[]): void {
      if (isDevelopment) {
        console.warn(`${prefix} ${message}`, ...args);
      }
    },

    error(message: string, ...args: any[]): void {
      if (isDevelopment) {
        console.error(`${prefix} ${message}`, ...args);
      }
    },

    debug(message: string, ...args: any[]): void {
      if (isDevelopment) {
        console.debug(`${prefix} ${message}`, ...args);
      }
    },
  };
}

// Default logger instance
export const logger = createLogger();

// Component-specific loggers
export const canvasLogger = createLogger('canvas');
export const segmentationLogger = createLogger('segmentation');
export const hooksLogger = createLogger('hooks');

// Export the factory function for custom loggers
export { createLogger };
