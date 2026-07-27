'use server';

import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { revalidatePath } from 'next/cache';

export async function registerMember(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string; // Using email as identifier in Supabase Auth
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

  // 2. Create Profile in Members table
  const { error: profileError } = await supabaseAdmin
    .from('members')
    .insert([{
      id: authData.user.id,
      full_name: fullName,
      phone_number: phone,
      role: role
    }]);

  if (profileError) {
    console.error('Profile Error:', profileError.message);
    // Cleanup auth user if profile creation fails? (Optional)
    return { error: profileError.message };
  }

  revalidatePath('/dashboard/members');
  return { success: true };
}
