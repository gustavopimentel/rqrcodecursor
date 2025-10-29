# 🚀 Projeto React + Supabase + Vite

## 📋 Configuração Completa

Este projeto foi configurado com as seguintes tecnologias:

- ✅ **React 19** + **TypeScript**
- ✅ **Vite** para build rápido (porta 8080)
- ✅ **Tailwind CSS** + **shadcn/ui**
- ✅ **Supabase** configurado (projeto: rfillqrcode)
- ✅ **React Router** para navegação
- ✅ **React Query** (@tanstack/react-query) para gerenciamento de estado
- ✅ **Framer Motion** para animações
- ✅ **Ícones**: Lucide React + Tabler Icons
- ✅ **ESLint** configurado
- ✅ **Estrutura de pastas** organizada

## 📁 Estrutura do Projeto

```
src/
  ├── components/
  │   └── ui/              # Componentes shadcn/ui
  ├── contexts/            # Contextos React (Auth, Theme, etc.)
  ├── hooks/              # Custom hooks
  ├── integrations/
  │   └── supabase/       # Configuração do Supabase
  ├── lib/                # Utilitários (cn, etc.)
  ├── pages/              # Páginas da aplicação
  ├── services/           # Serviços de API
  └── types/              # Tipos TypeScript
```

## 🎨 Componentes shadcn/ui Instalados

- ✅ Button
- ✅ Input
- ✅ Dialog
- ✅ Alert Dialog
- ✅ Sonner (Toast)
- ✅ Tooltip
- ✅ Separator
- ✅ Sheet
- ✅ Skeleton

## ⚙️ Variáveis de Ambiente

As variáveis de ambiente já estão configuradas para o projeto Supabase **rfillqrcode**:

**Nota:** O arquivo `.env.local` deve ser criado na raiz do projeto com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://svvfmujhjmccwbdrxzjp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dmZtdWpoam1jY3diZHJ4empwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NTAyNDksImV4cCI6MjA3NzIyNjI0OX0.ggTp1ILinOUZcsEfVy5g1qh8SfZbBp8KnCqMbvk6LN4
```

## 🚀 Como Usar

### 1. Criar o arquivo .env.local

Copie as variáveis de ambiente acima para um arquivo `.env.local` na raiz do projeto.

### 2. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O servidor irá iniciar em `http://localhost:8080`

### 3. Build para produção

```bash
npm run build
```

### 4. Preview do build

```bash
npm run preview
```

## 💡 Exemplos de Uso

### Usando o Supabase

```typescript
import { supabase } from '@/integrations/supabase'

// Exemplo: Buscar dados
const { data, error } = await supabase
  .from('sua_tabela')
  .select('*')

// Exemplo: Inserir dados
const { data, error } = await supabase
  .from('sua_tabela')
  .insert({ campo: 'valor' })
```

### Usando componentes shadcn/ui

```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function MeuComponente() {
  return (
    <div>
      <Input placeholder="Digite algo..." />
      <Button>Clique aqui</Button>
    </div>
  )
}
```

### Usando ícones

```typescript
import { Home, User } from 'lucide-react'
import { IconHome, IconUser } from '@tabler/icons-react'

function MeuComponente() {
  return (
    <div>
      <Home size={24} />
      <IconHome size={24} />
    </div>
  )
}
```

## 🔧 Configurações

### Aliases configurados

- `@/` → `./src/`

Exemplo:
```typescript
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase'
```

### Porta do servidor

O servidor de desenvolvimento está configurado para rodar na porta **8080**:
```
http://localhost:8080
```

## 📚 Documentação

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Tabler Icons](https://tabler-icons.io/)

## 🎯 Próximos Passos

1. ✅ Projeto configurado
2. 🔄 Configure suas tabelas no Supabase
3. 🔄 Implemente autenticação
4. 🔄 Crie suas páginas e componentes
5. 🔄 Configure rotas com React Router
6. 🔄 Implemente queries com React Query

---

**💡 Dica:** Use o comando `npx shadcn@latest add <componente>` para adicionar mais componentes shadcn/ui conforme necessário!
