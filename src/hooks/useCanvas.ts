import { useRef, useState, useCallback, useEffect } from 'react';
import type { UseCanvasConfig, UseCanvasReturn } from '@/types';

/**
 * Custom hook for managing HTML5 Canvas operations
 */
export const useCanvas = (config: UseCanvasConfig = {}): UseCanvasReturn => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ 
    width: config.width || 0, 
    height: config.height || 0 
  });
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }
  }, []);

  /**
   * Resize canvas and update dimensions
   */
  const resizeCanvas = useCallback((width: number, height: number) => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      setDimensions({ width, height });
      
      // Re-get context to ensure it's properly configured
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }
  }, []);

  /**
   * Clear the entire canvas
   */
  const clearCanvas = useCallback(() => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [context]);

  return {
    canvasRef,
    dimensions,
    context,
    resizeCanvas,
    clearCanvas
  };
};