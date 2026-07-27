'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { db } from '@/lib/db';
import { cooperatives, members } from '@/lib/db/schema';
import { redirect } from 'next/navigation';

export async function registerCooperative(formData: FormData) {
  const coopName = formData.get('coopName') as string;
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  if (!coopName || !fullName || !phone || !password) {
    return { error: 'Missing required fields' };
  }

  // 1. Create User in Supabase Auth using phone as email
  const email = `${phone}@osusu.local`;
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, phone }
  });

  if (authError) {
    return { error: authError.message };
  }

  if (authData.user) {
    try {
      // 2. Create Cooperative in Neon
      const slug = coopName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const [newCoop] = await db.insert(cooperatives).values({
        name: coopName,
        slug: slug,
      }).returning();

      // 3. Create Admin Member in Neon
      await db.insert(members).values({
        id: authData.user.id,
        cooperativeId: newCoop.id,
        fullName,
        phoneNumber: phone,
        role: 'President',
      });
      
    } catch (dbError: any) {
      console.error('Neon DB Error:', dbError);
      // Cleanup auth user if DB insertion fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return { error: 'Failed to initialize cooperative data.' };
    }
  }

  // Redirect to sign in page after successful onboarding
  return { success: true };
}
