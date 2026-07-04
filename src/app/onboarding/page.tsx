'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Building2,
  Check,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  PiggyBank,
  Shield,
  Link as LinkIcon,
  Upload
} from 'lucide-react'
import clsx from 'clsx'
import { Button } from '@/components/ui'

const steps = ['Account', 'Goals', 'Sources', 'Ready']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [accountType, setAccountType] = useState<'individual' | 'business' | null>(null)
  const [goals, setGoals] = useState<string[]>([])
  const [sourceConnected, setSourceConnected] = useState(false)
  const router = useRouter()

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1))
  const prevStep = () => setStep(s => Math.max(0, s - 1))

  const toggleGoal = (goal: string) => {
    setGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const handleComplete = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center justify-center relative">
                <div className={clsx(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all',
                  i < step ? 'bg-purple-600 text-white' :
                  i === step ? 'bg-purple-600/20 border border-purple-600 text-purple-400' :
                  'bg-card border border-default text-muted'
                )}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className={clsx('h-px flex-1 transition-colors', i < step ? 'bg-purple-600' : 'bg-default border-t border-default')} />
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Account type */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-1">How will you use Nerti?</h2>
                <p className="text-sm text-secondary mb-6">Choose the account type that fits your situation.</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { type: 'individual', icon: User, label: 'Individual', desc: 'Personal' },
                    { type: 'business', icon: Building2, label: 'Business', desc: 'Team' },
                  ].map(({ type, icon: Icon, label, desc }) => (
                    <button
                      key={type}
                      onClick={() => setAccountType(type as 'individual' | 'business')}
                      className={clsx(
                        'flex flex-col items-start p-4 rounded-xl border text-left transition-all',
                        accountType === type
                          ? 'border-purple-600 bg-purple-600/10'
                          : 'border-default bg-card hover:border-purple-600/40'
                      )}
                    >
                      <Icon size={20} className={accountType === type ? 'text-purple-400' : 'text-muted'} />
                      <div className="text-sm font-medium text-primary mt-2">{label}</div>
                      <div className="text-[10px] text-muted mt-0.5">{desc}</div>
                    </button>
                  ))}
                </div>
                <Button className="w-full" disabled={!accountType} onClick={nextStep}>
                  Continue <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 1: Goals */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-1">What do you want to track?</h2>
                <p className="text-sm text-secondary mb-6">Select your focus areas — you can always change these later.</p>
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    { key: 'subscriptions', icon: CreditCard, label: 'Subscription tracking', desc: 'Netflix, Spotify, SaaS tools' },
                    { key: 'savings', icon: PiggyBank, label: 'Savings awareness', desc: 'Identify and reduce costs' },
                    { key: 'insurance', icon: Shield, label: 'Insurance monitoring', desc: 'Premiums, renewals' },
                  ].map(({ key, icon: Icon, label, desc }) => {
                    const active = goals.includes(key)
                    return (
                      <button key={key} onClick={() => toggleGoal(key)}
                        className={clsx(
                          'flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all',
                          active ? 'border-purple-600 bg-purple-600/10' : 'border-default bg-card hover:border-purple-600/40'
                        )}
                      >
                        <Icon size={18} className={active ? 'text-purple-400' : 'text-muted'} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-primary">{label}</div>
                          <div className="text-[10px] text-muted">{desc}</div>
                        </div>
                        <div className={clsx('w-4 h-4 rounded border flex items-center justify-center flex-shrink-0',
                          active ? 'bg-purple-600 border-purple-600' : 'border-default'
                        )}>
                          {active && <Check size={10} className="text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={prevStep}><ChevronLeft size={16} /> Back</Button>
                  <Button className="flex-1" disabled={goals.length === 0} onClick={nextStep}>Continue <ChevronRight size={16} /></Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Connect */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="card p-6">
                <h2 className="text-lg font-semibold text-primary mb-1">Connect your financial source</h2>
                <p className="text-sm text-secondary mb-6">Choose how you want to import your financial data. All connections are read-only.</p>
                <div className="flex flex-col gap-3 mb-6">
                  <button onClick={() => setSourceConnected(true)}
                    className={clsx('flex items-center gap-3 p-4 rounded-xl border transition-all',
                      sourceConnected ? 'border-purple-600 bg-purple-600/10' : 'border-default bg-card hover:border-purple-600/40'
                    )}
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-600/15 flex items-center justify-center text-purple-400"><LinkIcon size={18} /></div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium text-primary">Connect bank account</div>
                      <div className="text-[10px] text-muted">Read-only view via secure link</div>
                    </div>
                    {sourceConnected && <Check size={16} className="text-purple-400" />}
                  </button>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <div className="flex-1 border-t border-default" /><span>or</span><div className="flex-1 border-t border-default" />
                  </div>
                  <button onClick={() => setSourceConnected(true)}
                    className="flex items-center gap-3 p-4 rounded-xl border border-default bg-card hover:border-purple-600/40 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-card border border-default flex items-center justify-center text-muted"><Upload size={18} /></div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-primary">Upload bank statement</div>
                      <div className="text-[10px] text-muted">PDF or CSV — processed locally</div>
                    </div>
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={prevStep}><ChevronLeft size={16} /> Back</Button>
                  <Button className="flex-1" onClick={nextStep}>Continue <ChevronRight size={16} /></Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Done */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="card p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-900/30 border border-emerald-800/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                  <Check size={24} />
                </div>
                <h2 className="text-lg font-semibold text-primary mb-2">You're all set!</h2>
                <p className="text-sm text-secondary mb-6">
                  Your Nerti dashboard is ready. You'll start seeing predictive insights as you add more financial data.
                </p>
                <Button className="w-full" size="lg" onClick={handleComplete}>
                  Go to dashboard <ChevronRight size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-[10px] text-muted mt-6 uppercase tracking-widest font-semibold">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  )
}
