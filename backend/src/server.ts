import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import messageRoutes from './routes/messageRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

import fs from 'fs';
import path from 'path';

// Basic health check with directory checks for debugging
app.get('/api/health', (req, res) => {
  const info: any = {
    status: 'ok',
    message: 'Piston Wall API is running',
    cwd: process.cwd(),
    __dirname: __dirname,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      DATABASE_URL: process.env.DATABASE_URL,
    },
    pathsChecked: {}
  };

  const checkPaths = [
    path.join(process.cwd(), 'dev.db'),
    path.join(process.cwd(), 'backend', 'dev.db'),
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(process.cwd(), 'backend', 'prisma', 'dev.db'),
    path.resolve(__dirname, 'dev.db'),
    path.resolve(__dirname, '..', 'dev.db'),
    path.resolve(__dirname, '..', '..', 'dev.db'),
    path.resolve(__dirname, '..', '..', '..', 'dev.db'),
    path.resolve(__dirname, '..', '..', '..', 'prisma', 'dev.db'),
    path.resolve(__dirname, '..', '..', 'prisma', 'dev.db'),
    '/tmp/dev.db'
  ];

  for (const p of checkPaths) {
    try {
      info.pathsChecked[p] = {
        exists: fs.existsSync(p),
        size: fs.existsSync(p) ? fs.statSync(p).size : 0
      };
    } catch (e: any) {
      info.pathsChecked[p] = { error: e.message };
    }
  }

  res.json(info);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
