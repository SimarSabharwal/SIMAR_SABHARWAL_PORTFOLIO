import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

// Serve static files from the public directory
const publicPath = path.resolve(process.cwd(), 'public');
console.log('Current working directory:', process.cwd());
console.log('Public Path resolved:', publicPath);
console.log('Directory name:', __dirname);

app.use(express.static(publicPath, {
  extensions: ['html'],
  maxAge: 0,
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
  },
}));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'operational',
    server: 'simar-portfolio',
    timestamp: new Date().toISOString(),
  });
});

// Catch-all: serve index.html for SPA routing
app.get('*', (_req: Request, res: Response) => {
  const indexPath = path.join(publicPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Critical Error: index.html not found. Path attempted: ' + indexPath);
    }
  });
});

// Export for Vercel
export default app;
