import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Function to find the template database
const findTemplateDb = () => {
  const possiblePaths = [
    // Relative to dist/src/utils/prisma.js
    path.resolve(__dirname, '..', '..', '..', 'prisma', 'dev.db'),
    path.resolve(__dirname, '..', '..', 'prisma', 'dev.db'),
    // Relative to project root
    path.join(process.cwd(), 'backend', 'prisma', 'dev.db'),
    path.join(process.cwd(), 'prisma', 'dev.db'),
    // Direct Vercel paths
    '/var/task/backend/prisma/dev.db',
    '/var/task/prisma/dev.db'
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        console.log(`Found database template at: ${p}`);
        return p;
      }
    } catch (e) {}
  }
  return null;
};

let dbUrl = '';
const envUrl = process.env.DATABASE_URL;

if (envUrl && !envUrl.startsWith('file:')) {
  dbUrl = envUrl;
} else {
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/dev.db';
    const templateDbPath = findTemplateDb();
    
    try {
      if (!fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size === 0) {
        if (templateDbPath) {
          console.log(`Copying database template from ${templateDbPath} to ${tmpDbPath}`);
          fs.copyFileSync(templateDbPath, tmpDbPath);
          fs.chmodSync(tmpDbPath, 0o666);
        }
      }
      dbUrl = `file:${tmpDbPath}`;
    } catch (err) {
      console.error('Failed to setup database in /tmp:', err);
      dbUrl = templateDbPath ? `file:${templateDbPath}` : `file:${tmpDbPath}`;
    }
  } else {
    const templateDbPath = findTemplateDb();
    dbUrl = templateDbPath ? `file:${templateDbPath}` : 'file:./prisma/dev.db';
  }
}

console.log(`Prisma final connection URL: ${dbUrl}`);
process.env.DATABASE_URL = dbUrl; // Force env var for Prisma internal use

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

export default prisma;
