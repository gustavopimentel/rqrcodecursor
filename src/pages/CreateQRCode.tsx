import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { QRCodePreview } from '@/components/qrcode/QRCodePreview'
import { supabase } from '@/integrations/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import type { QRCodeType, QRCodeTypeData } from '@/types/qrcode'
import { QRCodeDownloadModal } from '@/components/qrcode/QRCodeDownloadModal'

// Step Components
import { TypeSelectionStep } from '@/components/qrcode/steps/TypeSelectionStep'
import { ModeSelectionStep } from '@/components/qrcode/steps/ModeSelectionStep'
import { ContentFormStep } from '@/components/qrcode/steps/ContentFormStep'
import { formatQRCodeContent, generateShortCode } from '@/lib/qrcode-utils'

const STEPS = ['Tipo', 'Modo', 'Conteúdo', 'Preview']

export function CreateQRCode() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedType, setSelectedType] = useState<QRCodeType>('url')
  const [isDynamic, setIsDynamic] = useState(false)
  const [qrcodeName, setQrcodeName] = useState('')
  const [typeData, setTypeData] = useState<QRCodeTypeData | null>(null)
  
  // Creation state
  const [loading, setLoading] = useState(false)
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreate = async () => {
    if (!user || !typeData) return

    setLoading(true)
    try {
      // Formatar conteúdo baseado no tipo
      const content = formatQRCodeContent(selectedType, typeData)
      
      let shortCode = null
      let redirectUrl = null
      let finalContent = content
      
      // Se for dinâmico, gerar short code
      if (isDynamic) {
        shortCode = generateShortCode()
        redirectUrl = content // O destino real
        finalContent = `${window.location.origin}/r/${shortCode}` // A URL curta que vai no QR Code
      }
      
      setGeneratedContent(finalContent) // Define o conteúdo correto para preview/download

      const { data: qrcode, error } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          name: qrcodeName,
          type: selectedType,
          content: finalContent,
          is_dynamic: isDynamic,
          short_code: shortCode,
          redirect_url: redirectUrl,
          is_active: true,
        })
        .select()
        .single()

      if (error) throw error

      toast.success('QR Code criado com sucesso!')
      setCreatedId(qrcode.id)
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar QR code')
    } finally {
      setLoading(false)
    }
  }

  // Success screen
  if (createdId) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-dark mb-2">
                QR Code criado com sucesso!
              </h2>
              <p className="text-neutral">
                {isDynamic 
                  ? 'Seu QR Code dinâmico está pronto. Você pode editar o destino a qualquer momento!'
                  : 'Seu QR Code estático está pronto para uso'}
              </p>
            </div>

            <div className="mb-6">
              <QRCodePreview value={generatedContent} size={200} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => setDownloadModalOpen(true)} variant="outline">
                Baixar QR Code
              </Button>
              <Button onClick={() => navigate(`/qrcodes/${createdId}`)} variant="outline">
                Ver Detalhes
              </Button>
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Criar Outro
              </Button>
            </div>
            
            <QRCodeDownloadModal
              open={downloadModalOpen}
              onOpenChange={setDownloadModalOpen}
              value={generatedContent}
              name={qrcodeName}
            />
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-dark">Criar Novo QR Code</h1>
          <p className="text-neutral mt-1">Siga os passos para criar seu QR Code personalizado</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {STEPS.map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`text-sm mt-2 ${index <= currentStep ? 'text-primary font-medium' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    index < currentStep ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 0 && (
            <TypeSelectionStep
              selectedType={selectedType}
              onSelect={setSelectedType}
            />
          )}

          {currentStep === 1 && (
            <ModeSelectionStep
              isDynamic={isDynamic}
              onSelect={setIsDynamic}
            />
          )}

          {currentStep === 2 && (
            <ContentFormStep
              type={selectedType}
              name={qrcodeName}
              onNameChange={setQrcodeName}
              data={typeData}
              onDataChange={setTypeData}
            />
          )}

          {currentStep === 3 && typeData && (
            <Card className="p-6">
              <h3 className="text-xl font-bold text-neutral-dark mb-4">Preview do QR Code</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <QRCodePreview
                    value={formatQRCodeContent(selectedType, typeData)}
                    title="Preview em Tempo Real"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-neutral">Nome</label>
                    <p className="text-neutral-dark font-medium">{qrcodeName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral">Tipo</label>
                    <p className="text-neutral-dark">{selectedType.toUpperCase()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-neutral">Modo</label>
                    <p className="text-neutral-dark">
                      {isDynamic ? '🔄 Dinâmico (editável)' : '🔒 Estático'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate('/qrcodes')}
            disabled={loading}
          >
            Cancelar
          </Button>
          
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={loading}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={
                (currentStep === 2 && (!qrcodeName || !typeData))
              }
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleCreate}
              className="bg-primary hover:bg-primary-dark text-white"
              disabled={loading || !qrcodeName || !typeData}
            >
              {loading ? 'Criando...' : 'Criar QR Code'}
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
