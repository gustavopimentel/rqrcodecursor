import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { QrCode } from 'lucide-react'

interface SignupForm {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export function Signup() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>()

  const password = watch('password')

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { strength: 0, label: '', color: '' }
    let strength = 0
    if (pass.length >= 6) strength++
    if (pass.length >= 10) strength++
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++
    if (/\d/.test(pass)) strength++
    if (/[^a-zA-Z\d]/.test(pass)) strength++

    if (strength <= 2) return { strength, label: 'Fraca', color: 'bg-red-500' }
    if (strength <= 3) return { strength, label: 'Média', color: 'bg-yellow-500' }
    return { strength, label: 'Forte', color: 'bg-primary' }
  }

  const passwordStrength = getPasswordStrength(password)

  const onSubmit = async (data: SignupForm) => {
    setLoading(true)
    try {
      await signUp(data.email, data.password, data.fullName)
      navigate('/dashboard')
    } catch (error) {
      // Error handled by context
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pale-aqua to-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary p-3 rounded-2xl">
              <QrCode className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-neutral-dark">Criar conta grátis</h1>
          <p className="text-neutral mt-2">Comece a criar QR Codes em segundos</p>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-neutral-dark mb-2">
                Nome completo
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="João Silva"
                {...register('fullName', {
                  required: 'Nome é obrigatório',
                  minLength: {
                    value: 3,
                    message: 'Nome deve ter pelo menos 3 caracteres',
                  },
                })}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido',
                  },
                })}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-dark mb-2">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Senha é obrigatória',
                  minLength: {
                    value: 6,
                    message: 'Senha deve ter pelo menos 6 caracteres',
                  },
                })}
                className={errors.password ? 'border-red-500' : ''}
              />
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral">{passwordStrength.label}</span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-dark mb-2">
                Confirmar senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Confirmação de senha é obrigatória',
                  validate: (value) => value === password || 'As senhas não coincidem',
                })}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="acceptTerms"
                type="checkbox"
                {...register('acceptTerms', {
                  required: 'Você deve aceitar os termos',
                })}
                className="mt-1 mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm text-neutral">
                Eu aceito os{' '}
                <a href="#" className="text-primary hover:text-primary-dark">
                  termos de uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary hover:text-primary-dark">
                  política de privacidade
                </a>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar Conta Grátis'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-neutral">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-neutral hover:text-neutral-dark text-sm">
            ← Voltar para home
          </Link>
        </div>
      </div>
    </div>
  )
}

