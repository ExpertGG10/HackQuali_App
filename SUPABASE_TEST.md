# Teste de Conexão Supabase

## Status da Configuração

✅ Arquivo `.env.local` está configurado com:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Arquivos Criados/Modificados para Teste

### 1. `/app/debug.tsx`
- Página de debug para testar conexão com Supabase
- Verifica variáveis de ambiente
- Testa `getSession()`
- Acessível em: `http://localhost:8081/debug`

### 2. `/src/utils/supabaseTest.ts`
- Funções helper para teste de conexão
- `testSupabaseConnection()` - Testa conexão geral
- `testSignUp()` - Testa signup

### 3. `/src/contexts/AuthContext.tsx` (Modificado)
- Adicionado alias `login` para `signIn`
- Mantém compatibilidade com código existente

## Para Testar a Conexão:

### Opção 1: Via Página de Debug
1. Acesse `/debug` na aplicação
2. Ele testará automaticamente a conexão
3. Você verá o status da conexão e variáveis de ambiente

### Opção 2: Via Console
```typescript
import { testSupabaseConnection } from '../src/utils/supabaseTest';

// No seu componente ou arquivo
const result = await testSupabaseConnection();
console.log(result); // { success: true/false, error?: string }
```

## Possíveis Erros e Soluções

### "Network request failed"
- Verifique se as credenciais Supabase estão corretas em `.env.local`
- Verifique a URL do Supabase: `https://djnzhlvkaatcsavgshzk.supabase.co`
- Certifique-se de que a rede tem acesso ao Supabase

### "Missing Supabase credentials"
- Verifique se `.env.local` existe
- Variáveis devem começar com `EXPO_PUBLIC_` para Expo detectar

### CORS Error
- Supabase pode bloquear requisições de origem não autorizada
- Verifique configurações de CORS no dashboard do Supabase

## Próximas Etapas

1. Confirmar que a conexão com Supabase está funcionando
2. Testar o fluxo de signup
3. Testar o fluxo de login
4. Implementar tratamento de erros de rede
