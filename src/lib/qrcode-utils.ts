import type {
  URLData,
  TextData,
  VCardData,
  EmailData,
  PhoneData,
  WiFiData,
  QRCodeType,
} from '@/types/qrcode'

/**
 * Formata dados de URL para QR Code
 */
export function formatURLContent(data: URLData): string {
  return normalizeURL(data.url)
}

/**
 * Formata dados de texto para QR Code
 */
export function formatTextContent(data: TextData): string {
  return data.text
}

/**
 * Formata dados de vCard para QR Code
 * Formato VCF versão 3.0
 */
export function formatVCardContent(data: VCardData): string {
  let vcard = 'BEGIN:VCARD\n'
  vcard += 'VERSION:3.0\n'
  
  // Nome
  vcard += `N:${data.lastName};${data.firstName};;;\n`
  vcard += `FN:${data.firstName} ${data.lastName}\n`
  
  // Organização
  if (data.organization) {
    vcard += `ORG:${data.organization}\n`
  }
  
  // Telefone
  if (data.phone) {
    vcard += `TEL:${data.phone}\n`
  }
  
  // Email
  if (data.email) {
    vcard += `EMAIL:${data.email}\n`
  }
  
  // Website
  if (data.website) {
    vcard += `URL:${data.website}\n`
  }
  
  // Endereço
  if (data.address) {
    vcard += `ADR:;;${data.address};;;;\n`
  }
  
  // Nota
  if (data.note) {
    vcard += `NOTE:${data.note}\n`
  }
  
  vcard += 'END:VCARD'
  
  return vcard
}

/**
 * Formata dados de email para QR Code
 * Formato mailto:
 */
export function formatEmailContent(data: EmailData): string {
  let mailto = `mailto:${data.email}`
  
  const params: string[] = []
  
  if (data.subject) {
    params.push(`subject=${encodeURIComponent(data.subject)}`)
  }
  
  if (data.body) {
    params.push(`body=${encodeURIComponent(data.body)}`)
  }
  
  if (params.length > 0) {
    mailto += '?' + params.join('&')
  }
  
  return mailto
}

/**
 * Formata dados de telefone para QR Code
 * Formato tel:
 */
export function formatPhoneContent(data: PhoneData): string {
  return `tel:${data.phone}`
}

/**
 * Formata dados de WiFi para QR Code
 * Formato especial WiFi
 */
export function formatWiFiContent(data: WiFiData): string {
  const { ssid, password, encryption, hidden } = data
  
  let wifi = 'WIFI:'
  wifi += `T:${encryption};`
  wifi += `S:${ssid};`
  
  if (encryption !== 'nopass' && password) {
    wifi += `P:${password};`
  }
  
  if (hidden) {
    wifi += 'H:true;'
  }
  
  wifi += ';'
  
  return wifi
}

/**
 * Formata o conteúdo baseado no tipo
 */
export function formatQRCodeContent(type: QRCodeType, data: any): string {
  switch (type) {
    case 'url':
      return formatURLContent(data)
    case 'text':
      return formatTextContent(data)
    case 'vcard':
      return formatVCardContent(data)
    case 'email':
      return formatEmailContent(data)
    case 'phone':
      return formatPhoneContent(data)
    case 'wifi':
      return formatWiFiContent(data)
    default:
      throw new Error(`Tipo de QR Code não suportado: ${type}`)
  }
}

/**
 * Gera um código curto único para QR codes dinâmicos
 * Usa caracteres aleatórios + timestamp para garantir unicidade
 * 
 * @returns Código curto de 16 caracteres (10 aleatórios + 6 do timestamp)
 * @example generateShortCode() // => 'aBcD1234xy8j9k2l'
 */
export function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  
  // 10 caracteres aleatórios
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  // + últimos 6 dígitos do timestamp em base36 (para ser mais curto)
  const timestamp = Date.now().toString(36).slice(-6)
  
  return result + timestamp
}

/**
 * Normaliza uma URL adicionando protocolo se necessário
 */
export function normalizeURL(url: string): string {
  const trimmedUrl = url.trim()
  
  // Se já tem protocolo, retorna como está
  if (trimmedUrl.match(/^https?:\/\//i)) {
    return trimmedUrl
  }
  
  // Adiciona https:// automaticamente
  return 'https://' + trimmedUrl
}

/**
 * Valida dados de URL
 */
export function validateURLData(data: URLData): string | null {
  if (!data.url || data.url.trim() === '') {
    return 'URL é obrigatória'
  }
  
  const normalizedUrl = normalizeURL(data.url)
  
  try {
    new URL(normalizedUrl)
    return null
  } catch {
    return 'URL inválida'
  }
}

/**
 * Valida dados de texto
 */
export function validateTextData(data: TextData): string | null {
  if (!data.text || data.text.trim() === '') {
    return 'Texto é obrigatório'
  }
  
  if (data.text.length > 1000) {
    return 'Texto muito longo (máximo 1000 caracteres)'
  }
  
  return null
}

/**
 * Valida dados de vCard
 */
export function validateVCardData(data: VCardData): string | null {
  if (!data.firstName || data.firstName.trim() === '') {
    return 'Nome é obrigatório'
  }
  
  if (!data.lastName || data.lastName.trim() === '') {
    return 'Sobrenome é obrigatório'
  }
  
  return null
}

/**
 * Valida dados de email
 */
export function validateEmailData(data: EmailData): string | null {
  if (!data.email || data.email.trim() === '') {
    return 'Email é obrigatório'
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return 'Email inválido'
  }
  
  return null
}

/**
 * Valida dados de telefone
 */
export function validatePhoneData(data: PhoneData): string | null {
  if (!data.phone || data.phone.trim() === '') {
    return 'Telefone é obrigatório'
  }
  
  return null
}

/**
 * Valida dados de WiFi
 */
export function validateWiFiData(data: WiFiData): string | null {
  if (!data.ssid || data.ssid.trim() === '') {
    return 'Nome da rede (SSID) é obrigatório'
  }
  
  if (data.encryption !== 'nopass' && (!data.password || data.password.trim() === '')) {
    return 'Senha é obrigatória para redes protegidas'
  }
  
  return null
}

