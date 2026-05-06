import express, { Request, Response } from 'express';

const app = express();

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'operational',
    server: 'simar-portfolio',
    environment: 'vercel-serverless',
    timestamp: new Date().toISOString(),
  });
});

// Export for Vercel
export default app;
