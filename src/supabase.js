import { createClient } from '@supabase/supabase-js';

// URL e anonKey obtidos do painel Supabase
const supabaseUrl = 'https://<sua-supabase-url>.supabase.co'; 
const supabaseAnonKey = '<sua-supabase-anon-key>';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);