'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  CreditCard,
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Activity,
  Zap,
  ArrowUpRight,
  Bell
} from 'lucide-react'
import clsx from 'clsx'
import {
  Card,
  StatCard,
  Badge,
  SectionHeader,
  Button
} from '@/components/ui'
import {
  MonthlyTrendsChart,
  CashFlowChart,
  CategoryPieChart,
  InsurancePieChart
} from '@/components/charts/DashboardCharts'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay }
})

export default function DashboardClient({ user, subscriptions, policies, alerts, activity }: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'all' | 'subscription' | 'insurance' | 'alert'>('all')

  const unreadAlerts = alerts.filter((a: any) => !a.read)
  const criticalAlerts = alerts.filter((a: any) => a.severity === 'critical')

  const totalSubscriptions = subscriptions
    .filter((s: any) => s.status === 'active')
    .reduce((sum: number, s: any) => sum + parseFloat(s.amount), 0)

  const totalInsurance = policies.reduce((sum: number, p: any) => sum + parseFloat(p.premium), 0)

  const upcoming72h = subscriptions
    .filter((s: any) => {
      const diff = new Date(s.next_billing_date).getTime() - new Date().getTime()
      return diff > 0 && diff < (3 * 24 * 60 * 60 * 1000)
    })
    .reduce((sum: number, s: any) => sum + parseFloat(s.amount), 0)

  const filteredActivity = activity.filter((item: any) => {
    if (activeTab === 'all') return true
    return item.type === activeTab
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Financial Intelligence</h1>
          <p className="text-sm text-muted mt-1">Unified visibility across all your recurring commitments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="bg-card">
            <Bell size={14} className="mr-2" /> {unreadAlerts.length} Alerts
          </Button>
          <Button size="sm" onClick={() => router.push('/upload')}>
            Upload Statement
          </Button>
        </div>
      </div>

      {/* Critical alert banner */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                <AlertTriangle size={18} />
              </div>
              <div className="text-sm font-medium text-amber-200">
                {criticalAlerts[0].title}
                <span className="text-xs text-amber-200/60 ml-2 hidden sm:inline">{criticalAlerts[0].description}</span>
              </div>
            </div>
            <Badge variant="warning">{criticalAlerts.length} Action Required</Badge>
          </div>
        </motion.div>
      )}

      {/* Stat cards */}
      <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Subscriptions / mo"
          value={`$${totalSubscriptions.toFixed(2)}`}
          sub={`${subscriptions.filter((s: any) => s.status === 'active').length} active services`}
          icon={<CreditCard size={16} />}
          accent="#3b82f6"
        />
        <StatCard
          label="Insurance / mo"
          value={`$${totalInsurance.toFixed(2)}`}
          sub={`${policies.length} policies`}
          icon={<Shield size={16} />}
          accent="#8b5cf6"
        />
        <StatCard
          label="Next 72 hours"
          value={`$${upcoming72h.toFixed(2)}`}
          sub="Predicted deductions"
          icon={<Clock size={16} />}
          accent="#f59e0b"
          trend="down"
        />
        <StatCard
          label="Total monthly"
          value={`$${(totalSubscriptions + totalInsurance).toFixed(2)}`}
          sub="Combined commitments"
          icon={<TrendingUp size={16} />}
          accent="#10b981"
        />
      </motion.div>

      {/* Main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming payments */}
        <motion.div {...fadeUp(0.15)} className="lg:col-span-1">
          <Card className="h-full flex flex-col">
            <SectionHeader
              title="Upcoming payments"
              subtitle="Next scheduled"
              action={
                <button
                  onClick={() => router.push('/subscriptions')}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  View all <ChevronRight size={12} />
                </button>
              }
            />
            <div className="flex-1 space-y-1">
              {subscriptions.slice(0, 7).map((p: any) => (
                <div key={p.id} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-card-hover transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-purple-500" />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-primary truncate">{p.name}</div>
                      <div className="text-[10px] text-muted capitalize">{p.category}</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-xs font-mono font-semibold text-primary">${parseFloat(p.amount).toFixed(2)}</div>
                    <div className="text-[10px] text-muted">
                      {p.next_billing_date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Charts */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-2 space-y-6">
          <Card>
            <SectionHeader title="Monthly trends" subtitle="Spending over time" />
            <MonthlyTrendsChart />
          </Card>
          <Card>
            <SectionHeader title="Predictive cash flow" subtitle="Forward projection" />
            <CashFlowChart />
          </Card>
        </motion.div>
      </div>

      {/* Alerts + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div {...fadeUp(0.25)}>
          <Card className="h-full">
            <SectionHeader title="Predictive alerts" subtitle={`${unreadAlerts.length} unread`} />
            <div className="space-y-3 mt-2">
              {alerts.length > 0 ? alerts.slice(0, 5).map((a: any) => (
                <div key={a.id} className={clsx(
                  'flex gap-3 p-3 rounded-xl border transition-colors',
                  !a.read ? 'bg-purple-600/5 border-purple-600/10' : 'bg-card border-default hover:bg-card-hover'
                )}>
                  <div className={clsx('w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                    a.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary">{a.title}</div>
                    <div className="text-[10px] text-muted mt-0.5 line-clamp-1">{a.description}</div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-xs text-muted">No alerts yet.</div>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div {...fadeUp(0.3)} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-base font-semibold text-primary">Activity feed</h2>
              <div className="flex bg-secondary p-1 rounded-lg border border-default">
                {(['all', 'subscription', 'insurance', 'alert'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-3 py-1.5 text-xs rounded-md font-medium transition-all capitalize',
                      activeTab === tab ? 'bg-card text-purple-400 shadow-sm' : 'text-muted hover:text-secondary'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredActivity.length > 0 ? filteredActivity.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 py-2.5 px-3 rounded-xl hover:bg-card-hover transition-colors group">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border border-default bg-purple-400/5 text-purple-400">
                    <Activity size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-primary">{item.title}</div>
                    <div className="text-[10px] text-muted mt-0.5">{item.subtitle}</div>
                  </div>
                  <div className="text-right">
                    {item.amount && <div className="text-xs font-mono font-bold text-primary">${parseFloat(item.amount).toFixed(2)}</div>}
                    <div className="text-[10px] text-muted mt-0.5 uppercase tracking-wider">{item.status}</div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-12 text-xs text-muted">No activity recorded yet.</div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.35)} className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionHeader title="Subscription breakdown" subtitle="By category" />
          <CategoryPieChart />
        </Card>
        <Card>
          <SectionHeader title="Insurance breakdown" subtitle="Premium distribution" />
          <InsurancePieChart />
        </Card>
      </motion.div>

      <motion.div {...fadeUp(0.4)}>
        <div className="card p-5 flex flex-col sm:flex-row items-center justify-between gap-6 border-purple-600/20 bg-gradient-to-r from-purple-600/5 to-transparent">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 border border-purple-600/20">
              <Zap size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-primary">Your free trial is active</div>
              <div className="text-xs text-muted mt-1">Experience the full power of predictive financial intelligence.</div>
            </div>
          </div>
          <Button variant="primary" size="md" className="w-full sm:w-auto" onClick={() => router.push('/billing')}>
            Upgrade Plan <ArrowUpRight size={16} className="ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
