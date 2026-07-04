'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>

        <div className="space-y-6 text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Nerti, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">2. Description of Service</h2>
            <p>Nerti provides a financial intelligence dashboard for tracking subscriptions and insurance policies. Our service is read-only and designed for visibility purposes only.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorized use of your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">4. Privacy</h2>
            <p>Your use of Nerti is also governed by our Privacy Policy. Please review it to understand our practices regarding your personal data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">5. Limitation of Liability</h2>
            <p>Nerti is provided "as is" without any warranties. We are not liable for any financial decisions made based on the information provided by our dashboard.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-primary mb-3">6. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>
          </section>

          <div className="pt-8 text-muted text-xs">
            Last updated: May 2024
          </div>
        </div>
      </div>
    </div>
  )
}
