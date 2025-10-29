import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/landing/HeroSection'
import { DemoSection } from '@/components/landing/DemoSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { UseCasesSection } from '@/components/landing/UseCasesSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { CTASection } from '@/components/landing/CTASection'

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

