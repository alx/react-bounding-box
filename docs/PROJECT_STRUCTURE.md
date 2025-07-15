# React Bounding Box - Project Structure

## Overview

This document provides a comprehensive overview of the React Bounding Box project structure, explaining the purpose and organization of each component.

## Directory Structure

```
react-bounding-box/
├── src/                          # Source code
├── stories/                      # Storybook stories and examples
├── docs/                         # Documentation files
├── public/                       # Public assets and demo files
├── dist/                         # Built distribution files (generated)
├── node_modules/                 # Dependencies (generated)
├── .github/                      # GitHub Actions workflows
├── .scripts/                     # Build and deployment scripts
└── Configuration files           # Package.json, webpack, etc.
```

## Source Code (`src/`)

### Main Component

- **`react-bounding-box.js`** - The core React component containing all functionality
  - Single-file component architecture for simplicity
  - ~565 lines of well-commented code
  - Handles canvas rendering, mouse interaction, and segmentation

### Tests

- **`tests/index.js`** - Test suite using Jest and React Testing Library
  - Component rendering tests
  - Prop validation tests
  - Interaction behavior tests

## Storybook Stories (`stories/`)

Interactive examples and documentation using Storybook:

### Story Files

- **`index.stories.js`** - Main collection of interactive examples
- **`indexState.stories.js`** - Stateful component examples

### Static Assets (`stories/static/`)

- **Images**:
  - `image.jpg` - Standard demo image
  - `imageLarge.png` - Large format demo image
  - `dog.jpg` - Pet detection demo
  - `age_real.png` - Age estimation demo
- **JSON Data**:
  - `segmentation.json` - Pixel segmentation data
  - `segmentationMasks.json` - Region mask data
  - `segmentationMasksBoxes.json` - Corresponding bounding boxes
  - `boxesBorderZero.json` - Edge case testing data
  - `boxesAgeReal.json` - Age detection bounding boxes

- **Styling**:
  - `styles.css` - Custom CSS for story demonstrations

## Documentation (`docs/`)

Comprehensive documentation system:

- **`API.md`** - Complete API reference with all props and methods
- **`EXAMPLES.md`** - Practical usage examples and patterns
- **`PROJECT_STRUCTURE.md`** - This file, project organization guide

## Public Assets (`public/`)

Demo files and screenshots:

### Demo Data

- **`ADE_val_00000761.jpg`** - ADE20K dataset sample image
- **`ADE_val_00000761.json`** - Corresponding segmentation data

### Screenshots (`public/assets/img/`)

- **`screenshot_segmentation.png`** - Overlay segmentation demo
- **`screenshot_segmentation_separate.png`** - Separate canvas demo

## Configuration Files

### Package Management

- **`package.json`** - Project metadata, dependencies, and scripts
- **`package-lock.json`** - Locked dependency versions
- **`yarn.lock`** - Alternative package manager lock file

### Build System

- **`webpack.config.js`** - Webpack build configuration
- **`babel.config.js`** - Babel transpilation settings

### Code Quality

- **`.eslintrc.js`** - ESLint configuration (Airbnb style guide)
- **`.prettierrc`** - Code formatting rules
- **`jest.config.js`** - Test runner configuration

### Git & CI/CD

- **`.gitignore`** - Git ignore patterns
- **`.github/workflows/`** - GitHub Actions CI/CD pipelines
- **`.husky/`** - Git hooks configuration

### Documentation

- **`README.md`** - Primary project documentation
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`LICENSE`** - MIT license
- **`CLAUDE.md`** - Claude Code integration instructions

## Build Output (`dist/`)

Generated files from the build process:

- **`react-bounding-box.js`** - UMD bundle for browser use
- **`react-bounding-box.min.js`** - Minified production bundle
- Source maps and other build artifacts

## Scripts and Automation (`.scripts/`)

- **`publish_storybook.sh`** - Storybook deployment script
- Other build and deployment automation

## Key Features by File

### Core Component (`src/react-bounding-box.js`)

**Canvas Management**:

- Lines 36-157: Image loading and canvas initialization
- Lines 286-327: Segmentation rendering
- Lines 329-380: Segmentation masks handling

**Mouse Interaction**:

- Lines 74-156: Mouse event handling and box selection
- Coordinate scaling for responsive design
- Hover state management

**Rendering System**:

- Lines 245-284: Bounding box rendering
- Lines 439-502: Default box drawing function
- Lines 503-544: Default label drawing function

**PropTypes Definition**:

- Lines 406-431: Complete prop type definitions
- Lines 433-562: Default props and functions

### Test Suite (`src/tests/index.js`)

**Test Categories**:

- Component mounting and rendering
- Prop validation and type checking
- Canvas interaction simulation
- Segmentation data handling

### Story Examples (`stories/index.stories.js`)

**Story Categories**:

- Basic bounding box display
- Different coordinate formats
- Interactive selection
- Label display
- Pixel segmentation
- Custom color schemes
- Remote image handling
- Segmentation masks

## Development Workflow

### Local Development

1. **Install**: `npm install`
2. **Development**: `npm run storybook` (port 6006)
3. **Testing**: `npm test` or `npm run test:watch`
4. **Linting**: `npm run lint` or `npm run lintfix`

### Build Process

1. **Source → Transpiled**: Babel transforms JSX and ES6+
2. **Bundling**: Webpack creates UMD bundle
3. **Optimization**: Minification and tree shaking
4. **Output**: `dist/react-bounding-box.js`

### Quality Assurance

1. **Pre-commit**: Husky runs lint-staged
2. **Linting**: ESLint with Airbnb config
3. **Formatting**: Prettier for consistent style
4. **Testing**: Jest with React Testing Library
5. **Security**: npm audit and audit-ci

### CI/CD Pipeline

1. **Trigger**: Push to any branch
2. **Setup**: Node.js environment
3. **Install**: Dependencies installation
4. **Lint**: Code quality checks
5. **Test**: Complete test suite
6. **Build**: Production bundle creation
7. **Security**: Vulnerability scanning

## Architecture Decisions

### Single File Component

- **Rationale**: Simplicity and self-containment
- **Benefits**: Easy to understand, minimal dependencies
- **Trade-offs**: Less modular, harder to extend

### Canvas-Based Rendering

- **Rationale**: Performance for image annotation
- **Benefits**: Smooth interaction, pixel-perfect rendering
- **Trade-offs**: More complex than DOM-based solutions

### Dual Canvas System

- **Rationale**: Cross-origin image support
- **Benefits**: Works with external images
- **Implementation**: Main canvas + optional segmentation canvas

### Flexible Data Formats

- **Rationale**: Support various annotation tools
- **Benefits**: Easy integration with existing systems
- **Formats**: Arrays, objects, min/max coordinates

## Extension Points

### Custom Rendering

- `drawBox` prop for custom bounding box styles
- `drawLabel` prop for custom label rendering
- CSS styling through `options.style`

### Data Integration

- Multiple bounding box formats
- Segmentation data loading
- External JSON file support

### Event Handling

- `onSelected` callback for selection events
- `selectedIndex` for external control
- Mouse interaction customization

This structure supports both simple usage and complex customization while maintaining clear separation of concerns and comprehensive testing coverage.
