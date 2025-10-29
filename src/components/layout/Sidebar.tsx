import { Link, useLocation } from 'react-router-dom'
import { QrCode, Home, Grid3x3, Plus, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Separator } from '@/components/ui/separator'

export function Sidebar() {
  const location = useLocation()
  const { signOut } = useAuth()

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: Grid3x3,
      label: 'Meus QR Codes',
      path: '/qrcodes',
    },
    {
      icon: Plus,
      label: 'Criar Novo',
      path: '/qrcodes/create',
    },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <QrCode className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-neutral-dark">QRCode SaaS</span>
        </Link>
      </div>

      <Separator />

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <Link key={item.path} to={item.path}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-neutral-dark hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 space-y-2">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-dark hover:text-red-600 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </Button>
      </div>
    </div>
  )
}

