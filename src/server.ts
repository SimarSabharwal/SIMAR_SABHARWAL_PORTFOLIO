import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public'), {
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
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n  ⚡ SIMAR PORTFOLIO SERVER`);
  console.log(`  ─────────────────────────`);
  console.log(`  🌐 Local:   http://localhost:${PORT}`);
  console.log(`  📦 Static:  /public`);
  console.log(`  🚀 Status:  Ready\n`);
});

export default app;
