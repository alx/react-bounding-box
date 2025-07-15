import React from 'react';
import type { BoundingBoxProps } from '@/types';
import { useBoundingBox } from '@/hooks/useBoundingBox';

/**
 * Modern React Bounding Box component using hooks
 */
export const BoundingBox: React.FC<BoundingBoxProps> = ({
  image,
  boxes = [],
  options = {},
  pixelSegmentation,
  segmentationJsonUrl,
  segmentationMasks,
  segmentationColors,
  segmentationTransparency,
  separateSegmentation = false,
  selectedIndex,
  className,
  onSelected,
  drawBox: customDrawBox,
  drawLabel: customDrawLabel,
  ...rest
}) => {
  // Configure segmentation options
  const segmentationConfig = {
    segmentationData: pixelSegmentation,
    segmentationMasks,
    colors: segmentationColors,
    transparency: segmentationTransparency,
    separateCanvas: separateSegmentation
  };

  // Main hook orchestration
  const {
    mainCanvasRef,
    segmentationCanvasRef,
    selectedIndex: currentSelectedIndex,
    hoveredIndex,
    isLoading,
    error,
    selectBox,
    handleMouseMove,
    handleMouseOut,
    handleCanvasClick
  } = useBoundingBox({
    image,
    boxes,
    options,
    segmentation: segmentationConfig,
    onSelection: onSelected
  });

  // Sync external selectedIndex with internal state
  React.useEffect(() => {
    if (selectedIndex !== undefined && selectedIndex !== currentSelectedIndex) {
      selectBox(selectedIndex);
    }
  }, [selectedIndex, currentSelectedIndex, selectBox]);

  // Handle loading segmentation from URL
  React.useEffect(() => {
    if (segmentationJsonUrl) {
      fetch(segmentationJsonUrl)
        .then(response => response.json())
        .then(data => {
          // Handle deepdetect format
          if (data.body?.predictions?.[0]?.vals) {
            // This would need to update the segmentation data
            // Implementation depends on how we want to handle this
            console.log('Loaded segmentation data:', data.body.predictions[0].vals);
          }
        })
        .catch(err => console.error('Failed to load segmentation:', err));
    }
  }, [segmentationJsonUrl]);

  if (error) {
    return (
      <div className={className} style={{ color: 'red', padding: '10px' }}>
        Error loading image: {error}
      </div>
    );
  }

  return (
    <div className={className} {...rest}>
      {/* Main canvas for image and bounding boxes */}
      <canvas
        ref={mainCanvasRef}
        className="boundingBoxCanvas"
        style={options.style}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        onClick={handleCanvasClick}
        role="img"
        aria-label="Image with bounding boxes"
      />
      
      {/* Separate segmentation canvas (if enabled) */}
      {separateSegmentation && (
        <canvas
          ref={segmentationCanvasRef}
          className="boundingSegmentationCanvas"
          style={options.styleSegmentation}
          role="img"
          aria-label="Segmentation overlay"
        />
      )}
      
      {/* Loading indicator */}
      {isLoading && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '4px'
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

// Default export for backward compatibility
export default BoundingBox;