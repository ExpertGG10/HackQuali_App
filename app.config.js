import fs from 'fs';
import path from 'path';

// Lê o arquivo .env.local diretamente
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');

// Parse manual das variáveis
const envVars = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    envVars[key] = valueParts.join('=');
  }
});

console.log('Loaded EXPO_PUBLIC_SUPABASE_URL:', envVars.EXPO_PUBLIC_SUPABASE_URL);
console.log('Loaded EXPO_PUBLIC_SUPABASE_ANON_KEY exists:', !!envVars.EXPO_PUBLIC_SUPABASE_ANON_KEY);

export default {
  expo: {
    name: 'HackQuali',
    slug: 'hackquali',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTabletMode: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      bundler: 'metro',
      output: 'static',
    },
    plugins: ['expo-router'],
    extra: {
      eas: {
        projectId: 'seu-projeto-id',
      },
      // Injeta as variáveis do .env.local aqui
      EXPO_PUBLIC_SUPABASE_URL: envVars.EXPO_PUBLIC_SUPABASE_URL || '',
      EXPO_PUBLIC_SUPABASE_ANON_KEY: envVars.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
    },
  },
};
