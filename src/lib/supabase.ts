import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables not configured!');
  console.log('Please add these variables in your Coolify dashboard:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_ANON_KEY');
  throw new Error('Missing Supabase environment variables');
}

console.log('✅ Supabase connected:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);