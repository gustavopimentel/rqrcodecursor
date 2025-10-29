import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase'
import { Loader2 } from 'lucide-react'

export function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleRedirect()
  }, [shortCode])

  async function handleRedirect() {
    if (!shortCode) {
      setError('Código inválido')
      return
    }

    try {
      // 1. Buscar o QR Code pelo short_code
      const { data: qrcode, error: qrcodeError } = await supabase
        .from('qr_codes')
        .select('*')
        .eq('short_code', shortCode)
        .single()

      if (qrcodeError || !qrcode) {
        setError('QR Code não encontrado')
        return
      }

      // 2. Verificar se o QR Code está ativo
      if (!qrcode.is_active) {
        setError('Este QR Code está desativado temporariamente')
        return
      }

      // 3. Verificar se é dinâmico e tem redirect_url
      if (!qrcode.is_dynamic || !qrcode.redirect_url) {
        setError('QR Code inválido')
        return
      }

      // 4. Incrementar contador de scans (async, não bloqueia redirect)
      supabase
        .from('qr_codes')
        .update({ 
          scans: (qrcode.scans || 0) + 1,
          last_scanned_at: new Date().toISOString()
        })
        .eq('id', qrcode.id)
        .then(() => {
          console.log('Scan contabilizado')
        })

      // 5. Redirecionar para o destino real
      console.log('Redirecionando para:', qrcode.redirect_url)
      window.location.href = qrcode.redirect_url
    } catch (err: any) {
      console.error('Erro ao redirecionar:', err)
      setError('Erro ao processar redirecionamento')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pale-aqua to-white">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-neutral-dark mb-2">Oops!</h1>
            <p className="text-neutral-default mb-6">{error}</p>
            <a 
              href="/"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              Ir para o início
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pale-aqua to-white">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
        <p className="text-lg text-neutral-dark">Redirecionando...</p>
      </div>
    </div>
  )
}

