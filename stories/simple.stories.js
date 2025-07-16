import React from 'react';
import { action } from '@storybook/addon-actions';
import Boundingbox from '../src/react-bounding-box';

export default {
  title: 'React Bounding Box',
  component: Boundingbox,
};

export const BasicExample = {
  name: '🚀 Quick Start Example',
  parameters: {
    docs: {
      description: {
        story: `
**Quick Start with React BoundingBox**

Simple example to get you started with the React BoundingBox component.

### Quick Start Code:
\`\`\`jsx
import Boundingbox from 'react-bounding-box';

function QuickExample() {
  const boxes = [
    [50, 50, 150, 100],   // [x, y, width, height]
    [250, 80, 120, 120]
  ];

  return (
    <Boundingbox
      image="/path/to/your/image.jpg"
      boxes={boxes}
      onSelected={(index) => {
        console.log('Selected box:', index);
      }}
    />
  );
}
\`\`\`

### Next Steps:
- 🆕 Check out **Modern BoundingBox (v2.x)** for enhanced features
- 📚 Explore **Legacy examples** for backward compatibility
- 🎯 Try **interactive demos** for advanced use cases
        `,
      },
    },
  },
  render: args => {
    return (
      <div>
        <div
          style={{
            padding: '12px',
            background: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            marginBottom: '16px',
          }}
        >
          <h4 style={{ margin: '0 0 4px 0', color: '#0c4a6e' }}>
            🚀 Getting Started
          </h4>
          <p style={{ margin: 0, color: '#075985', fontSize: '14px' }}>
            Basic usage example - perfect for learning the fundamentals
          </p>
        </div>

        <div
          style={{
            padding: '12px',
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            marginBottom: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <strong>📋 Code used in this story:</strong>
            <button
              onClick={() => {
                const code = `<Boundingbox
  image="image.jpg"
  boxes={[
    [50, 50, 150, 100],
    [250, 80, 120, 120]
  ]}
  onSelected={(index) => console.log('Selected:', index)}
/>`;
                navigator.clipboard.writeText(code);
                const btn = event.target;
                const originalText = btn.textContent;
                btn.textContent = '✅ Copied!';
                btn.style.background = '#10b981';
                setTimeout(() => {
                  btn.textContent = originalText;
                  btn.style.background = '#3b82f6';
                }, 2000);
              }}
              style={{
                padding: '4px 8px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              📋 Copy Code
            </button>
          </div>
          <pre
            style={{
              margin: '0',
              background: '#f1f5f9',
              padding: '8px',
              borderRadius: '4px',
              overflow: 'auto',
            }}
          >
            {`<Boundingbox
  image="image.jpg"
  boxes={[
    [50, 50, 150, 100],
    [250, 80, 120, 120]
  ]}
  onSelected={(index) => console.log('Selected:', index)}
/>`}
          </pre>
        </div>
        {React.createElement(Boundingbox, {
          image: 'image.jpg',
          boxes: [
            [50, 50, 150, 100],
            [250, 80, 120, 120],
          ],
          onSelected: action('box-selected'),
          ...args,
        })}
      </div>
    );
  },
};
