import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Gerente de Marketing',
    company: 'Tech Solutions',
    avatar: 'MS',
    rating: 5,
    text: 'Ferramenta incrível! Conseguimos aumentar o engajamento das nossas campanhas em 40% usando QR Codes personalizados.',
  },
  {
    name: 'João Santos',
    role: 'Dono',
    company: 'Restaurante Sabor & Arte',
    avatar: 'JS',
    rating: 5,
    text: 'Nossos clientes adoraram o cardápio digital via QR Code. Economizamos muito com impressão e ainda podemos atualizar em tempo real.',
  },
  {
    name: 'Ana Costa',
    role: 'Organizadora de Eventos',
    company: 'EventPro',
    avatar: 'AC',
    rating: 5,
    text: 'O sistema de analytics é fantástico! Conseguimos rastrear cada escaneamento e otimizar nossas estratégias de divulgação.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pale-aqua to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto">
            Histórias de sucesso de quem já usa nossa plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-neutral-dark">{testimonial.name}</h4>
                  <p className="text-sm text-neutral">{testimonial.role}</p>
                  <p className="text-xs text-neutral">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-neutral-dark italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

