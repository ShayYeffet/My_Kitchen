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
  const parsedUrl = parse(req.url);
  let pathname = parsedUrl.pathname;
  
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
    res.writeHead(500);
    res.end('Server Error');
    console.error('Server error:', error);
  }
});

server.listen(port, () => {
  console.log(`🍳 AI Kitchen server running on port ${port}`);
});