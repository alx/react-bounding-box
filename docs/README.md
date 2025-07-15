# React Bounding Box - Documentation Index

Welcome to the comprehensive documentation for the React Bounding Box component library.

## 📚 Documentation Overview

This documentation provides everything you need to effectively use and contribute to the React Bounding Box component.

### Quick Navigation

| Document                                    | Description                                                   | Target Audience |
| ------------------------------------------- | ------------------------------------------------------------- | --------------- |
| [API Reference](./API.md)                   | Complete API documentation with all props, methods, and types | Developers      |
| [Usage Examples](./EXAMPLES.md)             | Practical examples and common patterns                        | All users       |
| [Project Structure](./PROJECT_STRUCTURE.md) | Codebase organization and architecture                        | Contributors    |

## 🚀 Quick Start

### Installation

```bash
npm install react-bounding-box
# or
yarn add react-bounding-box
```

### Basic Usage

```javascript
import React from 'react';
import Boundingbox from 'react-bounding-box';

function App() {
  const boxes = [
    [0, 0, 250, 250], // [x, y, width, height]
    [300, 0, 250, 250],
  ];

  return (
    <Boundingbox
      image="https://example.com/image.jpg"
      boxes={boxes}
      onSelected={index => console.log('Selected:', index)}
    />
  );
}
```

## 📖 Detailed Documentation

### [API Reference](./API.md)

Complete technical reference covering:

- **All Props**: Required and optional properties with types and defaults
- **Methods**: Component methods and their usage
- **Data Formats**: Supported bounding box and segmentation formats
- **Canvas Architecture**: Understanding the dual-canvas system
- **Performance**: Optimization strategies and considerations

### [Usage Examples](./EXAMPLES.md)

Practical implementation guides including:

- **Basic Usage**: Simple bounding box display
- **Interactive Features**: Selection handling and external control
- **Segmentation**: Pixel-level and region-based overlays
- **Custom Styling**: Colors, responsive design, and CSS integration
- **Advanced Customization**: Custom rendering functions and base64 support
- **Framework Integration**: Redux, TypeScript, and state management

### [Project Structure](./PROJECT_STRUCTURE.md)

Development and contribution guide covering:

- **Directory Organization**: Complete project layout explanation
- **File Purpose**: Role of each file and directory
- **Build System**: Webpack, Babel, and CI/CD pipeline
- **Development Workflow**: Local setup, testing, and quality assurance
- **Architecture Decisions**: Design rationale and trade-offs
- **Extension Points**: How to customize and extend functionality

## 🎯 Common Use Cases

### Computer Vision Applications

- Object detection visualization
- Image annotation tools
- ML model result display
- Dataset labeling interfaces

### Segmentation Visualization

- Semantic segmentation overlays
- Instance segmentation masks
- Medical image analysis
- Satellite image processing

### Interactive Interfaces

- Image exploration tools
- Educational demonstrations
- Quality assurance workflows
- Data validation interfaces

## 🔧 Key Features

- **🎯 Interactive Selection**: Click and hover box selection
- **🖼️ Flexible Images**: URL, local, and base64 support
- **🎨 Customizable Styling**: Colors, transparency, and responsive design
- **📊 Multiple Data Formats**: Arrays, objects, and coordinate systems
- **🎭 Segmentation Support**: Pixel-level and region-based overlays
- **⚡ High Performance**: Canvas-based rendering with smooth interaction
- **🔧 Extensible**: Custom rendering functions and event handling

## 📦 Package Information

- **Current Version**: 0.5.21
- **License**: MIT
- **Repository**: [github.com/alx/react-bounding-box](https://github.com/alx/react-bounding-box)
- **Dependencies**: React 16.8+, prop-types, seedrandom
- **Bundle Size**: ~15KB minified

## 🤝 Contributing

See the main [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines.

For documentation improvements:

1. Edit relevant `.md` files in the `docs/` directory
2. Ensure examples are tested and working
3. Update the documentation index if adding new files
4. Follow the established documentation style and format

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/alx/react-bounding-box/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alx/react-bounding-box/discussions)
- **Documentation**: This documentation site

## 🔗 External Resources

- **Demo**: [Live Storybook Demo](https://alx.github.io/react-bounding-box/)
- **npm Package**: [react-bounding-box on npm](https://www.npmjs.com/package/react-bounding-box)
- **Original Inspiration**: [DenseCap](http://cs.stanford.edu/people/karpathy/densecap/)

---

**Navigation**: [API](./API.md) | [Examples](./EXAMPLES.md) | [Structure](./PROJECT_STRUCTURE.md)
