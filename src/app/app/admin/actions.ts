'use server';

import { createClient } from '@/lib/supabase/server';

export async function promoteMeToAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  const { error } = await supabase.from('profiles').upsert({
    id: user.id,
    email: user.email,
    role: 'admin',
  });

  if (error) throw error;
}
