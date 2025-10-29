import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Save, AlertCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase'
import { toast } from 'sonner'
import type { QRCode, QRCodeType } from '@/types/qrcode'

interface EditQRCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  qrcode: QRCode
  onSuccess: () => void
}

export function EditQRCodeModal({ open, onOpenChange, qrcode, onSuccess }: EditQRCodeModalProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    if (open) {
      setName(qrcode.name)
      setRedirectUrl(qrcode.redirect_url || '')
      setIsActive(qrcode.is_active)
    }
  }, [open, qrcode])

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Nome é obrigatório')
      return
    }

    if (!redirectUrl.trim()) {
      toast.error('URL de destino é obrigatória')
      return
    }

    // Normalizar e validar URL para tipo URL
    let finalRedirectUrl = redirectUrl.trim()
    
    if (qrcode.type === 'url') {
      // Adicionar https:// se não tiver protocolo
      if (!finalRedirectUrl.match(/^https?:\/\//i)) {
        finalRedirectUrl = 'https://' + finalRedirectUrl
      }
      
      // Validar URL
      try {
        new URL(finalRedirectUrl)
      } catch {
        toast.error('URL inválida')
        return
      }
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('qr_codes')
        .update({
          name,
          redirect_url: finalRedirectUrl,
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', qrcode.id)

      if (error) throw error

      toast.success('QR Code atualizado com sucesso!')
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar QR Code')
    } finally {
      setLoading(false)
    }
  }

  const getFieldLabel = (type: QRCodeType): string => {
    switch (type) {
      case 'url':
        return 'URL de Destino'
      case 'text':
        return 'Texto'
      case 'vcard':
        return 'Dados do vCard'
      case 'email':
        return 'Email de Destino'
      case 'phone':
        return 'Número de Telefone'
      case 'wifi':
        return 'Configuração WiFi'
      default:
        return 'Conteúdo'
    }
  }

  const getFieldPlaceholder = (type: QRCodeType): string => {
    switch (type) {
      case 'url':
        return 'https://seusite.com'
      case 'text':
        return 'Seu texto aqui'
      case 'email':
        return 'contato@empresa.com'
      case 'phone':
        return '+55 11 99999-9999'
      default:
        return 'Digite o conteúdo'
    }
  }

  if (!qrcode.is_dynamic) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>QR Code Estático</DialogTitle>
            <DialogDescription>
              Este QR Code não pode ser editado
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">QR Codes estáticos não podem ser editados</p>
                <p>
                  O conteúdo está codificado diretamente no QR Code. Para alterar, você precisa criar um novo QR Code.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-neutral">
              <p><strong>Dica:</strong> Use QR Codes dinâmicos para poder editar o destino após criação.</p>
              <p>QR Codes dinâmicos permitem:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Editar o destino a qualquer momento</li>
                <li>Analytics de escaneamentos</li>
                <li>Ativar/desativar temporariamente</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar QR Code Dinâmico</DialogTitle>
          <DialogDescription>
            Altere o nome ou destino do seu QR Code. O código visual permanecerá o mesmo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              Nome do QR Code *
            </label>
            <Input
              placeholder="Ex: Meu QR Code"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-neutral mt-1">
              Este nome é apenas para você identificar o QR Code
            </p>
          </div>

          {/* Destino */}
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-2">
              {getFieldLabel(qrcode.type)} *
            </label>
            <Input
              type="text"
              placeholder={getFieldPlaceholder(qrcode.type)}
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-neutral mt-1">
              {qrcode.type === 'url' 
                ? '💡 Digite apenas o domínio (ex: google.com) - adicionaremos https:// automaticamente'
                : 'Este é o destino real. O QR Code físico não muda.'
              }
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-neutral-dark">Status do QR Code</p>
              <p className="text-sm text-neutral">
                {isActive ? 'QR Code ativo e funcionando' : 'QR Code desativado temporariamente'}
              </p>
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              disabled={loading}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Info sobre dinâmico */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-sm text-neutral-dark">
            <p className="font-medium text-primary mb-1">🔄 QR Code Dinâmico</p>
            <p>
              Suas alterações serão aplicadas imediatamente. O QR Code físico continua o mesmo, 
              mas agora aponta para o novo destino.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary hover:bg-primary-dark text-white"
            disabled={loading}
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

