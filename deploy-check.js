// Simple deployment verification script
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness...\n');

// Check required files
const requiredFiles = [
    'index.html',
    'app.js', 
    'package.json',
    'README.md',
    'LICENSE',
    '.gitignore',
    'render.yaml'
];

let allFilesPresent = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
        allFilesPresent = false;
    }
});

// Check package.json configuration
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    console.log('\n📦 Package.json checks:');
    console.log(`✅ Name: ${packageJson.name}`);
    console.log(`✅ Version: ${packageJson.version}`);
    console.log(`✅ Start script: ${packageJson.scripts.start}`);
    console.log(`✅ Dependencies: ${Object.keys(packageJson.dependencies || {}).length} found`);
    
    if (packageJson.engines && packageJson.engines.node) {
        console.log(`✅ Node version specified: ${packageJson.engines.node}`);
    }
    
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    allFilesPresent = false;
}

console.log('\n🚀 Deployment Status:');
if (allFilesPresent) {
    console.log('✅ Ready for deployment!');
    console.log('\nNext steps:');
    console.log('1. Push to GitHub: git add . && git commit -m "Ready for deployment" && git push');
    console.log('2. Deploy on Render: Connect your GitHub repo at render.com');
} else {
    console.log('❌ Some files are missing. Please check the requirements above.');
}