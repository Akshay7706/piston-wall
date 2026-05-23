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
    // Direct
    '/var/task/backend/prisma/dev.db',
    '/var/task/prisma/dev.db'
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      console.log(`Found database template at: ${p}`);
      return p;
    }
  }
  return null;
};

const templateDbPath = findTemplateDb();

const envUrl = process.env.DATABASE_URL;
const isRemoteOrCustomDb = envUrl && !envUrl.startsWith('file:./') && !envUrl.startsWith('file:dev.db');

let dbUrl = '';

if (isRemoteOrCustomDb) {
  dbUrl = envUrl!;
} else {
  // Check if we are running on Vercel (or in a serverless read-only environment)
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    const tmpDbPath = '/tmp/dev.db';
    try {
      // Copy the database file to /tmp if it doesn't exist or is empty
      if (!fs.existsSync(tmpDbPath) || fs.statSync(tmpDbPath).size === 0) {
        if (templateDbPath) {
          console.log(`Copying database template from ${templateDbPath} to ${tmpDbPath}`);
          fs.copyFileSync(templateDbPath, tmpDbPath);
          fs.chmodSync(tmpDbPath, 0o666);
        } else {
          console.error('CRITICAL: Database template not found! SQLite will fail.');
        }
      }
      dbUrl = `file:${tmpDbPath}`;
    } catch (err) {
      console.error('Failed to setup database in /tmp:', err);
      dbUrl = templateDbPath ? `file:${templateDbPath}` : 'file:/tmp/dev.db';
    }
  } else {
    // Local development
    dbUrl = templateDbPath ? `file:${templateDbPath}` : 'file:./prisma/dev.db';
  }
}

console.log(`Prisma is connecting to database at URL: ${dbUrl}`);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

export default prisma;
