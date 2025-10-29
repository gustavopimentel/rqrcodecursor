import { Card } from '@/components/ui/card'
import { Lock, RefreshCw } from 'lucide-react'

interface ModeSelectionStepProps {
  isDynamic: boolean
  onSelect: (isDynamic: boolean) => void
}

export function ModeSelectionStep({ isDynamic, onSelect }: ModeSelectionStepProps) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-neutral-dark mb-2">
          Escolha o Modo do QR Code
        </h2>
        <p className="text-neutral">
          Defina se o conteúdo poderá ser editado após a criação
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Estático */}
        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            !isDynamic
              ? 'ring-2 ring-primary bg-primary/5'
              : 'hover:border-primary/50'
          }`}
          onClick={() => onSelect(false)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <Lock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-dark">Estático</h3>
                <p className="text-sm text-primary font-medium">GRATUITO</p>
              </div>
            </div>

            <p className="text-neutral text-sm">
              O conteúdo é fixo e não pode ser alterado após a criação. Ideal para uso permanente.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Funciona para sempre</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Não expira</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Leitura direta e rápida</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-red-600">✗</span>
                <span className="text-neutral">Não pode ser editado</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-red-600">✗</span>
                <span className="text-neutral">Sem analytics</span>
              </div>
            </div>

            {!isDynamic && (
              <div className="text-primary font-medium text-sm text-center pt-2">
                ✓ Selecionado
              </div>
            )}
          </div>
        </Card>

        {/* Dinâmico */}
        <Card
          className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
            isDynamic
              ? 'ring-2 ring-primary bg-primary/5'
              : 'hover:border-primary/50'
          }`}
          onClick={() => onSelect(true)}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-dark">Dinâmico</h3>
                <p className="text-sm text-primary font-medium">RECOMENDADO</p>
              </div>
            </div>

            <p className="text-neutral text-sm">
              Permite editar o destino após criar. Ideal para materiais impressos permanentes.
            </p>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Editável a qualquer momento</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Analytics completo</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Pode desativar temporariamente</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <span className="text-green-600">✓</span>
                <span className="text-neutral-dark">Rastreamento de escaneamentos</span>
              </div>
            </div>

            {isDynamic && (
              <div className="text-primary font-medium text-sm text-center pt-2">
                ✓ Selecionado
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral">
          💡 <strong>Dica:</strong> QR Codes dinâmicos são ideais para cartões de visita, 
          materiais impressos e campanhas que podem mudar ao longo do tempo.
        </p>
      </div>
    </div>
  )
}

