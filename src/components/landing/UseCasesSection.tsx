import { Utensils, ShoppingBag, Calendar, Megaphone } from 'lucide-react'

const useCases = [
  {
    icon: Utensils,
    title: 'Restaurantes',
    description: 'Cardápios digitais e pedidos',
    features: ['Cardápio digital', 'Pedidos online', 'Avaliações', 'Promoções'],
    color: 'from-primary to-primary-dark',
  },
  {
    icon: ShoppingBag,
    title: 'Varejo',
    description: 'Promoções e pagamentos',
    features: ['Cupons de desconto', 'Pagamentos rápidos', 'Programa de fidelidade', 'Catálogo digital'],
    color: 'from-secondary to-secondary-dark',
  },
  {
    icon: Calendar,
    title: 'Eventos',
    description: 'Check-in e informações',
    features: ['Check-in digital', 'Ingressos', 'Programação', 'Mapa do evento'],
    color: 'from-accent to-primary',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Campanhas e landing pages',
    features: ['Landing pages', 'Redes sociais', 'Materiais impressos', 'Analytics'],
    color: 'from-primary to-secondary',
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 px-4 bg-gradient-to-br from-pale-aqua to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Perfeito Para Qualquer Negócio
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto">
            Descubra como QR Codes podem transformar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className={`bg-gradient-to-br ${useCase.color} p-8 text-white`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-white/90">{useCase.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-neutral-dark text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

