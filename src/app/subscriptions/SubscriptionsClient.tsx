'use client'

import React, { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CreditCard,
  Calendar,
  X
} from 'lucide-react'
import clsx from 'clsx'
import {
  Card,
  Button,
  Badge,
  Input,
  Divider
} from '@/components/ui'
import { addSubscription, toggleSubscriptionStatus } from '@/lib/actions/subscriptions'

export default function SubscriptionsClient({ initialSubscriptions }: any) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const filtered = subscriptions.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  const activeCount = filtered.filter((s: any) => s.status === 'active').length
  const totalMonthly = filtered.filter((s: any) => s.status === 'active').reduce((sum: number, s: any) => sum + parseFloat(s.amount), 0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await addSubscription(data)
      setIsModalOpen(false)
      // Refresh logic would ideally use server components,
      // but for this demo we'll just reload or the user can refresh
      window.location.reload()
    } catch (err) {
      alert('Error adding subscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Subscriptions</h1>
          <p className="text-sm text-muted mt-1">Manage all your recurring services and deductions.</p>
        </div>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Add Subscription
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Total Monthly</span>
          <span className="text-2xl font-mono font-bold text-primary">${totalMonthly.toFixed(2)}</span>
        </Card>
        <Card className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Active Services</span>
          <span className="text-2xl font-mono font-bold text-primary">{activeCount}</span>
        </Card>
        <Card className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Status</span>
          <span className="text-2xl font-mono font-bold text-emerald-400">Healthy</span>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-default flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Search subscriptions..."
              className="w-full bg-secondary border border-default rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/50 border-b border-default">
                <th className="px-6 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Next Billing</th>
                <th className="px-6 py-3 text-[10px] font-bold text-muted uppercase tracking-wider">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {filtered.length > 0 ? filtered.map((s: any) => (
                <tr key={s.id} className="hover:bg-card-hover transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                        style={{ backgroundColor: s.color || '#3b82f6' }}
                      >
                        {s.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-primary">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">{s.category}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-semibold text-primary">${parseFloat(s.amount).toFixed(2)}</span>
                    <span className="text-[10px] text-muted block">/{s.billing_cycle}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-primary">{s.next_billing_date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={s.status === 'active' ? 'info' : 'default'}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => toggleSubscriptionStatus(s.id, s.status).then(() => window.location.reload())}
                      className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-secondary transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-muted">
                    No subscriptions found. Click "Add Subscription" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-secondary border border-default rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-default">
              <h2 className="text-lg font-semibold text-primary">Add Subscription</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input label="Service Name" name="name" placeholder="Netflix" required />
              <Input label="Category" name="category" placeholder="Entertainment" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Amount" name="amount" type="number" step="0.01" placeholder="15.99" required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-secondary">Billing Cycle</label>
                  <select name="billing_cycle" className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
              <Input label="Next Billing Date" name="next_billing_date" type="date" required />
              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="flex-1" type="submit" loading={loading}>Add Service</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
