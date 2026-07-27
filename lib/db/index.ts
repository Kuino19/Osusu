import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL || 'postgres://user:pass@ep-example-123456.us-east-2.aws.neon.tech/neondb');

export const db = drizzle(sql, { schema });
