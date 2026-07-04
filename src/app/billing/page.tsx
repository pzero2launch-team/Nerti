'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  ChevronRight,
  Zap,
  CreditCard,
  Calendar,
  History,
  Receipt,
  Star
} from 'lucide-react'
import {
  Card,
  Button,
  Badge,
  SectionHeader,
  Divider
} from '@/components/ui'

export default function BillingPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary">Billing & Subscription</h1>
        <p className="text-sm text-muted mt-1">Manage your plan and review your billing history.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-purple-600/10 to-transparent border-purple-600/20">
            <div className="flex items-start justify-between mb-8">
              <div>
                <Badge variant="info" className="mb-3 uppercase tracking-widest text-[10px]">Current Plan</Badge>
                <h2 className="text-2xl font-bold text-primary">Free Trial (Pro Features)</h2>
                <p className="text-sm text-secondary mt-1">Expires on June 20, 2025 (47 days remaining)</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                <Star size={24} fill="currentColor" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Unlimited tracking',
                'Predictive alerts',
                'Bank uploads',
                'Advanced analytics'
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {f}
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto px-8">Upgrade to Pro</Button>
          </Card>

          <Card>
            <SectionHeader title="Payment Method" action={<Button variant="ghost" size="sm">Update</Button>} />
            <div className="mt-4 flex items-center gap-4 p-4 rounded-xl border border-default bg-secondary/50">
              <div className="w-10 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
              <div className="flex-1">
                <div className="text-sm font-medium text-primary">Visa ending in 4242</div>
                <div className="text-[10px] text-muted">Expires 12/26</div>
              </div>
              <Badge variant="default">Primary</Badge>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Billing History" subtitle="Recent invoices and charges" />
            <div className="mt-4 divide-y divide-default">
              {[
                { date: 'May 04, 2025', amount: '$0.00', status: 'Trial Start' },
                { date: 'Apr 04, 2025', amount: '$4.99', status: 'Paid' },
              ].map((inv, i) => (
                <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted"><Receipt size={16} /></div>
                    <div>
                      <div className="text-xs font-medium text-primary">{inv.date}</div>
                      <div className="text-[10px] text-muted">Invoice #NER-00${i+1}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-primary">{inv.amount}</div>
                    <div className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">{inv.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-4">
          <Card className="text-center p-6">
            <h3 className="text-sm font-semibold text-primary mb-1">Simple Pricing</h3>
            <div className="flex items-end justify-center gap-1 mb-4">
              <span className="text-3xl font-bold text-primary font-mono">$4.99</span>
              <span className="text-muted text-sm mb-1">/mo</span>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Get unlimited access to all features once your trial ends. No hidden fees.
            </p>
            <Button variant="secondary" size="sm" className="w-full">Compare Plans</Button>
          </Card>

          <Card className="bg-secondary/30">
            <h3 className="text-xs font-semibold text-primary mb-3">Help & Support</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between text-xs text-muted hover:text-primary transition-colors">
                <span>Billing FAQ</span>
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center justify-between text-xs text-muted hover:text-primary transition-colors">
                <span>Contact Support</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
