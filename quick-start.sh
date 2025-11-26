#!/bin/bash

# ========================================
# 🚀 HackQuali Quick Start Script
# ========================================
# Use este script para iniciar o desenvolvimento
# rapidamente após clonar o repositório

echo "🎯 HackQuali - Quick Start"
echo "=========================="

# Step 1: Install dependencies
echo ""
echo "📦 Step 1: Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Erro ao instalar dependências"
  exit 1
fi

# Step 2: Create .env file
echo ""
echo "🔑 Step 2: Configurando variáveis de ambiente..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
  echo ""
  echo "⚠️  Arquivo .env.local não encontrado!"
  echo "   Por favor, copie seu .env.example para .env.local"
  echo "   E preencha com suas credenciais Supabase:"
  echo ""
  echo "   EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui"
  echo "   EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui"
  echo ""
  echo "   Você pode obter essas informações em:"
  echo "   https://app.supabase.com -> Settings -> API"
  echo ""
  read -p "Pressione ENTER após configurar o arquivo .env.local"
else
  echo "✅ .env.local encontrado"
fi

# Step 3: Check TypeScript compilation
echo ""
echo "✔️  Step 3: Verificando TypeScript..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
  echo "⚠️  Avisos de TypeScript encontrados, mas continuando..."
fi

# Step 4: Start development server
echo ""
echo "🎉 Step 4: Iniciando servidor de desenvolvimento..."
echo ""
echo "Escolha a plataforma:"
echo "  w - Web (recomendado para testes rápidos)"
echo "  a - Android"
echo "  i - iOS"
echo ""
echo "Pressione uma das letras acima quando o Expo abrir"
echo ""

npm start

echo ""
echo "✅ HackQuali iniciado com sucesso!"
echo ""
echo "📚 Próximos passos:"
echo "  1. Leia DELIVERY_SUMMARY.md"
echo "  2. Leia ARCHITECTURE.md"
echo "  3. Configure Supabase"
echo "  4. Implemente os fluxos de negócio"
echo ""
