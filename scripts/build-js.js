/**
 * Simple JavaScript bundler for Mico CSS Framework
 * This script concatenates and minifies JavaScript files
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define directories
const jsDir = path.join(__dirname, '../js');
const distDir = path.join(__dirname, '../dist/js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Function to concatenate JS files
function concatenateJS() {
  console.log('Concatenating JavaScript files...');

  // Core JS files
  const coreFiles = [
    'mico.script.js',
    'mico.motion.js'
  ];

  // Read and concatenate core files
  let coreContent = '';
  coreFiles.forEach(file => {
    const filePath = path.join(jsDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      coreContent += `/* ${file} */\n${content}\n\n`;
    } else {
      console.warn(`Warning: File ${file} not found`);
    }
  });

  // Write concatenated file
  fs.writeFileSync(path.join(distDir, 'mico.js'), coreContent);
  console.log('✅ Core JS files concatenated to dist/js/mico.js');

  // Theme JS file (separate)
  const themeFilePath = path.join(jsDir, 'mico.theme.js');
  if (fs.existsSync(themeFilePath)) {
    const themeContent = fs.readFileSync(themeFilePath, 'utf8');
    fs.writeFileSync(path.join(distDir, 'mico.theme.js'), themeContent);
    console.log('✅ Theme JS file copied to dist/js/mico.theme.js');
  } else {
    console.warn('Warning: Theme JS file not found');
  }

  return true;
}

// Function to minify JS files
function minifyJS() {
  console.log('\nMinifying JavaScript files...');

  try {
    // Check if terser is installed
    execSync('npx terser --version', { stdio: 'ignore' });

    // Minify core JS
    execSync(`npx terser ${path.join(distDir, 'mico.js')} -o ${path.join(distDir, 'mico.min.js')} --compress --mangle`, { stdio: 'inherit' });
    console.log('✅ Core JS minified to dist/js/mico.min.js');

    // Minify theme JS
    if (fs.existsSync(path.join(distDir, 'mico.theme.js'))) {
      execSync(`npx terser ${path.join(distDir, 'mico.theme.js')} -o ${path.join(distDir, 'mico.theme.min.js')} --compress --mangle`, { stdio: 'inherit' });
      console.log('✅ Theme JS minified to dist/js/mico.theme.min.js');
    }

    return true;
  } catch (error) {
    console.error('❌ Error minifying JavaScript files. Make sure terser is installed.');
    console.error('Run: npm install terser --save-dev');
    return false;
  }
}

// Run the build process
async function buildJS() {
  console.log('🔧 Building JavaScript files...\n');

  const results = [];

  results.push(concatenateJS());
  results.push(minifyJS());

  const passedSteps = results.filter(Boolean).length;
  const totalSteps = results.length;

  console.log(`\n📊 Build Results: ${passedSteps}/${totalSteps} steps completed`);

  if (passedSteps === totalSteps) {
    console.log('✅ JavaScript build completed successfully!');
    return 0;
  } else {
    console.error(`❌ ${totalSteps - passedSteps} steps failed`);
    return 1;
  }
}

// Run the build
buildJS().then(exitCode => {
  process.exit(exitCode);
});
