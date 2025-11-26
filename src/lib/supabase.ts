import { createClient } from '@supabase/supabase-js';

import Constants from 'expo-constants';

// Prefer config from Expo Constants (app.config.js/app.json extra)
const extras = (Constants.expoConfig && Constants.expoConfig.extra) || (Constants.manifest && Constants.manifest.extra) || {};

const supabaseUrl = extras.EXPO_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = extras.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key configured:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in .env.local or app.config.js');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);