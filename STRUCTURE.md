# 📋 Sumário da Base do HackQuali

## ✅ O Que Foi Criado

### 🗂️ Estrutura de Pastas Completa

```
HackQuali_App/
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx                 ✅
│   │   ├── login.tsx                   ✅
│   │   ├── signup.tsx                  ✅
│   │   └── link-unit.tsx               ✅
│   │
│   ├── (resident)/
│   │   ├── _layout.tsx                 ✅
│   │   └── (tabs)/
│   │       ├── _layout.tsx             ✅
│   │       ├── home.tsx                ✅
│   │       ├── requests.tsx            ✅
│   │       ├── appointments.tsx        ✅
│   │       └── profile.tsx             ✅
│   │
│   ├── (contractor)/
│   │   ├── _layout.tsx                 ✅
│   │   └── (tabs)/
│   │       ├── _layout.tsx             ✅
│   │       ├── dashboard.tsx           ✅
│   │       ├── tickets.tsx             ✅
│   │       ├── buildings.tsx           ✅
│   │       ├── analytics.tsx           ✅
│   │       └── profile.tsx             ✅
│
├── src/
│   ├── components/
│   │   ├── common/                     (estrutura pronta)
│   │   ├── resident/                   (estrutura pronta)
│   │   └── contractor/                 (estrutura pronta)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx             ✅
│   │
│   ├── types/
│   │   └── index.ts                    ✅ (14 tipos definidos)
│   │
│   ├── styles/
│   │   └── authStyles.ts               ✅ (cores + componentes base)
│   │
│   ├── constants/
│   │   └── index.ts                    ✅ (enums e labels)
│   │
│   ├── utils/                          (estrutura pronta)
│   │
│   └── supabase.js                     (já existe)
```

---

## 📝 Arquivos Criados

### 1. **Tipos TypeScript** (`src/types/index.ts`)
Define toda a estrutura de dados:
- User, ResidentUser, ContractorUser, TechnicianUser
- Building, Unit
- ServiceRequest, Appointment, ServiceRating
- BuildingAnalytics, TechnicianSchedule

**Total:** 14 interfaces principais

### 2. **Autenticação** (`src/contexts/AuthContext.tsx`)
- Login/Signup/Logout
- Persistência de sessão
- Erro handling
- Hook `useAuth()` para qualquer componente

### 3. **Estilos Globais** (`src/styles/authStyles.ts`)
- Paleta de cores profissional
- StyleSheet com componentes base
- Status e priority colors
- Tipografia e spacing

### 4. **Constantes** (`src/constants/index.ts`)
- SERVICE_CATEGORIES com labels PT-BR
- SERVICE_STATUS com labels
- PRIORITY_LEVELS com labels
- USER_ROLES com labels
- VALIDATION rules
- TIMING constants

### 5. **Páginas de Autenticação**
- `login.tsx` - Formulário login
- `signup.tsx` - Cadastro com seleção de tipo (morador/construtora)
- `link-unit.tsx` - Vinculação de unidade para moradores

### 6. **Dashboard Morador** (Resident)
- `home.tsx` - Dashboard com KPIs
- `requests.tsx` - Lista de solicitações
- `appointments.tsx` - Agendamentos
- `profile.tsx` - Perfil do usuário

**Total: 4 páginas com tabs**

### 7. **Dashboard Construtora** (Contractor)
- `dashboard.tsx` - KPIs principais
- `tickets.tsx` - Gerenciar chamados com filtros
- `buildings.tsx` - Lista de empreendimentos
- `analytics.tsx` - Relatórios por empreendimento
- `profile.tsx` - Perfil da empresa

**Total: 5 páginas com tabs**

### 8. **Documentação**
- `ARCHITECTURE.md` - Guia completo de arquitetura
- `DEVELOPMENT_GUIDE.md` - Guia prático para desenvolvedores
- `STRUCTURE.md` - Este arquivo

---

## 🚀 Próximos Passos Imediatos

### 📌 Semana 1 - Essencial

```
Dia 1 (23/11):
[ ] Testar autenticação com Supabase real
[ ] Criar tabelas no Supabase (users, units, buildings)
[ ] Vincular login ao banco

Dia 2 (24/11):
[ ] Implementar criação de solicitação (formulário + CRUD)
[ ] Implementar listagem de solicitações
[ ] Testar fluxo morador básico

Dia 3 (25/11):
[ ] Implementar dashboard construtora com dados reais
[ ] Implementar atribuição de técnico
[ ] Criar tabelas analytics

Dia 4 (26/11):
[ ] Upload de fotos funcional
[ ] Agendamento visual
[ ] Validações de formulário
```

### 🎨 Componentes a Criar

```
ALTA PRIORIDADE:
- [ ] ServiceRequestForm (novo chamado)
- [ ] ServiceRequestCard (card reutilizável)
- [ ] AppointmentPicker (seletor de datas/horários)
- [ ] RatingComponent (avaliação 1-5)
- [ ] ErrorBoundary (tratamento de erros)

MÉDIA PRIORIDADE:
- [ ] ImageUploader (upload de fotos)
- [ ] FilterBar (filtros)
- [ ] SearchBar (busca)
- [ ] EmptyState (estado vazio)
- [ ] LoadingSpinner (customizado)

BAIXA PRIORIDADE:
- [ ] SuccessToast (notificações)
- [ ] ConfirmModal (modais de confirmação)
- [ ] BottomSheet (menu deslizante)
```

---

## 📊 Status Atual

| Área | Completude | Status |
|------|-----------|--------|
| **Estrutura Base** | 100% | ✅ Pronto |
| **Tipos/Interfaces** | 100% | ✅ Pronto |
| **Autenticação** | 80% | 🔧 Falta Supabase real |
| **Layout/Navegação** | 100% | ✅ Pronto |
| **Páginas** | 70% | 🔧 Falta integração BD |
| **Componentes** | 20% | 🔧 Precisa criar |
| **Formulários** | 0% | ❌ Não iniciado |
| **CRUD** | 0% | ❌ Não iniciado |
| **Upload Fotos** | 0% | ❌ Não iniciado |
| **Analytics** | 0% | ❌ Não iniciado |

---

## 🎯 Fluxos de Teste Recomendados

### Fluxo Morador - Happy Path
```
1. Signup com email/senha (tipo: resident)
2. Vincular código de unidade
3. Ir para home (deve mostrar 0 solicitações)
4. Criar nova solicitação
5. Preencher formulário completo
6. Upload de foto
7. Submeter
8. Verificar em requests (status: open)
9. Ir para appointments (vazio inicialmente)
10. Abrir solicitação e agendar visita
11. Após conclusão, ir avaliar
12. Enviar nota de 1-5
13. Verificar que não pode abrir novo chamado sem avaliar anterior
```

### Fluxo Construtora - Happy Path
```
1. Signup com email/senha (tipo: contractor)
2. Ir para dashboard (deve carregar KPIs)
3. Verificar tickets abertos da solicitação anterior
4. Atribuir técnico à solicitação
5. Mudar status para "in_progress"
6. Visualizar analytics (deve incluir nova solicitação)
7. Filtrar tickets por status
8. Visualizar buildings
9. Expandir building para ver unidades
```

---

## 📱 Checklist Antes de Começar a Desenvolver

Após clonar/copiar este código:

```bash
# 1. Instalar dependências
npm install

# 2. Configurar .env
# Criar arquivo .env.local com:
# EXPO_PUBLIC_SUPABASE_URL=sua_url
# EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_key

# 3. Testar que compila
npm start

# 4. Testar em emulador/web
# Pressione 'w' para web (mais rápido)
# Pressione 'a' para Android
# Pressione 'i' para iOS

# 5. Verificar erros de tipo
npx tsc --noEmit
```

---

## 🔐 Configuração Supabase Recomendada

### Tabelas Essenciais (criar em ordem)

```sql
-- 1. Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR(20) NOT NULL,
  phone VARCHAR,
  unitId UUID,
  buildingId UUID,
  companyId UUID,
  createdAt TIMESTAMP DEFAULT NOW()
);

-- 2. Buildings
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  address VARCHAR NOT NULL,
  city VARCHAR,
  state VARCHAR,
  zipCode VARCHAR,
  contractorId UUID NOT NULL REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT NOW()
);

-- 3. Units
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buildingId UUID NOT NULL REFERENCES buildings(id),
  unitNumber VARCHAR NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  residentId UUID REFERENCES users(id),
  createdAt TIMESTAMP DEFAULT NOW()
);

-- 4. Service Requests
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unitId UUID NOT NULL REFERENCES units(id),
  residentId UUID NOT NULL REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR(20),
  priority VARCHAR(10) DEFAULT 'normal',
  status VARCHAR(20) DEFAULT 'open',
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- 5. Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serviceRequestId UUID NOT NULL REFERENCES service_requests(id),
  technicianId UUID REFERENCES users(id),
  scheduledDate DATE,
  scheduledTime TIME,
  duration INTEGER,
  status VARCHAR(20) DEFAULT 'scheduled',
  createdAt TIMESTAMP DEFAULT NOW()
);

-- 6. Service Ratings
CREATE TABLE service_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serviceRequestId UUID NOT NULL REFERENCES service_requests(id),
  residentId UUID NOT NULL REFERENCES users(id),
  qualityScore INTEGER CHECK(qualityScore BETWEEN 1 AND 5),
  speedScore INTEGER CHECK(speedScore BETWEEN 1 AND 5),
  workmanshipScore INTEGER CHECK(workmanshipScore BETWEEN 1 AND 5),
  comment TEXT,
  suggestions TEXT,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### RLS Policies (Segurança)

```sql
-- Users podem ler/atualizar seu próprio perfil
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Moradores podem ver solicitações deles
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Residents view own requests"
  ON service_requests FOR SELECT
  USING (auth.uid() = residentId);

-- Construtoras veem solicitações de seus empreendimentos
CREATE POLICY "Contractors view their requests"
  ON service_requests FOR SELECT
  USING (
    unitId IN (
      SELECT id FROM units WHERE buildingId IN (
        SELECT id FROM buildings WHERE contractorId = auth.uid()
      )
    )
  );
```

---

## 🎓 Orientações de Código

### Padrão de Imports
```typescript
// Ordem recomendada:
// 1. React/React Native
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

// 2. Expo/Navigation
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

// 3. Custom imports
import { useAuth } from '../../../src/contexts/AuthContext';
import { supabase } from '../../../src/supabase';
import { ServiceRequest } from '../../../src/types';
import { styles, colors } from '../../../src/styles/authStyles';
```

### Nomeação
```typescript
// ✅ Bom
const fetchServiceRequests = async () => {}
const ServiceRequestCard = () => {}
const SERVICE_STATUS = {}

// ❌ Evitar
const FetchRequests = async () => {} // função não é classe
const serviceRequestCard = () => {} // componente deve ser PascalCase
const service_status = {} // use camelCase
```

---

## 🚨 Possíveis Armadilhas e Como Evitar

### 1. Autenticação não persiste
```typescript
// ❌ Errado - perderá sessão ao reabrir app
// ✅ Certo - AuthContext já faz checkAuth no useEffect
```

### 2. FlatList performance ruim
```typescript
// ❌ Errado
<FlatList data={allRequests} /> // sem pagination

// ✅ Certo
<FlatList
  data={requests.slice(0, pageIndex * PAGE_SIZE)}
  onEndReached={() => setPageIndex(prev => prev + 1)}
  onEndReachedThreshold={0.5}
/>
```

### 3. Formulários sem validação
```typescript
// ❌ Errado
const handleSubmit = () => {
  await submitForm(); // pode quebrar se dados inválidos
};

// ✅ Certo
const handleSubmit = () => {
  const validation = validateForm(formData);
  if (!validation.isValid) {
    Alert.alert('Erro', validation.errors[0]);
    return;
  }
  await submitForm();
};
```

### 4. Memory leaks com useEffect
```typescript
// ❌ Errado
useEffect(() => {
  fetchData(); // sem cleanup
}, []);

// ✅ Certo
useEffect(() => {
  let isMounted = true;
  
  const fetch = async () => {
    const data = await fetchData();
    if (isMounted) setData(data);
  };
  
  fetch();
  
  return () => { isMounted = false; };
}, []);
```

---

## 📞 Suporte Quick Reference

| Problema | Solução |
|----------|---------|
| App não compila | `npm install` novamente |
| Tipos com erro | Verificar `src/types/index.ts` |
| Supabase não conecta | Verificar `EXPO_PUBLIC_SUPABASE_*` |
| Pages não renderizam | Checar estrutura de pastas (case-sensitive) |
| Context não funciona | Env provider no `_layout.tsx` root |
| Estilos não aplicam | Importar `from '../../src/styles/authStyles'` |

---

## 🎯 Recomendações Finais

1. **Commit frequente** - Pelo menos 1x por dia
2. **Testes manuais** - Antes de cada feature
3. **Code review** - Peça para parceiro revisar
4. **Documentação viva** - Atualize este arquivo
5. **Performance first** - Teste em dispositivo real
6. **UX over features** - Qualidade > quantidade
7. **MVP mindset** - Foco no essencial

---

**Data de criação:** 26/11/2025  
**Versão:** 0.1.0  
**Status:** Pronto para desenvolvimento  

🚀 **Você está pronto! Boa sorte no HackQuali!**

