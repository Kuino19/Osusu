import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { db } from './db';
import { members } from './db/schema';
import { eq } from 'drizzle-orm';

export async function getCurrentMember() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [member] = await db.select().from(members).where(eq(members.id, user.id));

  return member || null;
}
