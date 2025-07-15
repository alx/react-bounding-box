import React from 'react';
import { action } from '@storybook/addon-actions';

// Import both legacy and modern components
import Boundingbox from '../src/react-bounding-box';
// Note: Modern component import might need adjustment based on actual exports

import demoImage from './static/image.jpg';
import demoImageLarge from './static/imageLarge.png';
import demoImageDog from './static/dog.jpg';
import demoImageAgeReal from './static/age_real.png';

import segmentationJson from './static/segmentation.json';
import segmentationMasksJson from './static/segmentationMasks.json';
import segmentationMasksBoxesJson from './static/segmentationMasksBoxes.json';

import boxesBorderZeroJson from './static/boxesBorderZero.json';
import boxesAgeReal from './static/boxesAgeReal.json';

// CSF3 format
export default {
  title: 'Modern BoundingBox (v2.x)',
  component: Boundingbox,
};

export const BasicModernComponent = {
  name: '📱 Basic Modern Component',
  render: () => {
    const boxes = [
      [0, 0, 250, 250],
      [300, 0, 250, 250],
      [700, 0, 300, 25],
      [1100, 0, 25, 300],
    ];

    return (
      <div>
        <h3>Modern BoundingBox Component (v2.x)</h3>
        <p>Enhanced performance and improved features over legacy version</p>
        <Boundingbox
          image={demoImageLarge}
          boxes={boxes}
          onSelected={action('modern-selected')}
        />
      </div>
    );
  }
};

export const EnhancedInteractivity = {
  name: '🖱️ Enhanced Interactivity',
  render: () => {
    return (
      <div>
        <h3>Enhanced Mouse Interaction</h3>
        <p>Improved hover states and selection feedback</p>
        <Boundingbox
          image={demoImageDog}
          boxes={[
            [10, 10, 100, 100],
            [150, 50, 120, 80],
            [300, 100, 80, 120]
          ]}
          onSelected={action('enhanced-selection')}
          options={{
            colors: {
              normal: 'rgba(255,225,255,1)',
              selected: 'rgba(0,225,204,1)',
              unselected: 'rgba(100,100,100,0.7)',
            }
          }}
        />
      </div>
    );
  }
};

export const AdvancedSegmentation = {
  name: '🎨 Advanced Segmentation',
  render: () => {
    return (
      <div>
        <h3>Enhanced Segmentation Processing</h3>
        <p>Improved segmentation rendering with custom transparency</p>
        <Boundingbox
          image={demoImage}
          pixelSegmentation={segmentationJson.body.predictions[0].vals}
          segmentationTransparency={150}
          onSelected={action('segmentation-selected')}
        />
      </div>
    );
  }
};

export const PerformanceDemo = {
  name: '⚡ Performance Demo',
  render: () => {
    const boxes = Array.from({ length: 50 }, (_, i) => [
      (i % 10) * 80, Math.floor(i / 10) * 50, 70, 40
    ]);

    return (
      <div>
        <h3>Performance Demonstration (50 boxes)</h3>
        <p>Optimized rendering for multiple bounding boxes</p>
        <Boundingbox
          image={demoImageLarge}
          boxes={boxes}
          onSelected={action('performance-selected')}
        />
      </div>
    );
  }
};

export const CustomStyling = {
  name: '💅 Custom Styling',
  render: () => {
    const typedBoxes = [
      { xmin: 10, ymin: 10, xmax: 110, ymax: 110 },
      { xmin: 150, ymin: 50, xmax: 300, ymax: 200 },
      { coord: [350, 100, 100, 80], label: 'Custom' }
    ];

    return (
      <div>
        <h3>Custom Styling and Colors</h3>
        <p>Customizable appearance and enhanced visual feedback</p>
        <Boundingbox
          image={demoImageAgeReal}
          boxes={typedBoxes}
          options={{
            colors: {
              normal: '#3b82f6',
              selected: '#ef4444',
              unselected: '#6b7280'
            },
            style: {
              maxWidth: '600px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }
          }}
          onSelected={action('styled-selected')}
        />
      </div>
    );
  }
};

export const SeparateSegmentation = {
  name: '🌐 Separate Segmentation Canvas',
  render: () => {
    return (
      <div>
        <h3>Separate Segmentation Canvas</h3>
        <p>Independent segmentation layer for advanced use cases</p>
        <Boundingbox
          image={demoImageDog}
          segmentationMasks={segmentationMasksJson}
          boxes={segmentationMasksBoxesJson}
          separateSegmentation={true}
          segmentationTransparency={180}
          onSelected={action('separate-segmentation-selected')}
        />
      </div>
    );
  }
};

// Migration Examples
export const SideBySideComparison = {
  name: '🔄 Side by Side Comparison',
  render: () => {
    const boxes = [
      [50, 50, 150, 100],
      [250, 80, 120, 120]
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Standard Configuration</h4>
          <Boundingbox
            image={demoImage}
            boxes={boxes}
            onSelected={action('standard-selected')}
          />
        </div>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h4>Enhanced Configuration</h4>
          <Boundingbox
            image={demoImage}
            boxes={boxes}
            onSelected={action('enhanced-selected')}
            options={{
              colors: {
                normal: 'rgba(59, 130, 246, 1)',
                selected: 'rgba(239, 68, 68, 1)',
                unselected: 'rgba(107, 114, 128, 0.7)',
              }
            }}
          />
        </div>
      </div>
    );
  }
};

export const LegacyCompatibility = {
  name: '🔗 Legacy Compatibility',
  render: () => {
    return (
      <div>
        <h3>Legacy API Compatibility</h3>
        <p>Maintains full backward compatibility with existing code</p>
        <div style={{ marginBottom: '20px' }}>
          <h4>Same import, enhanced performance:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
            {`import Boundingbox from 'react-bounding-box';`}
          </pre>
        </div>
        <Boundingbox
          image={demoImageDog}
          boxes={segmentationMasksBoxesJson}
          segmentationMasks={segmentationMasksJson}
          separateSegmentation={true}
          onSelected={action('legacy-compat-selected')}
        />
      </div>
    );
  }
};