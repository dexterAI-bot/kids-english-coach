function req(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  supabaseUrl: () => req('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () => req('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  adminEmail: () => req('ADMIN_EMAIL'),
  serviceRoleKey: () => process.env.SUPABASE_SERVICE_ROLE_KEY,
};
