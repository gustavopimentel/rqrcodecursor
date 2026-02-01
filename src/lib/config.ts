/**
 * Configurações globais da aplicação
 */

/**
 * Obtém a URL base da aplicação
 * Usa variável de ambiente ou fallback para window.location.origin
 * 
 * @throws Error se VITE_APP_URL não estiver definida
 */
export function getAppBaseUrl(): string {
  // Preferir variável de ambiente
  const envUrl = import.meta.env.VITE_APP_URL
  
  if (envUrl) {
    // Remover trailing slash se existir
    return envUrl.replace(/\/$/, '')
  }
  
  // Fallback para window.location.origin (apenas em desenvolvimento)
  if (typeof window !== 'undefined') {
    console.warn(
      '⚠️ VITE_APP_URL não definida! Usando window.location.origin como fallback.\n' +
      'Adicione no .env.local:\n' +
      'VITE_APP_URL=https://rfillqrcode.com.br'
    )
    return window.location.origin
  }
  
  throw new Error(
    '⚠️ VITE_APP_URL não configurada!\n' +
    'Adicione no .env.local:\n' +
    'VITE_APP_URL=http://localhost:8080 (dev)\n' +
    'VITE_APP_URL=https://rfillqrcode.com.br (prod)\n\n' +
    '⚠️ ATENÇÃO: Mudar esta URL em produção quebrará QR codes existentes!\n' +
    'Execute a migração de dados antes de fazer o deploy.'
  )
}

/**
 * Gera URL curta para QR codes dinâmicos
 * 
 * @param shortCode - Código curto único
 * @returns URL completa para o QR code dinâmico
 * 
 * @example
 * generateShortUrl('abc123') // => 'https://rfillqrcode.com.br/r/abc123'
 */
export function generateShortUrl(shortCode: string): string {
  const baseUrl = getAppBaseUrl()
  return `${baseUrl}/r/${shortCode}`
}
