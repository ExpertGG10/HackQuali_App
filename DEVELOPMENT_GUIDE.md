# 🎯 Guia de Desenvolvimento - HackQuali MVP

## Orientações Estratégicas para o Hackathon

### 1️⃣ Focos Prioritários (em ordem de importância)

#### 🔴 CRÍTICO (entrega obrigatória)
1. **Autenticação funcional** - Login/signup com Supabase
2. **Fluxo morador:** Nova solicitação → Acompanhamento → Avaliação
3. **Fluxo construtora:** Dashboard com chamados → Atribuição de técnico
4. **Banco de dados básico** - Tabelas essenciais criadas
5. **UI apresentável** - Telas com design mínimo coerente

#### 🟠 IMPORTANTE (agregam muito valor)
1. Formulários com validação
2. Upload de fotos
3. Agendamento visual (calendário)
4. Filtros e buscas
5. Notificações básicas

#### 🟡 BÔNUS (se houver tempo)
1. Chat em tempo real
2. Integração com Google Calendar
3. Gráficos de analytics
4. Offline-first
5. Testes automatizados

---

## 2️⃣ Decisões de Arquitetura Recomendadas

### Por que Expo Router?
✅ Roteamento automático baseado em pastas  
✅ Facilita deep linking  
✅ Naveg ação native para iOS/Android  
✅ Separação clara entre fluxos de autenticação  

### Por que Supabase?
✅ Backend-as-a-Service sem custo inicial  
✅ Autenticação pronta  
✅ Real-time subscriptions  
✅ Storage para imagens  
✅ Dashboard administrativo  

### Por que Context API (não Redux)?
✅ MVP não precisa de estado complexo  
✅ Menos boilerplate para iniciar rápido  
✅ Suficiente para 2-3 contextos globais  
✅ Fácil de migrando para Redux se crescer  

---

## 3️⃣ Estratégia de Desenvolvimento Recomendada

### Semana 1 (23-26 de nov) - Bases
```
Dia 1: Setup + Autenticação
  └─ Criar projeto
  └─ Configurar Supabase
  └─ Implementar login/signup/logout
  └─ Proteger rotas

Dia 2: Estrutura de Páginas
  └─ Criar todas as abas (resident + contractor)
  └─ Navegação funcional
  └─ Mock data para testes

Dia 3: Modelos de Dados
  └─ Desenhar ER diagram
  └─ Criar tabelas no Supabase
  └─ Adicionar políticas de segurança

Dia 4: Integração Inicial
  └─ Conectar criar solicitação
  └─ Listar solicitações
  └─ Testes manuais
```

### Semana 2 (27-30 de nov) - Polish
```
Dia 5: Funcionalidades Críticas
  └─ Formulários completos
  └─ Upload de fotos
  └─ Validações

Dia 6: UX/UI Polish
  └─ Feedback visual (loading, errors)
  └─ Animações básicas
  └─ Responsive layout

Dia 7: Testes + Documentação
  └─ Testar fluxos completos
  └─ Documentação técnica
  └─ Vídeo de demonstração
```

---

## 4️⃣ Dicas Práticas para Economizar Tempo

### ⚡ Usar atalhos React Native

```typescript
// ❌ Evitar (verboso)
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

// ✅ Usar (imports individuais úteis)
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
// ... importar conforme necessário
```

### ⚡ Criar hooks customizados para lógica repetida

```typescript
// src/hooks/useFetch.ts
export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  dependencies: any[]
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, dependencies);

  return { data, loading, error };
};

// Usar em qualquer página:
const { data: requests, loading } = useFetch(
  () => supabase.from('service_requests').select('*'),
  [user?.id]
);
```

### ⚡ Template rápido para novas páginas

```typescript
// Copie este template para criar páginas rapidamente
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import { styles } from '../styles/authStyles';

export default function PageTemplate() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const fetchData = async () => {
    try {
      // TODO: Implementar fetch
      setData(null);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Título</Text>
      </View>
      {/* TODO: Render content */}
    </ScrollView>
  );
}
```

### ⚡ Usar constantes para magic strings

```typescript
// ❌ Não faça isso (frágil):
const { data } = await supabase
  .from('service_requests')
  .select('*')
  .eq('status', 'open'); // o que se mudou aqui quebra tudo

// ✅ Melhor:
import { SERVICE_STATUS } from '../constants';

const { data } = await supabase
  .from('service_requests')
  .select('*')
  .eq('status', SERVICE_STATUS.OPEN);
```

---

## 5️⃣ Checklist de Código Antes de Commitar

- [ ] TypeScript: Sem erros de tipo
- [ ] Nomes: Descritivos e em inglês (camelCase)
- [ ] Comentários: Apenas para lógica complexa
- [ ] Imports: Organizados e sem unused
- [ ] Estilos: Usando theme colors, não hardcoded
- [ ] Logs: Removidos console.log de produção
- [ ] Testes: Funciona em iOS/Android/Web
- [ ] Performance: Sem infinite loops ou memory leaks
- [ ] Mensagens: Em português para usuário, inglês para dev

```typescript
// ❌ Ruim
const x = async () => {
  try {
    let d = await supabase.from('users').select('*');
    console.log('data:', d);
    // ... code ...
    setLoading(true); // fora de ordem
  } catch (e) {}
};

// ✅ Bom
const fetchUsers = async () => {
  try {
    setLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    setUsers(data || []);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Falha ao carregar usuários');
  } finally {
    setLoading(false);
  }
};
```

---

## 6️⃣ Tratamento de Erros - Padrão Recomendado

```typescript
// Padrão consistent para todas as páginas
type PageState = {
  loading: boolean;
  error: string | null;
  data: Data | null;
};

const [state, setState] = useState<PageState>({
  loading: true,
  error: null,
  data: null,
});

const fetchData = async () => {
  try {
    setState({ ...state, loading: true, error: null });
    const result = await doSomething();
    setState({ loading: false, error: null, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    setState({ loading: false, error: message, data: null });
  }
};

// Renderizar states
if (state.loading) return <ActivityIndicator />;
if (state.error) return <ErrorComponent message={state.error} />;
if (!state.data) return <EmptyComponent />;
return <DataComponent data={state.data} />;
```

---

## 7️⃣ Otimizações para Performance

### Lazy Load de Imagens
```typescript
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  placeholder={{ blurhash }}
  contentFit="cover"
  recyclingKey={id}
/>
```

### Memoização de Componentes
```typescript
const ServiceCard = memo(({ service, onPress }: Props) => (
  <TouchableOpacity onPress={onPress}>
    {/* render */}
  </TouchableOpacity>
), (prev, next) => {
  // Comparação customizada
  return prev.service.id === next.service.id;
});
```

### Paginação em Listas
```typescript
const [pageIndex, setPageIndex] = useState(0);
const PAGE_SIZE = 20;

const handleEndReached = () => {
  if (!loading) {
    setPageIndex(prev => prev + 1);
    fetchMoreData();
  }
};

<FlatList
  onEndReached={handleEndReached}
  onEndReachedThreshold={0.5} // Carregar 50% antes do final
/>
```

---

## 8️⃣ Testing Rápido em Produção

### Credenciais de Teste
```
resident@test.com / password123
contractor@test.com / password123
technician@test.com / password123

Unit Code: TEST001XYZ (para vincular)
```

### Validar em Múltiplos Cenários
- ✅ Sem conexão (offline)
- ✅ Conexão lenta
- ✅ Requisição timeout
- ✅ Usuário sem permissão
- ✅ Dados inválidos
- ✅ Tela muito pequena / grande

---

## 9️⃣ Documentação Mínima Requerida

Para cada arquivo com lógica complexa:

```typescript
/**
 * Calcula NPS (Net Promoter Score) a partir de ratings
 * @param ratings - Array de ratings (scores 1-5)
 * @returns number entre -100 e 100
 * 
 * Fórmula: ((Promoters - Detractors) / Total) * 100
 * - Promoters: score 5
 * - Passivos: score 4
 * - Detractors: score 1-3
 */
export const calculateNPS = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  
  const promoters = ratings.filter(r => r === 5).length;
  const detractors = ratings.filter(r => r <= 3).length;
  
  return ((promoters - detractors) / ratings.length) * 100;
};
```

---

## 🔟 Roteiro de Commits

```bash
# Dia 1 - Setup Inicial
git commit -m "feat: setup projeto Expo com TypeScript"
git commit -m "feat: configurar autenticação Supabase"
git commit -m "feat: criar páginas de login e signup"

# Dia 2 - Navegação
git commit -m "feat: adicionar tabs resident layout"
git commit -m "feat: adicionar tabs contractor layout"
git commit -m "feat: implementar proteção de rotas"

# Dia 3 - Backend
git commit -m "feat: criar schema Supabase"
git commit -m "feat: adicionar RLS policies"
git commit -m "feat: criar tipos TypeScript"

# Dia 4-7 - Desenvolvimento
git commit -m "feat: implementar listagem de solicitações"
git commit -m "feat: adicionar formulário de nova solicitação"
git commit -m "feat: integrar upload de fotos"
git commit -m "fix: corrigir validação de email"
git commit -m "style: melhorar UI do dashboard"
git commit -m "docs: adicionar README"
```

---

## 🎬 Criando o Vídeo de Demonstração (3-5 min)

**Roteiro Sugerido:**

1. **Abertura (20s)**
   - Apresentação breve da equipe
   - "Somos... e criamos o HackQuali"

2. **Problema (30s)**
   - Explicar o problema real
   - Por que é importante

3. **Solução (2min)**
   - Demonstrar fluxo morador (criar solicitação → agendar → avaliar)
   - Demonstrar fluxo construtora (dashboard → atribuir → analytics)

4. **Diferenciais (30s)**
   - O que torna único
   - Por que é melhor que alternativas

5. **Próximos Passos (30s)**
   - Roadmap futuro
   - Potencial de crescimento

**Dicas Técnicas:**
- Usar emulador, não dispositivo real (mais rápido)
- Usar velocidade 1.25x para fluidez
- Adicionar legenda em pontos críticos
- Música background leve
- Formato: MP4, máx 500MB

---

## 📊 Métricas de Sucesso

Ao final do hackathon, você terá sucesso se:

- ✅ App roda sem crashes em iOS/Android/Web
- ✅ Fluxo morador completo e funcional
- ✅ Fluxo construtora completo e funcional
- ✅ UI coerente e intuitiva
- ✅ Código limpo e bem estruturado
- ✅ Documentação clara
- ✅ Vídeo demonstra valor realmente
- ✅ Repository público e bem documentado

---

## 🆘 SOS - Quando Algo Dá Errado

### App não inicia
```bash
# Limpar cache
npm start -- --clear

# Reinstalar dependências
rm -rf node_modules
npm install

# Verificar versão Node
node --version  # deve ser 16+
```

### Supabase não conecta
```typescript
// Verificar credenciais em src/supabase.js
console.log('URL:', SUPABASE_URL);
console.log('KEY:', SUPABASE_KEY?.substring(0, 10) + '...');

// Testar conexão direta
const { data, error } = await supabase.from('users').select('count');
```

### Erro de tipagem TypeScript
```bash
# Regenerar tipos
npm install @supabase/supabase-js@latest

# Ou forçar remov type checking temporariamente
// @ts-ignore
```

---

## 📚 Recursos Importantes

- [Expo Router Docs](https://expo.github.io/router/introduction/)
- [Supabase Getting Started](https://supabase.com/docs/guides/getting-started)
- [React Native Cheat Sheet](https://react-native-elements.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

**Lembre-se:** "Programar é resolver problemas com elegância" 🎯

Boa sorte no HackQuali! 🚀

