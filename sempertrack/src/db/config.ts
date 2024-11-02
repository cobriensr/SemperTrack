// src/db/config.ts
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true,
    ca: process.env.RDS_CA_CERT // AWS RDS Certificate
  } : false,
  
  // AWS RDS specific optimizations
  max: 20, // maximum connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  
  // Application name for monitoring
  application_name: 'sempertrack',
};

const pool = new Pool(poolConfig);

// Add event listeners for connection management
pool.on('connect', () => {
  console.log('New database connection established');
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

// Initialize Drizzle with the pool
export const db = drizzle(pool);

// Health check function
export async function checkDatabaseHealth() {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error) {
    return { status: 'unhealthy', message: (error instanceof Error) ? error.message : 'Unknown error' };
  } finally {
    client.release();
  }
}

// Example .env configuration:
/*
DATABASE_URL=postgres://user:password@sempertrack-db.xxxxx.region.rds.amazonaws.com:5432/sempertrack
RDS_CA_CERT=path/to/rds-ca-cert
NODE_ENV=production
*/