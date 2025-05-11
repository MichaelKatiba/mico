/**
 * Custom build script for Mico CSS Framework
 * Generates a custom build based on the configuration in mico.config.js
 */

const fs = require('fs');
const path = require('path');
const config = require('../mico.config.js');

// Base directory for CSS files
const cssDir = path.join(__dirname, '../css');

// Output directory
const outputDir = path.join(__dirname, '../dist/css');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create themes directory if it doesn't exist
const themesDir = path.join(outputDir, 'themes');
if (!fs.existsSync(themesDir)) {
  fs.mkdirSync(themesDir, { recursive: true });
}

// Core CSS files that are always included
const coreFiles = [
  'mico.variables.css'
];

// Generate imports based on configuration
let imports = [];

// Add core files
if (config.core) {
  coreFiles.forEach(file => {
    const content = fs.readFileSync(path.join(cssDir, file), 'utf8');
    imports.push(content);
  });
}

// Add utility files
Object.entries(config.utilities).forEach(([name, enabled]) => {
  if (enabled) {
    const filePath = path.join(cssDir, 'utils', `${name}.utils.css`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      imports.push(content);
    } else {
      console.warn(`Warning: Utility file ${filePath} not found`);
    }
  }
});

// Component files are disabled
console.log('Component modules are disabled - skipping component imports');

// Add preset files
Object.entries(config.presets).forEach(([name, enabled]) => {
  if (enabled) {
    const filePath = path.join(cssDir, 'presets', `${name}.pre.css`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      imports.push(content);
    } else {
      console.warn(`Warning: Preset file ${filePath} not found`);
    }
  }
});

// Add feature files
if (config.features.accessibility) {
  const filePath = path.join(cssDir, 'mico.accessibility.css');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    imports.push(content);
  } else {
    console.warn(`Warning: Accessibility file ${filePath} not found`);
  }
}

if (config.features.motion) {
  const filePath = path.join(cssDir, 'motion', 'mico.motion.css');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    imports.push(content);
  } else {
    console.warn(`Warning: Motion file ${filePath} not found`);
  }
}

// Write the custom build file
const customBuildContent = imports.join('\n\n');
fs.writeFileSync(path.join(outputDir, 'mico.custom.css'), customBuildContent);

// Copy styleguide file
const styleguideFilePath = path.join(cssDir, 'themes', 'styleguide.css');
if (fs.existsSync(styleguideFilePath)) {
  const styleguideContent = fs.readFileSync(styleguideFilePath, 'utf8');
  fs.writeFileSync(path.join(themesDir, 'styleguide.css'), styleguideContent);
  console.log('Styleguide file copied to dist/css/themes/styleguide.css');
}

console.log('Custom build file generated at dist/css/mico.custom.css');
