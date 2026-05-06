import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

// Serve static files from the public directory
// On Vercel, process.cwd() is the root of the project
const publicPath = path.join(process.cwd(), 'public');

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
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Export for Vercel
export default app;
