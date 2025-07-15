import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Valeurs par défaut pour éviter l'erreur en production
const defaultUrl = 'https://default.supabase.co';
const defaultKey = 'default-key';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Using default values.');
}

export const supabase = createClient(
  supabaseUrl || defaultUrl, 
  supabaseAnonKey || defaultKey
);