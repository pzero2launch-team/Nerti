'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addInsurancePolicy(formData: any) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase.from('insurance_policies').insert({
    user_id: user.id,
    name: formData.name,
    provider: formData.provider,
    category: formData.category,
    premium: parseFloat(formData.premium),
    frequency: formData.frequency,
    renewal_date: formData.renewal_date,
    status: 'active',
    color: formData.color || '#8b5cf6'
  })

  if (error) throw error
  revalidatePath('/dashboard')
  revalidatePath('/insurance')
}
