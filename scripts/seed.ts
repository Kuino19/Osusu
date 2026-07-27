
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../lib/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log('Seeding default cooperative...');
  
  try {
    const [coop] = await db.insert(schema.cooperatives).values({
      name: 'Ikeja Traders Cooperative',
      slug: 'ikeja-traders',
    }).returning();
    
    console.log('✅ Seeded Cooperative:', coop);
  } catch (error) {
    console.error('Error seeding:', error);
  }
}

main();
