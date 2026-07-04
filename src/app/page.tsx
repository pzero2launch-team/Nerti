'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Shield,
  Bell,
  BarChart2,
  Eye,
  Lock,
  ChevronRight,
  CheckCircle,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay }
})

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-primary selection:bg-purple-500/30 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 h-16 border-b border-default bg-primary/80 backdrop-blur-md z-50 px-6">
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Nerti" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-lg font-bold tracking-tight text-primary">Nerti</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-secondary hover:text-primary transition-colors">Pricing</a>
            <a href="/about" className="text-sm text-secondary hover:text-primary transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>Sign in</Button>
            <Button size="sm" onClick={() => router.push('/signup')}>Get started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-600/20 text-xs font-medium text-purple-400 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Predictive Intelligence for your finances
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-primary mb-6 leading-[1.1]"
          >
            See what your money is doing <br className="hidden md:block" />
            <span className="gradient-text">before it moves.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Nerti gives you 24–72 hour visibility on every subscription, insurance premium, and recurring commitment. No more surprise deductions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto h-12 px-8" onClick={() => router.push('/signup')}>
              Start free trial <ChevronRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-8" onClick={() => router.push('/login')}>
              Watch Demo <Play size={16} fill="currentColor" />
            </Button>
          </motion.div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          <div className="relative card overflow-hidden border-default bg-secondary/80 backdrop-blur-sm">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-default bg-card/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
              <div className="flex-1" />
              <div className="text-[10px] font-medium text-muted uppercase tracking-widest">Nerti Predictive Dashboard</div>
              <div className="flex-1" />
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-default">
              {[
                { label: 'Upcoming (72h)', value: '42.50', color: '#8b5cf6' },
                { label: 'Month Projection', value: '54.12', color: '#3b82f6' },
                { label: 'Flagged Anomalies', value: '5.98', color: '#f59e0b' },
                { label: 'Active Services', value: '14', color: '#10b981' },
              ].map((s) => (
                <div key={s.label} className="card p-4">
                  <div className="text-[10px] text-muted uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-xl font-mono font-semibold" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-4">
                <div className="text-xs font-medium text-secondary mb-3">Upcoming payments</div>
                {[
                  { name: 'Netflix', days: 2, amount: '5.99' },
                  { name: 'ChatGPT Plus', days: 3, amount: '0.00' },
                  { name: 'Spotify', days: 5, amount: '.99' },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-2 border-b border-default last:border-0">
                    <div className="text-xs text-primary">{p.name}</div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-amber-400">in {p.days}d</span>
                      <span className="text-xs font-mono text-primary">{p.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="card p-4">
                <div className="text-xs font-medium text-secondary mb-3">Alerts</div>
                {[
                  { text: 'Netflix billing in 2 days', sev: 'warning' },
                  { text: 'Unusual Adobe CC charge', sev: 'critical' },
                  { text: 'Auto insurance renewal soon', sev: 'info' },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-default last:border-0">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.sev === 'critical' ? 'bg-red-400' : a.sev === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                    <span className="text-xs text-secondary">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20">
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">Features</div>
          <h2 className="text-3xl font-semibold text-primary">Everything your finances need visibility on</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: CreditCard,
              title: 'Subscription Tracking',
              description: 'Every recurring service in one place. Billing dates, amounts, and categories — always visible.',
              color: '#3b82f6',
            },
            {
              icon: Shield,
              title: 'Insurance Management',
              description: 'Track premium payments and renewal dates across health, life, auto, and home policies.',
              color: '#8b5cf6',
            },
            {
              icon: Bell,
              title: 'Predictive Alerts',
              description: 'Know what is leaving your account 24–72 hours before it happens. No more surprise deductions.',
              color: '#f59e0b',
            },
            {
              icon: BarChart2,
              title: 'Spending Analytics',
              description: 'Visual breakdowns of where your money goes each month, with category and trend analysis.',
              color: '#10b981',
            },
            {
              icon: Eye,
              title: 'Financial Timeline',
              description: 'A 30-day forward-looking view of all scheduled and predicted financial events.',
              color: '#ec4899',
            },
            {
              icon: Lock,
              title: 'Read-only by Design',
              description: 'Nerti operates on visibility only. Your financial accounts remain entirely under your control.',
              color: '#f97316',
            },
          ].map(({ icon: Icon, title, description, color }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.05)}>
              <div className="card card-hover p-5 h-full">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}18`, color }}>
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-primary mb-2">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 border-t border-default">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Pricing</div>
          <h2 className="text-3xl font-semibold text-primary">Simple, honest pricing</h2>
          <p className="text-secondary mt-2 text-sm">Try Nerti free for 2 months. No credit card required.</p>
        </div>
        <div className="max-w-sm mx-auto">
          <div className="card p-8 text-center border-purple-600/20">
            <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Pro Plan</div>
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-4xl font-semibold text-primary font-mono">.99</span>
              <span className="text-secondary text-sm mb-1">/month</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-800/30 text-xs text-emerald-400 font-medium mb-6">
              <CheckCircle size={12} /> 2 months free — then .99/month
            </div>
            <div className="flex flex-col gap-3 text-left mb-8">
              {[
                'Unlimited subscription tracking',
                'Insurance premium monitoring',
                '24–72h predictive alerts',
                'Bank statement upload & analysis',
                'Spending analytics & trends',
                'Multi-account support',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full" onClick={() => router.push('/signup')}>
              Start free trial <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-default text-center">
        <h2 className="text-3xl font-semibold text-primary mb-4">See what your money is doing before it moves.</h2>
        <p className="text-secondary mb-8 text-sm">Join thousands of people who have total visibility over their financial commitments.</p>
        <div className="flex items-center justify-center gap-3">
          <Button size="lg" onClick={() => router.push('/signup')}>Get started free</Button>
          <Button variant="secondary" size="lg" onClick={() => router.push('/login')}>Sign in</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-default py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Nerti" className="w-6 h-6 rounded object-cover" />
          </div>
          <div className="flex items-center gap-6 text-xs text-muted">
            <a href="/about" className="hover:text-primary transition-colors">About</a>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          <div className="text-xs text-muted">2025 Nerti. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
