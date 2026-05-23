import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Find the read-only database template file
let templateDbPath = path.resolve(__dirname, '..', '..', '..', 'prisma', 'dev.db');
if (!fs.existsSync(templateDbPath)) {
  templateDbPath = path.resolve(__dirname, '..', '..', 'prisma', 'dev.db');
}

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
        console.log(`Copying database template from ${templateDbPath} to ${tmpDbPath}`);
        fs.copyFileSync(templateDbPath, tmpDbPath);
        // Give write permission
        fs.chmodSync(tmpDbPath, 0o666);
      }
      dbUrl = `file:${tmpDbPath}`;
    } catch (err) {
      console.error('Failed to setup database in /tmp, falling back to bundled read-only database:', err);
      dbUrl = `file:${templateDbPath}`;
    }
  } else {
    // Local development: use the direct database file
    dbUrl = `file:${templateDbPath}`;
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

