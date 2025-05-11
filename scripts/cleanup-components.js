/**
 * Script to clean up component files
 * This script will be run during the build process to ensure components are removed
 */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

// Path to components directory
const componentsDir = path.join(__dirname, '../css/components');

console.log('Cleaning up component files...');

// Check if the components directory exists
if (fs.existsSync(componentsDir)) {
  try {
    // Remove the entire components directory
    rimraf.sync(componentsDir);
    console.log('✅ Components directory removed successfully');
  } catch (error) {
    console.error('❌ Error removing components directory:', error.message);
    
    // If removing the directory fails, try to remove individual files
    try {
      const files = fs.readdirSync(componentsDir);
      
      files.forEach(file => {
        const filePath = path.join(componentsDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`Removed file: ${file}`);
        } catch (err) {
          console.error(`Error removing file ${file}:`, err.message);
        }
      });
      
      // Try to remove the directory again
      try {
        fs.rmdirSync(componentsDir);
        console.log('Components directory removed after removing files');
      } catch (err) {
        console.error('Error removing components directory after removing files:', err.message);
      }
    } catch (err) {
      console.error('Error reading components directory:', err.message);
    }
  }
} else {
  console.log('Components directory does not exist - nothing to clean up');
}

// Create a .gitkeep file in the components directory to maintain the directory structure
// but keep it empty (optional - remove this if you want to completely remove the directory)
/*
try {
  // Create the components directory if it doesn't exist
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }
  
  // Create a .gitkeep file
  fs.writeFileSync(path.join(componentsDir, '.gitkeep'), '');
  console.log('Created .gitkeep file in components directory');
} catch (error) {
  console.error('Error creating .gitkeep file:', error.message);
}
*/
