'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ShieldCheck, Scale, AlertCircle, FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
            <Scale size={24} />
          </div>
          <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
        </div>
        <p className="text-secondary mb-12 max-w-2xl">
          Please read these terms carefully. By using Nerti, you agree to these conditions which govern your use of our financial intelligence platform.
        </p>

        <div className="space-y-10 text-secondary text-sm leading-relaxed">
          <section className="bg-secondary/30 p-6 rounded-2xl border border-default">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <ShieldCheck size={18} className="text-purple-400" /> 1. Service Nature and Scope
            </h2>
            <div className="space-y-3">
              <p>Nerti provides a "read-only" financial intelligence dashboard. We analyze data you provide or connect to offer visibility and predictive insights.</p>
              <ul className="list-disc pl-5 space-y-1 text-muted">
                <li>Nerti is not a bank or financial institution.</li>
                <li>Nerti does not execute financial transactions or move funds.</li>
                <li>Nerti is not a licensed financial advisor.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-4">2. User Eligibility and Account Security</h2>
            <div className="space-y-4">
              <p>To use Nerti, you must be at least 18 years of age. You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing accurate, current, and complete registration information.</li>
                <li>Maintaining the absolute security of your Supabase-powered authentication credentials.</li>
                <li>All activities that occur under your account, regardless of whether you authorized them.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-4">3. Data Source Connection (Read-Only)</h2>
            <p>By connecting a bank account or uploading statements, you grant Nerti a limited, non-exclusive license to use, copy, and analyze that data for the purpose of providing the dashboard services. You represent that you have the right to provide such data.</p>
          </section>

          <section className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10">
            <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-400" /> 4. Disclaimers and Limitation of Liability
            </h2>
            <div className="space-y-3">
              <p>The "Predictive Intelligence" features are based on algorithmic patterns and are for informational purposes only. They do not guarantee future financial events.</p>
              <p>NERTI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED. IN NO EVENT SHALL NERTI BE LIABLE FOR ANY DIRECT, INDIRECT, OR CONSEQUENTIAL LOSSES RESULTING FROM YOUR USE OF THE SERVICE OR ANY FINANCIAL DECISIONS MADE THEREIN.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-4">5. Intellectual Property</h2>
            <p>The Nerti interface, algorithms, and branding are the exclusive property of Nerti. You may not reverse engineer, duplicate, or attempt to derive the source code of our proprietary systems.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-4">6. Termination</h2>
            <p>We reserve the right to suspend or terminate your account at our sole discretion if we suspect a violation of these terms or any fraudulent activity.</p>
          </section>

          <div className="pt-12 border-t border-default flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-muted text-xs">
              Last updated: May 20, 2024
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-purple-400 hover:text-purple-300 font-medium">Privacy Policy</Link>
              <Link href="/signup" className="text-xs text-purple-400 hover:text-purple-300 font-medium">Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
