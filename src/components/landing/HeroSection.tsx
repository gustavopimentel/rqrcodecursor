import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { QrCode, Sparkles, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="hero" className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Mais de 10.000 empresas confiam em nós</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-neutral-dark leading-tight">
              Crie QR Codes <span className="text-primary">Inteligentes</span> em Segundos
            </h1>

            <p className="text-xl text-neutral leading-relaxed">
              Gere, personalize e rastreie seus QR Codes. Sem complicação, sem limites.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary-dark text-white text-lg px-8">
                  Começar Grátis
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Ver Como Funciona
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-bold text-neutral-dark">10K+</p>
                  <p className="text-sm text-neutral">Empresas</p>
                </div>
              </div>
              <div className="h-12 w-px bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-bold text-neutral-dark">1M+</p>
                  <p className="text-sm text-neutral">QR Codes criados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-12 backdrop-blur">
              {/* Floating QR Codes */}
              <div className="absolute top-10 right-10 bg-white p-3 rounded-lg shadow-lg animate-float">
                <QrCode className="w-16 h-16 text-primary" />
              </div>
              <div className="absolute bottom-10 left-10 bg-white p-3 rounded-lg shadow-lg animate-float-delayed">
                <QrCode className="w-12 h-12 text-secondary" />
              </div>
              <div className="absolute top-1/2 right-20 bg-white p-2 rounded-lg shadow-lg animate-float-slow">
                <QrCode className="w-8 h-8 text-accent" />
              </div>
              
              {/* Center QR Code */}
              <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <QrCode className="w-full h-full text-neutral-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

