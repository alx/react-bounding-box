import { useState, useCallback, useRef } from 'react';
import type { UseMouseInteractionConfig, UseMouseInteractionReturn, BoundingBox } from '@/types';
import { scaleCoordinates, findSmallestContainingBox } from '@/utils/coordinateUtils';

/**
 * Custom hook for handling mouse interactions with bounding boxes
 */
export const useMouseInteraction = (config: UseMouseInteractionConfig): UseMouseInteractionReturn => {
  const { boxes, onSelected, canvasRef } = config;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const requestRef = useRef<number>();

  /**
   * Handle mouse move events on canvas
   */
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !boxes.length) return;

    // Cancel previous animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    requestRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const [x, y] = scaleCoordinates(
        event.clientX,
        event.clientY,
        rect,
        canvas.width,
        canvas.height
      );

      // Find the smallest box containing the mouse position
      const result = findSmallestContainingBox(x, y, boxes);
      const newHoveredIndex = result ? result.index : -1;

      if (newHoveredIndex !== hoveredIndex) {
        setHoveredIndex(newHoveredIndex);
        onSelected?.(newHoveredIndex);
      }
    });
  }, [boxes, hoveredIndex, onSelected, canvasRef]);

  /**
   * Handle mouse out events
   */
  const handleMouseOut = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    
    setHoveredIndex(-1);
    onSelected?.(-1);
  }, [onSelected]);

  /**
   * Programmatically select a box
   */
  const selectBox = useCallback((index: number) => {
    if (index >= -1 && index < boxes.length) {
      setSelectedIndex(index);
      setHoveredIndex(index);
      onSelected?.(index);
    }
  }, [boxes.length, onSelected]);

  /**
   * Handle canvas click events
   */
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !boxes.length) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const [x, y] = scaleCoordinates(
      event.clientX,
      event.clientY,
      rect,
      canvas.width,
      canvas.height
    );

    const result = findSmallestContainingBox(x, y, boxes);
    const clickedIndex = result ? result.index : -1;
    
    selectBox(clickedIndex);
  }, [boxes, selectBox, canvasRef]);

  /**
   * Get the currently hovered or selected box
   */
  const getCurrentBox = useCallback((): BoundingBox | null => {
    const index = hoveredIndex >= 0 ? hoveredIndex : selectedIndex;
    return index >= 0 && index < boxes.length ? boxes[index] : null;
  }, [hoveredIndex, selectedIndex, boxes]);

  /**
   * Clear all selections
   */
  const clearSelection = useCallback(() => {
    setSelectedIndex(-1);
    setHoveredIndex(-1);
    onSelected?.(-1);
  }, [onSelected]);

  return {
    selectedIndex,
    hoveredIndex,
    handleMouseMove,
    handleMouseOut,
    handleCanvasClick,
    selectBox,
    getCurrentBox,
    clearSelection
  };
};