import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import InsuranceClient from './InsuranceClient'

export default async function InsurancePage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: policies } = await supabase
    .from('insurance_policies')
    .select('*')
    .order('renewal_date', { ascending: true })

  return (
    <InsuranceClient
      initialPolicies={policies || []}
    />
  )
}
