/**
 * Professional logging utility for react-bounding-box
 *
 * Features:
 * - Automatic NODE_ENV detection
 * - Zero runtime cost in production builds
 * - Consistent API across the library
 * - Tree-shakeable design
 */

/**
 * Creates a logger instance with automatic NODE_ENV detection
 * @param {string} [namespace] - Optional namespace for log messages
 * @returns {Object} Logger instance
 */
function createLogger(namespace) {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const prefix = namespace ? `[${namespace}]` : '[react-bounding-box]';

  return {
    log(message, ...args) {
      if (isDevelopment) {
        console.log(`${prefix} ${message}`, ...args);
      }
    },

    info(message, ...args) {
      if (isDevelopment) {
        console.info(`${prefix} ${message}`, ...args);
      }
    },

    warn(message, ...args) {
      if (isDevelopment) {
        console.warn(`${prefix} ${message}`, ...args);
      }
    },

    error(message, ...args) {
      if (isDevelopment) {
        console.error(`${prefix} ${message}`, ...args);
      }
    },

    debug(message, ...args) {
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
