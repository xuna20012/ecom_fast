import { createClient } from '@supabase/supabase-js';

// Fonction pour récupérer les variables d'environnement
function getEnvVar(name: string): string | undefined {
  // En production, utiliser les variables injectées au runtime
  if (typeof window !== 'undefined' && (window as any).ENV) {
    return (window as any).ENV[name];
  }
  
  // En développement, utiliser les variables de build
  return import.meta.env[name];
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables not configured!');
  console.log('Please add these variables in your Coolify dashboard:');
  console.log('- VITE_SUPABASE_URL');
  console.log('- VITE_SUPABASE_ANON_KEY');
  console.log('Current values:');
  console.log('- VITE_SUPABASE_URL:', supabaseUrl || 'undefined');
  console.log('- VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'set' : 'undefined');
  console.log('- window.ENV:', typeof window !== 'undefined' ? (window as any).ENV : 'not available');
  throw new Error('Missing Supabase environment variables');
}

console.log('✅ Supabase connected:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);