import { QRCodeGenerator } from './QRCodeGenerator'
import { Card } from '@/components/ui/card'

interface QRCodePreviewProps {
  value: string
  size?: number
  title?: string
}

export function QRCodePreview({ value, size = 256, title }: QRCodePreviewProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        {title && (
          <h3 className="text-lg font-semibold text-neutral-dark text-center">{title}</h3>
        )}
        <div className="flex justify-center bg-white p-4 rounded-lg border border-gray-200">
          <QRCodeGenerator value={value} size={size} />
        </div>
        <p className="text-sm text-neutral text-center">
          Escaneie com a câmera do seu celular
        </p>
      </div>
    </Card>
  )
}

