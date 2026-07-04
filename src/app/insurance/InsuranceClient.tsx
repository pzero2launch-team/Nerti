'use client'

import React, { useState } from 'react'
import {
  Shield,
  Plus,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  X
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Card,
  Button,
  Badge,
  StatCard,
  Input
} from '@/components/ui'
import { addInsurancePolicy } from '@/lib/actions/insurance'

export default function InsuranceClient({ initialPolicies }: any) {
  const [policies, setPolicies] = useState(initialPolicies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const totalMonthly = policies.reduce((sum: number, p: any) => sum + parseFloat(p.premium), 0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await addInsurancePolicy(data)
      setIsModalOpen(false)
      window.location.reload()
    } catch (err) {
      alert('Error adding policy')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Insurance</h1>
          <p className="text-sm text-muted mt-1">Monitor your premiums and renewal timelines.</p>
        </div>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" /> Add Policy
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Monthly Premiums"
          value={`$${totalMonthly.toFixed(2)}`}
          icon={<Shield size={16} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Active Policies"
          value={policies.length.toString()}
          icon={<ShieldCheck size={16} />}
          accent="#10b981"
        />
        <StatCard
          label="Status"
          value="Protected"
          icon={<Shield size={16} />}
          accent="#3b82f6"
        />
        <StatCard
          label="Next Renewal"
          value={policies.length > 0 ? 'Soon' : 'None'}
          icon={<Calendar size={16} />}
          accent="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.length > 0 ? policies.map((policy: any) => (
          <Card key={policy.id} className="flex flex-col group hover:border-purple-500/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-purple-600"
              >
                <Shield size={20} />
              </div>
              <Badge variant={policy.status === 'active' ? 'success' : 'warning'}>
                {policy.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="flex-1">
              <h3 className="text-base font-semibold text-primary">{policy.name}</h3>
              <p className="text-xs text-muted mt-0.5">{policy.provider}</p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Premium</span>
                  <span className="text-xl font-mono font-bold text-primary">${parseFloat(policy.premium).toFixed(2)}</span>
                  <span className="text-xs text-muted">/{policy.frequency}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">Renewal</span>
                  <span className="text-sm font-medium text-secondary">{policy.renewal_date}</span>
                </div>
              </div>
            </div>
          </Card>
        )) : (
          <div className="col-span-full py-12 text-center text-muted text-sm border-2 border-dashed border-default rounded-2xl">
            No policies found. Click "Add Policy" to start monitoring.
          </div>
        )}
      </div>

      {/* Add Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-secondary border border-default rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-default">
              <h2 className="text-lg font-semibold text-primary">Add Policy</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Input label="Policy Name" name="name" placeholder="Health Shield Plan" required />
              <Input label="Provider" name="provider" placeholder="BlueCross Health" required />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-secondary">Category</label>
                <select name="category" className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="health">Health</option>
                  <option value="life">Life</option>
                  <option value="auto">Auto</option>
                  <option value="home">Home</option>
                  <option value="device">Device</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Premium" name="premium" type="number" step="0.01" placeholder="220.00" required />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-secondary">Frequency</label>
                  <select name="frequency" className="w-full bg-card border border-default rounded-lg px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
              <Input label="Renewal Date" name="renewal_date" type="date" required />
              <div className="pt-4 flex gap-3">
                <Button variant="secondary" className="flex-1" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button className="flex-1" type="submit" loading={loading}>Add Policy</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
