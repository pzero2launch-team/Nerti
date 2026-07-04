'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-primary py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when creating an account, such as your name and email address. We also store data related to your subscriptions and insurance policies that you manually enter or upload.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">2. How We Use Your Information</h2>
            <p>We use your information to provide, maintain, and improve our services, and to communicate with you about your account and financial commitments.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your data. This includes encryption of data at rest and in transit. Your financial data is protected by Row Level Security (RLS) at the database level.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">4. Data Sharing</h2>
            <p>We do not sell your personal or financial data to third parties. We only share data when required by law or to provide the essential functions of our service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">6. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.</p>
          </section>

          <div className="pt-8 text-muted text-xs">
            Last updated: May 2024
          </div>
        </div>
      </div>
    </div>
  )
}
