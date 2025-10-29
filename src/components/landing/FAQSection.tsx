import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'O que são QR Codes dinâmicos?',
    answer: 'QR Codes dinâmicos permitem que você altere o destino (URL) após a criação, sem precisar reimprimir. Perfeito para campanhas que podem mudar ou materiais impressos de longa duração.',
  },
  {
    question: 'Posso editar o QR Code depois de criado?',
    answer: 'Sim! Com QR Codes dinâmicos você pode editar o destino, nome, descrição e até desativá-lo temporariamente. QR Codes estáticos não podem ser editados após criação.',
  },
  {
    question: 'Como funciona o período de teste?',
    answer: 'O plano Pro oferece 14 dias de teste gratuito com acesso completo a todos os recursos. Não é necessário cartão de crédito para começar.',
  },
  {
    question: 'Os QR Codes expiram?',
    answer: 'Não! Seus QR Codes nunca expiram enquanto sua conta estiver ativa. Mesmo QR Codes do plano gratuito permanecem funcionais.',
  },
  {
    question: 'Posso usar meu próprio logo nos QR Codes?',
    answer: 'Sim! No plano Pro você pode adicionar seu logo no centro do QR Code, personalizar cores e escolher diferentes estilos.',
  },
  {
    question: 'Como funciona o analytics?',
    answer: 'Rastreamos cada escaneamento do seu QR Code, incluindo data/hora, localização aproximada, dispositivo usado e navegador. Tudo em tempo real.',
  },
  {
    question: 'Posso exportar meus QR Codes?',
    answer: 'Sim! Você pode baixar em PNG (todos os planos), SVG e PDF (plano Pro). Também oferecemos diferentes tamanhos e resoluções.',
  },
  {
    question: 'Há suporte em português?',
    answer: 'Sim! Nossa plataforma é 100% em português e nosso suporte atende em português via email e chat.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-neutral">
            Tudo que você precisa saber
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-neutral-dark pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-neutral flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-neutral leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

