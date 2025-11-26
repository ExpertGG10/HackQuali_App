import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const extras = (Constants.expoConfig && Constants.expoConfig.extra) || (Constants.manifest && Constants.manifest.extra) || {};

const fromExtras = extras.EXPO_PUBLIC_SUPABASE_URL || null;
const fromEnv = process.env.EXPO_PUBLIC_SUPABASE_URL || null;
const supabaseUrl = fromExtras || fromEnv || '';

console.log('Supabase URL (from expo-config.extra):', fromExtras);
console.log('Supabase URL (from process.env):', fromEnv);
console.log('Supabase URL (resolved):', supabaseUrl);
console.log('Supabase ANON Key configured:', !!(extras.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY));

if (!supabaseUrl) {
  console.warn('Missing Supabase credentials. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, extras.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '');