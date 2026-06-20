'use server';

import { createClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function updateProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const displayName = formData.get('display_name') as string;
    if (!displayName || displayName.trim().length < 2) {
      return { success: false, error: 'Display name must be at least 2 characters.' };
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Unauthorized. Please sign in again.' };
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ display_name: displayName.trim() })
      .eq('id', user.id);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred.' };
  }
}

export async function updatePassword(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const newPassword = formData.get('new_password') as string;
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const supabase = await createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred.' };
  }
}

export async function updateXPGoal(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const xpGoalStr = formData.get('xp_goal') as string;
    const xpGoal = parseInt(xpGoalStr, 10);
    if (isNaN(xpGoal) || xpGoal < 100 || xpGoal > 1000) {
      return { success: false, error: 'Invalid XP Goal. Must be between 100 and 1000.' };
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: 'Unauthorized. Please sign in again.' };
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ xp_goal: xpGoal })
      .eq('id', user.id);

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return { success: false, error: err instanceof Error ? err.message : 'An unknown error occurred.' };
  }
}
