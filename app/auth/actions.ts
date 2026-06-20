'use server';

import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

function isRedirectError(err: unknown): boolean {
  if (err && typeof err === 'object' && 'digest' in err) {
    const digest = (err as { digest: unknown }).digest;
    return typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT');
  }
  return false;
}

export async function signUp(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const displayName = formData.get('display_name') as string;

    if (!email || !password || !displayName) {
      return { error: 'All fields are required.' };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        data: {
          display_name: displayName,
        },
      },
    });

    console.log('SIGNUP DATA:', data);
    console.log('SIGNUP ERROR:', error);

    if (error) {
      return { error: error.message };
    }

    if (data.session) {
      redirect('/dashboard');
    }

    return { success: true };
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error('Sign up error caught:', err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function signIn(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { error: 'Email and password are required.' };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    redirect('/dashboard');
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error('Sign in error caught:', err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function signOut() {
  try {
    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect('/auth/login');
  } catch (err: unknown) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error('Sign out error caught:', err);
    throw err;
  }
}