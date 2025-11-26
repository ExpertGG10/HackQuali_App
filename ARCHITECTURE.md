# HackQuali - Aplicativo de Assistência Técnica Pós-Obra

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias](#tecnologias)
- [Setup do Projeto](#setup-do-projeto)
- [Guia de Desenvolvimento](#guia-de-desenvolvimento)
- [Fluxos Principais](#fluxos-principais)
- [Próximas Etapas](#próximas-etapas)

---

## 🎯 Visão Geral

**HackQuali** é um MVP de um aplicativo mobile para gerenciamento de assistência técnica pós-obra entre moradores e construtoras. O app facilita o registro, acompanhamento e avaliação de solicitações de manutenção com transparência e eficiência.

### Funcionalidades Principais:
- **Lado Morador:** Criar solicitações, agendar visitas, avaliar atendimento
- **Lado Construtora:** Gerenciar chamados, designar técnicos, visualizar analytics
- **Sistema Unificado:** Autenticação, perfis, históricos e notificações

---

## 🏗️ Arquitetura

### Padrão: Mobile-First com Expo Router

```
┌─────────────────────────────────────┐
│      UI Layer (React Native)        │
│  ├─ (resident) - Abas do morador   │
│  ├─ (contractor) - Abas construtora│
│  └─ (auth) - Autenticação          │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│    Context & State Management       │
│  ├─ AuthContext                     │
│  └─ Custom Hooks                    │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│      Services & Data Layer          │
│  ├─ Supabase Client                 │
│  ├─ API Calls                       │
│  └─ Data Transformations            │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│    Backend (Supabase)               │
│  ├─ PostgreSQL DB                   │
│  ├─ Authentication                  │
│  └─ Real-time Subscriptions         │
└─────────────────────────────────────┘
```

---

## 📁 Estrutura de Pastas

```
HackQuali_App/
├── app/                          # Páginas (Expo Router)
│   ├── (auth)/                   # Rotas de autenticação
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   ├── link-unit.tsx
│   │   └── _layout.tsx
│   ├── (resident)/               # Área do morador
│   │   ├── (tabs)/               # Navegação com abas
│   │   │   ├── home.tsx
│   │   │   ├── requests.tsx
│   │   │   ├── appointments.tsx
│   │   │   ├── profile.tsx
│   │   │   └── _layout.tsx
│   │   └── _layout.tsx
│   ├── (contractor)/             # Área da construtora
│   │   ├── (tabs)/               # Navegação com abas
│   │   │   ├── dashboard.tsx
│   │   │   ├── tickets.tsx
│   │   │   ├── buildings.tsx
│   │   │   ├── analytics.tsx
│   │   │   ├── profile.tsx
│   │   │   └── _layout.tsx
│   │   └── _layout.tsx
│   ├── _layout.tsx               # Layout raiz
│   └── index.tsx                 # Página inicial
│
├── src/
│   ├── components/               # Componentes reutilizáveis
│   │   ├── common/               # Botões, cards, modais
│   │   ├── resident/             # Específicos do morador
│   │   └── contractor/           # Específicos da construtora
│   │
│   ├── contexts/                 # Context API
│   │   └── AuthContext.tsx       # Gerenciamento de autenticação
│   │
│   ├── types/                    # Tipos TypeScript
│   │   └── index.ts              # Todas as interfaces
│   │
│   ├── utils/                    # Funções utilitárias
│   │   ├── validation.ts         # Validações
│   │   ├── formatting.ts         # Formatação de dados
│   │   └── date.ts               # Utilitários de data
│   │
│   ├── constants/                # Constantes
│   │   └── index.ts              # Enums e labels
│   │
│   ├── styles/                   # Estilos globais
│   │   └── authStyles.ts         # Paleta de cores e estilos
│   │
│   └── supabase.js               # Cliente Supabase
│
├── assets/                       # Imagens, fontes, etc
├── app.json                      # Configuração Expo
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
└── README.md
```

---

## 🛠️ Tecnologias

| Tecnologia | Propósito | Versão |
|-----------|----------|--------|
| **React Native** | Framework mobile | 0.81.5 |
| **Expo** | Ferramenta desenvolvimento | ~54.0.25 |
| **Expo Router** | Roteamento | ~6.0.15 |
| **TypeScript** | Tipagem | ~5.9.2 |
| **Supabase** | Backend & DB | ^2.84.0 |
| **React Navigation** | Navegação avançada | ^7.x |
| **Native Base** | Componentes UI | ^3.4.28 |
| **FontAwesome** | Ícones | @expo/vector-icons |

---

## 🚀 Setup do Projeto

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Conta Supabase criada
- Expo CLI (`npm install -g expo-cli`)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar Supabase
# Copie suas credenciais Supabase em src/supabase.js
# SUPABASE_URL=seu_url_aqui
# SUPABASE_KEY=sua_key_aqui

# 3. Iniciar projeto
npm start

# 4. Rodar em emulador/dispositivo
# - iOS: Pressione 'i'
# - Android: Pressione 'a'
# - Web: Pressione 'w'
```

---

## 💡 Guia de Desenvolvimento

### 1. Criar Nova Página

**Exemplo: Página de detalhe de solicitação (resident)**

```typescript
// app/(resident)/(tabs)/requests/[id].tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../../../src/supabase';
import { ServiceRequest } from '../../../../src/types';
import { styles } from '../../../../src/styles/authStyles';

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequest();
  }, [id]);

  const fetchRequest = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setRequest(data);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator />;
  if (!request) return <Text>Solicitação não encontrada</Text>;

  return (
    <ScrollView style={styles.container}>
      {/* Render request details */}
    </ScrollView>
  );
}
```

### 2. Criar Novo Componente Reutilizável

```typescript
// src/components/common/ServiceRequestCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ServiceRequest } from '../../types';
import { styles, statusColors } from '../../styles/authStyles';

interface ServiceRequestCardProps {
  request: ServiceRequest;
  onPress?: () => void;
}

export const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  request,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>
          {request.title}
        </Text>
        <Text style={{ fontSize: 12, color: '#666' }}>
          {request.description?.substring(0, 60)}...
        </Text>
      </View>
      <View
        style={{
          backgroundColor: statusColors[request.status],
          borderRadius: 6,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <Text style={{ fontSize: 11, color: 'white', fontWeight: '600' }}>
          {request.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceRequestCard;
```

### 3. Adicionar Context/Estado Global

```typescript
// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => removeNotification(notification.id), 3000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
```

---

## 📱 Fluxos Principais

### Fluxo de Autenticação (Resident)
```
Login/Signup
    ↓
Validação de credenciais
    ↓
Criar usuário no Supabase Auth
    ↓
Vincular código de unidade
    ↓
Redirecionar para (resident) home
    ↓
AuthContext atualiza usuário
```

### Fluxo de Solicitação de Manutenção
```
Resident: Nova Solicitação
    ↓
Preencher formulário (categoria, descrição, fotos)
    ↓
Salvar no Supabase
    ↓
Contractor: Recebe notificação
    ↓
Atribuir técnico
    ↓
Resident: Agendar visita
    ↓
Técnico: Executar manutenção
    ↓
Resident: Avaliar atendimento
    ↓
Analytics: Atualizar dados
```

### Fluxo do Dashboard (Contractor)
```
Login Contractor
    ↓
Buscar todas as solicitações de seus empreendimentos
    ↓
Calcular KPIs (open, assigned, completed)
    ↓
Renderizar cards com estatísticas
    ↓
Permitir filtro e busca
```

---

## 🎨 Guia de Estilos

### Paleta de Cores
```typescript
const colors = {
  primary: '#0066CC',      // Azul principal
  secondary: '#00CC99',    // Verde/Teal
  danger: '#FF3333',       // Vermelho
  warning: '#FFB84D',      // Laranja
  success: '#00CC66',      // Verde
  background: '#F5F7FA',   // Cinza claro
  text: '#1A1A1A',         // Escuro
  textSecondary: '#666666',// Cinza
  border: '#E0E0E0',       // Borda padrão
  white: '#FFFFFF',        // Branco
};
```

### Componentes Básicos
- **Cards:** Sombra discreta, bordas arredondadas, padding 16
- **Botões:** Preenchimento, sempre com feedback visual
- **Inputs:** Fundo claro, borda 1px, padding 12
- **Headers:** Título 32px bold, subtítulo 14px cinza

---

## ✅ Próximas Etapas

### MVP v1.0 (Essencial para entrega)
- [x] Autenticação (login/signup/logout)
- [x] Estrutura de páginas base
- [x] Navegação com abas (resident + contractor)
- [x] Tipos TypeScript
- [x] Context de autenticação
- [ ] Criar formulários funcionais
- [ ] Integrar uploads de fotos
- [ ] Criar modelos Supabase (DB)
- [ ] Implementar CRUD completo
- [ ] Adicionar validações

### Melhorias
- [ ] Notificações push (Expo Notifications)
- [ ] Chat integrado (Realtime Supabase)
- [ ] Integração com Google Calendar
- [ ] Offline-first com SQLite
- [ ] Testes unitários (Jest)
- [ ] Testes E2E (Detox)

### Performance & UX
- [ ] Lazy loading de imagens
- [ ] Paginação de listas
- [ ] Otimização de queries
- [ ] Animações de transição
- [ ] Acessibilidade (WCAG)

---

## 📊 Banco de Dados (Supabase)

### Tabelas Principais
```sql
-- users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  name VARCHAR,
  role VARCHAR (resident|contractor|technician),
  phone VARCHAR,
  unitId UUID,
  buildingId UUID,
  companyId UUID,
  createdAt TIMESTAMP
);

-- service_requests
CREATE TABLE service_requests (
  id UUID PRIMARY KEY,
  unitId UUID,
  residentId UUID,
  title VARCHAR,
  description TEXT,
  category VARCHAR,
  priority VARCHAR,
  status VARCHAR,
  images TEXT[],
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);

-- appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  serviceRequestId UUID,
  technicianId UUID,
  scheduledDate DATE,
  scheduledTime TIME,
  duration INTEGER,
  status VARCHAR,
  createdAt TIMESTAMP
);

-- service_ratings
CREATE TABLE service_ratings (
  id UUID PRIMARY KEY,
  serviceRequestId UUID,
  residentId UUID,
  qualityScore INTEGER (1-5),
  speedScore INTEGER (1-5),
  workmanshipScore INTEGER (1-5),
  comment TEXT,
  createdAt TIMESTAMP
);

-- buildings
CREATE TABLE buildings (
  id UUID PRIMARY KEY,
  name VARCHAR,
  address VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zipCode VARCHAR,
  contractorId UUID,
  createdAt TIMESTAMP
);

-- units
CREATE TABLE units (
  id UUID PRIMARY KEY,
  buildingId UUID,
  unitNumber VARCHAR,
  code VARCHAR UNIQUE,
  residentId UUID,
  createdAt TIMESTAMP
);
```

---

## 🚦 Status do Desenvolvimento

| Componente | Status | Progresso |
|-----------|--------|----------|
| Estrutura Base | ✅ | 100% |
| Autenticação | ⏳ | 80% |
| UI/Componentes | ⏳ | 60% |
| Backend Supabase | ⏳ | 40% |
| Formulários | ❌ | 0% |
| Integração BD | ❌ | 0% |
| Testes | ❌ | 0% |
| Deploy | ❌ | 0% |

---

## 📚 Referências

- [Expo Router Documentation](https://expo.github.io/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 👥 Time

| Papel | Responsabilidade |
|------|-----------------|
| **Frontend Dev** | Páginas, componentes, navegação |
| **Backend Dev** | Supabase, APIs, lógica de negócio |
| **Designer** | UI/UX, prototipagem |
| **QA** | Testes, documentação |

---

## 📝 Notas Importantes

1. **Sempre commitar com mensagens claras:**
   ```bash
   git commit -m "feat: adiciona página de detalhe de solicitação"
   git commit -m "fix: corrige validação de email no signup"
   ```

2. **Usar TypeScript em todos os arquivos novos**

3. **Testar em múltiplas plataformas** (iOS, Android, Web)

4. **Documentar mudanças significativas** no README

5. **Solicitar code review** antes de merge

---

**Última atualização:** 26/11/2025  
**Versão:** 0.1.0-alpha  
**Status:** Em desenvolvimento

