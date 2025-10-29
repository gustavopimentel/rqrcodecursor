import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { QRCodeType, QRCodeTypeData, URLData, TextData, VCardData, EmailData, PhoneData, WiFiData } from '@/types/qrcode'

interface ContentFormStepProps {
  type: QRCodeType
  name: string
  onNameChange: (name: string) => void
  data: QRCodeTypeData | null
  onDataChange: (data: QRCodeTypeData) => void
}

export function ContentFormStep({ type, name, onNameChange, data, onDataChange }: ContentFormStepProps) {
  const renderForm = () => {
    switch (type) {
      case 'url':
        return <URLForm data={data as URLData} onChange={onDataChange} />
      case 'text':
        return <TextForm data={data as TextData} onChange={onDataChange} />
      case 'vcard':
        return <VCardForm data={data as VCardData} onChange={onDataChange} />
      case 'email':
        return <EmailForm data={data as EmailData} onChange={onDataChange} />
      case 'phone':
        return <PhoneForm data={data as PhoneData} onChange={onDataChange} />
      case 'wifi':
        return <WiFiForm data={data as WiFiData} onChange={onDataChange} />
      default:
        return null
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark mb-2">
          Preencha os Dados do QR Code
        </h2>
        <p className="text-neutral">
          Insira as informações que serão codificadas no QR Code
        </p>
      </div>

      <Card className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          {/* Nome do QR Code */}
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Nome do QR Code *
            </label>
            <Input
              placeholder="Ex: Meu Cartão de Visita"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
            <p className="text-xs text-neutral mt-1">
              Este nome é apenas para você identificar o QR Code
            </p>
          </div>

          {/* Formulário específico do tipo */}
          {renderForm()}
        </div>
      </Card>
    </div>
  )
}

// Formulário URL
function URLForm({ data, onChange }: { data: URLData | null; onChange: (data: URLData) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-dark mb-2">
        URL de Destino *
      </label>
      <Input
        type="text"
        placeholder="seusite.com ou https://seusite.com"
        value={data?.url || ''}
        onChange={(e) => onChange({ url: e.target.value })}
      />
      <p className="text-xs text-neutral mt-1">
        💡 Você pode digitar apenas o domínio (ex: google.com) - adicionaremos https:// automaticamente
      </p>
    </div>
  )
}

// Formulário Texto
function TextForm({ data, onChange }: { data: TextData | null; onChange: (data: TextData) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-dark mb-2">
        Texto *
      </label>
      <textarea
        className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Digite seu texto aqui..."
        value={data?.text || ''}
        onChange={(e) => onChange({ text: e.target.value })}
        maxLength={1000}
      />
      <p className="text-xs text-neutral mt-1">
        Máximo 1000 caracteres
      </p>
    </div>
  )
}

// Formulário vCard
function VCardForm({ data, onChange }: { data: VCardData | null; onChange: (data: VCardData) => void }) {
  const update = (field: keyof VCardData, value: string) => {
    onChange({
      ...(data || {} as VCardData),
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Nome *
          </label>
          <Input
            placeholder="João"
            value={data?.firstName || ''}
            onChange={(e) => update('firstName', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Sobrenome *
          </label>
          <Input
            placeholder="Silva"
            value={data?.lastName || ''}
            onChange={(e) => update('lastName', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Empresa
        </label>
        <Input
          placeholder="Empresa XYZ"
          value={data?.organization || ''}
          onChange={(e) => update('organization', e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Telefone
          </label>
          <Input
            type="tel"
            placeholder="+55 11 99999-9999"
            value={data?.phone || ''}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Email
          </label>
          <Input
            type="email"
            placeholder="joao@email.com"
            value={data?.email || ''}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Website
        </label>
        <Input
          type="url"
          placeholder="https://seusite.com"
          value={data?.website || ''}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Endereço
        </label>
        <Input
          placeholder="Rua, 123 - Bairro - Cidade"
          value={data?.address || ''}
          onChange={(e) => update('address', e.target.value)}
        />
      </div>
    </div>
  )
}

// Formulário Email
function EmailForm({ data, onChange }: { data: EmailData | null; onChange: (data: EmailData) => void }) {
  const update = (field: keyof EmailData, value: string) => {
    onChange({
      ...(data || {} as EmailData),
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Email de Destino *
        </label>
        <Input
          type="email"
          placeholder="contato@empresa.com"
          value={data?.email || ''}
          onChange={(e) => update('email', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Assunto (opcional)
        </label>
        <Input
          placeholder="Assunto do email"
          value={data?.subject || ''}
          onChange={(e) => update('subject', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Mensagem (opcional)
        </label>
        <textarea
          className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Corpo do email..."
          value={data?.body || ''}
          onChange={(e) => update('body', e.target.value)}
        />
      </div>
    </div>
  )
}

// Formulário Telefone
function PhoneForm({ data, onChange }: { data: PhoneData | null; onChange: (data: PhoneData) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-dark mb-2">
        Número de Telefone *
      </label>
      <Input
        type="tel"
        placeholder="+55 11 99999-9999"
        value={data?.phone || ''}
        onChange={(e) => onChange({ phone: e.target.value })}
      />
      <p className="text-xs text-neutral mt-1">
        Use o formato internacional com código do país (+55 para Brasil)
      </p>
    </div>
  )
}

// Formulário WiFi
function WiFiForm({ data, onChange }: { data: WiFiData | null; onChange: (data: WiFiData) => void }) {
  const update = (field: keyof WiFiData, value: string | boolean) => {
    onChange({
      ...(data || { encryption: 'WPA' } as WiFiData),
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Nome da Rede (SSID) *
        </label>
        <Input
          placeholder="MinhaRede"
          value={data?.ssid || ''}
          onChange={(e) => update('ssid', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-dark mb-2">
          Tipo de Segurança
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={data?.encryption || 'WPA'}
          onChange={(e) => update('encryption', e.target.value)}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">Sem senha (aberta)</option>
        </select>
      </div>

      {data?.encryption !== 'nopass' && (
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-2">
            Senha *
          </label>
          <Input
            type="password"
            placeholder="Senha da rede"
            value={data?.password || ''}
            onChange={(e) => update('password', e.target.value)}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="hidden"
          checked={data?.hidden || false}
          onChange={(e) => update('hidden', e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="hidden" className="text-sm text-neutral-dark">
          Rede oculta
        </label>
      </div>
    </div>
  )
}

