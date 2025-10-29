import { Link } from 'react-router-dom'
import { QRCodeGenerator } from './QRCodeGenerator'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eye, Trash2, Calendar } from 'lucide-react'
import type { QRCode } from '@/types/qrcode'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface QRCodeCardProps {
  qrcode: QRCode
  onDelete: (id: string) => void
}

export function QRCodeCard({ qrcode, onDelete }: QRCodeCardProps) {
  const formattedDate = format(new Date(qrcode.created_at), 'dd MMM yyyy', { locale: ptBR })

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* QR Code Preview */}
      <div className="bg-gray-50 p-6 flex justify-center border-b border-gray-100">
        <QRCodeGenerator value={qrcode.content} size={150} />
      </div>

      {/* Info */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-neutral-dark truncate">{qrcode.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {qrcode.type.toUpperCase()}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              qrcode.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {qrcode.is_active ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-neutral">
          <Calendar className="w-4 h-4 mr-1" />
          {formattedDate}
        </div>

        <div className="text-sm text-neutral">
          <span className="font-medium">{qrcode.scan_count}</span> escaneamentos
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to={`/qrcodes/${qrcode.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-1" />
              Ver
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(qrcode.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

