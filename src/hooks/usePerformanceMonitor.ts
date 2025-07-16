import { useRef, useCallback, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  frameRate: number;
  memoryUsage?: number;
  canvasOperations: number;
}

interface PerformanceMonitorConfig {
  enabled?: boolean;
  sampleSize?: number;
  memoryMonitoring?: boolean;
}

/**
 * Hook for monitoring performance metrics of canvas operations
 */
export const usePerformanceMonitor = (
  config: PerformanceMonitorConfig = {}
) => {
  const {
    enabled = process.env.NODE_ENV === 'development',
    sampleSize = 60, // Monitor last 60 operations
    memoryMonitoring = true,
  } = config;

  const metricsRef = useRef<PerformanceMetrics[]>([]);
  const frameTimeRef = useRef<number>(0);
  const operationCountRef = useRef<number>(0);
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    frameRate: 0,
    canvasOperations: 0,
  });

  /**
   * Start timing a performance-critical operation
   */
  const startTiming = useCallback((): (() => void) => {
    if (!enabled) return () => {};

    const startTime = performance.now();
    operationCountRef.current++;

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Calculate frame rate
      const now = performance.now();
      const frameTime = now - frameTimeRef.current;
      frameTimeRef.current = now;
      const frameRate = frameTime > 0 ? 1000 / frameTime : 0;

      // Get memory usage if available
      let memoryUsage: number | undefined;
      if (memoryMonitoring && 'memory' in performance) {
        memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }

      const metrics: PerformanceMetrics = {
        renderTime,
        frameRate,
        memoryUsage,
        canvasOperations: operationCountRef.current,
      };

      // Update metrics history
      metricsRef.current.push(metrics);
      if (metricsRef.current.length > sampleSize) {
        metricsRef.current.shift();
      }

      // Update current metrics with moving average
      updateCurrentMetrics();
    };
  }, [enabled, sampleSize, memoryMonitoring]);

  /**
   * Update current metrics with moving averages
   */
  const updateCurrentMetrics = useCallback(() => {
    if (metricsRef.current.length === 0) return;

    const recent = metricsRef.current.slice(-10); // Last 10 samples
    const avgRenderTime =
      recent.reduce((sum: number, m: PerformanceMetrics) => sum + m.renderTime, 0) / recent.length;
    const avgFrameRate =
      recent.reduce((sum: number, m: PerformanceMetrics) => sum + m.frameRate, 0) / recent.length;
    const avgMemory =
      recent.length > 0 && recent[0].memoryUsage !== undefined
        ? recent.reduce((sum: number, m: PerformanceMetrics) => sum + (m.memoryUsage || 0), 0) /
          recent.length
        : undefined;

    setCurrentMetrics({
      renderTime: Math.round(avgRenderTime * 100) / 100,
      frameRate: Math.round(avgFrameRate * 10) / 10,
      memoryUsage: avgMemory ? Math.round(avgMemory * 100) / 100 : undefined,
      canvasOperations: operationCountRef.current,
    });
  }, []);

  /**
   * Get performance statistics
   */
  const getPerformanceStats = useCallback(() => {
    if (metricsRef.current.length === 0) {
      return {
        averageRenderTime: 0,
        maxRenderTime: 0,
        minRenderTime: 0,
        averageFrameRate: 0,
        totalOperations: 0,
        memoryUsage: undefined,
      };
    }

    const renderTimes = metricsRef.current.map((m: PerformanceMetrics) => m.renderTime);
    const frameRates = metricsRef.current.map((m: PerformanceMetrics) => m.frameRate);

    return {
      averageRenderTime:
        renderTimes.reduce((a: number, b: number) => a + b, 0) / renderTimes.length,
      maxRenderTime: Math.max(...renderTimes),
      minRenderTime: Math.min(...renderTimes),
      averageFrameRate:
        frameRates.reduce((a: number, b: number) => a + b, 0) / frameRates.length,
      totalOperations: operationCountRef.current,
      memoryUsage: currentMetrics.memoryUsage,
    };
  }, [currentMetrics.memoryUsage]);

  /**
   * Reset all metrics
   */
  const resetMetrics = useCallback(() => {
    metricsRef.current = [];
    operationCountRef.current = 0;
    setCurrentMetrics({
      renderTime: 0,
      frameRate: 0,
      canvasOperations: 0,
    });
  }, []);

  /**
   * Check if performance is degraded
   */
  const isPerformanceDegraded = useCallback(() => {
    const stats = getPerformanceStats();
    return (
      stats.averageRenderTime > 16 || // > 60fps
      stats.averageFrameRate < 30 ||
      (stats.memoryUsage && stats.memoryUsage > 100) // > 100MB
    );
  }, [getPerformanceStats]);

  /**
   * Get performance recommendations
   */
  const getPerformanceRecommendations = useCallback(() => {
    const stats = getPerformanceStats();
    const recommendations: string[] = [];

    if (stats.averageRenderTime > 16) {
      recommendations.push(
        'Consider reducing the number of bounding boxes or using canvas culling'
      );
    }

    if (stats.averageFrameRate < 30) {
      recommendations.push(
        'Enable batched rendering or reduce canvas update frequency'
      );
    }

    if (stats.memoryUsage && stats.memoryUsage > 100) {
      recommendations.push(
        'Clear image cache periodically or reduce cache size'
      );
    }

    if (stats.totalOperations > 1000) {
      recommendations.push(
        'Consider using requestAnimationFrame for canvas operations'
      );
    }

    return recommendations;
  }, [getPerformanceStats]);

  return {
    startTiming,
    currentMetrics,
    getPerformanceStats,
    resetMetrics,
    isPerformanceDegraded,
    getPerformanceRecommendations,
    enabled,
  };
};
