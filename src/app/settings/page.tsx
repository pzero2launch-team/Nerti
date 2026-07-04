'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  Eye,
  Lock,
  Database,
  ChevronRight
} from 'lucide-react'
import clsx from 'clsx'
import {
  Card,
  Toggle,
  SectionHeader,
  Divider
} from '@/components/ui'
import { useThemeStore } from '@/store'

export default function SettingsPage() {
  const { isDark, toggle } = useThemeStore()
  const [notifications, setNotifications] = useState(true)
  const [predictionAlerts, setPredictionAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your application preferences and security.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <nav className="flex flex-col gap-1 sticky top-8">
            {[
              { label: 'Appearance', icon: Eye },
              { label: 'Notifications', icon: Bell },
              { label: 'Privacy & Security', icon: Lock },
              { label: 'Data Management', icon: Database },
            ].map((item, i) => (
              <button
                key={item.label}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  i === 0 ? 'bg-purple-600/10 text-purple-400 font-medium' : 'text-muted hover:text-primary hover:bg-card'
                )}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <SectionHeader title="Appearance" subtitle="Customize the interface look and feel" />
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Dark Mode</div>
                  <div className="text-xs text-muted">Use the dark interface for reduced eye strain</div>
                </div>
                <Toggle checked={isDark} onChange={toggle} />
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">System Synchronization</div>
                  <div className="text-xs text-muted">Automatically match your system theme</div>
                </div>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Notifications" subtitle="Choose how and when you want to be alerted" />
            <div className="space-y-6 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Push Notifications</div>
                  <div className="text-xs text-muted">Get alerts directly on your device</div>
                </div>
                <Toggle checked={notifications} onChange={setNotifications} />
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Predictive Payment Alerts</div>
                  <div className="text-xs text-muted">24-72h advance notice for upcoming deductions</div>
                </div>
                <Toggle checked={predictionAlerts} onChange={setPredictionAlerts} />
              </div>
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-primary">Weekly Financial Summary</div>
                  <div className="text-xs text-muted">A recap of your weekly commitments via email</div>
                </div>
                <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeader title="Data & Privacy" subtitle="Control your financial data visibility" />
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-default hover:bg-card-hover transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted"><Database size={16} /></div>
                  <div>
                    <div className="text-xs font-semibold text-primary">Export My Data</div>
                    <div className="text-[10px] text-muted">Download all your records in JSON format</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-default hover:bg-card-hover transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted"><Eye size={16} /></div>
                  <div>
                    <div className="text-xs font-semibold text-primary">Clear Activity Cache</div>
                    <div className="text-[10px] text-muted">Reset all predicted cash flow simulations</div>
                  </div>
                </div>
                <ChevronRight size={14} className="text-muted" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
