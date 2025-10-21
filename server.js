const { createServer } = require('http');
const { parse } = require('url');
const { readFileSync, existsSync } = require('fs');
const { join, extname } = require('path');

const port = process.env.PORT || 3000;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

const server = createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const parsedUrl = parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Health check endpoint
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
    return;
  }
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = join(__dirname, pathname);
  const ext = extname(pathname).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content);
    } else {
      // For SPA routing, serve index.html for unknown routes
      const indexContent = readFileSync(join(__dirname, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(indexContent);
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server Error: ' + error.message);
    console.error('Server error:', error);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`🍳 AI Kitchen server running on 0.0.0.0:${port}`);
});