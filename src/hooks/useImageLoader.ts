import { useRef, useState, useCallback, useEffect } from 'react';
import type { UseImageLoaderReturn } from '@/types';
import { IMAGE_CACHE_MAX_SIZE } from '@/constants/defaults';

/**
 * Custom hook for loading and caching images
 */
export const useImageLoader = (): UseImageLoaderReturn => {
  const imageCache = useRef(new Map<string, HTMLImageElement>());
  const [loadingState, setLoadingState] = useState<
    Record<string, 'loading' | 'loaded' | 'error'>
  >({});

  /**
   * Load image asynchronously with promise-based API
   */
  const loadImageAsync = useCallback(
    (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Failed to load image: ${src}`));

        // Handle base64 images
        if (src.startsWith('data:')) {
          image.src = src;
        } else {
          // Enable CORS for cross-origin images
          image.crossOrigin = 'anonymous';
          image.src = src;
        }
      });
    },
    []
  );

  /**
   * Load image with caching support
   */
  const loadImage = useCallback(
    async (src: string): Promise<HTMLImageElement> => {
      // Check cache first
      if (imageCache.current.has(src)) {
        const cachedImage = imageCache.current.get(src)!;
        setLoadingState(prev => ({ ...prev, [src]: 'loaded' }));
        return cachedImage;
      }

      // Set loading state
      setLoadingState(prev => ({ ...prev, [src]: 'loading' }));

      try {
        const image = await loadImageAsync(src);

        // Manage cache size
        if (imageCache.current.size >= IMAGE_CACHE_MAX_SIZE) {
          const firstKey = imageCache.current.keys().next().value;
          if (firstKey) {
            imageCache.current.delete(firstKey);
          }
        }

        // Cache the loaded image
        imageCache.current.set(src, image);
        setLoadingState(prev => ({ ...prev, [src]: 'loaded' }));

        return image;
      } catch (error) {
        setLoadingState(prev => ({ ...prev, [src]: 'error' }));
        throw error;
      }
    },
    [loadImageAsync]
  );

  /**
   * Preload multiple images
   */
  const preloadImages = useCallback(
    async (sources: string[]): Promise<HTMLImageElement[]> => {
      const promises = sources.map(src => loadImage(src));
      return Promise.all(promises);
    },
    [loadImage]
  );

  /**
   * Clear cache and loading states
   */
  const clearCache = useCallback(() => {
    imageCache.current.clear();
    setLoadingState({});
  }, []);

  /**
   * Remove specific image from cache
   */
  const removeFromCache = useCallback((src: string) => {
    imageCache.current.delete(src);
    setLoadingState(prev => {
      const newState = { ...prev };
      delete newState[src];
      return newState;
    });
  }, []);

  /**
   * Get cache size and stats
   */
  const getCacheStats = useCallback(() => {
    return {
      size: imageCache.current.size,
      maxSize: IMAGE_CACHE_MAX_SIZE,
      cachedImages: Array.from(imageCache.current.keys()),
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      imageCache.current.clear();
    };
  }, []);

  return {
    loadImage,
    loadingState,
    imageCache: imageCache.current,
    preloadImages,
    clearCache,
    removeFromCache,
    getCacheStats,
  };
};
