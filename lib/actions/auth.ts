'use server';

import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect } from 'next/navigation';

const DEFAULT_COOP_ID = '5e90ab8e-5e9c-4ae6-9ef1-a39251f4efca'; // Ikeja Traders Cooperative

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export async function signIn(formData: FormData) {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  
  // Fake email using phone number for supabase auth since phone auth requires OTP setup
  const email = `${phone}@osusu.local`;

  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function signUp(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  
  if (!password || !fullName || !phone) {
    return { error: 'Missing required fields' };
  }
  
  // Fake email using phone number
  const email = `${phone}@osusu.local`;

  const supabase = await createClient();
  
  // Create user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Insert into Neon DB
    try {
      await db.insert(members).values({
        id: data.user.id,
        cooperativeId: DEFAULT_COOP_ID,
        fullName,
        phoneNumber: phone,
        role: 'President', // First user is president for testing purposes
      });
    } catch (dbError: any) {
      console.error('Neon DB Error:', dbError);
      return { error: 'Failed to create member profile.' };
    }
  }

  redirect('/dashboard');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/auth');
}
