import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch real data from Supabase
  const [
    { data: subscriptions },
    { data: policies },
    { data: alerts },
    { data: activity }
  ] = await Promise.all([
    supabase.from('subscriptions').select('*').order('next_billing_date', { ascending: true }),
    supabase.from('insurance_policies').select('*').order('renewal_date', { ascending: true }),
    supabase.from('alerts').select('*').order('timestamp', { ascending: false }).limit(10),
    supabase.from('activity').select('*').order('timestamp', { ascending: false }).limit(20)
  ])

  return (
    <DashboardClient
      user={user}
      subscriptions={subscriptions || []}
      policies={policies || []}
      alerts={alerts || []}
      activity={activity || []}
    />
  )
}
