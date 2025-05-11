/**
 * Script to copy styleguide files to the dist directory
 */

const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '../css/themes');
const destDir = path.join(__dirname, '../dist/css/themes');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy theme files
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);

  files.forEach(file => {
    if (file.endsWith('.css')) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);

      // Read source file
      const content = fs.readFileSync(sourcePath, 'utf8');

      // Write to destination
      fs.writeFileSync(destPath, content);
      console.log(`Copied ${file} to ${destDir}`);
    }
  });

  console.log('Theme files copied successfully');
} else {
  console.warn('Theme directory not found');
}

// Create a minified version of the styleguide file
const styleguideFile = path.join(destDir, 'styleguide.css');
if (fs.existsSync(styleguideFile)) {
  try {
    const { execSync } = require('child_process');
    execSync(`npx postcss ${styleguideFile} -o ${path.join(destDir, 'styleguide.min.css')} --env production`);
    console.log('Created minified styleguide file');
  } catch (error) {
    console.error('Error creating minified styleguide file:', error.message);
  }
}


