import { RefreshCw, Palette, BarChart3, Grid3x3, Edit3, Download } from 'lucide-react'

const features = [
  {
    icon: RefreshCw,
    title: 'QR Codes Dinâmicos',
    description: 'Edite o destino do QR Code após criado, sem precisar reimprimir.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Palette,
    title: 'Personalização Total',
    description: 'Cores, estilos, logos e formatos. Seu QR Code, sua identidade.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: BarChart3,
    title: 'Analytics em Tempo Real',
    description: 'Acompanhe escaneamentos, localização e dispositivos usados.',
    color: 'text-accent',
    bg: 'bg-accent/20',
  },
  {
    icon: Grid3x3,
    title: 'Múltiplos Tipos',
    description: 'URL, WiFi, vCard, Telefone, Email e muito mais.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Edit3,
    title: 'Edição Após Criação',
    description: 'Altere nome, descrição e configurações quando quiser.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    icon: Download,
    title: 'Downloads em Alta Qualidade',
    description: 'PNG, SVG e PDF. Pronto para impressão ou uso digital.',
    color: 'text-accent',
    bg: 'bg-accent/20',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Tudo que Você Precisa Para Seus QR Codes
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto">
            Ferramentas profissionais para criar e gerenciar seus QR Codes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`${feature.bg} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

