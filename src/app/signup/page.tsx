'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react'
import { Button, Input, Card } from '@/components/ui'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
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

      router.push('/onboarding')
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
          <h1 className="text-2xl font-semibold text-primary">Get started for free</h1>
          <p className="text-secondary mt-2">Join Nerti and see what your money is doing</p>
        </div>

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

            <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-secondary leading-relaxed">2 months free trial included</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-secondary leading-relaxed">No credit card required to start</span>
              </div>
            </div>

            <Button type="submit" className="w-full h-11" loading={loading}>
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

        <p className="mt-8 text-center text-xs text-muted max-w-xs mx-auto leading-relaxed">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}
