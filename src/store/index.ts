import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Subscription, InsurancePolicy, Alert, OnboardingState, User } from '@/types'
import { mockSubscriptions, mockInsurancePolicies, mockAlerts, mockUser } from '@/data/mockData'

// ── Auth Store (Now just for UI state, real auth via Supabase) ────────────────
interface AuthStore {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'nerti-auth' }
  )
)

// ── Theme Store ──────────────────────────────────────────────────────────────
interface ThemeStore {
  isDark: boolean
  toggle: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: true,
      toggle: () => {
        const next = !get().isDark
        set({ isDark: next })
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', next)
          document.documentElement.classList.toggle('light', !next)
        }
      },
    }),
    { name: 'nerti-theme' }
  )
)

// ── Subscription Store ───────────────────────────────────────────────────────
interface SubscriptionStore {
  subscriptions: Subscription[]
  setSubscriptions: (s: Subscription[]) => void
}

export const useSubscriptionStore = create<SubscriptionStore>()((set) => ({
  subscriptions: mockSubscriptions,
  setSubscriptions: (subscriptions) => set({ subscriptions }),
}))

// ── Insurance Store ──────────────────────────────────────────────────────────
interface InsuranceStore {
  policies: InsurancePolicy[]
  setPolicies: (p: InsurancePolicy[]) => void
}

export const useInsuranceStore = create<InsuranceStore>()((set) => ({
  policies: mockInsurancePolicies,
  setPolicies: (policies) => set({ policies }),
}))

// ── Alert Store ──────────────────────────────────────────────────────────────
interface AlertStore {
  alerts: Alert[]
  setAlerts: (a: Alert[]) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

export const useAlertStore = create<AlertStore>()((set) => ({
  alerts: mockAlerts,
  setAlerts: (alerts) => set({ alerts }),
  markRead: (id) =>
    set((state) => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, read: true } : a),
    })),
  markAllRead: () =>
    set((state) => ({ alerts: state.alerts.map(a => ({ ...a, read: true })) })),
}))
