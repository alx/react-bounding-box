#!/usr/bin/env node

/**
 * CI/CD Export Verification Script
 * Verifies all exports work correctly in the built package
 * Based on npm-test/test-all-exports.js
 */

const path = require('path');
const fs = require('fs');

console.log('🔍 Verifying package exports...\n');

const distPath = path.resolve(__dirname, '../dist');

// Verify dist directory exists
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Required files that should exist
const requiredFiles = [
  'main.js',
  'hooks.js', 
  'utils.js',
  'legacy.js'
];

console.log('1. Checking required build files...');
for (const file of requiredFiles) {
  const filePath = path.join(distPath, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Required file missing: ${file}`);
    process.exit(1);
  }
}
console.log('✅ All required build files present\n');

try {
  // Test main exports
  console.log('2. Testing main exports...');
  const main = require(path.join(distPath, 'main.js'));
  
  const hasBoundingBox = typeof main.BoundingBox === 'function';
  const hasBoundingboxLegacy = typeof main.Boundingbox === 'function';
  const hasDefault = typeof main.default === 'function';
  
  if (!hasBoundingBox || !hasBoundingboxLegacy || !hasDefault) {
    console.error('❌ Main exports missing:', {
      BoundingBox: hasBoundingBox,
      Boundingbox: hasBoundingboxLegacy, 
      default: hasDefault
    });
    process.exit(1);
  }
  console.log('✅ Main exports work');
  
  // Test hooks exports
  console.log('3. Testing hooks exports...');
  const hooks = require(path.join(distPath, 'hooks.js'));
  
  const hasUseBoundingBox = typeof hooks.useBoundingBox === 'function';
  const hasUseCanvas = typeof hooks.useCanvas === 'function';
  
  if (!hasUseBoundingBox || !hasUseCanvas) {
    console.error('❌ Hooks exports missing:', {
      useBoundingBox: hasUseBoundingBox,
      useCanvas: hasUseCanvas
    });
    process.exit(1);
  }
  console.log('✅ Hooks exports work');
  
  // Test utils exports
  console.log('4. Testing utils exports...');
  const utils = require(path.join(distPath, 'utils.js'));
  
  const hasLogger = typeof utils.logger === 'object';
  const hasHexToRgb = typeof utils.hexToRgb === 'function';
  
  if (!hasLogger || !hasHexToRgb) {
    console.error('❌ Utils exports missing:', {
      logger: hasLogger,
      hexToRgb: hasHexToRgb
    });
    process.exit(1);
  }
  console.log('✅ Utils exports work');
  
  // Test legacy exports
  console.log('5. Testing legacy exports...');
  const legacy = require(path.join(distPath, 'legacy.js'));
  
  // Legacy can be either a function directly or have a default property
  const legacyFunction = typeof legacy === 'function' ? legacy : legacy.default;
  
  if (typeof legacyFunction !== 'function') {
    console.error('❌ Legacy export is not a function:', {
      legacyType: typeof legacy,
      defaultType: typeof legacy.default,
      keys: Object.keys(legacy)
    });
    process.exit(1);
  }
  console.log('✅ Legacy exports work');
  
  console.log('\n🎉 All package exports verified successfully!');
  console.log('✅ Package is ready for publication');
  
} catch (error) {
  console.error('❌ Export verification failed:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}