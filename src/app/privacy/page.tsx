'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, Lock, Eye, Database, Shield, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primary py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
            <Lock size={24} />
          </div>
          <h1 className="text-4xl font-bold text-primary">Privacy Policy</h1>
        </div>
        <p className="text-secondary mb-12 max-w-2xl">
          At Nerti, privacy is not a feature—it's our foundation. We use industry-standard encryption and security protocols to ensure your financial data remains yours.
        </p>

        <div className="space-y-12 text-secondary text-sm leading-relaxed">
          <section className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                <Database size={18} className="text-purple-400" /> Data Collection
              </h2>
              <p className="text-xs text-muted">What we collect and why.</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="card p-4 bg-secondary/20">
                <h3 className="font-medium text-primary mb-1 text-sm">Personal Information</h3>
                <p>Email address and full name for account identification and authentication via Supabase Auth.</p>
              </div>
              <div className="card p-4 bg-secondary/20">
                <h3 className="font-medium text-primary mb-1 text-sm">Financial Metadata</h3>
                <p>Transaction descriptions, dates, and amounts from your connected sources to build your predictive dashboard.</p>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                <Shield size={18} className="text-purple-400" /> Data Security
              </h2>
              <p className="text-xs text-muted">How we protect your data.</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p>We implement a multi-layered security approach:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Row Level Security (RLS):</strong> Our database architecture ensures that even on the backend, data is isolated so one user can never access another's records.</li>
                <li><strong>AES-256 Encryption:</strong> Sensitive data is encrypted at rest using industry-leading standards.</li>
                <li><strong>Zero Data Selling:</strong> We do not sell, rent, or trade your data. Our business model is based on subscriptions, not your personal information.</li>
              </ul>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                <Eye size={18} className="text-purple-400" /> Your Rights
              </h2>
              <p className="text-xs text-muted">Controlling your information.</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <p>You have full control over your data at all times:</p>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="card p-4 border-default">
                  <div className="font-medium text-primary mb-1">Right to Access</div>
                  <p className="text-[11px]">View and export all data Nerti has about you at any time from your settings.</p>
                </li>
                <li className="card p-4 border-default">
                  <div className="font-medium text-primary mb-1">Right to Erasure</div>
                  <p className="text-[11px]">Delete your account and all associated data permanently in one click.</p>
                </li>
              </ul>
            </div>
          </section>

          <section className="p-6 bg-purple-600/5 rounded-2xl border border-purple-600/10">
            <h2 className="text-lg font-semibold text-primary mb-3">Third-Party Subprocessors</h2>
            <p className="mb-4">We use a limited number of trusted partners to provide our service:</p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Supabase (Database & Auth)</Badge>
              <Badge variant="default">Vercel (Hosting)</Badge>
            </div>
          </section>

          <div className="pt-12 border-t border-default flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-muted text-xs">
              Last updated: May 20, 2024
            </div>
            <div className="flex gap-6">
              <Link href="/terms" className="text-xs text-purple-400 hover:text-purple-300 font-medium">Terms of Service</Link>
              <Link href="/" className="text-xs text-purple-400 hover:text-purple-300 font-medium">Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-secondary border-default text-muted ${className}`}>
      {children}
    </span>
  )
}
