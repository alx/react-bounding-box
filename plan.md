# Professional Console Statement Management Plan

## Problem Analysis

The current issue is that the Code Quality workflow uses `grep` for static text analysis, which cannot understand JavaScript conditional logic. Even properly guarded console statements with `process.env.NODE_ENV !== 'production'` are flagged because grep sees raw text `console.log` regardless of surrounding conditions.

## Current State

- 12 console statements across codebase (8 warn, 3 error, 1 log)
- All statements already guarded with NODE_ENV checks
- ESLint configured with `'no-console': 'warn'`
- Webpack has proper NODE_ENV configuration

## Recommended Solution: Hybrid Professional Approach

### 1. Create Custom Logger Utility

- **File**: `src/utils/logger.ts`
- **Purpose**: Centralized, tree-shakeable logging with consistent API
- **API**: `logger.warn()`, `logger.error()`, `logger.info()`, `logger.debug()`
- **Features**: Automatic NODE_ENV detection, namespace support, zero runtime cost in production

### 2. Configure Build-Time Console Removal

- **Add**: `babel-plugin-transform-remove-console` to webpack config
- **Purpose**: Remove ALL console statements from production builds
- **Benefit**: Guarantees clean production bundles regardless of source code

### 3. Replace All Console Statements

- **Target**: All 12 console statements across the codebase
- **Replace**: `console.warn()` → `logger.warn()`
- **Maintain**: Same functionality, better organization

### 4. Update Code Quality Workflow

- **Replace**: grep-based console detection with ESLint programmatic checking
- **Command**: `npx eslint src --format json | jq '.[] | select(.messages[].ruleId == "no-console")'`
- **Benefit**: Intelligent analysis respecting ESLint rules and exceptions

### 5. Professional Error Handling Enhancement

- **Add**: Proper error boundaries and graceful degradation
- **Reduce**: Reliance on console logging for error communication
- **Implement**: User-facing error feedback where appropriate

## Implementation Order

1. Create plan.md file with this plan ✓
2. Create logger utility
3. Update build configuration
4. Replace console statements systematically
5. Update CI workflow
6. Test all scenarios (dev, prod, CI)

## Benefits

- ✅ Professional logging approach for React component library
- ✅ Clean production builds with zero console output
- ✅ Preserved development debugging capabilities
- ✅ Reliable CI/CD without false positives
- ✅ Future-proof extensible logging system
- ✅ Industry-standard approach used by major libraries

This solution addresses the root cause while implementing professional logging practices suitable for a public React component library.

## Console Statement Locations

Current console statements that need to be replaced:

### TypeScript Files:

- `src/components/BoundingBox/index.tsx:72` - console.log (segmentation data)
- `src/components/BoundingBox/index.tsx:81` - console.error (segmentation load failure)
- `src/utils/canvasUtils.ts:213` - console.warn (box drawing error)
- `src/utils/canvasUtils.ts:261` - console.warn (label drawing error)
- `src/hooks/useBoundingBox.ts:180` - console.warn (box drawing error)
- `src/hooks/useBoundingBox.ts:210` - console.warn (label drawing error)
- `src/hooks/useSegmentation.ts:164` - console.error (segmentation rendering error)
- `src/hooks/useSegmentation.ts:197` - console.error (segmentation URL load error)

### JavaScript Files:

- `src/react-bounding-box.js:37` - console.warn (canvas ref unavailable - componentDidMount)
- `src/react-bounding-box.js:52` - console.warn (canvas ref unavailable - image load)
- `src/react-bounding-box.js:316` - console.warn (canvas ref unavailable - renderBox)
- `src/react-bounding-box.js:348` - console.warn (canvas ref unavailable - renderBoxes)

## Technical Implementation Details

### Logger Utility Features:

- Automatic tree-shaking in production builds
- Namespace support for component-specific logging
- Consistent formatting and structured output
- Zero runtime cost when disabled
- TypeScript support with proper type definitions

### Build Configuration:

- Babel plugin for compile-time console removal
- Webpack DefinePlugin for build-time constants
- Source map preservation for debugging
- Development vs production mode handling

### CI/CD Integration:

- ESLint-based console detection instead of grep
- Programmatic analysis for better accuracy
- Integration with existing quality gates
- Automated testing across all scenarios
