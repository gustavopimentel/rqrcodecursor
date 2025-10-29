import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Pronto Para Começar?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Crie sua conta gratuita em menos de 1 minuto e comece a gerar QR Codes profissionais agora mesmo
        </p>
        <Link to="/signup">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <p className="text-white/80 text-sm mt-4">
          Não precisa cartão de crédito • Cancele quando quiser
        </p>
      </div>
    </section>
  )
}

