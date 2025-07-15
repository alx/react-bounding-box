// Main entry point for the modernized React Bounding Box library

// Main component exports
export { BoundingBox as default } from './components/BoundingBox';
export { BoundingBox } from './components/BoundingBox';

// Hook exports for advanced usage
export * from './hooks';

// Utility exports for custom implementations
export * from './utils';

// Type exports
export * from './types';

// Constants for customization
export * from './constants/defaults';

// Legacy compatibility - preserve original API
import { BoundingBox } from './components/BoundingBox';
export { BoundingBox as Boundingbox };