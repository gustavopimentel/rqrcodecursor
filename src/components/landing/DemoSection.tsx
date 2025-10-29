import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Link as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { QRCodeDownloadModal } from '@/components/qrcode/QRCodeDownloadModal'

export function DemoSection() {
  const [url, setUrl] = useState('')
  const [generatedUrl, setGeneratedUrl] = useState('')
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const handleGenerate = () => {
    if (url.trim()) {
      setGeneratedUrl(url)
    }
  }


  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pale-aqua to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-neutral-dark mb-4">
            Experimente Agora - Sem Cadastro
          </h2>
          <p className="text-xl text-neutral">
            Gere seu primeiro QR Code gratuitamente
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left - Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-dark mb-2">
                  Cole ou digite uma URL
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral" />
                    <Input
                      type="url"
                      placeholder="https://seusite.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-primary hover:bg-primary-dark text-white"
                disabled={!url.trim()}
              >
                Gerar QR Code
              </Button>

              {generatedUrl && (
                <Button
                  onClick={() => setDownloadModalOpen(true)}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>
              )}

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-neutral-dark">
                  💡 <strong>Quer mais recursos?</strong> Crie sua conta grátis e tenha acesso a:
                </p>
                <ul className="text-sm text-neutral mt-2 space-y-1 ml-4">
                  <li>✓ QR Codes personalizáveis</li>
                  <li>✓ Analytics de escaneamentos</li>
                  <li>✓ Múltiplos tipos de QR</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full mt-4 bg-primary hover:bg-primary-dark text-white">
                    Criar Conta Grátis
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - Preview */}
            <div className="flex flex-col items-center justify-center">
              {generatedUrl ? (
                <div className="space-y-4 text-center">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-primary/20">
                    <QRCodeSVG
                      id="demo-qrcode"
                      value={generatedUrl}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-neutral">
                    Escaneie com a câmera do seu celular
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                  <LinkIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-neutral">
                    Digite uma URL para ver o preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <QRCodeDownloadModal
        open={downloadModalOpen}
        onOpenChange={setDownloadModalOpen}
        value={generatedUrl}
        name="qrcode-demo"
      />
    </section>
  )
}

