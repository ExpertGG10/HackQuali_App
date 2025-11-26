import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Supabase connection error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Supabase connection successful');
    console.log('Session:', data.session ? 'Active' : 'No active session');
    
    return { success: true, session: data.session };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Test failed:', message);
    return { success: false, error: message };
  }
}

export async function testSignUp(email: string, password: string) {
  try {
    console.log('Testing signup with:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'resident',
          name: email.split('@')[0],
        },
      },
    });
    
    if (error) {
      console.error('❌ Signup error:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✅ Signup successful');
    return { success: true, user: data.user };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Signup test failed:', message);
    return { success: false, error: message };
  }
}
