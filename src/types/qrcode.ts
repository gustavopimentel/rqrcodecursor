export type QRCodeType = 'url' | 'text' | 'vcard' | 'email' | 'phone' | 'wifi'

export interface QRCode {
  id: string
  user_id: string
  name: string
  type: QRCodeType
  content: string
  is_active: boolean
  is_dynamic: boolean
  short_code?: string | null
  redirect_url?: string | null
  scan_count: number
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
}

export interface CreateQRCodeData {
  name: string
  type: QRCodeType
  content: string
  is_active?: boolean
  is_dynamic?: boolean
  redirect_url?: string
}

// Dados específicos por tipo
export interface URLData {
  url: string
}

export interface TextData {
  text: string
}

export interface VCardData {
  firstName: string
  lastName: string
  organization?: string
  phone?: string
  email?: string
  website?: string
  address?: string
  note?: string
}

export interface EmailData {
  email: string
  subject?: string
  body?: string
}

export interface PhoneData {
  phone: string
}

export interface WiFiData {
  ssid: string
  password: string
  encryption: 'WPA' | 'WEP' | 'nopass'
  hidden?: boolean
}

export type QRCodeTypeData = URLData | TextData | VCardData | EmailData | PhoneData | WiFiData
