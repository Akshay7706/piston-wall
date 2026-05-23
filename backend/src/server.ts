import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Fallback

// EXTREME HEALTH CHECK (No Prisma import yet)
app.get('/api/health', (req, res) => {
  const info: any = {
    status: 'ok',
    message: 'API is alive',
    cwd: process.cwd(),
    __dirname: __dirname,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      DATABASE_URL: process.env.DATABASE_URL,
    },
    system: {
      platform: process.platform,
      arch: process.arch,
      version: process.version
    },
    paths: {}
  };

  const checkPaths = [
    path.join(process.cwd(), 'dev.db'),
    path.join(process.cwd(), 'backend', 'dev.db'),
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(process.cwd(), 'backend', 'prisma', 'dev.db'),
    path.resolve(__dirname, '..', '..', 'prisma', 'dev.db'),
    path.resolve(__dirname, '..', '..', '..', 'prisma', 'dev.db'),
    '/tmp/dev.db'
  ];

  for (const p of checkPaths) {
    try {
      info.paths[p] = {
        exists: fs.existsSync(p),
        stats: fs.existsSync(p) ? fs.statSync(p) : null
      };
    } catch (e: any) {
      info.paths[p] = { error: e.message };
    }
  }

  res.json(info);
});

// Import routes AFTER health check to isolate crashes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import messageRoutes from './routes/messageRoutes';
import settingsRoutes from './routes/settingsRoutes';

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
