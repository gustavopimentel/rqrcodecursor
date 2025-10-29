import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, ArrowLeft, Calendar, Eye, Link as LinkIcon, Edit } from 'lucide-react'
import { supabase } from '@/integrations/supabase'
import type { QRCode } from '@/types/qrcode'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { QRCodeSVG } from 'qrcode.react'
import { QRCodeDownloadModal } from '@/components/qrcode/QRCodeDownloadModal'
import { EditQRCodeModal } from '@/components/qrcode/EditQRCodeModal'

export function QRCodeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [qrcode, setQRCode] = useState<QRCode | null>(null)
  const [loading, setLoading] = useState(true)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    fetchQRCode()
  }, [id])

  const fetchQRCode = async () => {
    if (!id) return

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setQRCode(data)
    } catch (error: any) {
      toast.error('Erro ao carregar QR code')
      navigate('/qrcodes')
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Carregando...</div>
      </DashboardLayout>
    )
  }

  if (!qrcode) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">QR Code não encontrado</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/qrcodes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">{qrcode.name}</h1>
          <p className="text-neutral mt-1">Detalhes e informações do QR Code</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left - QR Code */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200 flex justify-center">
                <QRCodeSVG
                  id="qrcode-detail"
                  value={qrcode.content}
                  size={300}
                  level="H"
                  includeMargin
                />
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setDownloadModalOpen(true)}
                  className="w-full bg-primary hover:bg-primary-dark text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>
                
                <Button
                  onClick={() => setEditModalOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {qrcode.is_dynamic ? 'Editar' : 'Ver Limitações'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Right - Info */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-dark">Informações</h2>
              {qrcode.is_dynamic && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  🔄 Dinâmico
                </span>
              )}
              {!qrcode.is_dynamic && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  🔒 Estático
                </span>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">Tipo</span>
                </div>
                <p className="text-neutral-dark font-medium">{qrcode.type.toUpperCase()}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {qrcode.is_dynamic ? 'URL Curta (QR Code)' : 'Conteúdo'}
                  </span>
                </div>
                <p className="text-neutral-dark break-all text-sm font-mono bg-gray-50 p-2 rounded">
                  {qrcode.content}
                </p>
              </div>

              {qrcode.is_dynamic && qrcode.redirect_url && (
                <div>
                  <div className="flex items-center gap-2 text-neutral mb-1">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Destino Real (Editável)</span>
                  </div>
                  <p className="text-neutral-dark break-all">{qrcode.redirect_url}</p>
                  <p className="text-xs text-neutral mt-1">
                    Este destino pode ser alterado sem recriar o QR Code
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Criado em</span>
                </div>
                <p className="text-neutral-dark">
                  {format(new Date(qrcode.created_at), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">Escaneamentos</span>
                </div>
                <p className="text-neutral-dark font-bold text-2xl">{qrcode.scan_count}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-neutral mb-1">
                  <span className="text-sm font-medium">Status</span>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  qrcode.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {qrcode.is_active ? '● Ativo' : '● Inativo'}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <QRCodeDownloadModal
          open={downloadModalOpen}
          onOpenChange={setDownloadModalOpen}
          value={qrcode.content}
          name={qrcode.name}
        />

        <EditQRCodeModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          qrcode={qrcode}
          onSuccess={fetchQRCode}
        />
      </div>
    </DashboardLayout>
  )
}

