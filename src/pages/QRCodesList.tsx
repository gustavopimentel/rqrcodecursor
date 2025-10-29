import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QRCodeCard } from '@/components/qrcode/QRCodeCard'
import { Plus, Search, QrCode } from 'lucide-react'
import { supabase } from '@/integrations/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { QRCode } from '@/types/qrcode'
import { toast } from 'sonner'

export function QRCodesList() {
  const { user } = useAuth()
  const [qrcodes, setQrcodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchQRCodes()
  }, [user])

  const fetchQRCodes = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setQrcodes(data || [])
    } catch (error: any) {
      toast.error('Erro ao carregar QR codes')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este QR Code?')) return

    try {
      const { error } = await supabase
        .from('qr_codes')
        .delete()
        .eq('id', id)

      if (error) throw error

      setQrcodes(qrcodes.filter(q => q.id !== id))
      toast.success('QR Code excluído com sucesso')
    } catch (error: any) {
      toast.error('Erro ao excluir QR code')
    }
  }

  const filteredQRCodes = qrcodes.filter(qr =>
    qr.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-dark">Meus QR Codes</h1>
            <p className="text-neutral mt-1">{qrcodes.length} QR codes criados</p>
          </div>
          <Link to="/qrcodes/create">
            <Button className="bg-primary hover:bg-primary-dark text-white">
              <Plus className="w-5 h-5 mr-2" />
              Criar Novo
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral" />
          <Input
            type="search"
            placeholder="Buscar por nome..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-12 text-neutral">Carregando...</div>
        ) : filteredQRCodes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <QrCode className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-dark mb-2">
              {searchQuery ? 'Nenhum resultado encontrado' : 'Nenhum QR Code criado ainda'}
            </h3>
            <p className="text-neutral mb-6">
              {searchQuery ? 'Tente outro termo de busca' : 'Crie seu primeiro QR Code agora'}
            </p>
            {!searchQuery && (
              <Link to="/qrcodes/create">
                <Button className="bg-primary hover:bg-primary-dark text-white">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Primeiro QR Code
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQRCodes.map((qrcode) => (
              <QRCodeCard
                key={qrcode.id}
                qrcode={qrcode}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

