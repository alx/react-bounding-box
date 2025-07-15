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
export declare const usePerformanceMonitor: (config?: PerformanceMonitorConfig) => {
    startTiming: () => (() => void);
    currentMetrics: PerformanceMetrics;
    getPerformanceStats: () => {
        averageRenderTime: number;
        maxRenderTime: number;
        minRenderTime: number;
        averageFrameRate: number;
        totalOperations: number;
        memoryUsage: number | undefined;
    };
    resetMetrics: () => void;
    isPerformanceDegraded: () => boolean | 0 | undefined;
    getPerformanceRecommendations: () => string[];
    enabled: boolean;
};
export {};
//# sourceMappingURL=usePerformanceMonitor.d.ts.map