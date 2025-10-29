import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 'R$ 0',
    period: 'mês',
    description: 'Para começar',
    features: [
      '10 QR Codes estáticos',
      '2 QR Codes dinâmicos',
      'Personalização básica',
      'Suporte por email',
    ],
    buttonText: 'Começar Grátis',
    buttonVariant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Pro',
    price: 'R$ 49',
    period: 'mês',
    description: 'Mais popular',
    features: [
      'QR Codes ilimitados',
      'Analytics completo',
      'Personalização total',
      'Sem marca d\'água',
      'Suporte prioritário',
      'Exportação em SVG/PDF',
    ],
    buttonText: 'Começar Teste Grátis',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    name: 'Empresarial',
    price: 'R$ 199',
    period: 'mês',
    description: 'Para empresas',
    features: [
      'Tudo do Pro',
      '5 usuários inclusos',
      'White-label',
      'API de integração',
      'Gerente dedicado',
      'SLA garantido',
    ],
    buttonText: 'Falar com Vendas',
    buttonVariant: 'outline' as const,
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Planos Para Todos os Tamanhos
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto">
            Escolha o plano perfeito para suas necessidades
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-8 relative ${
                plan.popular ? 'ring-2 ring-primary scale-105 md:scale-110' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Melhor custo-benefício
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-neutral-dark mb-2">{plan.name}</h3>
                <p className="text-neutral text-sm mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-2">
                  <span className="text-5xl font-bold text-neutral-dark">{plan.price}</span>
                  <span className="text-neutral mb-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-primary' : 'text-neutral'} flex-shrink-0 mt-0.5`} />
                    <span className="text-neutral-dark text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup" className="block">
                <Button
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.popular ? 'bg-primary hover:bg-primary-dark text-white' : ''
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

