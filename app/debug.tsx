import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../src/lib/supabase';
import { styles } from '../src/styles/authStyles';

export default function DebugScreen() {
  const [status, setStatus] = useState<string>('Testando conexão...');
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      setStatus('Testando Supabase...');
      
      // Test 1: Check environment variables
      const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
      const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setStatus('❌ Variáveis de ambiente não configuradas');
        setDetails(`URL: ${url ? '✓' : '✗'}\nKey: ${key ? '✓' : '✗'}`);
        setLoading(false);
        return;
      }

      setDetails('✓ Variáveis de ambiente OK\n');

      // Test 2: Try to get session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus('❌ Erro ao conectar ao Supabase');
        setDetails(prev => prev + `Erro: ${error.message}`);
        setLoading(false);
        return;
      }

      setStatus('✅ Conexão com Supabase funcionando!');
      setDetails(prev => prev + `Sessão: ${data.session ? 'Ativa' : 'Inativa'}`);
      setLoading(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setStatus('❌ Erro na teste');
      setDetails(message);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Debug Supabase</Text>
        
        <View style={styles.formContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0066CC" />
          ) : (
            <>
              <Text style={styles.label}>{status}</Text>
              <Text style={{ marginVertical: 10, color: '#666' }}>{details}</Text>
              
              <TouchableOpacity
                style={styles.button}
                onPress={testConnection}
              >
                <Text style={styles.buttonText}>Tentar Novamente</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
