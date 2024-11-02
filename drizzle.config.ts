import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  driver: 'aws-data-api',
  dbCredentials: {
    database: 'your-database-name',
    secretArn: 'your-secret-arn',
    resourceArn: 'your-resource-arn',
  },
  verbose: true,
  strict: true,
} satisfies Config;