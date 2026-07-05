'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ChevronRight, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error creating account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/favicon.png" alt="Nerti" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-2xl font-bold tracking-tight text-primary">Nerti</span>
          </Link>
          <h1 className="text-2xl font-semibold text-primary">
            {success ? 'Account created!' : 'Get started for free'}
          </h1>
          <p className="text-secondary mt-2">
            {success ? 'Please check your email to verify your account.' : 'Join Nerti and see what your money is doing'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <Card className="p-8 text-center border-emerald-500/20 bg-emerald-500/5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-semibold text-primary mb-2">Registration Successful</h2>
                <p className="text-sm text-secondary mb-8 leading-relaxed">
                  We've sent a verification link to <span className="font-semibold text-primary">{email}</span>.
                  Once verified, you can sign in to your dashboard.
                </p>
                <Button className="w-full h-11" onClick={() => router.push('/login')}>
                  Go to Sign in <ArrowRight size={18} className="ml-2" />
                </Button>
              </Card>
              <p className="text-center text-xs text-muted">
                Didn't receive an email? Check your spam folder or <button className="text-purple-400 font-medium">resend verification</button>.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <Card className="p-6 md:p-8">
                <form onSubmit={handleSignup} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-400 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <Input
                    label="Full name"
                    type="text"
                    placeholder="John Doe"
                    icon={<User size={18} />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <Input
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    icon={<Mail size={18} />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock size={18} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="flex items-start gap-3 py-2">
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 rounded border-default bg-card text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                      />
                    </div>
                    <label htmlFor="terms" className="text-xs text-secondary leading-normal">
                      I agree to the{' '}
                      <Link href="/terms" className="text-purple-400 hover:text-purple-300 font-medium">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-purple-400 hover:text-purple-300 font-medium">Privacy Policy</Link>.
                    </label>
                  </div>

                  <Button type="submit" className="w-full h-11" loading={loading} disabled={!agreed}>
                    Create account <ChevronRight size={18} />
                  </Button>
                </form>

                <div className="mt-8 text-center text-sm">
                  <span className="text-muted">Already have an account?</span>{' '}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
                    Sign in
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!success && (
          <p className="mt-8 text-center text-xs text-muted max-w-xs mx-auto leading-relaxed">
            By signing up, you agree to receive transactional emails related to your account.
          </p>
        )}
      </motion.div>
    </div>
  )
}
