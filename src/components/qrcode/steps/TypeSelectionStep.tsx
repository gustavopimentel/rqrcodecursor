import { Card } from '@/components/ui/card'
import { Link as LinkIcon, FileText, User, Mail, Phone, Wifi } from 'lucide-react'
import type { QRCodeType } from '@/types/qrcode'

interface TypeSelectionStepProps {
  selectedType: QRCodeType
  onSelect: (type: QRCodeType) => void
}

const types = [
  {
    type: 'url' as QRCodeType,
    icon: LinkIcon,
    label: 'URL',
    description: 'Link para website',
    color: 'from-blue-500 to-blue-600',
  },
  {
    type: 'text' as QRCodeType,
    icon: FileText,
    label: 'Texto',
    description: 'Texto simples',
    color: 'from-gray-500 to-gray-600',
  },
  {
    type: 'vcard' as QRCodeType,
    icon: User,
    label: 'vCard',
    description: 'Cartão de visita',
    color: 'from-purple-500 to-purple-600',
  },
  {
    type: 'email' as QRCodeType,
    icon: Mail,
    label: 'Email',
    description: 'Enviar email',
    color: 'from-red-500 to-red-600',
  },
  {
    type: 'phone' as QRCodeType,
    icon: Phone,
    label: 'Telefone',
    description: 'Ligar para número',
    color: 'from-green-500 to-green-600',
  },
  {
    type: 'wifi' as QRCodeType,
    icon: Wifi,
    label: 'Wi-Fi',
    description: 'Conectar à rede',
    color: 'from-cyan-500 to-cyan-600',
  },
]

export function TypeSelectionStep({ selectedType, onSelect }: TypeSelectionStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark mb-2">
          Escolha o Tipo de QR Code
        </h2>
        <p className="text-neutral">
          Selecione qual tipo de conteúdo seu QR Code irá armazenar
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {types.map((item) => {
          const Icon = item.icon
          const isSelected = selectedType === item.type

          return (
            <Card
              key={item.type}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                isSelected
                  ? 'ring-2 ring-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onSelect(item.type)}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-neutral-dark">{item.label}</h3>
                  <p className="text-sm text-neutral">{item.description}</p>
                </div>
                {isSelected && (
                  <div className="text-primary font-medium text-sm">✓ Selecionado</div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

