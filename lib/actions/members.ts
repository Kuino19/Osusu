'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { getCurrentMember } from '@/lib/auth';

export async function registerMember(formData: FormData) {
  const currentMember = await getCurrentMember();
  if (!currentMember) {
    return { error: 'Unauthorized' };
  }

  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as any || 'Member';

  if (!email || !password || !fullName || !phone) {
    return { error: 'Missing required fields' };
  }

  // 1. Create User in Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, phone }
  });

  if (authError) {
    console.error('Auth Error:', authError.message);
    return { error: authError.message };
  }

  // 2. Create Profile in Members table on Neon
  try {
    await db.insert(members).values({
      id: authData.user.id,
      cooperativeId: currentMember.cooperativeId,
      fullName,
      phoneNumber: phone,
      role: role
    });
  } catch (error: any) {
    console.error('Profile Error:', error.message);
    // Cleanup auth user if profile creation fails? (Optional)
    return { error: error.message };
  }

  revalidatePath('/dashboard/members');
  return { success: true };
}
