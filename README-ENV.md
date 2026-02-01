# 🔧 Configuração de Ambientes

## Arquivos de Ambiente

Este projeto usa diferentes arquivos `.env` para cada ambiente:

### 📁 `.env.development` (Desenvolvimento Local)
```env
VITE_APP_URL=http://localhost:5173
```
- Usado quando você roda `npm run dev`
- QR codes dinâmicos apontam para `http://localhost:5173/r/abc123`
- ✅ Pode ser commitado (não contém secrets)

### 📁 `.env.production` (Produção)
```env
VITE_APP_URL=https://rfillqrcode.com.br
```
- Usado quando você faz build (`npm run build`)
- QR codes dinâmicos apontam para `https://rfillqrcode.com.br/r/abc123`
- ✅ Pode ser commitado (não contém secrets)

### 📁 `.env.local` (Sobrescreve outros)
```env
VITE_APP_URL=http://localhost:5173
```
- Sobrescreve `.env.development` e `.env.production`
- Use para testes locais específicos
- ❌ **NÃO deve ser commitado** (está no .gitignore)

---

## 🚀 Como Funciona

### Desenvolvimento Local:
```bash
npm run dev
```
- Usa `.env.development`
- QR codes criados apontam para `localhost:5173`

### Build de Produção:
```bash
npm run build
```
- Usa `.env.production`
- QR codes criados apontam para `https://rfillqrcode.com.br`

### Vercel (Produção):
- Usa variáveis de ambiente configuradas no painel da Vercel
- `VITE_APP_URL=https://rfillqrcode.com.br`

---

## ⚠️ IMPORTANTE

### QR Codes são Permanentes!

Quando você cria um QR code **dinâmico**, a URL curta fica **gravada permanentemente** no QR code físico.

**Exemplo:**
- **Desenvolvimento:** Cria QR code → aponta para `http://localhost:5173/r/abc123`
- **Produção:** Cria QR code → aponta para `https://rfillqrcode.com.br/r/abc123`

**⚠️ NÃO misture ambientes!**
- QR codes criados em desenvolvimento **NÃO funcionarão em produção**
- QR codes criados em produção **NÃO funcionarão em localhost**

### Solução: Use Bancos de Dados Separados

Para desenvolvimento, considere criar um projeto Supabase separado:
- `supabase-prod` → Produção (https://rfillqrcode.com.br)
- `supabase-dev` → Desenvolvimento (http://localhost:5173)

---

## 🔍 Verificar Configuração Atual

Cole no console do browser (F12):

```javascript
console.log('URL Base:', import.meta.env.VITE_APP_URL);
```

Ou veja no código:

```typescript
import { getAppBaseUrl } from '@/lib/config'
console.log('URL Base:', getAppBaseUrl())
```

---

## 📝 Checklist

- [ ] `.env.development` configurado com `http://localhost:5173`
- [ ] `.env.production` configurado com `https://rfillqrcode.com.br`
- [ ] Variáveis configuradas no painel da Vercel
- [ ] Entendi que QR codes são permanentes e específicos do ambiente
- [ ] Vou criar QR codes de teste apenas em desenvolvimento
- [ ] Vou criar QR codes reais apenas em produção
