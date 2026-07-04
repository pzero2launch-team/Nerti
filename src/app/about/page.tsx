'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Info, Users, Shield, Target } from 'lucide-react'
import { Button, Card } from '@/components/ui'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center py-12 px-6">
      <div className="w-full max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-12">
          <ChevronLeft size={16} /> Back to Home
        </Link>

        <div className="space-y-4 mb-16">
          <Badge variant="info" className="uppercase tracking-widest text-[10px]">Our Story</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Financial Intelligence for the modern age.</h1>
          <p className="text-lg text-secondary leading-relaxed max-w-2xl">
            Nerti was founded on the principle that visibility is the first step toward financial control.
            We build tools that help you see your financial commitments before they impact your balance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: 'Our Mission',
              desc: 'To eliminate the anxiety of "surprise" deductions and provide absolute clarity over recurring financial obligations.'
            },
            {
              icon: Shield,
              title: 'Our Commitment',
              desc: 'Nerti is built with a privacy-first mindset. Your data is your own, and we never sell or share it with third parties.'
            }
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400 mb-4">
                <item.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="p-8 md:p-12 text-center bg-secondary/50 border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Join the Future of Visibility</h2>
          <p className="text-secondary mb-8 max-w-md mx-auto">
            Experience the peace of mind that comes with knowing exactly what your money is doing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => window.location.href = '/signup'}>Get Started Free</Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/login'}>Sign In</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
      variant === 'info' ? 'bg-purple-900/20 border-purple-600/30 text-purple-400' : 'bg-secondary border-default text-muted'
    } ${className}`}>
      {children}
    </span>
  )
}
