// Web Worker for processing segmentation data off the main thread

interface SegmentationMessage {
  type: 'PROCESS_SEGMENTATION';
  payload: {
    segmentationData: number[];
    colors: Record<number, [number, number, number]>;
    imageWidth: number;
    imageHeight: number;
    transparency: number;
    blendMode: 'overlay' | 'separate';
  };
}

interface SegmentationResponse {
  type: 'SEGMENTATION_PROCESSED';
  payload: {
    processedData: ImageData;
    processingTime: number;
  };
}

// Handle messages from the main thread
self.onmessage = function (event: MessageEvent<SegmentationMessage>) {
  const { type, payload } = event.data;

  if (type === 'PROCESS_SEGMENTATION') {
    try {
      const startTime = performance.now();
      const processedData = processSegmentationData(payload);
      const processingTime = performance.now() - startTime;

      const response: SegmentationResponse = {
        type: 'SEGMENTATION_PROCESSED',
        payload: {
          processedData,
          processingTime,
        },
      };

      self.postMessage(response);
    } catch (error) {
      self.postMessage({
        type: 'SEGMENTATION_ERROR',
        payload: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }
};

/**
 * Process segmentation data and return ImageData
 */
function processSegmentationData(
  config: SegmentationMessage['payload']
): ImageData {
  const {
    segmentationData,
    colors,
    imageWidth,
    imageHeight,
    transparency,
    blendMode,
  } = config;

  // Create ImageData for the processed result
  const imageData = new ImageData(imageWidth, imageHeight);
  const pixels = imageData.data;

  // Process each pixel
  for (let i = 0, j = 0; i < pixels.length; i += 4, j++) {
    if (j < segmentationData.length) {
      const segmentClass = segmentationData[j];

      if (segmentClass > 0 && colors[segmentClass]) {
        const [r, g, b] = colors[segmentClass];

        if (blendMode === 'separate') {
          // Full opacity for separate canvas
          pixels[i] = r;
          pixels[i + 1] = g;
          pixels[i + 2] = b;
          pixels[i + 3] = 255;
        } else {
          // Overlay mode - blend with existing pixels
          pixels[i] = Math.round((pixels[i] + r) / 2);
          pixels[i + 1] = Math.round((pixels[i + 1] + g) / 2);
          pixels[i + 2] = Math.round((pixels[i + 2] + b) / 2);
          pixels[i + 3] = transparency;
        }
      } else if (blendMode === 'separate') {
        // Transparent background for separate canvas
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
      }
    }
  }

  return imageData;
}

/**
 * Process segmentation masks with optimized performance
 */
function processSegmentationMasks(config: {
  masks: Array<{
    width: number;
    height: number;
    data: number[];
    xmin: number;
    ymin: number;
  }>;
  colors: Record<number, [number, number, number]>;
  imageWidth: number;
  imageHeight: number;
  transparency: number;
}): ImageData {
  const { masks, colors, imageWidth, imageHeight, transparency } = config;

  const imageData = new ImageData(imageWidth, imageHeight);
  const pixels = imageData.data;

  // Initialize with transparent background
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 3] = 0; // Alpha = 0 (transparent)
  }

  // Process each mask
  masks.forEach((mask, maskIndex) => {
    const color = colors[maskIndex] || [255, 255, 255];
    const [r, g, b] = color;

    for (let y = 0; y < mask.height; y++) {
      for (let x = 0; x < mask.width; x++) {
        const maskDataIndex = y * mask.width + x;
        const imageX = mask.xmin + x;
        const imageY = mask.ymin + y;

        // Check bounds
        if (
          imageX >= 0 &&
          imageX < imageWidth &&
          imageY >= 0 &&
          imageY < imageHeight &&
          maskDataIndex < mask.data.length
        ) {
          const maskValue = mask.data[maskDataIndex];

          if (maskValue > 0) {
            const pixelIndex = (imageY * imageWidth + imageX) * 4;

            pixels[pixelIndex] = r;
            pixels[pixelIndex + 1] = g;
            pixels[pixelIndex + 2] = b;
            pixels[pixelIndex + 3] = transparency;
          }
        }
      }
    }
  });

  return imageData;
}

// Export type definitions for TypeScript
export type { SegmentationMessage, SegmentationResponse };
