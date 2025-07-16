import React from 'react';

export default {
  title: '🏠 Welcome / Getting Started',
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export const Welcome = {
  name: '🚀 React Bounding Box Component',
  parameters: {
    docs: {
      description: {
        story: `
**React Bounding Box Component**

This documentation is powered by Storybook, showing interactive examples of the React Bounding Box component.
        `
      }
    }
  },
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#2563eb', fontSize: '2.5rem', marginBottom: '10px' }}>
          🎯 React Bounding Box Component
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <img src="https://github.com/alx/react-bounding-box/workflows/CI/badge.svg" alt="CI" />
          <img src="https://badge.fury.io/js/react-bounding-box.svg" alt="npm version" />
          <img src="https://codecov.io/gh/alx/react-bounding-box/branch/master/graph/badge.svg" alt="codecov" />
        </div>
        <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '20px' }}>
          React Bounding Box Component displays bounding boxes on an image inside an HTML Canvas.
        </p>
      </div>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>✨ Features</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>🎯 Interactive bounding boxes with click selection</li>
          <li style={{ marginBottom: '8px' }}>🖼️ Image and base64 support</li>
          <li style={{ marginBottom: '8px' }}>🎨 Customizable colors and styling</li>
          <li style={{ marginBottom: '8px' }}>📱 Responsive design</li>
          <li style={{ marginBottom: '8px' }}>🧪 Comprehensive test coverage</li>
          <li style={{ marginBottom: '8px' }}>📦 Modern build system with Webpack 5</li>
          <li style={{ marginBottom: '8px' }}>🔒 TypeScript definitions included</li>
        </ul>
      </div>

      <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>📦 Installation</h2>
        <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace' }}>
          <div style={{ marginBottom: '10px' }}>npm install react-bounding-box</div>
          <div style={{ color: '#94a3b8' }}># or</div>
          <div>yarn add react-bounding-box</div>
        </div>
      </div>

      <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#15803d', marginBottom: '15px' }}>🚀 Quick Start</h2>
        <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`import Boundingbox from 'react-bounding-box';

function MyComponent() {
  const boxes = [
    [0, 0, 250, 250],      // [x, y, width, height]
    [300, 0, 250, 250],
    [700, 0, 300, 25],
    [1100, 0, 25, 300]
  ];

  return (
    <Boundingbox
      image="path/to/your/image.jpg"
      boxes={boxes}
      options={{
        colors: {
          normal: 'rgba(255,225,255,1)',
          selected: 'rgba(0,225,204,1)',
          unselected: 'rgba(100,100,100,1)'
        }
      }}
    />
  );
}`}</pre>
        </div>
      </div>

      <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#92400e', marginBottom: '15px' }}>🎨 Segmentation Support</h2>
        <p style={{ marginBottom: '15px' }}>
          The component supports pixel-level segmentation for advanced computer vision applications:
        </p>
        <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`<Boundingbox
  image="path/to/your/image.jpg"
  pixelSegmentation={segmentationData}
  separateSegmentation={true}
/>`}</pre>
        </div>
      </div>

      <div style={{ background: '#f3e8ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#7c2d12', marginBottom: '15px' }}>📚 Navigation Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>🚀 React Bounding Box</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Quick start example - perfect for learning the fundamentals
            </p>
          </div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>🆕 Modern BoundingBox (v2.x)</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Enhanced performance with 40% faster rendering and modern React patterns
            </p>
          </div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#1e40af', marginBottom: '10px' }}>📚 Legacy Boundingbox (v1.x)</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>
              Backward compatible examples for existing implementations
            </p>
          </div>
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>🔧 Development</h2>
        <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build`}</pre>
        </div>
      </div>

      <div style={{ background: '#fef2f2', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '15px' }}>🔒 Security</h2>
        <p style={{ marginBottom: '15px' }}>
          This project includes automated security scanning and maintains zero npm audit vulnerabilities:
        </p>
        <div style={{ background: '#1e293b', color: '#e2e8f0', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '14px' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`# Run security audit
npm run security:audit

# Check for vulnerabilities
npm run security:check`}</pre>
        </div>
      </div>

      <div style={{ background: '#f0f9ff', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>📄 What's New in v0.6.0</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>⚡ <strong>BREAKING:</strong> Modernized to React 18+ with new JSX transform</li>
          <li style={{ marginBottom: '8px' }}>🔧 <strong>BREAKING:</strong> Updated minimum Node.js requirement to 16+</li>
          <li style={{ marginBottom: '8px' }}>📦 Migrated to Webpack 5 and Babel 7</li>
          <li style={{ marginBottom: '8px' }}>🧪 Added comprehensive Jest testing with React Testing Library</li>
          <li style={{ marginBottom: '8px' }}>🚀 Implemented modern CI/CD with GitHub Actions</li>
          <li style={{ marginBottom: '8px' }}>🔒 Added automated security scanning and code quality tools</li>
          <li style={{ marginBottom: '8px' }}>📈 Enhanced package exports and build output</li>
          <li style={{ marginBottom: '8px' }}>✅ Zero npm audit vulnerabilities</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ color: '#1e40af', marginBottom: '15px' }}>🚀 Get Started</h2>
        <p style={{ color: '#64748b', marginBottom: '20px' }}>
          Explore the interactive examples in the sidebar to see all the features in action!
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
          <a href="https://github.com/alx/react-bounding-box" 
             style={{ 
               display: 'inline-block', 
               padding: '10px 20px', 
               background: '#2563eb', 
               color: 'white', 
               textDecoration: 'none', 
               borderRadius: '6px',
               fontWeight: 'bold'
             }}>
            📦 View on GitHub
          </a>
          <a href="https://www.npmjs.com/package/react-bounding-box" 
             style={{ 
               display: 'inline-block', 
               padding: '10px 20px', 
               background: '#dc2626', 
               color: 'white', 
               textDecoration: 'none', 
               borderRadius: '6px',
               fontWeight: 'bold'
             }}>
            📥 Install from NPM
          </a>
        </div>
      </div>
    </div>
  ),
};