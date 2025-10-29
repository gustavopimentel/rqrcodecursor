import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { QrCode, TrendingUp, Activity, Eye, Plus } from 'lucide-react'
import { supabase } from '@/integrations/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { QRCode } from '@/types/qrcode'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function Dashboard() {
  const { user } = useAuth()
  const [qrcodes, setQrcodes] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)

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
        .limit(5)

      if (error) throw error
      setQrcodes(data || [])
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: qrcodes.length,
    active: qrcodes.filter(q => q.is_active).length,
    scans: qrcodes.reduce((sum, q) => sum + q.scan_count, 0),
    today: Math.floor(Math.random() * 50), // Mockado
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">Dashboard</h1>
          <p className="text-neutral mt-1">Bem-vindo de volta! Aqui está um resumo da sua conta.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral mb-1">Total de QR Codes</p>
                <p className="text-3xl font-bold text-neutral-dark">{stats.total}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral mb-1">Total de Escaneamentos</p>
                <p className="text-3xl font-bold text-neutral-dark">{stats.scans}</p>
              </div>
              <div className="bg-secondary/10 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral mb-1">QR Codes Ativos</p>
                <p className="text-3xl font-bold text-neutral-dark">{stats.active}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral mb-1">Escaneamentos Hoje</p>
                <p className="text-3xl font-bold text-neutral-dark">{stats.today}</p>
              </div>
              <div className="bg-accent/20 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-accent" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent QR Codes */}
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-dark">QR Codes Recentes</h2>
              <Link to="/qrcodes">
                <Button variant="ghost" size="sm">Ver todos</Button>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8 text-neutral">Carregando...</div>
            ) : qrcodes.length === 0 ? (
              <div className="text-center py-12">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-neutral mb-4">Você ainda não criou nenhum QR Code</p>
                <Link to="/qrcodes/create">
                  <Button className="bg-primary hover:bg-primary-dark text-white">
                    Criar Primeiro QR Code
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {qrcodes.map((qrcode) => (
                  <div
                    key={qrcode.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-dark">{qrcode.name}</h3>
                      <p className="text-sm text-neutral">
                        {format(new Date(qrcode.created_at), 'dd MMM yyyy', { locale: ptBR })} • {qrcode.scan_count} escaneamentos
                      </p>
                    </div>
                    <Link to={`/qrcodes/${qrcode.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-neutral-dark mb-6">Ações Rápidas</h2>
            <div className="space-y-3">
              <Link to="/qrcodes/create">
                <Button className="w-full bg-primary hover:bg-primary-dark text-white justify-start">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Novo QR Code
                </Button>
              </Link>
              <Link to="/qrcodes">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="w-5 h-5 mr-2" />
                  Ver Todos os QR Codes
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

