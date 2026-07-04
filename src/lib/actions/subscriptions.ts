'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addSubscription(formData: any) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('subscriptions').insert({
    user_id: user.id,
    name: formData.name,
    category: formData.category,
    amount: parseFloat(formData.amount),
    billing_cycle: formData.billing_cycle,
    next_billing_date: formData.next_billing_date,
    status: 'active',
    color: formData.color || '#3b82f6'
  })

  if (error) throw error
  revalidatePath('/dashboard')
  revalidatePath('/subscriptions')
}

export async function toggleSubscriptionStatus(id: string, currentStatus: string) {
  const supabase = createClient()
  const newStatus = currentStatus === 'active' ? 'paused' : 'active'

  const { error } = await supabase
    .from('subscriptions')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/dashboard')
  revalidatePath('/subscriptions')
}
